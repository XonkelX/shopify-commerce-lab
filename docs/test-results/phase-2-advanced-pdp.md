# Phase 2 Advanced PDP Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`  
Product: Atlas Insulated Bottle, ID `9274328481966`

| Area | Check | Result |
|---|---|---|
| Liquid/schema | `shopify theme check --path theme` | PASS — 40 files, zero offenses |
| Remote delivery | Strict upload to unpublished theme | PASS |
| Theme Editor | Advanced product section loads on Default product | PASS |
| Desktop | Storefront visual review | PASS — two-column layout, gallery and controls readable |
| Mobile | Shopify mobile preview visual review | PASS — single-column layout, media and controls fit viewport |
| Initial state | Sage / 20 oz | PASS — $28, image 1, available, variant `49379141550254` |
| Color sync | Terracotta / 20 oz | PASS — $30, image 2, available, variant `49379141615790` |
| Size sync | Terracotta / 32 oz | PASS — $40, image 2, available, variant `49379141648558` |
| Sold out | Sage / 32 oz | PASS — $38, unavailable copy, sold-out labels, disabled submit, variant `49379141583022` |
| Available variant | Navy / 20 oz | PASS — $30, image 3, available, variant `49379141681326` |
| Available variant | Navy / 32 oz | PASS — $40, image 3, available, variant `49379141714094` |
| URL state | Variant selection changes query parameter | PASS |
| AJAX cart | Navy / 32 oz added without navigation | PASS — success status and View cart link shown |
| Cart correctness | Cart line targets selected variant | PASS — cart product URL retained variant `49379141714094` |
| Client validation | Quantity `0` | PASS — inline `Enter a quantity of 1 or more.` error and no request |
| Structured data | Materials, dimensions, compatibility | PASS — rendered from product metafields |
| Metaobject | Atlas 5-Year Care | PASS — referenced by `custom.warranty` and rendered |
| Missing optional data | Conditional Liquid guards | PASS — empty description/spec/warranty blocks are omitted |
| Accessibility | Options and feedback | PASS — fieldsets, legends, radios, focus styles, live status |
| Reduced motion | Motion preference | PASS — transitions/animations suppressed |

## Variant interaction sequence

1. Load Sage / 20 oz and confirm price, media, inventory, and URL.
2. Select Terracotta and confirm media 2, $30 price, and new variant ID.
3. Select 32 oz and confirm $40 while retaining Terracotta media.
4. Select Sage and confirm the sold-out state is visible and Add to cart is disabled.
5. Select Navy and confirm availability, $40, media 3, and updated URL.
6. Add to cart and verify the line item's variant-specific URL.

## Regression found and fixed

The first quantity-error test showed that a zero value could reach Shopify's Ajax endpoint. The form now validates a positive integer before the request, moves focus to the live error region, and leaves the cart request untouched. The updated theme passed Theme Check and the browser retest.

## Known limitations

- The development store is password protected.
- Browser captures are task-linked deliverables; automated export to repository files was blocked by browser security policy.
- The base cart template shows the product title but not option names; variant correctness was verified from the cart line URL and numeric variant ID.
