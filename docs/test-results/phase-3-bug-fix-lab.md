# Phase 3 Bug Fix Lab Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`  
Fix commit: `049ab5c`

| Bug | Before | Root cause | After | Result |
|---|---|---|---|---|
| Stale AJAX cart badge | Add succeeded while header remained at 1; cart page showed 2 | AJAX handler never refreshed cart state; header had no client hooks | Active page moved from 2 to 3 after add and announced `Cart, 3 items` | PASS |
| Missing variant identity | Two cart lines both displayed only the product title | Template omitted `item.options_with_values` | Color, Size, price, and variant-aware remove labels render for every line | PASS |
| Invalid empty cart | Empty table plus Checkout button, no recovery path | Form and checkout rendered without checking item count | Empty status, explanatory copy, Continue shopping; no Checkout | PASS |

## Detailed checks

| Area | Check | Result |
|---|---|---|
| Static analysis | `shopify theme check --path theme` | PASS — 40 files, zero offenses |
| Remote delivery | Strict upload to unpublished theme | PASS |
| AJAX behavior | Add from product page without navigation | PASS |
| Cart badge | Count changed from 2 to 3 in current document | PASS |
| Cart accessibility | Header link name includes item count | PASS — `Cart, 3 items` |
| Variant 1 | Sage / 20 oz | PASS — $28 |
| Variant 2 | Navy / 20 oz | PASS — $30 |
| Variant 3 | Navy / 32 oz | PASS — $40 |
| Remove controls | Variant-specific accessible label | PASS |
| Empty desktop logic | Checkout omitted for zero items | PASS by shared Liquid branch |
| Empty mobile | 390 px Shopify Theme Editor preview | PASS |
| Empty recovery | Continue shopping link | PASS — `/collections/all` |
| Visual regression | Non-empty cart desktop layout | PASS |

## Reproduction notes

### Stale count

1. Load a product page with a cart count of 1.
2. Add another available variant through the AJAX form.
3. Before the fix, the success message appeared but the header stayed at 1.
4. After the fix, the active page fetched `/cart.js` and exposed the new count immediately.

### Missing variant information

1. Put Navy / 20 oz and Navy / 32 oz in the cart.
2. Before the fix, the rows were indistinguishable by visible text.
3. After the fix, each row rendered Shopify's selected option names and values.

### Empty cart

1. Open `/cart` in a clean Theme Editor storefront session.
2. Before the fix, Checkout rendered under an empty table.
3. After the fix, the empty branch renders guidance and no transaction control.

## Capture inventory

The Phase 3 task contains authenticated before/after captures for:

- product AJAX success with stale header state;
- original cart with missing variant details;
- original mobile empty-cart checkout state;
- updated count-aware AJAX state;
- updated non-empty cart with variant details;
- updated mobile empty-cart state.

