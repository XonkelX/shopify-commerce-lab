# Phase 5 Purchase Logic Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`  
Preview product: Atlas Insulated Bottle, ID `9274328481966`

| Area | Check | Result |
|---|---|---|
| Static analysis | `shopify theme check --path theme` | PASS — 44 files, zero offenses |
| Remote delivery | Strict upload to existing unpublished theme | PASS |
| Default calculation | 125 bottles + 10% reserve / 12 | PASS — 12 cases |
| Exact boundary | 120 bottles + 0% reserve / 12 | PASS — 10 cases, 0 remaining |
| Ceiling boundary | 121 bottles + 0% reserve / 12 | PASS — 11 cases, 11 remaining |
| Minimum valid | 1 bottle + 0% reserve / 12 | PASS — 1 case |
| Calculation detail | Planned need, raw cases, capacity, remaining, equation | PASS |
| Requested-unit validation | Decimal `12.5` | PASS — rejected |
| Maximum validation | `2001` with maximum 2000 | PASS — rejected |
| Reserve validation | `51%` | PASS — rejected |
| Variant selection | Navy / 32 oz | PASS — $40, available |
| Sold-out state | Sage / 32 oz | PASS — $38, action disabled |
| Cart submission | Computed quantity | PASS — quantity 12 |
| Cart variant | Selected Shopify variant | PASS — Navy / 32 oz |
| Cart total | $40 × 12 | PASS — $480 subtotal |
| Cart property | Requested bottles | PASS — 125 |
| Cart property | Reserve percent | PASS — 10% |
| Cart property | Bottles per case | PASS — 12 |
| Cart property | Purchase calculation | PASS — full ceiling equation |
| Merchant controls | Copy, labels, limits, units, defaults, palette | PASS |
| Mobile | Shopify mobile preview visually reviewed | PASS |
| Responsive CSS | Single-column mobile state and reduced-motion override | PASS |

## Verified calculations

| Requested | Reserve | Planned need | Raw cases | Submitted cases | Capacity | Remaining |
|---:|---:|---:|---:|---:|---:|---:|
| 120 | 0% | 120 | 10.00 | 10 | 120 | 0 |
| 121 | 0% | 121 | 10.08 | 11 | 132 | 11 |
| 1 | 0% | 1 | 0.08 | 1 | 12 | 11 |
| 125 | 10% | 137.5 | 11.46 | 12 | 144 | 6.5 |

## Full cart flow exercised

1. Open the `case-calculator` template in the unpublished theme editor.
2. Select Navy and 32 oz.
3. Keep requested bottles at 125 and reserve allowance at 10%.
4. Confirm `ceil((125 × 1.1) ÷ 12) = 12 cases` and $480 estimate.
5. Submit through Shopify's native product form.
6. Confirm the cart line is Atlas Insulated Bottle, Navy / 32 oz, quantity 12, subtotal $480.
7. Confirm the requested count, reserve, case size, and calculation equation render as line-item properties.

## Invalid-state coverage

- A decimal requested quantity returns `Enter a whole requested quantity of at least 1.` and disables submission.
- A requested quantity above the merchant maximum returns `Requested quantity cannot exceed 2000.` and disables submission.
- A reserve outside 0–50% returns `Reserve allowance must be between 0% and 50%.` and disables submission.
- A real unavailable variant changes the action to `Sold out` and disables it.

## Capture inventory

Authenticated task deliverables include:

- Shopify mobile calculator preview;
- Theme Editor template and section proof;
- sold-out variant state;
- cart proof with quantity 12, Navy / 32 oz, $480, and all four calculation properties.

## Environment limitation

The alternate template is present in the unpublished evidence theme and is previewed authoritatively inside Shopify Theme Editor. Shopify does not make unpublished alternate templates assignable from the product-admin picker. The dedicated case product is therefore retained for a future published-theme assignment; this phase's cart proof uses the existing Atlas product under the alternate preview template.
