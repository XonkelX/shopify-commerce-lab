# Evidence Inventory

Last updated: 2026-09-17

| Module | Status | Working implementation | Shopify preview | Source | Screenshots | Case study | Tests | Demo script |
|---|---|---|---|---|---|---|---|---|
| Phase 0 infrastructure | Complete | Yes | Verified unpublished theme | Yes | Not applicable | Not applicable | Theme Check + remote upload | Not applicable |
| Custom comparison section | Complete | Yes | Verified unpublished theme | Yes | Desktop, mobile, editor session | Yes | Theme Check + browser matrix | Yes |
| Advanced PDP | Complete | Yes | Verified unpublished product preview | Yes | Authenticated desktop/mobile task captures | Yes | Theme Check + browser matrix | Yes |
| Bug Fix Lab | Complete | Yes — 3 fixes | Verified unpublished product/cart previews | Yes | Authenticated before/after task captures | Yes | Theme Check + browser matrix | Yes |
| Product configurator | Not started | No | No | No | No | No | No | No |
| Quantity/purchase logic | Not started | No | No | No | No | No | No | No |
| Cart engineering | Not started | No | No | No | No | No | No | No |
| Quality evidence | Not started | No | No | No | No | No | No | No |
| Portfolio packaging | Not started | No | No | No | No | No | No | No |
| Integration Lab | Not started | No | No | No | No | No | No | No |

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

## Tooling limitation

Shopify CLI 4.8.0 rejects the same storefront password that successfully unlocks the browser storefront. This matches a documented Shopify CLI issue. The project therefore uses `theme push --strict` to an unpublished theme for preview verification and records the limitation rather than claiming hot reload works.
