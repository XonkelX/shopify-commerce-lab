# Personalized product configurator

A structured product form validates engraving and gift choices, then carries them with the correct Shopify variant into the cart.

![Personalized bottle configurator with engraving, gift note, and live summary](assets/product-configurator.png)

## What this proves

- Real Color/Size selection drives price, availability, media, and a live engraving preview.
- Personalization, engraving style, gift note, and gift wrap appear as Shopify line-item properties.

## Implementation and verification

- **Shopify stack:** Liquid, JavaScript, variants, line-item properties, Ajax Cart API, section schema.
- **Verified:** required and invalid-character errors, sold-out blocking, live preview, merchant settings, mobile layout, correct Navy / 32 oz cart variant, and four cart properties. [Test notes](../test-results/phase-4-product-configurator.md).
- **Code:** [configurator section](../../theme/sections/product-configurator.liquid) · [product template](../../theme/templates/product.personalized.json) · [cart property rendering](../../theme/sections/cart.liquid).
- **Additional evidence:** [mobile configurator](assets/phase-4-personalized-mobile.png) · [real cart properties](assets/phase-4-personalized-cart.png) · [detailed case study](../case-studies/product-configurator.md) · [captured-state clip](assets/product-configurator-demo.mp4).

## Preview and limits

[Open the configurator preview](https://oniel-lab.myshopify.com/products/atlas-personalized-bottle?preview_theme_id=155175092398&view=personalized) — development-store access may be required. The clip is a sequence of captured states, **not** a recorded end-to-end interaction. The latter remains an open strict evidence requirement. No image upload, dynamic surcharge, completed paid order, or client outcome is claimed.

Relevant work: contained personalization, unusual product-option forms, and line-item property capture. [See all Shopify evidence](README.md).
