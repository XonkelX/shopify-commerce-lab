# Phase 7 Quality Evidence

Test date: 2026-09-17 local / 2026-09-18 UTC  
Theme: `Shopify Commerce Lab` (`155175092398`, unpublished)  
Store: `oniel-lab.myshopify.com`

## Theme Check

Command:

```powershell
shopify theme check --path theme --fail-level warning
```

Result: **45 files inspected, 0 errors, 0 warnings, 0 offenses**. The theme contains no Theme Check disable/enable comments and no `.theme-check.yml` suppressions.

## Lighthouse methodology

- Lighthouse `12.8.2`, invoked by the pinned version in `scripts/run-lighthouse.ps1`.
- Chrome `153.0.8010.47`, Node `v22.23.2`, Windows `10.0.26200.0`.
- Lighthouse mobile defaults with simulated throttling.
- Three independent runs per page against the unpublished evidence theme.
- Pages: `/`, `/products/atlas-insulated-bottle`, and `/collections/all`.
- The private store required a fresh signed preview query. The query was used at runtime, excluded from the sanitized result, and not committed.
- Medians are reported. No run was discarded.
- Raw reports remain under the gitignored `output/lighthouse/`; the complete sanitized run matrix appears below.

### Median results

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 91 | 96 | 75 | 100 | 2,930 ms | 122 ms | 0.003 |
| Product | 70 | 96 | 75 | 100 | 5,483 ms | 252 ms | 0.000 |
| Collection | 93 | 95 | 75 | 100 | 2,027 ms | 253 ms | 0.000 |

### All runs

| Page | Run | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | 1 | 87 | 96 | 75 | 100 | 2,930 ms | 252 ms | 0.003 |
| Home | 2 | 92 | 96 | 75 | 100 | 2,779 ms | 122 ms | 0.003 |
| Home | 3 | 91 | 96 | 75 | 100 | 3,018 ms | 97 ms | 0.003 |
| Product | 1 | 70 | 96 | 75 | 100 | 5,483 ms | 334 ms | 0.000 |
| Product | 2 | 92 | 96 | 75 | 100 | 2,174 ms | 252 ms | 0.000 |
| Product | 3 | 65 | 96 | 75 | 100 | 6,537 ms | 0 ms | 0.000 |
| Collection | 1 | 74 | 95 | 75 | 100 | 5,327 ms | 253 ms | 0.000 |
| Collection | 2 | 96 | 95 | 75 | 100 | 2,027 ms | 178 ms | 0.000 |
| Collection | 3 | 93 | 95 | 75 | 100 | 2,025 ms | 264 ms | 0.000 |

## Accessibility verification

Lighthouse/axe and an authenticated browser pass were used together. Automation is evidence, not a claim of complete accessibility conformance.

| Check | Result | Evidence |
|---|---|---|
| Semantic structure | Pass with preview limitation | One H1 on the PDP; H2 product details/warranty; definition-list product data; invalid list roles removed. |
| Form labels | Pass | Color and size fieldsets, quantity label, named radios, named media controls, and named add button exposed in the accessibility tree. |
| Keyboard order | Pass | Header, three media controls, one control per radio group, quantity, add button, and footer links followed a logical Tab order. |
| Visible focus | Pass | Custom media, quantity, and add controls displayed 3 px focus outlines; native controls retained browser focus indication. |
| Dialog/drawer | Pass | Native `dialog` opened with focus on Close, Shift+Tab wrapped to Checkout, Escape closed it, and focus returned to `Cart, 4 items`. |
| Error messaging | Pass | Quantity `0` produced `Enter a quantity of 1 or more.`, applied the error class, remained in a polite status region, and moved focus to the message. |
| Contrast | Pass for theme-owned audited nodes | The two PDP warranty contrast failures found in the first pass were repaired; final reports contain no theme-owned contrast failure. |
| Responsive coverage | Pass at lab level | Lighthouse used mobile emulation; prior phase browser matrices cover authenticated desktop/mobile flows. |

## Issues found and repaired

1. Replaced incompatible `role=list/listitem` usage on semantic articles and changed PDP media controls to a valid named group.
2. Increased warranty text contrast after Lighthouse measured ratios of 4.22:1 and 4.49:1.
3. Increased collection link target height to 44 px and corrected the responsive grid minimum.
4. Increased collection image delivery from 400 px to 800 px.
5. Added fallback meta descriptions, raising home and collection SEO from 92 to 100.
6. Marked only the selected PDP image eager/high-priority; hidden gallery images are now lazy.
7. Reconciled the PDP promise with the cart's merchant-configured `$75` shipping goal.

## Known issues and interpretation

- The remaining automated accessibility failure is the Shopify-injected unpublished-preview bar iframe, which has no title. Theme source cannot set attributes on this platform-owned iframe.
- Best Practices remains 75 because the private preview loads Shopify/Shop account third-party cookies, reports their cookie issues, and requests a missing `/favicon.ico` that logs a 404. These are disclosed rather than suppressed.
- Product performance is the weakest and most variable result (65–92; median 70). The remaining risk is primarily LCP under simulated mobile throttling and merits a future production-like image/network profile.
- Collection run 1 was materially slower than runs 2–3. It remains in the data and median; no outlier was removed.
- These are lab measurements on a password-protected unpublished preview. They are not field Core Web Vitals and do not claim production-user performance.

## CI scope

`.github/workflows/quality.yml` runs Shopify's official Theme Check action at warning severity and a Windows structural-quality job on every push and pull request. Lighthouse is intentionally local, not CI: the store is password protected and the signed preview query expires, so a CI job would be flaky or require storing access material for little evidence benefit.

This local repository currently has no Git remote, so the workflow is configured and inspectable but has not yet produced a hosted GitHub Actions run. The equivalent local Phase 7 gate passed.
