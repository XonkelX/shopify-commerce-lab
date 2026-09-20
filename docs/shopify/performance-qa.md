# Shopify theme quality and release checks

Theme quality is measured repeatably, defects are repaired, and the remaining limits stay visible.

![Verified collection route used in the storefront QA matrix](assets/performance-qa.png)

## What this proves

- Theme Check and automated repository checks run on push and pull request.
- Lighthouse, keyboard, focus, dialog, form-error, contrast, touch-target, and responsive-image checks have reproducible notes.

## Implementation and verification

- **Shopify stack:** Theme Check, Lighthouse, Liquid, PowerShell, GitHub Actions, accessible native dialog patterns.
- **Verified:** 45 theme files with zero Theme Check offenses; nine Lighthouse runs reported as three-run medians rather than a cherry-picked run; manual and automated accessibility checks. [Quality matrix](../test-results/phase-7-quality.md).
- **Code:** [CI workflow](../../.github/workflows/quality.yml) · [local quality gate](../../scripts/verify-phase-7.ps1) · [responsive image snippet](../../theme/snippets/image.liquid).
- **Additional evidence:** [technical case study](../case-studies/quality-engineering.md) · [reproduction guide](../evidence/phase-7-reproduction.md) · [captured-state clip](assets/performance-qa-demo.mp4) (not a live QA run).

## Preview and limits

[Open the verified collection route](https://oniel-lab.myshopify.com/collections/all?preview_theme_id=155175092398) — development-store access may be required. Lab Lighthouse scores do not claim production field Core Web Vitals or full WCAG conformance.

Relevant work: contained theme QA, performance investigation, accessibility repair, and quality automation. [See all Shopify evidence](README.md).
