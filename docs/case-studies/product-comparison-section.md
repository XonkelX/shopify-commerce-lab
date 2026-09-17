# Product Comparison Section

## Problem proved

Merchants frequently need a reusable way to compare related products without editing Liquid for every campaign. This module proves the ability to build an Online Store 2.0 section with merchant-controlled content, Shopify product fallbacks, reorderable blocks, responsive behavior, and accessible structure.

## Working evidence

- [Unpublished Shopify preview](https://oniel-lab.myshopify.com/?preview_theme_id=155175092398) — password protected
- [Section source](../../theme/sections/product-comparison.liquid)
- [Homepage JSON configuration](../../theme/templates/index.json)
- [Desktop screenshot](../screenshots/phase-1-desktop.png)
- [Mobile screenshot](../screenshots/phase-1-mobile.png)
- Theme Editor verification: the real editor displayed the section, its three reorderable blocks, and all schema controls. A temporary heading edit updated the embedded preview and was then undone.

## Implementation

The section supports up to four comparison-item blocks. Merchants can add, remove, reorder, or hide blocks and configure:

- a Shopify product or manual display content;
- product image or image override;
- badge, title, displayed price, and CTA;
- three shared feature labels with per-item values;
- desktop columns, image ratio, alignment, colors, radius, and spacing.

When a Shopify product is selected, the title, image, price, and URL fall back to real product data unless an override is provided. The demo uses clearly labeled independent-project content because the development store does not yet contain production products.

On narrow screens, cards become a horizontally scrollable, snap-aligned comparison row. The page itself does not overflow horizontally.

## Testing

- Shopify Theme Check: 40 files, zero offenses.
- Strict upload to unpublished theme succeeded.
- Desktop visual check: 1440 × 1100.
- Mobile visual check: 390 × 844.
- Three images loaded at their natural 724 × 724 size.
- Mobile comparison row: 378 px viewport area, 991 px scrollable content, three cards, `overflow-x: auto`.
- Document width remained 390 px at the 390 px viewport.
- Browser console: zero errors; one Shopify-hosted unused-preload warning unrelated to the section.
- Theme Editor live-update behavior verified and temporary test change undone.

See [Phase 1 test results](../test-results/phase-1-product-comparison.md) for the complete matrix.

## Known limitations

- The current development store has no finished product catalog, so the visual demo uses local independent-project assets and manual display values.
- CTA links currently point to the store collection page; a merchant would select real product links or products in the editor.
- The section compares three fixed feature rows. A future module could support a dynamic feature model, but that is outside this small-section scope.
- Shopify CLI 4.8.0 rejects the valid storefront password for `theme dev` on this Windows environment. The verified workflow uses strict upload to an unpublished theme and the remote preview instead.

## Jobs supported

- Small custom Shopify sections
- Liquid section edits
- Theme Editor configurable homepage sections
- Responsive Shopify section fixes
- Product comparison UI implementation

## Demo script

Use the [60-second demo script](../evidence/phase-1-demo-script.md).

