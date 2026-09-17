# Phase 3 Bug Fix Lab — 75-Second Demo Script

1. **0–8 seconds:** Introduce three reproduced defects in the unpublished Shopify theme. State that the examples are independent technical work.
2. **8–25 seconds:** Show an AJAX add success while the original header count remains stale. Explain that the handler never fetched updated cart state. Switch to the fixed build, add once, and show the badge change in the same document.
3. **25–45 seconds:** Show the original cart with two identical “Atlas Insulated Bottle” rows. Explain that `item.options_with_values` was omitted. Show the repaired cart with Color, Size, price, and variant-specific Remove labels.
4. **45–62 seconds:** Show the original empty mobile cart exposing Checkout with no explanation. Show the new zero-item Liquid branch with an empty message and Continue shopping, then confirm Checkout is absent.
5. **62–75 seconds:** Open commit `049ab5c`, point to the three relevant source files, and close with Theme Check: 40 files, zero offenses.

Suggested closing: “These examples demonstrate reproduction, root-cause analysis, minimal Shopify-specific fixes, and remote verification—not hypothetical debugging ability.”

