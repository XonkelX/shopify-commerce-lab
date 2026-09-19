import { Prisma } from "@prisma/client";
import prisma from "../db.server";

export async function claimWebhookEvent(input: {
  id: string;
  shop: string;
  topic: string;
  payload: Prisma.InputJsonValue;
}) {
  try {
    const event = await prisma.webhookEvent.create({ data: input });
    return { duplicate: false, event };
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
    const claimed = await prisma.webhookEvent.updateMany({
      where: { id: input.id, shop: input.shop, status: "FAILED" },
      data: { status: "PROCESSING", error: null, processedAt: null },
    });
    const event = await prisma.webhookEvent.findUniqueOrThrow({ where: { id: input.id } });
    return { duplicate: claimed.count === 0, event };
  }
}

export async function completeWebhookEvent(id: string) {
  return prisma.webhookEvent.update({ where: { id }, data: { status: "PROCESSED", processedAt: new Date(), error: null } });
}

export async function failWebhookEvent(id: string, error: Error) {
  return prisma.webhookEvent.update({ where: { id }, data: { status: "FAILED", processedAt: new Date(), error: error.message } });
}
