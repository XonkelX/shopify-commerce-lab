-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "SyncTrigger" AS ENUM ('MANUAL', 'WEBHOOK');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PROCESSING', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryMapping" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "productTitle" TEXT,
    "variantTitle" TEXT,
    "inventoryItemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "locationName" TEXT,
    "lastShopifyQuantity" INTEGER,
    "lastExternalQuantity" INTEGER,
    "lastStatus" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "lastError" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncRun" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "trigger" "SyncTrigger" NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'PENDING',
    "idempotencyKey" TEXT NOT NULL,
    "webhookEventId" TEXT,
    "sku" TEXT NOT NULL,
    "productTitle" TEXT,
    "variantTitle" TEXT,
    "inventoryItemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "locationName" TEXT,
    "previousQuantity" INTEGER NOT NULL,
    "targetQuantity" INTEGER,
    "finalQuantity" INTEGER,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncAttempt" (
    "id" TEXT NOT NULL,
    "syncRunId" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL,
    "stage" TEXT NOT NULL,
    "statusCode" INTEGER,
    "message" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'PROCESSING',
    "payload" JSONB NOT NULL,
    "error" TEXT,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InventoryMapping_shop_sku_idx" ON "InventoryMapping"("shop", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryMapping_shop_inventoryItemId_locationId_key" ON "InventoryMapping"("shop", "inventoryItemId", "locationId");

-- CreateIndex
CREATE INDEX "SyncRun_shop_createdAt_idx" ON "SyncRun"("shop", "createdAt");

-- CreateIndex
CREATE INDEX "SyncRun_webhookEventId_idx" ON "SyncRun"("webhookEventId");

-- CreateIndex
CREATE UNIQUE INDEX "SyncRun_shop_idempotencyKey_key" ON "SyncRun"("shop", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "SyncAttempt_syncRunId_stage_attempt_key" ON "SyncAttempt"("syncRunId", "stage", "attempt");

-- CreateIndex
CREATE INDEX "WebhookEvent_shop_receivedAt_idx" ON "WebhookEvent"("shop", "receivedAt");

-- AddForeignKey
ALTER TABLE "SyncAttempt" ADD CONSTRAINT "SyncAttempt_syncRunId_fkey" FOREIGN KEY ("syncRunId") REFERENCES "SyncRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
