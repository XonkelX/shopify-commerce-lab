# Inventory Sync Monitor

A contained Shopify integration lab built with the official React Router app template, TypeScript, App Bridge, Polaris web components, Prisma, and PostgreSQL. It compares Shopify inventory with a deterministic mock warehouse API, writes corrections through Admin GraphQL, and records sync attempts and webhook deliveries.

## Status

The app was installed and verified in the Oniel Lab Shopify development store on September 19, 2026: real Admin GraphQL reads and an inventory mutation, real webhook deliveries and retry recovery, visible failure states, and a persistent PostgreSQL event log. It currently runs through a Shopify CLI development tunnel, **not** durable production hosting. The mock warehouse is a demonstration source, not a production inventory system.

## Local setup

1. Copy `.env.example` to `.env` and replace `MOCK_EXTERNAL_API_TOKEN` with a long random secret. Shopify CLI supplies the app credentials and URL during `shopify app dev`.
2. Start PostgreSQL: `docker compose up -d postgres`.
3. Install dependencies: `npm install`.
4. Apply the database migration: `npx prisma migrate dev`.
5. Start the Shopify app preview: `shopify app dev --store <development-store>.myshopify.com`.

The Shopify app must be linked to a Developer Dashboard app and authorized for `read_products`, `read_inventory`, `read_locations`, and `write_inventory`. The CLI tunnel is required for real webhook delivery. Do not run a sync against a merchant's operational inventory; use a dedicated development-store product/location for the proof.

## Verification

- `npm run typecheck`
- `npm test`
- `npm run test:integration` (requires the local `inventory_sync` PostgreSQL database; the script refuses remote or production databases)
- `npm run build`
- `shopify app config validate --json` after the app is linked

The integration test uses a fake Admin GraphQL response. It proves local persistence, external API retry, webhook claim/reclaim, idempotency-key reuse, and skip-on-no-change. The separate development-store verification proves real Shopify API calls and webhook delivery; see the case study for the exact outcomes and limitations.

## Architecture and limitations

See [the Phase 9 case study](../docs/case-studies/inventory-sync-monitor.md) for the data flow, safety model, screenshots, evidence walkthrough, live outcomes, and test results. The dashboard currently lists the first 20 active products, up to 30 variants per product, and three inventory locations per variant; webhook processing queries the exact inventory item and up to 100 locations.
