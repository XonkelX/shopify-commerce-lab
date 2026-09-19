import { randomUUID } from "node:crypto";
import type { SyncTrigger } from "@prisma/client";
import prisma from "../db.server";
import { fetchExternalQuantity } from "./external-inventory.server";

export type AdminGraphqlClient = {
  graphql: (query: string, options?: { variables?: Record<string, unknown> }) => Promise<Response>;
};

export type InventoryCandidate = {
  productTitle: string;
  variantTitle: string;
  sku: string;
  inventoryItemId: string;
  locationId: string;
  locationName: string;
  available: number;
};

export type SyncInventoryInput = InventoryCandidate & {
  shop: string;
  trigger: SyncTrigger;
  endpoint: string;
  simulatedFailures?: number;
  webhookEventId?: string;
  idempotencyKey?: string;
};

type InventoryMutationResponse = {
  data?: {
    inventorySetQuantities?: {
      inventoryAdjustmentGroup?: { changes?: Array<{ quantityAfterChange?: number }> };
      userErrors?: Array<{ message: string }>;
    };
  };
  errors?: Array<{ message: string }>;
};

type InventoryLevelNode = {
  location: { id: string; name: string };
  quantities: Array<{ name: string; quantity: number }>;
};

type ProductNode = {
  title: string;
  variants: { nodes: Array<{
    title: string;
    sku: string | null;
    inventoryItem: { id: string; inventoryLevels: { nodes: InventoryLevelNode[] } } | null;
  }> };
};

export async function listInventoryCandidates(admin: AdminGraphqlClient): Promise<InventoryCandidate[]> {
  const response = await admin.graphql(`#graphql
    query InventorySyncCandidates {
      products(first: 20, query: "status:active") {
        nodes {
          title
          variants(first: 30) {
            nodes {
              title
              sku
              inventoryItem {
                id
                inventoryLevels(first: 3) {
                  nodes {
                    location { id name }
                    quantities(names: ["available"]) { name quantity }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const json = (await response.json()) as {
    data?: { products?: { nodes?: ProductNode[] } };
    errors?: Array<{ message: string }>;
  };
  if (json.errors?.length) throw new Error(json.errors.map((error) => error.message).join("; "));

  return (json.data?.products?.nodes ?? []).flatMap((product) =>
    (product.variants?.nodes ?? []).flatMap((variant) => {
      const item = variant.inventoryItem;
      if (!item) return [];
      return item.inventoryLevels.nodes.map((level) => ({
        productTitle: String(product.title),
        variantTitle: String(variant.title),
        sku: String(variant.sku || `ITEM-${item.id.split("/").pop()}`),
        inventoryItemId: String(item.id),
        locationId: String(level.location.id),
        locationName: String(level.location.name),
        available: Number(level.quantities?.find((quantity) => quantity.name === "available")?.quantity ?? 0),
      }));
    }),
  );
}

export async function findInventoryCandidate(admin: AdminGraphqlClient, inventoryItemId: string, locationId: string): Promise<InventoryCandidate | null> {
  const response = await admin.graphql(`#graphql
    query InventoryWebhookCandidate($id: ID!) {
      inventoryItem(id: $id) {
        id
        sku
        variants(first: 1) { nodes { title product { title } } }
        inventoryLevels(first: 100) {
          nodes {
            location { id name }
            quantities(names: ["available"]) { name quantity }
          }
        }
      }
    }
  `, { variables: { id: inventoryItemId } });
  const json = (await response.json()) as {
    data?: { inventoryItem?: {
      id: string; sku: string | null;
      variants: { nodes: Array<{ title: string; product: { title: string } }> };
      inventoryLevels: { nodes: Array<{ location: { id: string; name: string }; quantities: Array<{ name: string; quantity: number }> }> };
    } };
    errors?: Array<{ message: string }>;
  };
  if (json.errors?.length) throw new Error(json.errors.map((error) => error.message).join("; "));
  const item = json.data?.inventoryItem;
  const level = item?.inventoryLevels.nodes.find((node) => node.location.id === locationId);
  if (!item || !level) return null;
  const variant = item.variants.nodes[0];
  return {
    productTitle: variant?.product.title ?? "Unknown product",
    variantTitle: variant?.title ?? "Unknown variant",
    sku: item.sku || `ITEM-${inventoryItemId.split("/").pop()}`,
    inventoryItemId,
    locationId,
    locationName: level.location.name,
    available: level.quantities.find((quantity) => quantity.name === "available")?.quantity ?? 0,
  };
}

export function inventorySetInput(input: SyncInventoryInput, targetQuantity: number) {
  return {
    name: "available",
    reason: "correction",
    referenceDocumentUri: `gid://inventory-sync-monitor/Sync/${encodeURIComponent(input.shop)}/${encodeURIComponent(input.sku)}`,
    quantities: [{
      inventoryItemId: input.inventoryItemId,
      locationId: input.locationId,
      quantity: targetQuantity,
      changeFromQuantity: input.available,
    }],
  };
}

export async function syncInventory(admin: AdminGraphqlClient, input: SyncInventoryInput) {
  const idempotencyKey = input.idempotencyKey ?? randomUUID();
  const existing = await prisma.syncRun.findUnique({
    where: { shop_idempotencyKey: { shop: input.shop, idempotencyKey } },
    include: { attempts: true },
  });
  if (existing) return existing;

  const run = await prisma.syncRun.create({
    data: {
      shop: input.shop,
      trigger: input.trigger,
      idempotencyKey,
      webhookEventId: input.webhookEventId,
      sku: input.sku,
      productTitle: input.productTitle,
      variantTitle: input.variantTitle,
      inventoryItemId: input.inventoryItemId,
      locationId: input.locationId,
      locationName: input.locationName,
      previousQuantity: input.available,
    },
  });

  try {
    const external = await fetchExternalQuantity({
      endpoint: input.endpoint,
      sku: input.sku,
      operationKey: idempotencyKey,
      simulatedFailures: input.simulatedFailures,
      onAttempt: async (attempt, durationMs, error) => {
        await prisma.syncAttempt.create({
          data: {
            syncRunId: run.id,
            attempt,
            stage: "external-api",
            statusCode: "status" in (error ?? {}) ? Number((error as { status?: number }).status) || null : null,
            message: error?.message ?? "External quantity received.",
            durationMs,
          },
        });
      },
    });
    await prisma.syncRun.update({
      where: { id: run.id },
      data: { targetQuantity: external.quantity, attemptCount: external.attempts },
    });

    if (external.quantity === input.available) {
      await prisma.inventoryMapping.upsert({
        where: { shop_inventoryItemId_locationId: { shop: input.shop, inventoryItemId: input.inventoryItemId, locationId: input.locationId } },
        create: {
          shop: input.shop, sku: input.sku, productTitle: input.productTitle, variantTitle: input.variantTitle,
          inventoryItemId: input.inventoryItemId, locationId: input.locationId, locationName: input.locationName,
          lastShopifyQuantity: input.available, lastExternalQuantity: external.quantity,
          lastStatus: "SKIPPED", lastSyncedAt: new Date(),
        },
        update: {
          sku: input.sku, productTitle: input.productTitle, variantTitle: input.variantTitle,
          locationName: input.locationName, lastShopifyQuantity: input.available,
          lastExternalQuantity: external.quantity, lastStatus: "SKIPPED", lastError: null,
          lastSyncedAt: new Date(),
        },
      });
      return prisma.syncRun.update({
        where: { id: run.id },
        data: { status: "SKIPPED", targetQuantity: external.quantity, finalQuantity: input.available, attemptCount: external.attempts, finishedAt: new Date() },
        include: { attempts: true },
      });
    }

    const response = await admin.graphql(`#graphql
      mutation SetExternalInventory($input: InventorySetQuantitiesInput!, $idempotencyKey: String!) {
        inventorySetQuantities(input: $input) @idempotent(key: $idempotencyKey) {
          inventoryAdjustmentGroup {
            changes { name delta quantityAfterChange }
          }
          userErrors { code field message }
        }
      }
    `, { variables: { input: inventorySetInput(input, external.quantity), idempotencyKey } });
    if (!response.ok) throw new Error(`Shopify Admin GraphQL returned HTTP ${response.status}.`);
    const mutation = (await response.json()) as InventoryMutationResponse;
    const errors = [
      ...(mutation.errors ?? []).map((error) => error.message),
      ...(mutation.data?.inventorySetQuantities?.userErrors ?? []).map((error) => error.message),
    ];
    if (errors.length) throw new Error(errors.join("; "));
    if (!mutation.data?.inventorySetQuantities) throw new Error("Shopify inventory mutation returned no payload.");

    const verified = await findInventoryCandidate(admin, input.inventoryItemId, input.locationId);
    if (!verified || verified.available !== external.quantity) {
      throw new Error(`Shopify inventory verification did not match target ${external.quantity}.`);
    }
    const finalQuantity = verified.available;
    await prisma.inventoryMapping.upsert({
      where: { shop_inventoryItemId_locationId: { shop: input.shop, inventoryItemId: input.inventoryItemId, locationId: input.locationId } },
      create: {
        shop: input.shop,
        sku: input.sku,
        productTitle: input.productTitle,
        variantTitle: input.variantTitle,
        inventoryItemId: input.inventoryItemId,
        locationId: input.locationId,
        locationName: input.locationName,
        lastShopifyQuantity: finalQuantity,
        lastExternalQuantity: external.quantity,
        lastStatus: "SUCCEEDED",
        lastSyncedAt: new Date(),
      },
      update: {
        sku: input.sku,
        productTitle: input.productTitle,
        variantTitle: input.variantTitle,
        locationName: input.locationName,
        lastShopifyQuantity: finalQuantity,
        lastExternalQuantity: external.quantity,
        lastStatus: "SUCCEEDED",
        lastError: null,
        lastSyncedAt: new Date(),
      },
    });
    return await prisma.syncRun.update({
      where: { id: run.id },
      data: { status: "SUCCEEDED", targetQuantity: external.quantity, finalQuantity, attemptCount: external.attempts, finishedAt: new Date() },
      include: { attempts: true },
    });
  } catch (caught) {
    const error = caught instanceof Error ? caught : new Error(String(caught));
    await prisma.inventoryMapping.upsert({
      where: { shop_inventoryItemId_locationId: { shop: input.shop, inventoryItemId: input.inventoryItemId, locationId: input.locationId } },
      create: {
        shop: input.shop,
        sku: input.sku,
        inventoryItemId: input.inventoryItemId,
        locationId: input.locationId,
        lastStatus: "FAILED",
        lastError: error.message,
      },
      update: { lastStatus: "FAILED", lastError: error.message },
    });
    await prisma.syncRun.update({
      where: { id: run.id },
      data: {
        status: "FAILED", error: error.message, finishedAt: new Date(),
        attemptCount: await prisma.syncAttempt.count({ where: { syncRunId: run.id } }),
      },
    });
    throw error;
  }
}
