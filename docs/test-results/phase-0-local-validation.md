# Phase 0 Local Validation

Date: 2026-09-17  
Environment: Windows, Node.js 22.23.2, npm 11.10.1, Shopify CLI 4.8.0

## Commands and results

| Check | Command | Result |
|---|---|---|
| Node runtime | `node --version` | PASS — v22.23.2 |
| npm runtime | `npm --version` | PASS — 11.10.1 |
| Shopify CLI | `shopify version` | PASS — 4.8.0 |
| Theme scaffold | `shopify theme init theme --path shopify-commerce-lab` | PASS — Shopify Skeleton theme cloned |
| Theme lint | `shopify theme check --path theme` | PASS — 39 files inspected, 0 offenses |
| Shopify account authentication | `shopify store list` | PASS — Oniel Lab development store listed |
| Strict unpublished upload | `shopify theme push --unpublished --strict` | PASS — theme `155175092398` created |
| Development-store preview | Unpublished preview in browser | PASS — Skeleton theme rendered on Oniel Lab |
| Local hot reload | `shopify theme dev` | KNOWN LIMITATION — CLI rejects valid storefront password |

## Interpretation

The local toolchain, authenticated development store, strict upload, and unpublished browser preview are verified. Shopify CLI 4.8.0 rejects the valid storefront password for `theme dev` on this Windows environment; the password was independently verified against the storefront. The safe fallback workflow is strict upload to an unpublished theme, preview verification, and publish only after approval.

