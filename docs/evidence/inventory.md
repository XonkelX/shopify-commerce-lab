# Evidence Inventory

Last updated: 2026-09-19

| Module | Status | Working implementation | Shopify preview | Source | Screenshots | Case study | Tests | Demo script |
|---|---|---|---|---|---|---|---|---|
| Phase 0 infrastructure | Complete | Yes | Verified unpublished theme | Yes | Not applicable | Not applicable | Theme Check + remote upload | Not applicable |
| Custom comparison section | Complete | Yes | Verified unpublished theme | Yes | Desktop, mobile, [editor](../shopify/assets/phase-1-theme-editor.png) | Yes | Theme Check + browser matrix | Yes |
| Advanced PDP | Complete | Yes | Verified unpublished product preview | Yes | [Desktop, mobile, variant](../shopify/advanced-pdp.md) | Yes | Theme Check + browser matrix | Yes |
| Bug Fix Lab | **Complete evidence** | Yes — 3 fixes | Verified unpublished product/cart previews | Yes | Three [before/after pairs](../shopify/bug-fix-lab.md), pre-fix states labeled as later reconstructions | Yes | Theme Check + browser matrix | Yes |
| Product configurator | **Incomplete evidence** | Yes | Verified unpublished product preview | Yes | [Desktop/mobile/cart](../shopify/product-configurator.md); flow recording missing | Yes | Theme Check + browser matrix | Script and captured-state clip only |
| Quantity/purchase logic | Implementation complete; sequence gate open | Yes | Verified unpublished Theme Editor preview and native cart flow | Yes | [Mobile calculator](../shopify/assets/phase-5-mobile-calculator.png) plus task cart capture | Yes | Theme Check + calculation/cart matrix | Yes |
| Cart engineering | Implementation complete; sequence gate open | Yes | Verified unpublished PDP and mobile Theme Editor flow | Yes | [Mobile drawer](../shopify/assets/phase-6-mobile-cart.png) plus task captures | Yes | Theme Check + AJAX cart matrix | Yes |
| Quality evidence | Complete | Yes | Verified unpublished home/product/collection previews | Yes | Authenticated browser session | Yes | Theme Check + 9 Lighthouse runs + accessibility matrix + CI | Reproduction guide |
| Portfolio packaging | **Incomplete strict gate** | Yes | Six authenticated preview routes | Yes | Six fresh storefront captures plus additions | Six concise proof pages | Link/asset gate | Six captured-state clips; flow recording missing |
| Integration Lab | Functional development proof; hard prerequisite open | Yes | Embedded app verified; active CLI preview required | Yes | Three real admin captures | Yes | Typecheck, five unit tests, PostgreSQL integration, lint, build, live GraphQL/webhooks | 18-second screenshot walkthrough |

## Verified evidence

- Shopify CLI 4.8.0 executed locally on 2026-09-17.
- Shopify Skeleton theme initialized under `theme/`.
- Shopify account authenticated against the Oniel Lab development store.
- Strict upload created unpublished theme `Shopify Commerce Lab` (`155175092398`).
- The unpublished Skeleton preview rendered successfully before Phase 1 began.
- `shopify theme check --path theme` inspected 40 theme files with zero offenses after Phase 1.
- Product Comparison rendered in the real storefront and Shopify Theme Editor.
- Desktop and mobile screenshots are stored under `docs/screenshots/`.
- Theme Editor schema controls and live preview updates were verified in the authenticated editor.
- Atlas Insulated Bottle exists as a real six-variant Shopify product with assigned variant media and inventory.
- Advanced PDP variant, price, media, availability, URL, Ajax cart, metafield, and metaobject behavior was verified remotely.
- Phase 2 now has durable [mobile](../shopify/assets/phase-2-mobile.png) and [variant](../shopify/assets/phase-2-variant-interaction.png) captures.
- Phase 3 reproduced and fixed a stale AJAX cart count, missing cart variant details, and an invalid empty-cart checkout state.
- Phase 3's before/after pairs are durable. The before images were captured on 2026-09-19 from pre-fix source commit `31191e6` in a separate unpublished draft theme; fix source is commit `049ab5c`.
- Atlas Personalized Bottle exists as a real Shopify product with the duplicated six-variant matrix and assigned media.
- Phase 4 verifies structured personalization, invalid states, live preview, merchant settings, responsive behavior, correct Navy / 32 oz selection, and four line-item properties rendered in cart.
- Phase 4 has durable [mobile](../shopify/assets/phase-4-personalized-mobile.png) and [cart-property](../shopify/assets/phase-4-personalized-cart.png) captures; a genuine configuration-flow recording remains missing.
- Phase 5 verifies whole-case ceiling logic, calculation transparency, range validation, variant availability, and native cart submission with the computed quantity.
- The verified 125-bottle, 10%-reserve flow submitted 12 Navy / 32 oz cases, produced a $480 cart subtotal, and preserved all four calculation properties.
- Phase 5 mobile Theme Editor and cart captures are preserved as authenticated task deliverables.
- Phase 6 verifies AJAX add, button and typed quantity updates, removal, subtotal/count synchronization, variant and property rendering, loading, real inventory errors, empty state, and a configurable shipping goal.
- Phase 6 populated, error, empty, corrected-layout, and final mobile captures are preserved as authenticated task deliverables.
- Phase 7 ran Theme Check at warning severity with 45 files and zero offenses, with no suppressions.
- Phase 7 preserved all nine Lighthouse runs in a sanitized matrix and reports medians for home, product, and collection instead of selecting a best run.
- Phase 7 repaired ARIA semantics, contrast, touch-target, image-delivery, metadata, eager-loading, and shipping-copy consistency findings.
- Phase 7 verified keyboard order, visible focus, native-dialog focus management, focus wrapping, Escape restoration, and focused live error messaging in the authenticated storefront.
- Phase 7 added push/PR CI for official Shopify Theme Check and repository quality invariants.
- Phase 8 packages the major proof into one focused hub with six concise pages, six fresh screenshots, six short H.264 clips, verified live routes, direct code links, testing records, and explicit job mappings.
- Phase 9 installed Inventory Sync Monitor in the development store. Real Admin GraphQL inventory correction, inventory/product webhooks, retry recovery, no-op self-write event, and PostgreSQL persistence are documented in the [case study](../case-studies/inventory-sync-monitor.md).
- The public GitHub repository exists; the [hosted quality run](https://github.com/XonkelX/shopify-commerce-lab/actions/runs/35472771079) passed Theme Check, repository checks, and app-specific clean install/typecheck/lint/unit tests/build. This does not imply production hosting.

For authoritative strict statuses and closure criteria, see the [acceptance audit](strict-acceptance-audit.md).

## Tooling limitation

Shopify CLI 4.8.0 rejects the same storefront password that successfully unlocks the browser storefront. This matches a documented Shopify CLI issue. The project therefore uses `theme push --strict` to an unpublished theme for preview verification and records the limitation rather than claiming hot reload works.
