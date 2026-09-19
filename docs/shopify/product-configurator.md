# Product Configurator

**Problem proved:** A personalized product can validate custom choices, keep them synchronized with real variants, and preserve the configuration as visible cart properties.

**Screenshot:** Verified unpublished storefront state.

![Personalized bottle configurator with engraving, gift note, and live summary](assets/product-configurator.png)

[Configured mobile page](assets/phase-4-personalized-mobile.png) · [Real cart line-item properties](assets/phase-4-personalized-cart.png)

- **Live demo:** [Open the personalized bottle configurator](https://oniel-lab.myshopify.com/products/atlas-personalized-bottle?preview_theme_id=155175092398&view=personalized)
- **Short demo video:** [Watch the 8-second captured-state walkthrough](assets/product-configurator-demo.mp4). A full recorded configuration flow remains outstanding.
- **Technologies:** Liquid, JavaScript, Shopify variants, line-item properties, Ajax Cart API, section schema.
- **Testing status:** Functional flow PASS — valid/invalid inputs, live preview, variant/media state, merchant settings, responsive layout, Ajax add, and four cart-persistent properties verified. The required flow-video evidence is incomplete. [Validation matrix](../test-results/phase-4-product-configurator.md)
- **Relevant code:** [Configurator section](../../theme/sections/product-configurator.liquid) · [Personalized product template](../../theme/templates/product.personalized.json)
- **Jobs supported:** Product configurator, product personalization, advanced option logic, line-item property capture.

[Detailed case study](../case-studies/product-configurator.md) · [Back to Shopify evidence](README.md)
