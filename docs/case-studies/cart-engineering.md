# AJAX Cart Drawer Engineering

## Problem proved

A useful Shopify cart drawer must stay synchronized with Shopify rather than maintaining a disconnected client-side copy. Quantity changes, removal, subtotal, header count, variant details, customization properties, loading, errors, empty state, and keyboard behavior all need to remain correct after every request.

## Working evidence

- [Authenticated Shopify Theme Editor preview](https://admin.shopify.com/store/oniel-lab/themes/155175092398/editor?previewPath=%2Fproducts%2Fatlas-insulated-bottle&previewMode=mobile)
- [Cart drawer source](../../theme/sections/cart-drawer.liquid)
- [Header trigger integration](../../theme/sections/header.liquid)
- [Advanced PDP integration](../../theme/sections/product.liquid)
- [Browser test matrix](../test-results/phase-6-cart-engineering.md)
- [Cart-flow demo script](../evidence/phase-6-demo-script.md)
- Authenticated populated, empty, error, and mobile captures preserved as task deliverables

## Solution

The global drawer is rendered once from the theme layout and opened by the existing progressive-enhancement cart link. It uses Shopify's native cart endpoints:

- `cart/add.js` for product-form additions;
- `cart/change.js` for line quantity and removal;
- `cart.js` for authoritative item-count synchronization;
- Shopify section rendering for a fresh server-rendered drawer after every mutation.

Replacing the complete server-rendered drawer after a successful request keeps prices, discounts, item counts, properties, line order, and totals authoritative. The drawer never calculates a replacement subtotal in the browser.

The interface includes stepper buttons, debounced typed quantities, removal, variant titles, visible line-item properties, per-line totals, subtotal, a loading overlay, live status messages, a Shopify error alert, and a complete empty state. A merchant-configured $75 free-shipping goal adds useful ecommerce feedback without pretending to control checkout shipping rates.

## Accessibility and responsive behavior

The drawer uses a native modal `dialog`, visible close control, overlay dismissal, Escape support, focus restoration, and explicit focus wrapping. Opening focuses Close; Shift+Tab wraps to Checkout; Escape closes the drawer and restores focus to the cart trigger. Status and error regions announce asynchronous results.

The native top layer prevents the drawer from being clipped by Shopify Theme Editor's mobile preview. The panel becomes full-width at mobile sizes while preserving scrollable line items and fixed summary actions.

## Testing

- Shopify Theme Check: 45 files, zero offenses.
- Strict upload to the existing unpublished theme succeeded.
- Product-form submission opened the drawer and created the correct line without navigation.
- A real inventory ceiling returned `Only 7 items were added to your cart due to availability.`; the drawer refreshed to Shopify's quantity 7 and $280 subtotal while exposing the error.
- A valid decrement from 7 to 6 produced $240 and cleared the error.
- Typed quantity 2 produced a synchronized count and $80 subtotal.
- A quantity-one Navy / 32 oz line showed $40, $35 remaining, and 53% progress.
- Adding Sage / 20 oz produced two lines, count 2, $68 subtotal, and $7 remaining.
- Phase 5 calculation properties remained visible on the Navy / 32 oz line.
- Removing one line preserved the other; removing the final line rendered the empty state.
- A fresh Sage / 20 oz addition restored the populated state at $28.
- Loading announced `Updating quantity…`, disabled controls, and resolved to quantity 2, $56, and 74% progress.
- Mobile layout, merchant setting, keyboard wrap, Escape close, and focus restoration passed.

See the [full validation matrix](../test-results/phase-6-cart-engineering.md).

## Known limitations

- The evidence theme is unpublished and the development store is password protected.
- The free-shipping goal is a presentation setting. Merchants must match it to the store's actual shipping-rate configuration; checkout remains authoritative.
- The drawer does not implement bundles, cross-product recommendations, discounts, subscription logic, or checkout customization.
- Captures are preserved in the authenticated Codex task because browser security policy prevents direct local screenshot export.
- No production orders, conversion, revenue, or client outcomes are claimed.

## Jobs supported

- Shopify AJAX cart drawers
- Cart quantity and removal flows
- Cart subtotal and count synchronization
- Line-item property presentation
- Cart loading, error, and empty states
- Free-shipping progress UI
- Responsive and keyboard-accessible cart interactions
