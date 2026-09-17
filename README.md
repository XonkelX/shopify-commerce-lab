# Shopify Commerce Lab

Shopify Commerce Lab is an independent technical project for building small, inspectable Shopify storefront modules. Its purpose is to provide verifiable evidence for theme-development work without implying client results, production traffic, or commercial outcomes.

## What it will prove

Each completed module will pair real Shopify behavior with source code, testing notes, screenshots, a concise case study, and a short demo script. Work advances one phase at a time; a later module is not started until the current module satisfies its acceptance criteria.

## Current status

- Phase 0 — **INCOMPLETE**
- Local Shopify CLI: 4.8.0
- Base theme: Shopify Skeleton theme
- Local Theme Check: 39 files inspected, 0 offenses
- Shopify account and development-store preview: not yet connected or verified
- Client-facing evidence modules: none yet

No paid Shopify job category is marked ready from this repository yet. The local tooling and documentation exist, but the development workflow cannot pass its remote-store gate until a Shopify account authorizes the CLI and a development store is selected.

## Live preview

Not available yet. A shareable preview will be added only after the Shopify CLI is authenticated against a development store and the preview is verified.

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

None yet. Phase 1 will add the first case study only after a custom section works in a real Shopify Theme Editor and all required evidence has been captured.

## Supported job categories

None marked **READY** yet. See [`docs/evidence/job-mapping.md`](docs/evidence/job-mapping.md).

## Attribution

The starter theme under `theme/` was generated with Shopify CLI from Shopify's open-source Skeleton theme. Project-specific evidence and modules will be clearly distinguished from upstream starter code.

