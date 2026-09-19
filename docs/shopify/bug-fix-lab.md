# Bug Fix Lab

**Problem proved:** Three concrete storefront defects were reproduced, traced to their root causes, fixed with minimal changes, and regression-tested.

**Screenshot:** Verified repaired cart state.

![Cart showing the selected Sage and 20 oz variant after the repair](assets/bug-fix-lab.png)

| Defect | Before — reconstructed pre-fix theme | After — repaired theme |
|---|---|---|
| AJAX cart count | [Add succeeded](assets/phase-3-before-ajax-count.jpg) · [header still showed 2](assets/phase-3-before-ajax-stale-header.jpg) while the cart contained 3 | [Count updates after AJAX add](assets/phase-3-after-ajax-count.png) |
| Missing variant identity | [Cart row showed only the product title](assets/phase-3-before-variant-cart.jpg); two different variant IDs were present | [Selected options shown per line](assets/phase-3-after-variant-cart.png) |
| Invalid empty cart | [Empty cart still offered Checkout](assets/phase-3-before-empty-cart.jpg) | [Empty state with recovery link, no Checkout](assets/phase-3-after-empty-cart.png) |

The before images were captured on 2026-09-19 from a separate **unpublished reconstruction** of source commit `31191e6` (`049ab5c^`, theme ID `155226570926`). They are not historical screenshots from the original repair date. The after images show the later repaired evidence theme (`155175092398`); intervening presentation work means these are behavioral, not pixel-matched, comparisons. [Technical reconstruction and checks](../test-results/phase-3-bug-fix-lab.md).

- **Live demo:** [Open the repaired cart route](https://oniel-lab.myshopify.com/cart?preview_theme_id=155175092398)
- **Short demo video:** [Watch the 7-second captured-state walkthrough](assets/bug-fix-lab-demo.mp4) (not a before/after recording).
- **Technologies:** Liquid, JavaScript, Shopify Ajax Cart API, conditional rendering, cart sections.
- **Testing status:** Three source-backed before/after cases PASS; the development-store preview is access-gated. [Validation matrix](../test-results/phase-3-bug-fix-lab.md)
- **Relevant code:** [Header/cart-count repair](../../theme/sections/header.liquid) · [Cart rendering repairs](../../theme/sections/cart.liquid)
- **Jobs supported:** Liquid debugging, inherited-theme troubleshooting, cart-state bug fixes, variant display repairs, empty-state repairs.

[Detailed case study](../case-studies/bug-fix-lab.md) · [Back to Shopify evidence](README.md)
