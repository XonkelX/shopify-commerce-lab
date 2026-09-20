# Variant-aware product page

Color and size changes stay aligned with the selected Shopify variant, media, price, availability, URL, and cart.

![Atlas Insulated Bottle advanced product page](assets/advanced-pdp.png)

## What this proves

- All six Color/Size combinations use real Shopify variants, including a sold-out state that cannot be purchased.
- Variant imagery, price, URL state, Ajax add-to-cart, and structured metafield/metaobject content were checked together.

## Implementation and verification

- **Shopify stack:** Liquid, JavaScript, variants, Ajax Cart API, metafields, metaobjects.
- **Verified:** six-variant matrix, sold-out handling, correct cart variant, structured product data, and desktop/mobile behavior. [Test notes](../test-results/phase-2-advanced-pdp.md).
- **Code:** [product section](../../theme/sections/product.liquid) · [product template](../../theme/templates/product.json).
- **Additional evidence:** [mobile page](assets/phase-2-mobile.png) · [selected Navy / 32 oz variant](assets/phase-2-variant-interaction.png) · [detailed case study](../case-studies/advanced-product-page.md) · [captured-state clip](assets/advanced-pdp-demo.mp4) (not a live interaction recording).

## Preview and limits

[Open the product preview](https://oniel-lab.myshopify.com/products/atlas-insulated-bottle?preview_theme_id=155175092398) — development-store access may be required. The evidence shows technical behavior, not conversion or merchant outcomes.

Relevant work: PDP changes, variant bugs, media synchronization, metafield content, and contained Ajax cart work. [See all Shopify evidence](README.md).
