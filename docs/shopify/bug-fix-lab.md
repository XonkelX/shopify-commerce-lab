# Bug Fix Lab

**Problem proved:** Three concrete storefront defects were reproduced, traced to their root causes, fixed with minimal changes, and regression-tested.

**Screenshot:** Verified repaired cart state.

![Cart showing the selected Sage and 20 oz variant after the repair](assets/bug-fix-lab.png)

- **Live demo:** [Open the repaired cart route](https://oniel-lab.myshopify.com/cart?preview_theme_id=155175092398)
- **Short demo video:** [Watch the 7-second repair-state walkthrough](assets/bug-fix-lab-demo.mp4)
- **Technologies:** Liquid, JavaScript, Shopify Ajax Cart API, conditional rendering, cart sections.
- **Testing status:** PASS — stale cart badge, hidden variant details, and invalid empty-cart checkout state each have reproduction and post-fix checks. [Validation matrix](../test-results/phase-3-bug-fix-lab.md)
- **Relevant code:** [Header/cart-count repair](../../theme/sections/header.liquid) · [Cart rendering repairs](../../theme/sections/cart.liquid)
- **Jobs supported:** Liquid debugging, inherited-theme troubleshooting, cart-state bug fixes, variant display repairs, empty-state repairs.

[Detailed case study](../case-studies/bug-fix-lab.md) · [Back to Shopify evidence](README.md)
