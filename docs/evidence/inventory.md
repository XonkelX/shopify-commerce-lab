# Evidence Inventory

Last updated: 2026-09-19

| Module | Status | Working implementation | Shopify preview | Source | Screenshots | Case study | Tests | Demo script |
|---|---|---|---|---|---|---|---|---|
| Phase 0 infrastructure | Complete | Yes | Verified unpublished theme | Yes | Not applicable | Not applicable | Theme Check + remote upload | Not applicable |
| Custom comparison section | Complete | Yes | Verified unpublished theme | Yes | Desktop, mobile, editor session | Yes | Theme Check + browser matrix | Yes |
| Advanced PDP | Complete | Yes | Verified unpublished product preview | Yes | Authenticated desktop/mobile task captures | Yes | Theme Check + browser matrix | Yes |
| Bug Fix Lab | Complete | Yes — 3 fixes | Verified unpublished product/cart previews | Yes | Authenticated before/after task captures | Yes | Theme Check + browser matrix | Yes |
| Product configurator | Complete | Yes | Verified unpublished product preview | Yes | Authenticated desktop/mobile/editor/cart captures | Yes | Theme Check + browser matrix | Yes |
| Quantity/purchase logic | Complete | Yes | Verified unpublished Theme Editor preview and native cart flow | Yes | Authenticated mobile/editor/cart captures | Yes | Theme Check + calculation/cart matrix | Yes |
| Cart engineering | Complete | Yes | Verified unpublished PDP and mobile Theme Editor flow | Yes | Authenticated populated/error/empty/mobile captures | Yes | Theme Check + AJAX cart matrix | Yes |
| Quality evidence | Complete | Yes | Verified unpublished home/product/collection previews | Yes | Authenticated browser session | Yes | Theme Check + 9 Lighthouse runs + accessibility matrix + CI | Reproduction guide |
| Portfolio packaging | Complete | Yes | Six verified live routes | Yes | Six fresh storefront captures | Six concise proof pages | Link/asset gate | Six short proof clips |
| Integration Lab | Complete as development-store proof | Yes | Embedded app verified; active CLI preview required | Yes | Three real admin captures | Yes | Typecheck, five unit tests, PostgreSQL integration, lint, build, live GraphQL/webhooks | 18-second screenshot walkthrough |

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
- The Phase 2 desktop storefront and mobile Theme Editor captures are preserved as authenticated task deliverables.
- Phase 3 reproduced and fixed a stale AJAX cart count, missing cart variant details, and an invalid empty-cart checkout state.
- Phase 3 before/after browser captures are preserved as authenticated task deliverables; fix source is commit `049ab5c`.
- Atlas Personalized Bottle exists as a real Shopify product with the duplicated six-variant matrix and assigned media.
- Phase 4 verifies structured personalization, invalid states, live preview, merchant settings, responsive behavior, correct Navy / 32 oz selection, and four line-item properties rendered in cart.
- Phase 4 desktop, mobile, Theme Editor, and cart captures are preserved as authenticated task deliverables.
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
- The public GitHub repository now exists; the hosted [theme quality workflow](https://github.com/XonkelX/shopify-commerce-lab/actions/workflows/quality.yml) completed successfully. This does not imply app-specific CI or production hosting.

## Tooling limitation

Shopify CLI 4.8.0 rejects the same storefront password that successfully unlocks the browser storefront. This matches a documented Shopify CLI issue. The project therefore uses `theme push --strict` to an unpublished theme for preview verification and records the limitation rather than claiming hot reload works.
