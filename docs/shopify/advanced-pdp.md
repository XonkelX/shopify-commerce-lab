# Advanced PDP

**Problem proved:** Product choices stay synchronized across selected variant, media, price, availability, URL, Ajax add-to-cart, and structured product content.

**Screenshot:** Verified unpublished storefront state.

![Atlas Insulated Bottle advanced product page](assets/advanced-pdp.png)

[Mobile page](assets/phase-2-mobile.png) · [Selected Navy / 32 oz variant with synchronized price and availability](assets/phase-2-variant-interaction.png)

- **Live demo:** [Open the Atlas product page](https://oniel-lab.myshopify.com/products/atlas-insulated-bottle?preview_theme_id=155175092398)
- **Short demo video:** [Watch the 8-second captured-state walkthrough](assets/advanced-pdp-demo.mp4) (not a live interaction recording).
- **Technologies:** Liquid, JavaScript, Shopify variants, Ajax Cart API, metafields, metaobjects, responsive media.
- **Testing status:** PASS — all six variant combinations, sold-out handling, media/price/URL synchronization, Ajax add, structured content, desktop, and mobile verified. [Validation matrix](../test-results/phase-2-advanced-pdp.md)
- **Relevant code:** [PDP section](../../theme/sections/product.liquid) · [Product template](../../theme/templates/product.json)
- **Jobs supported:** Product-page customization, variant bug fixes, media synchronization, metafield/metaobject content, contained Ajax add-to-cart.

[Detailed case study](../case-studies/advanced-product-page.md) · [Back to Shopify evidence](README.md)
