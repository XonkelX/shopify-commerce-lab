# Shopify Commerce Lab

Shopify Commerce Lab is an independent technical project for building small, inspectable Shopify storefront modules. Its purpose is to provide verifiable evidence for theme-development work without implying client results, production traffic, or commercial outcomes.

## What it will prove

Each completed module will pair real Shopify behavior with source code, testing notes, screenshots, a concise case study, and a short demo script. Work advances one phase at a time; a later module is not started until the current module satisfies its acceptance criteria.

## Current status

- Phase 0 — **COMPLETE**
- Phase 1 — **COMPLETE**
- Phase 2 — **COMPLETE**
- Phase 3 — **COMPLETE**
- Phase 4 — **COMPLETE**
- Phase 5 — **COMPLETE**
- Local Shopify CLI: 4.8.0
- Base theme: Shopify Skeleton theme
- Current Theme Check: 44 files inspected, 0 offenses
- Shopify development store: Oniel Lab
- Unpublished evidence theme: Shopify Commerce Lab, theme ID `155175092398`
- Completed client-facing modules: Product Comparison Section, Advanced Product Detail Page, Shopify Bug Fix Evidence Lab, Personalized Product Configurator, and Case Quantity Purchase Calculator

All modules are verified in a real Shopify Theme Editor and unpublished storefront preview. Phase 5 adds transparent whole-case ceiling logic, input limits, real variant availability, computed Shopify cart quantity, and calculation properties rendered in cart.

## Live preview

[Open the password-protected unpublished preview](https://oniel-lab.myshopify.com/?preview_theme_id=155175092398). The storefront password is intentionally not stored in this repository.

## Repository map

- [`theme/`](theme/) — Shopify Online Store 2.0 theme source, initialized from Shopify's Skeleton theme
- [`docs/case-studies/`](docs/case-studies/) — completed case studies only
- [`docs/evidence/`](docs/evidence/) — evidence inventory and job-to-proof mapping
- [`docs/screenshots/`](docs/screenshots/) — verified visual evidence only
- [`docs/test-results/`](docs/test-results/) — reproducible validation records
- [`scripts/`](scripts/) — repeatable project checks

## Development workflow

1. Work in an isolated development theme and branch.
2. Make the smallest scoped change.
3. Run `shopify theme check --path theme`.
4. Run `powershell -ExecutionPolicy Bypass -File scripts/verify-phase-0.ps1` for the infrastructure gate.
5. Test desktop and mobile behavior against the development store.
6. capture evidence and document limitations.
7. Share a preview for review before any publish or merge.
8. Preserve the prior theme as the rollback path.

See [`docs/development-workflow.md`](docs/development-workflow.md) for the safe-delivery checklist and [`docs/market-readiness.md`](docs/market-readiness.md) for the current evidence-based claims.

## Case studies

- [Product Comparison Section](docs/case-studies/product-comparison-section.md)
- [Advanced Product Detail Page](docs/case-studies/advanced-product-page.md)
- [Shopify Bug Fix Evidence Lab](docs/case-studies/bug-fix-lab.md)
- [Personalized Product Configurator](docs/case-studies/product-configurator.md)
- [Case Quantity Purchase Calculator](docs/case-studies/purchase-logic-calculator.md)

## Supported job categories

- Small custom Shopify sections
- Liquid section implementation and edits
- Theme Editor configurable homepage sections
- Responsive section/layout work
- Product-page and variant-state work
- Product media synchronization
- Metafield/metaobject storefront content
- AJAX add-to-cart work
- Liquid and storefront debugging
- Cart-state, variant-display, and empty-state fixes
- Contained product configurators and personalization interfaces
- Shopify line-item property implementation
- Advanced PDP selection and validation flows
- Fixed-pack, case, and purchase-quantity calculators
- Transparent whole-unit rounding and cart audit properties

See [`docs/evidence/job-mapping.md`](docs/evidence/job-mapping.md) for exact readiness labels and exclusions.

## Attribution

The starter theme under `theme/` was generated with Shopify CLI from Shopify's open-source Skeleton theme. Project-specific evidence and modules will be clearly distinguished from upstream starter code.
