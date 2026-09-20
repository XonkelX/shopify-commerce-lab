# Shopify Commerce Lab

Independent Shopify engineering work by [Oniel Alejo Feliz](https://onielalejofeliz.space/). This repository shows real storefront behavior in a Shopify development store and a separate embedded integration app. It is technical proof, not commissioned client work or a claim of production results.

**Start here:** [Storefront evidence](docs/shopify/README.md) · [Inventory integration](docs/case-studies/inventory-sync-monitor.md) · [Source code](theme/) · [Testing and QA](docs/shopify/performance-qa.md)

## What you can inspect

| Capability | Working proof | Implementation |
|---|---|---|
| Custom Shopify sections | [Merchant-configurable comparison](docs/shopify/custom-section.md) | [Liquid section](theme/sections/product-comparison.liquid) |
| Advanced product pages | [Variant, media, price, availability, and structured data](docs/shopify/advanced-pdp.md) | [Product section](theme/sections/product.liquid) |
| Theme debugging | [Three source-backed before/after repairs](docs/shopify/bug-fix-lab.md) | [Header](theme/sections/header.liquid) · [cart](theme/sections/cart.liquid) |
| Product personalization | [Validated configurator and cart properties](docs/shopify/product-configurator.md) | [Configurator section](theme/sections/product-configurator.liquid) |
| Cart and purchase logic | [Whole-case calculator and AJAX cart](docs/shopify/cart-purchase-logic.md) | [Calculator](theme/sections/purchase-logic-calculator.liquid) · [drawer](theme/sections/cart-drawer.liquid) |
| Performance and accessibility | [Theme Check, Lighthouse, keyboard and responsive QA](docs/shopify/performance-qa.md) | [Quality workflow](.github/workflows/quality.yml) |
| Admin GraphQL and webhooks | [Inventory Sync Monitor](docs/case-studies/inventory-sync-monitor.md) | [App source](inventory-sync-monitor/) |

The Shopify theme is unpublished in a password-protected development store. The screenshots, code, test notes, and case studies above are public; [the live theme preview](https://oniel-lab.myshopify.com/?preview_theme_id=155175092398) may require store access. The embedded app currently requires development-store access and an active CLI preview. Neither is presented as an unrestricted public demo.

## Integration architecture

```text
Shopify Admin GraphQL ── read / compare-and-set ──┐
Shopify inventory + product webhooks ──────────────┤
                                                   ▼
                                      Embedded React Router app
                                      │       │             │
                         PostgreSQL / Prisma   retry log   merchant dashboard
                                      │
                                      └── authenticated mock warehouse API
```

The app records webhook claims and sync attempts, retries transient warehouse failures, skips no-op updates, and checks the resulting Shopify quantity. The warehouse is a deterministic mock and the app is not yet hosted as a durable production service. [Read the architecture and verified behavior](docs/case-studies/inventory-sync-monitor.md).

## Verification and delivery

- Theme Check: 45 theme files, zero offenses in the documented quality run; [test matrix](docs/test-results/phase-7-quality.md).
- Storefront: real variants, cart submissions, line-item properties, responsive states, and three debugging repairs have [source-backed validation notes](docs/test-results/).
- App: real development-store Admin GraphQL and webhook activity, PostgreSQL integration tests, and [CI checks](.github/workflows/quality.yml).
- Safe theme changes use an isolated unpublished theme, desktop/mobile checks, preview review, and a rollback path; see the [delivery workflow](docs/development-workflow.md).

For exact evidence boundaries and job categories, see [market readiness](docs/market-readiness.md). The [strict acceptance audit](docs/evidence/strict-acceptance-audit.md) records remaining release gates; a working implementation is not automatically a completed evidence package.

The theme began with Shopify's open-source Skeleton starter. Project-specific sections and repairs are distinguishable in the source history.
