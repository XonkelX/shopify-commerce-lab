# Cart and whole-case purchase logic

The calculator converts customer demand into whole purchasable cases, while the AJAX cart displays Shopify-authoritative quantities and totals.

![Case calculator converting 125 bottles plus reserve into 12 cases](assets/cart-purchase-logic.png)

## What this proves

- Transparent ceiling math turns requested bottles plus reserve allowance into an exact whole-case cart quantity.
- Cart quantity changes, removal, line-item properties, subtotal, shipping progress, loading, error, and empty states stay in sync.

## Implementation and verification

- **Shopify stack:** Liquid, JavaScript, variants, Ajax Cart API, section rendering, native dialog.
- **Verified:** exact/round-up boundaries, invalid ranges, sold-out blocking, quantity-12 cart submission, server-authoritative updates, inventory error recovery, mobile, and keyboard behavior. [Calculator tests](../test-results/phase-5-purchase-logic.md) · [cart tests](../test-results/phase-6-cart-engineering.md).
- **Code:** [calculator](../../theme/sections/purchase-logic-calculator.liquid) · [AJAX drawer](../../theme/sections/cart-drawer.liquid) · [product template](../../theme/templates/product.case-calculator.json).
- **Additional evidence:** [mobile calculator](assets/phase-5-mobile-calculator.png) · [mobile drawer](assets/phase-6-mobile-cart.png) · [purchase case study](../case-studies/purchase-logic-calculator.md) · [cart case study](../case-studies/cart-engineering.md) · [captured-state clip](assets/cart-purchase-logic-demo.mp4) (not a live interaction recording).

## Preview and limits

[Open the case calculator preview](https://oniel-lab.myshopify.com/products/atlas-insulated-bottle?preview_theme_id=155175092398&view=case-calculator) — development-store access may be required. The module handles whole-case purchases, not bundles, subscriptions, or dynamic checkout pricing.

Relevant work: fixed-pack calculators, non-standard purchase rules, and AJAX cart repairs. [See all Shopify evidence](README.md).
