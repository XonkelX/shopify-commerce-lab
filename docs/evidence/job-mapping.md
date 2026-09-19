# Job Evidence Mapping

Last updated: 2026-09-19

Readiness is based on inspectable evidence in this repository, not expected ability.

| Job category | Strongest evidence | Readiness |
|---|---|---|
| Custom Shopify section | [Custom Section buyer proof](../shopify/custom-section.md) | READY |
| Liquid section edit | Product Comparison Section source and schema | READY |
| Responsive theme fix | Product Comparison desktop/mobile behavior | READY |
| Product-page customization | [Advanced PDP buyer proof](../shopify/advanced-pdp.md) | READY |
| Variant bug | Advanced PDP variant-state test matrix | READY |
| Product media synchronization | Atlas color/media browser tests | READY |
| Metafield-driven content | Product details and warranty data model | READY |
| AJAX cart work | Navy / 32 oz Ajax cart verification | READY |
| Liquid debugging | [Bug Fix Lab buyer proof](../shopify/bug-fix-lab.md) — three reproduced root causes and fixes | READY |
| Inherited-theme troubleshooting | Bug Fix Lab source diff and verification | READY |
| Cart-state bug | Live AJAX badge synchronization fix | READY |
| Variant display bug | Cart option rendering fix | READY |
| Empty-state bug | Conditional empty-cart repair | READY |
| Product configurator | [Product Configurator buyer proof](../shopify/product-configurator.md) | READY |
| Product personalization | Live preview, validation, and four line-item properties | READY |
| Advanced PDP option logic | Real variant/media/availability synchronization plus personalization state | READY |
| Quantity/purchase calculator | [Cart / Purchase Logic buyer proof](../shopify/cart-purchase-logic.md) | READY |
| Non-standard order logic | Ceiling rounding, limits, sold-out blocking, and visible calculation properties | READY |
| AJAX cart drawer | Global native-dialog drawer, section refresh, mobile and keyboard proof | READY |
| Cart quantity/removal | Stepper, typed updates, remove, empty state, and authoritative subtotals | READY |
| Cart loading/error states | In-flight UI plus real Shopify inventory-error recovery | READY |
| Free-shipping progress | Merchant-configured threshold with live authoritative cart total | READY |
| Shopify theme quality audit | [Performance / QA buyer proof](../shopify/performance-qa.md) | READY |
| Theme QA automation | Reproducible PowerShell gates plus push/PR GitHub Actions | READY |
| Contained Shopify GraphQL/API integration | [Inventory Sync Monitor live proof](../case-studies/inventory-sync-monitor.md) — authenticated real read/write on an unpublished QA product | READY |
| Shopify webhook processing | Real inventory/product deliveries, failed-event recovery, persistent log, and duplicate-handling tests in [Phase 9 report](phase-9-completion.md) | READY |
| Production warehouse operations or public app distribution | Development tunnel and mock warehouse only; no durable hosting or production SLA | NOT YET |

Phases 1–8 directly support contained section work, product-page/variant work, structured content, evidence-backed Liquid debugging, product configurators, personalization interfaces, fixed-unit purchase calculators, advanced AJAX cart-drawer work, and evidence-led theme QA. Phase 9 adds scoped Admin GraphQL, webhook, inventory-sync, and backend automation proof. The [focused Shopify evidence hub](../shopify/README.md) makes those claims inspectable. Bundles, subscriptions, recommendations, app-store distribution, and production-critical inventory operations remain unsupported.
