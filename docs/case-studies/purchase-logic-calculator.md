# Case Quantity Purchase Calculator

## Problem proved

Products sold in fixed packs, cases, area, or volume need more than a quantity input. The storefront must translate a customer's real requirement into the whole purchasing units Shopify can sell, explain the rounding, reject invalid input, and submit the calculated Shopify quantity without losing the business context.

## Working evidence

- [Authenticated Shopify Theme Editor preview](https://admin.shopify.com/store/oniel-lab/themes/155175092398/editor?previewPath=%2Fproducts%2Fatlas-insulated-bottle%3Fview%3Dcase-calculator&previewMode=mobile)
- [Calculator source](../../theme/sections/purchase-logic-calculator.liquid)
- [Alternate product template](../../theme/templates/product.case-calculator.json)
- [Browser test matrix](../test-results/phase-5-purchase-logic.md)
- [Purchase-flow demo script](../evidence/phase-5-demo-script.md)
- Authenticated Shopify mobile-editor and cart captures preserved as task deliverables

## Solution

The module treats one Shopify quantity as one sealed 12-bottle case. A buyer enters the requested bottle count and an optional reserve allowance. The calculator applies a predictable ceiling rule:

```text
cases = ceil((requested bottles × (1 + reserve percent / 100)) / bottles per case)
```

For the verified example, 125 requested bottles plus a 10% reserve creates a planned need of 137.5 bottles. Dividing by 12 produces 11.46 cases, so the module submits 12 Shopify quantities. The purchased capacity is 144 bottles and the remaining capacity is 6.5 bottles.

The result card exposes every intermediate value, the complete equation, and a merchandise estimate based on the selected Shopify variant price. The final cart total remains authoritative. Whole-number, maximum, reserve-range, and availability checks block invalid submission.

The native Shopify product form sends the selected variant, the calculated case quantity, and four visible line-item properties:

- `Requested bottles`
- `Reserve percent`
- `Bottles per case`
- `Purchase calculation`

## Architecture

```text
Merchant settings + real Shopify variants
                    ↓
Requested units and reserve allowance
                    ↓
Transparent ceiling calculation
                    ↓
Whole-case Shopify quantity + audit properties
                    ↓
Native product-form submission
                    ↓
Cart quantity, variant, properties, and total
```

Merchant settings control the introductory copy, labels, per-case note, bottles per case, default request, default reserve, maximum order, and palette. The same structure can be adapted to boxes, packs, square-foot coverage, volume, or other fixed purchasing units.

## Testing

- Shopify Theme Check: 44 files, zero offenses.
- Strict upload to unpublished theme succeeded.
- 120 bottles, 0% reserve produces exactly 10 cases.
- 121 bottles, 0% reserve rounds up to 11 cases.
- 1 bottle, 0% reserve produces 1 case.
- 125 bottles, 10% reserve produces 12 cases and 144-bottle capacity.
- Decimal requested units, values above 2,000, and reserve above 50% are rejected.
- Navy / 32 oz resolves to $40 per case and available.
- Sage / 32 oz resolves to $38 per case, sold out, and a disabled action.
- Native Shopify submission created a Navy / 32 oz cart line with quantity 12 and subtotal $480.
- All four calculation properties rendered in the cart.
- Shopify mobile preview and Theme Editor settings were reviewed.

See the [full validation matrix](../test-results/phase-5-purchase-logic.md).

## Known limitations

- The evidence theme is unpublished and the development store is password protected.
- Shopify only exposes alternate product templates from the published theme in the product-admin assignment picker. The calculator is therefore verified through the unpublished theme's `view=case-calculator` preview against the existing Atlas product.
- A dedicated `Atlas Event Bottle Case — 12 Pack` product record was created for future assignment, but the unpublished alternate template is not assigned or presented as a published storefront product.
- The calculator estimates merchandise total only; Shopify remains authoritative for currency, discounts, tax, shipping, and checkout totals.
- The verified cart uses the existing Atlas product and represents each line quantity as one case through the module's explicit purchasing rule and line-item properties.
- Captures are preserved in the authenticated Codex task because browser security policy prevents direct local screenshot export.
- No production orders, conversion, revenue, or client outcomes are claimed.

## Jobs supported

- Fixed-pack and case quantity calculators
- Coverage and volume purchase logic
- Minimum whole-unit rounding rules
- Transparent ecommerce calculation interfaces
- Shopify quantity and line-item property implementation
- Responsive, merchant-configurable purchasing modules
