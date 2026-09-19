import type { ActionFunctionArgs } from "react-router";
import type { Prisma } from "@prisma/client";
import { authenticate } from "../shopify.server";
import { claimWebhookEvent, completeWebhookEvent, failWebhookEvent } from "../services/webhook-events.server";
import { findInventoryCandidate, syncInventory } from "../services/inventory-sync.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const context = await authenticate.webhook(request);
  const claimed = await claimWebhookEvent({
    id: context.webhookId,
    shop: context.shop,
    topic: String(context.topic),
    payload: context.payload as Prisma.InputJsonValue,
  });
  if (claimed.duplicate) return Response.json({ duplicate: true });
  if (!context.session || !context.admin) {
    await failWebhookEvent(context.webhookId, new Error("No offline session was available for this shop."));
    return new Response(null, { status: 500 });
  }

  try {
    const inventoryItemId = `gid://shopify/InventoryItem/${context.payload.inventory_item_id}`;
    const locationId = `gid://shopify/Location/${context.payload.location_id}`;
    const candidate = await findInventoryCandidate(context.admin, inventoryItemId, locationId);
    if (candidate) {
      await syncInventory(context.admin, {
        ...candidate,
        shop: context.shop,
        trigger: "WEBHOOK",
        endpoint: new URL("/api/mock-inventory", request.url).toString(),
        webhookEventId: context.webhookId,
      });
    }
    await completeWebhookEvent(context.webhookId);
    return Response.json({ processed: true, matched: Boolean(candidate) });
  } catch (caught) {
    const error = caught instanceof Error ? caught : new Error(String(caught));
    await failWebhookEvent(context.webhookId, error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};
