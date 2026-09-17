# Evidence Inventory

Last updated: 2026-09-17

| Module | Status | Working implementation | Shopify preview | Source | Screenshots | Case study | Tests | Demo script |
|---|---|---|---|---|---|---|---|---|
| Phase 0 infrastructure | Complete | Yes | Verified unpublished theme | Yes | Not applicable | Not applicable | Theme Check + remote upload | Not applicable |
| Custom comparison section | Complete | Yes | Verified unpublished theme | Yes | Desktop, mobile, editor session | Yes | Theme Check + browser matrix | Yes |
| Advanced PDP | Not started | No | No | No | No | No | No | No |
| Bug Fix Lab | Not started | No | No | No | No | No | No | No |
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

## Tooling limitation

Shopify CLI 4.8.0 rejects the same storefront password that successfully unlocks the browser storefront. This matches a documented Shopify CLI issue. The project therefore uses `theme push --strict` to an unpublished theme for preview verification and records the limitation rather than claiming hot reload works.
