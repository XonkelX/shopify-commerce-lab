# Phase 6 Cart Engineering Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`  
Product context: Atlas Insulated Bottle

| Area | Check | Result |
|---|---|---|
| Static analysis | `shopify theme check --path theme` | PASS — 45 files, zero offenses |
| Remote delivery | Strict upload to existing unpublished theme | PASS |
| Cart trigger | Header cart link opens drawer without navigation | PASS |
| AJAX add | PDP product form adds and opens refreshed drawer | PASS |
| Stepper update | Quantity 7 → 6 | PASS — count 6, subtotal $240 |
| Typed update | Quantity 6 → 2 | PASS — count 2, subtotal $80 |
| Loading state | Update request in flight | PASS — announcement and disabled controls |
| Inventory error | Request exceeds available stock | PASS — Shopify message shown, quantity synchronized to 7 |
| Remove line | Remove Sage / 20 oz while Navy remains | PASS |
| Remove final line | Empty cart | PASS — complete empty state rendered |
| Variant display | Navy / 32 oz and Sage / 20 oz | PASS |
| Property display | Phase 5 requested/reserve/case/equation properties | PASS |
| Line totals | $40 Navy and $28 Sage | PASS |
| Subtotal | $40 + $28 | PASS — $68 |
| Header count | Updated after add/change/remove | PASS |
| Free-shipping progress | $40 of $75 | PASS — $35 remaining, 53% |
| Free-shipping progress | $68 of $75 | PASS — $7 remaining, 90% |
| Goal completion | Cart above $75 | PASS — reached state and 100% |
| Merchant control | Free-shipping goal | PASS — Theme Editor value $75 |
| Mobile | Full-width native-dialog drawer | PASS |
| Focus entry | Open drawer | PASS — Close receives focus |
| Focus wrap | Shift+Tab from Close | PASS — Checkout receives focus |
| Escape | Close drawer and restore trigger focus | PASS |
| Empty state | Heading, guidance, collection link | PASS |
| Reduced motion | Transition and animation override | PASS |

## Full flow exercised

1. Open Atlas Insulated Bottle in the unpublished theme's mobile editor preview.
2. Open the populated cart drawer from the header.
3. Confirm Navy / 32 oz, quantity 12, $480, and all Phase 5 calculation properties.
4. Attempt an unavailable quantity and confirm Shopify's inventory message plus synchronized quantity and subtotal.
5. Perform valid button and typed quantity updates.
6. Add Sage / 20 oz directly from the PDP and confirm a second line, count 2, and $68 subtotal.
7. Remove Sage while retaining Navy, then remove Navy and confirm the empty state.
8. Add Sage again and confirm the populated drawer returns.
9. Capture the loading state and its resolved quantity-2, $56 result.
10. Verify the mobile layout, $75 merchant goal setting, focus wrapping, Escape close, and trigger focus restoration.

## Error recovery proof

The initial case-order line requested a quantity above real Shopify inventory. Shopify reduced the line to seven and returned `Only 7 items were added to your cart due to availability.` The drawer re-rendered from Shopify, displayed the message, updated its heading and header badge to seven, and showed the authoritative $280 subtotal. No stale requested quantity remained.

## Capture inventory

Authenticated task deliverables include:

- populated drawer with calculation properties;
- live inventory error state;
- empty drawer state;
- corrected desktop summary layout;
- final mobile drawer with product image, shipping progress, quantity controls, subtotal, and checkout actions.
