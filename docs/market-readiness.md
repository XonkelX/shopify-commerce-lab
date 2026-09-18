# CURRENT MARKET READINESS

Last updated: 2026-09-17

## Evidence currently completed

- Phase 0 infrastructure and safe-delivery workflow.
- Product Comparison Section running in a real unpublished Shopify theme.
- Advanced PDP running against a real six-variant Shopify product.
- Bug Fix Evidence Lab with three reproduced, diagnosed, fixed, and remotely verified storefront defects.
- Personalized Product Configurator with structured selection, live preview, validation, real variants, merchant settings, and cart-persistent line-item properties.
- Case Quantity Purchase Calculator with transparent ceiling logic, edge validation, merchant controls, real variant states, computed cart quantity, and cart-persistent calculation properties.
- Valid Online Store 2.0 schema with configurable settings and addable, removable, reorderable blocks.
- Variant/media/price/availability/URL synchronization, Ajax add-to-cart, product metafields, and a referenced warranty metaobject.
- Real Theme Editor verification, desktop/mobile/cart captures, clean Theme Check, case studies, test matrices, and demo scripts.

## Jobs I can credibly apply for RIGHT NOW

- Small custom Shopify sections
- Liquid section implementation and edits
- Theme Editor configurable homepage sections
- Product comparison layouts
- Small responsive section/layout fixes
- Product-page fixes and Liquid PDP customization
- Variant and product-media synchronization fixes
- Metafield/metaobject storefront content
- Mobile PDP fixes
- Contained AJAX add-to-cart work
- Shopify Liquid debugging and inherited-theme troubleshooting
- Cart badge, variant-display, and empty-state repairs
- Contained Shopify product configurators
- Product personalization interfaces
- Line-item property capture and cart rendering
- Advanced PDP option and validation logic
- Fixed-pack and case quantity calculators
- Non-standard whole-unit purchase logic

## Jobs I should NOT claim yet

- Advanced cart drawers and bundles
- Shopify app development
- Admin GraphQL integrations
- Webhooks
- Shopify Functions
- Checkout extensions
- Shopify Plus architecture

## Best evidence link or artifact for each supported job type

| Job type | Best evidence |
|---|---|
| Custom Shopify section | [Product Comparison case study](case-studies/product-comparison-section.md) |
| Liquid section edit | [Product Comparison source](../theme/sections/product-comparison.liquid) |
| Theme Editor configuration | [Editor verification matrix](test-results/phase-1-product-comparison.md) and authenticated session capture |
| Responsive section work | [Desktop](screenshots/phase-1-desktop.png) and [mobile](screenshots/phase-1-mobile.png) evidence |
| Product-page customization | [Advanced PDP case study](case-studies/advanced-product-page.md) |
| Variant/media synchronization | [Phase 2 test matrix](test-results/phase-2-advanced-pdp.md) |
| Metafield/metaobject content | [Advanced PDP data model](case-studies/advanced-product-page.md#product-data-model) |
| AJAX add-to-cart | [Advanced PDP source](../theme/sections/product.liquid) and [cart verification](test-results/phase-2-advanced-pdp.md) |
| Shopify Liquid debugging | [Bug Fix Lab case study](case-studies/bug-fix-lab.md) |
| Cart-state troubleshooting | [Phase 3 test matrix](test-results/phase-3-bug-fix-lab.md) |
| Variant display repair | [Cart source](../theme/sections/cart.liquid) and [Bug 2 evidence](case-studies/bug-fix-lab.md#bug-2--cart-lines-hid-the-selected-variant) |
| Empty-state repair | [Bug 3 evidence](case-studies/bug-fix-lab.md#bug-3--empty-cart-showed-an-unusable-checkout-state) |
| Product configurator | [Personalized Product Configurator case study](case-studies/product-configurator.md) |
| Product personalization | [Phase 4 validation matrix](test-results/phase-4-product-configurator.md) |
| Line-item properties | [Cart rendering source](../theme/sections/cart.liquid) and [Phase 4 completion evidence](evidence/phase-4-completion.md) |
| Quantity/purchase calculator | [Case Quantity Purchase Calculator](case-studies/purchase-logic-calculator.md) |
| Non-standard order logic | [Phase 5 calculation and cart matrix](test-results/phase-5-purchase-logic.md) |

## READY

- Custom Shopify section — Product Comparison Section
- Liquid section implementation — section source and valid schema
- Theme Editor configurable section — verified controls and live update
- Responsive section/layout work — verified desktop and mobile behavior
- Product-page customization — real product, section source, and remote preview
- Variant and media synchronization — tested Color/Size matrix including sold out
- Metafield/metaobject content — real Shopify definitions, values, reference, and Liquid rendering
- AJAX add-to-cart — correct selected variant verified in cart without page navigation
- Responsive PDP work — Shopify mobile preview verified
- Liquid debugging — three real defects with reproduction, root cause, fix commit, and verification
- Inherited-theme troubleshooting — product/header/cart behavior repaired in the existing Skeleton-based theme
- Cart-state and conditional-rendering fixes — stale badge, missing variants, and empty checkout state verified
- Product configurator — structured personalization, live preview, validation, real variants, and cart-persistent properties verified
- Product personalization — text/style/gift choices survive as visible Shopify line-item properties
- Advanced PDP option logic — variant and custom state remain synchronized across desktop and mobile
- Quantity/purchase calculator — exact and round-up boundaries, limits, sold-out state, and quantity-12 cart submission verified
- Non-standard order logic — customer requirements translate into whole purchasable units with a visible equation and cart audit properties

## PLAUSIBLE

- Small homepage customizations — adjacent to the completed section, but no broader homepage rebuild is claimed.
- Basic cart-template edits — Ajax cart behavior is proven, but a full cart-drawer system is not.
- Basic accessibility repair — count-aware names and variant-specific controls are proven, but a full accessibility audit is not.
- Small conditional personalization additions — adjacent to the completed module, but uploads and surcharge architectures are not claimed.

## NOT YET

- Advanced cart engineering, Shopify API, and webhook categories in [job-mapping.md](evidence/job-mapping.md).

## Approximate job scope currently supported

Contained section work plus small-to-mid PDP, variant, metafield, media-sync, mobile, Ajax/native-cart, Liquid-debugging, inherited-theme repair, configurator, personalization, and fixed-unit purchase-calculator tasks. The evidence now supports contained Shopify functionality projects in the prompt's $300–$1,000 target band; actual pricing still depends on scope, data model, design, and integration risk.

## Best applications to target now

1. Add or adapt a merchant-configurable Shopify section.
2. Fix a product variant, price, availability, or media synchronization issue.
3. Add metafield-driven product information or a reusable metaobject reference.
4. Implement or repair a contained Ajax add-to-cart flow.
5. Fix responsive behavior within an existing section or PDP.
6. Diagnose and repair contained Liquid, cart-state, or conditional-rendering defects.
7. Build a contained product configurator or personalization flow using real variants and line-item properties.
8. Build a fixed-pack, case, coverage, or volume calculator that submits a correct whole Shopify quantity.

## Do not target yet

1. Bundles, subscription logic, or multi-product purchase calculators.
2. Full cart drawers or advanced cart architecture.
3. Image-upload personalization or dynamic-pricing architecture without a scoped app/variant design.
4. Shopify app, API, webhook, checkout, Functions, or Plus work.

## Next evidence gap

Build Phase 6 — Cart Engineering. It is the next evidence gap for richer cart architecture, line updates/removals, grouped purchasing behavior, and cart-level interaction quality.
