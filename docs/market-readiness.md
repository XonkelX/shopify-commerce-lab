# CURRENT MARKET READINESS

Last updated: 2026-09-19

## Evidence currently completed

- Phase 0 infrastructure and safe-delivery workflow.
- Product Comparison Section running in a real unpublished Shopify theme.
- Advanced PDP running against a real six-variant Shopify product.
- Bug Fix Evidence Lab with three reproduced, diagnosed, fixed, and remotely verified storefront defects.
- Personalized Product Configurator with structured selection, live preview, validation, real variants, merchant settings, and cart-persistent line-item properties.
- Case Quantity Purchase Calculator with transparent ceiling logic, edge validation, merchant controls, real variant states, computed cart quantity, and cart-persistent calculation properties.
- AJAX Cart Drawer with product-form integration, quantity and removal controls, Shopify-authoritative section refresh, variant/property display, loading/error/empty states, shipping progress, mobile layout, and keyboard behavior.
- Quality Engineering evidence with warning-level Theme Check, nine Lighthouse audits, three-run medians, automated/manual accessibility verification, issue remediation, reproducible scripts, and push/PR CI.
- Focused Shopify evidence packaging with six concise buyer pages, six real storefront screenshots, six short proof clips, live previews, test status, job mappings, and direct source links.
- Valid Online Store 2.0 schema with configurable settings and addable, removable, reorderable blocks.
- Variant/media/price/availability/URL synchronization, Ajax add-to-cart, product metafields, and a referenced warranty metaobject.
- Real Theme Editor verification, desktop/mobile/cart captures, clean Theme Check, case studies, test matrices, and demo scripts.
- Inventory Sync Monitor embedded in a Shopify development store, with real Admin GraphQL inventory reads/writes, real inventory/product webhooks, retry/failure visibility, PostgreSQL persistence, screenshots, walkthrough, and public source.

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
- AJAX cart drawers
- Cart quantity, removal, subtotal, and header-count synchronization
- Cart loading, inventory-error, and empty states
- Free-shipping progress interfaces
- Shopify theme QA and handoff audits
- Lighthouse measurement and contained performance/accessibility remediation
- Theme Check and practical GitHub Actions quality gates
- Contained Shopify Admin GraphQL integrations
- Shopify webhook processing and inventory synchronization
- Small custom Shopify app features and backend automation

## Jobs I should NOT claim yet

- Bundles and subscription cart logic
- Production-hosted Shopify app operations or app-store distribution
- Enterprise inventory integrations with external warehouse SLAs
- Shopify Functions
- Checkout extensions
- Shopify Plus architecture
- Full WCAG conformance certification
- Production Core Web Vitals guarantees

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
| AJAX cart drawer | [AJAX Cart Drawer Engineering](case-studies/cart-engineering.md) |
| Cart quantity/removal | [Phase 6 cart validation matrix](test-results/phase-6-cart-engineering.md) |
| Cart loading/error/empty states | [Phase 6 completion evidence](evidence/phase-6-completion.md) |
| Shopify theme quality audit | [Phase 7 quality matrix](test-results/phase-7-quality.md) |
| Lighthouse and accessibility QA | [Phase 7 reproduction guide](evidence/phase-7-reproduction.md) |
| Theme QA automation | [Quality workflow](../.github/workflows/quality.yml) and [local gate](../scripts/verify-phase-7.ps1) |
| Fast buyer evaluation | [Focused Shopify evidence hub](shopify/README.md) |
| Contained Shopify API/app work | [Inventory Sync Monitor case study](case-studies/inventory-sync-monitor.md), [dashboard capture](shopify/assets/inventory-sync-dashboard.png), and [source](../inventory-sync-monitor/) |

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
- AJAX cart drawer — additions, quantities, removal, totals, properties, status states, mobile, and keyboard behavior verified
- Cart error recovery — real inventory ceiling refreshes to Shopify's authoritative quantity and subtotal
- Free-shipping progress — merchant goal responds to server-rendered cart totals
- Theme quality audit — clean Theme Check, nine Lighthouse runs, manual accessibility checks, repaired findings, and disclosed limitations
- Contained accessibility repair — ARIA semantics, labels, focus order/visibility, dialog management, error announcements, touch targets, and contrast are evidenced
- Theme QA automation — warning-level Theme Check and structural invariants run on every push and pull request
- Portfolio evidence packaging — six major proofs are discoverable from one focused hub with working screenshot, video, live, test, job, and code links
- Contained Shopify app/API integration — embedded React Router app with authenticated Admin GraphQL read/write and verified QA-product inventory correction
- Webhook processing — real inventory/product deliveries, failed-event recovery, unique-ID claim logic, and self-write no-op shown
- Inventory synchronization and backend automation — PostgreSQL event log, three-attempt recovery, failure visibility, compare-and-set, and idempotency evidence

## PLAUSIBLE

- Small homepage customizations — adjacent to the completed section, but no broader homepage rebuild is claimed.
- Conditional cart messaging — shipping-goal behavior is proven, but cross-sell and recommendation rules are not.
- Performance remediation — image priority, responsive delivery, metadata, and measured page audits are proven, but production field Core Web Vitals are not.
- Small conditional personalization additions — adjacent to the completed module, but uploads and surcharge architectures are not claimed.
- Custom app adaptation within an existing deployment — the core integration is proven, but long-lived hosting and production operations are not.

## NOT YET

- Bundles, subscriptions, recommendation logic, Shopify Functions, checkout extensions, app-store distribution, and production inventory operations.

## Approximate job scope currently supported

Contained section work plus small-to-mid PDP, variant, metafield, media-sync, mobile, Liquid-debugging, inherited-theme repair, configurator, personalization, fixed-unit purchase-calculator, AJAX cart-drawer, and theme-quality tasks. Phase 9 additionally supports scoped Admin GraphQL, webhook, inventory-sync, and custom app-feature work with explicit deployment/warehouse boundaries. The [focused evidence hub](shopify/README.md) makes the strongest proof reviewable quickly. The evidence supports contained Shopify functionality and QA projects in the prompt's $300–$1,000 target band; API/app work needs separate scoping for hosting, data ownership, and operational risk.

## Best applications to target now

1. Add or adapt a merchant-configurable Shopify section.
2. Fix a product variant, price, availability, or media synchronization issue.
3. Add metafield-driven product information or a reusable metaobject reference.
4. Implement or repair a contained Ajax add-to-cart flow.
5. Fix responsive behavior within an existing section or PDP.
6. Diagnose and repair contained Liquid, cart-state, or conditional-rendering defects.
7. Build a contained product configurator or personalization flow using real variants and line-item properties.
8. Build a fixed-pack, case, coverage, or volume calculator that submits a correct whole Shopify quantity.
9. Build or repair an AJAX cart drawer with quantity, removal, totals, properties, and responsive states.
10. Audit and repair a contained Shopify theme area using Theme Check, Lighthouse, keyboard/accessibility checks, and documented handoff evidence.
11. Build a scoped Shopify Admin GraphQL integration or webhook processor with persistent logs and retry/idempotency safeguards.
12. Add or adapt a contained custom-app inventory or backend automation feature on an existing hosting setup.

## Do not target yet

1. Bundles, subscription logic, or multi-product purchase calculators.
2. Cross-sell recommendation engines or complex promotional cart rules.
3. Image-upload personalization or dynamic-pricing architecture without a scoped app/variant design.
4. App-store launches, production-critical warehouse synchronization, or custom app operations without a hosting/monitoring plan.
5. Checkout extensions, Functions, or Plus architecture.

## Next evidence gap

Phase 9 — [Inventory Sync Monitor](case-studies/inventory-sync-monitor.md) — is complete as a development-store integration proof. The next highest-value module is **durable app deployment and operational verification**: host the existing app and PostgreSQL outside the Shopify CLI tunnel, reverify authenticated sessions and webhook delivery after restart, add deployment/monitoring evidence, and replace the screenshot-sequence walkthrough with a short live interaction recording. That would make the app proof independently reviewable without a local preview and support stronger ongoing custom-app claims.
