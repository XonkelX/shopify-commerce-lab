import type { ActionFunctionArgs } from "react-router";
import type { Prisma } from "@prisma/client";
import { authenticate } from "../shopify.server";
import { claimWebhookEvent, completeWebhookEvent } from "../services/webhook-events.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { webhookId, shop, topic, payload } = await authenticate.webhook(request);
  const claimed = await claimWebhookEvent({ id: webhookId, shop, topic: String(topic), payload: payload as Prisma.InputJsonValue });
  if (!claimed.duplicate) await completeWebhookEvent(webhookId);
  return Response.json({ duplicate: claimed.duplicate });
};
