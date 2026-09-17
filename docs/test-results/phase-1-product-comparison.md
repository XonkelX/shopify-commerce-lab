# Phase 1 Product Comparison Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`

| Area | Check | Result |
|---|---|---|
| Liquid/schema | Shopify Theme Check | PASS — 40 files, zero offenses |
| Remote delivery | Strict upload to unpublished theme | PASS |
| Storefront | Section renders in remote preview | PASS |
| Theme Editor | Section listed and selectable | PASS |
| Theme Editor | Heading, description, layout, color, spacing controls visible | PASS |
| Theme Editor | Blocks expose add, remove, reorder, and hide controls | PASS |
| Theme Editor | Temporary heading edit updated embedded preview | PASS — test change undone |
| Desktop | 1440 × 1100 visual review | PASS |
| Mobile | 390 × 844 visual review | PASS |
| Mobile | Comparison row scrolls horizontally | PASS — 378 px client width / 991 px scroll width |
| Mobile | Page-level horizontal overflow | PASS — document width equals 390 px viewport |
| Content | Three cards and all images load | PASS — 3 cards, images complete with natural width |
| Accessibility | Section heading labels region | PASS |
| Accessibility | Comparison items exposed as a list | PASS |
| Accessibility | Feature/value pairs use `dl`, `dt`, and `dd` | PASS |
| Accessibility | CTA focus style provided | PASS |
| Reduced motion | Hover transition disabled when requested | PASS |
| Browser console | Custom-code errors | PASS — zero errors |

## Browser note

One warning originated from Shopify's hosted customer-account pre-auth iframe preloading an unused sprite. It is not emitted by the comparison section.

## Regression found and fixed

The first remote screenshot revealed that the Skeleton theme's global `header` selector applied a fixed height and flex layout to the section's semantic `<header>`. The section wrapper was changed to a scoped `<div>`, then desktop and mobile screenshots were rerun successfully.

## Known limitations

- Demo content does not yet use real store products because the development catalog is unfinished.
- CTA destinations are collection placeholders.
- `shopify theme dev` hot reload remains blocked by a Shopify CLI password-validation defect; strict unpublished uploads are verified.

