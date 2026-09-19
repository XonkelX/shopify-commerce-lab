import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import prisma from "../app/db.server";
import { syncInventory } from "../app/services/inventory-sync.server";
import { claimWebhookEvent, completeWebhookEvent, failWebhookEvent } from "../app/services/webhook-events.server";
import { targetQuantityForSku } from "../app/services/mock-inventory";

const shop = "phase9-proof.myshopify.com";
if (process.env.NODE_ENV === "production") throw new Error("Integration proof cannot run against a production environment.");
const databaseUrl = new URL(process.env.DATABASE_URL ?? "");
if (!["localhost", "127.0.0.1"].includes(databaseUrl.hostname) || databaseUrl.pathname !== "/inventory_sync") {
  throw new Error("Integration proof only runs against the local inventory_sync database.");
}
process.env.MOCK_EXTERNAL_API_TOKEN = randomUUID();
const operationAttempts = new Map<string, number>();
const server = createServer((request, response) => {
  if (request.headers.authorization !== `Bearer ${process.env.MOCK_EXTERNAL_API_TOKEN}`) {
    response.statusCode = 401;
    response.end();
    return;
  }
  const url = new URL(request.url ?? "/", "http://localhost");
  const sku = url.searchParams.get("sku") ?? "";
  const key = String(request.headers["x-operation-key"] ?? "none");
  const failures = Number(request.headers["x-simulated-failures"] ?? 0);
  const attempt = (operationAttempts.get(key) ?? 0) + 1;
  operationAttempts.set(key, attempt);
  response.setHeader("content-type", "application/json");
  if (attempt <= failures) {
    response.statusCode = 503;
    response.end(JSON.stringify({ error: "planned outage", attempt }));
    return;
  }
  response.end(JSON.stringify({ sku, available: targetQuantityForSku(sku), attempt }));
});

await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Proof server failed to bind.");
const endpoint = `http://127.0.0.1:${address.port}/inventory`;

try {
  await prisma.syncAttempt.deleteMany({ where: { syncRun: { shop } } });
  await prisma.syncRun.deleteMany({ where: { shop } });
  await prisma.inventoryMapping.deleteMany({ where: { shop } });
  await prisma.webhookEvent.deleteMany({ where: { shop } });

  const firstClaim = await claimWebhookEvent({ id: "proof-webhook-1", shop, topic: "INVENTORY_LEVELS_UPDATE", payload: { available: 9 } });
  const duplicateClaim = await claimWebhookEvent({ id: "proof-webhook-1", shop, topic: "INVENTORY_LEVELS_UPDATE", payload: { available: 9 } });
  assert.equal(firstClaim.duplicate, false);
  assert.equal(duplicateClaim.duplicate, true);
  await failWebhookEvent("proof-webhook-1", new Error("planned retry"));
  const retryClaim = await claimWebhookEvent({ id: "proof-webhook-1", shop, topic: "INVENTORY_LEVELS_UPDATE", payload: { available: 9 } });
  assert.equal(retryClaim.duplicate, false);
  await completeWebhookEvent("proof-webhook-1");

  let graphqlCalls = 0;
  const admin = { graphql: async (query: string) => {
    if (query.includes("query InventoryWebhookCandidate")) {
      return Response.json({ data: { inventoryItem: {
        id: "gid://shopify/InventoryItem/100", sku: "ATLAS-SAGE-20",
        variants: { nodes: [{ title: "Sage / 20 oz", product: { title: "Atlas Insulated Bottle" } }] },
        inventoryLevels: { nodes: [{
          location: { id: "gid://shopify/Location/200", name: "Proof warehouse" },
          quantities: [{ name: "available", quantity: targetQuantityForSku("ATLAS-SAGE-20") }],
        }] },
      } } });
    }
    graphqlCalls += 1;
    return Response.json({ data: { inventorySetQuantities: { inventoryAdjustmentGroup: { changes: [{ quantityAfterChange: null }] }, userErrors: [] } } });
  } };
  const candidate = {
    shop,
    trigger: "MANUAL" as const,
    endpoint,
    sku: "ATLAS-SAGE-20",
    productTitle: "Atlas Insulated Bottle",
    variantTitle: "Sage / 20 oz",
    inventoryItemId: "gid://shopify/InventoryItem/100",
    locationId: "gid://shopify/Location/200",
    locationName: "Proof warehouse",
    available: 9,
    simulatedFailures: 2,
    idempotencyKey: "proof-operation-1",
  };
  const run = await syncInventory(admin, candidate);
  assert.equal(run.status, "SUCCEEDED");
  assert.equal(run.attemptCount, 3);
  assert.equal(run.attempts.length, 3);
  assert.equal(graphqlCalls, 1);

  const duplicateRun = await syncInventory(admin, candidate);
  assert.equal(duplicateRun.id, run.id);
  assert.equal(graphqlCalls, 1);

  const noChangeRun = await syncInventory(admin, {
    ...candidate, idempotencyKey: "proof-operation-2", available: targetQuantityForSku(candidate.sku), simulatedFailures: 0,
  });
  assert.equal(noChangeRun.status, "SKIPPED");
  assert.equal(graphqlCalls, 1);

  await assert.rejects(() => syncInventory(admin, {
    ...candidate, idempotencyKey: "proof-operation-3", simulatedFailures: 3,
  }), /External API returned 503/);
  const failedRun = await prisma.syncRun.findUniqueOrThrow({
    where: { shop_idempotencyKey: { shop, idempotencyKey: "proof-operation-3" } }, include: { attempts: true },
  });
  assert.equal(failedRun.status, "FAILED");
  assert.equal(failedRun.attempts.length, 3);
  assert.equal(graphqlCalls, 1);

  const storedEvent = await prisma.webhookEvent.findUniqueOrThrow({ where: { id: "proof-webhook-1" } });
  const storedRun = await prisma.syncRun.findUniqueOrThrow({ where: { id: run.id }, include: { attempts: true } });
  const storedMapping = await prisma.inventoryMapping.findFirstOrThrow({ where: { shop } });
  assert.equal(storedEvent.status, "PROCESSED");
  assert.equal(storedRun.attempts.length, 3);
  assert.equal(storedMapping.lastStatus, "FAILED");

  console.log(JSON.stringify({ persistence: "PASS", retryAttempts: storedRun.attempts.length, duplicateWebhook: duplicateClaim.duplicate, failedWebhookReclaimed: !retryClaim.duplicate, duplicateSyncSuppressed: graphqlCalls === 1, unchangedInventorySkipped: noChangeRun.status === "SKIPPED", visibleFailure: failedRun.status === "FAILED" && failedRun.attempts.length === 3, finalStatus: storedRun.status, storedMapping: storedMapping.sku }, null, 2));
} finally {
  await prisma.$disconnect();
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
