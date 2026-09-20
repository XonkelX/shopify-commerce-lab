# Shopify Evidence

Six concise storefront proofs from a real unpublished Shopify theme, plus a contained embedded-app integration proof. Each page links its relevant captures, validation, and source.

The screenshots, source, and validation notes are public. Storefront previews can require a development-store password; the embedded app requires store access and an active CLI preview. The existing short clips are sequences of captured states, not live interaction recordings. [Exact acceptance boundaries](../evidence/strict-acceptance-audit.md) remain documented separately.

| Proof | What it demonstrates | Job categories |
|---|---|---|
| [Custom Section](custom-section.md) | Merchant-configurable comparison content | Custom Shopify sections, Liquid, responsive theme work |
| [Advanced PDP](advanced-pdp.md) | Variant, media, availability, URL, and structured-content synchronization | PDP customization, variant bugs, metafields/metaobjects |
| [Theme Debugging](bug-fix-lab.md) | Three reproduced, diagnosed, and verified storefront repairs | Liquid debugging, inherited-theme fixes, cart-state bugs |
| [Product Configurator](product-configurator.md) | Validated personalization that survives into Shopify cart data | Product configurators, personalization, line-item properties |
| [Cart / Purchase Logic](cart-purchase-logic.md) | Whole-case calculation plus authoritative cart behavior | Quantity calculators, AJAX cart work, cart state management |
| [Performance / QA](performance-qa.md) | Repeatable theme, Lighthouse, accessibility, and CI evidence | Theme audits, accessibility repair, quality automation |
| [Inventory Sync Monitor](../case-studies/inventory-sync-monitor.md) | Real Admin GraphQL read/write, webhook delivery, retry recovery, and persistent failure log | Shopify API integrations, webhooks, contained custom apps |

The live links target unpublished theme `155175092398` on the Oniel Lab development store. No production theme was modified or published.

The app proof uses an unpublished QA product in that development store. Its live admin link requires store access and an active Shopify CLI preview; the screenshots and code remain reviewable without it.
