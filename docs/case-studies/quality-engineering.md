# Storefront Quality Engineering

![Verified Shopify collection route used in the quality matrix](../shopify/assets/performance-qa.png)

## Problem and outcome

The Shopify theme needs repeatable static, performance, responsive, and accessibility checks before handoff. This audit records the checks, repairs, and remaining limits.

## Approach

I ran Theme Check at warning severity, created a pinned Lighthouse runner that executes three audits each for home/product/collection, and combined Lighthouse/axe results with manual browser checks. Findings were fixed in the existing modules instead of adding a new storefront feature.

## Improvements delivered

- Corrected invalid ARIA list semantics in the comparison and product-media UI.
- Repaired two borderline text-contrast failures.
- Improved collection touch targets, responsive layout, and image resolution.
- Added fallback meta descriptions.
- Reduced PDP image contention by making hidden gallery media lazy.
- Made shipping-goal copy consistent across PDP and cart.
- Added CI for official Theme Check plus structural/schema/accessibility invariants.

## Evidence

Theme Check finished with 45 files and zero offenses. Three-run Lighthouse medians were 91/96/75/100 on home, 70/96/75/100 on product, and 93/95/75/100 on collection. Keyboard QA confirmed focus order, visible focus, native-dialog management, focus wrapping, Escape restoration, and announced/focused validation errors.

See [the full result matrix](../test-results/phase-7-quality.md) and [reproduction guide](../evidence/phase-7-reproduction.md).

## Limitations

The remaining accessibility flag is caused by Shopify's injected preview-bar iframe. Best Practices is affected by private-preview account/cookie diagnostics and a missing favicon request. Product LCP is still variable under simulated mobile throttling. The report keeps all runs and states these limits explicitly.
