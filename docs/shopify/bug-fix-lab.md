# Bug Fix Lab

**Problem proved:** Three concrete storefront defects were reproduced, traced to their root causes, fixed with minimal changes, and regression-tested.

**Screenshot:** Verified repaired cart state.

![Cart showing the selected Sage and 20 oz variant after the repair](assets/bug-fix-lab.png)

**After-state evidence:** [AJAX count](assets/phase-3-after-ajax-count.png) · [variant details](assets/phase-3-after-variant-cart.png) · [mobile empty cart](assets/phase-3-after-empty-cart.png). The three matching before-state images are not in this repository, so the strict before/after evidence gate remains open.

- **Live demo:** [Open the repaired cart route](https://oniel-lab.myshopify.com/cart?preview_theme_id=155175092398)
- **Short demo video:** [Watch the 7-second captured-state walkthrough](assets/bug-fix-lab-demo.mp4) (not a before/after recording).
- **Technologies:** Liquid, JavaScript, Shopify Ajax Cart API, conditional rendering, cart sections.
- **Testing status:** Functional fixes PASS; strict evidence INCOMPLETE until all three before-state captures are durable. [Validation matrix](../test-results/phase-3-bug-fix-lab.md)
- **Relevant code:** [Header/cart-count repair](../../theme/sections/header.liquid) · [Cart rendering repairs](../../theme/sections/cart.liquid)
- **Jobs supported:** Liquid debugging, inherited-theme troubleshooting, cart-state bug fixes, variant display repairs, empty-state repairs.

[Detailed case study](../case-studies/bug-fix-lab.md) · [Back to Shopify evidence](README.md)
