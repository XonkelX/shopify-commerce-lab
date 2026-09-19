import assert from "node:assert/strict";
import test from "node:test";
import { targetQuantityForSku } from "../app/services/mock-inventory";
import { findInventoryCandidate, inventorySetInput } from "../app/services/inventory-sync.server";

test("mock warehouse quantity is deterministic and bounded", () => {
  assert.equal(targetQuantityForSku("ATLAS-SAGE-20"), targetQuantityForSku("atlas-sage-20"));
  assert.ok(targetQuantityForSku("ATLAS-SAGE-20") >= 12);
  assert.ok(targetQuantityForSku("ATLAS-SAGE-20") <= 84);
});

test("inventory mutation uses compare-and-set against the observed Shopify quantity", () => {
  const input = inventorySetInput({
    shop: "oniel-lab.myshopify.com",
    trigger: "MANUAL",
    endpoint: "http://localhost/mock",
    sku: "ATLAS-SAGE-20",
    productTitle: "Atlas Bottle",
    variantTitle: "Sage / 20 oz",
    inventoryItemId: "gid://shopify/InventoryItem/1",
    locationId: "gid://shopify/Location/2",
    locationName: "Main",
    available: 7,
  }, 31);
  assert.equal(input.quantities[0].changeFromQuantity, 7);
  assert.equal(input.quantities[0].quantity, 31);
  assert.equal(input.reason, "correction");
});

test("webhook lookup resolves the exact item and location via Admin GraphQL", async () => {
  let queriedId: unknown;
  const admin = { graphql: async (_query: string, options?: { variables?: Record<string, unknown> }) => {
    queriedId = options?.variables?.id;
    return Response.json({ data: { inventoryItem: {
      id: "gid://shopify/InventoryItem/1", sku: "ATLAS-SAGE-20",
      variants: { nodes: [{ title: "Sage / 20 oz", product: { title: "Atlas Bottle" } }] },
      inventoryLevels: { nodes: [
        { location: { id: "gid://shopify/Location/2", name: "Main" }, quantities: [{ name: "available", quantity: 7 }] },
        { location: { id: "gid://shopify/Location/3", name: "Annex" }, quantities: [{ name: "available", quantity: 5 }] },
      ] },
    } } });
  } };
  const candidate = await findInventoryCandidate(admin, "gid://shopify/InventoryItem/1", "gid://shopify/Location/2");
  assert.equal(queriedId, "gid://shopify/InventoryItem/1");
  assert.equal(candidate?.available, 7);
  assert.equal(candidate?.locationName, "Main");
  assert.equal(await findInventoryCandidate(admin, "gid://shopify/InventoryItem/1", "gid://shopify/Location/4"), null);
});
