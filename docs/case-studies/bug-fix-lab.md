# Shopify Bug Fix Evidence Lab

Three real storefront defects were reproduced against the unpublished Shopify theme, diagnosed from source and browser state, fixed in commit `049ab5c`, and rerun in the remote preview. The repairs are real, but this is **not yet a complete buyer-facing before/after set**: the original before captures are not durable in the repository. No client or production claims are made.

## Bug 1 — AJAX cart badge stayed stale

### Broken state

The product form successfully added a second item through `/cart/add.js`, but the header continued to expose `1`. The server-backed cart page showed `2` after navigation, proving the purchase succeeded while the current document stayed stale.

### Root cause

The AJAX success handler rendered a success message but never refreshed cart state. The header count was server-rendered Liquid with no stable hooks for a client-side update.

### Fix

- Added `data-cart-link` and `data-cart-count` hooks to the header.
- Added an explicit accessible name containing the current item count.
- After a successful add, fetch `/cart.js` and synchronize every cart-count hook without reloading.
- Isolated count-refresh failures so a secondary badge problem cannot turn a successful add into a false cart error.

### Verification

The remote product page loaded with 2 items. After AJAX add-to-cart, the same document exposed `Cart, 3 items`, displayed badge `3`, retained the product URL, and showed the success status.

### Evidence

- [Durable after-state capture](../shopify/assets/phase-3-after-ajax-count.png); original before capture was reported in the task but is not published.
- [Header source](../../theme/sections/header.liquid)
- [AJAX synchronization source](../../theme/sections/product.liquid)
- Fix commit: `049ab5c`

## Bug 2 — Cart lines hid the selected variant

### Broken state

The cart contained Navy / 20 oz and Navy / 32 oz, but both lines displayed only “Atlas Insulated Bottle.” A buyer could not distinguish configurations without inspecting variant IDs in the URLs.

### Root cause

The original cart section rendered `item.product.title` but never rendered `item.options_with_values` or `item.variant.title`.

### Fix

- Rendered semantic `dl`, `dt`, and `dd` option data for non-default variants.
- Added line price, variant-aware Remove labels, constrained media, and readable item grouping.
- Preserved Shopify's normal update, remove, and checkout form behavior.

### Verification

The remote cart now exposes distinct Color and Size values for all three test lines:

- Sage / 20 oz — $28;
- Navy / 20 oz — $30;
- Navy / 32 oz — $40.

Each Remove link also announces the precise variant.

### Evidence

- [Durable after-state capture](../shopify/assets/phase-3-after-variant-cart.png); original before capture was reported in the task but is not published.
- [Cart source](../../theme/sections/cart.liquid)
- [Phase 3 test matrix](../test-results/phase-3-bug-fix-lab.md)
- Fix commit: `049ab5c`

## Bug 3 — Empty cart showed an unusable Checkout state

### Broken state

Shopify's mobile Theme Editor preview had an empty cart, but the template rendered an empty table followed by an active Checkout button. There was no empty-state message or recovery path.

### Root cause

The template rendered its form and checkout input unconditionally. It did not branch on `cart.item_count`.

### Fix

- Added a zero-item Liquid branch.
- Removed cart update and checkout controls from the empty state.
- Added a status message, explanatory copy, and Continue shopping link.
- Kept the non-empty cart in a separate responsive form branch.

### Verification

The authenticated 390 px Shopify mobile preview now shows “Your cart is empty,” explanatory copy, and Continue shopping. No Checkout button is present. The header announces `Cart, 0 items`.

### Evidence

- [Durable mobile after-state capture](../shopify/assets/phase-3-after-empty-cart.png); original before capture was reported in the task but is not published.
- [Cart source](../../theme/sections/cart.liquid)
- Fix commit: `049ab5c`

## Testing summary

- Theme Check: 40 theme files, zero offenses.
- Strict upload to unpublished theme succeeded.
- AJAX cart count updated in the active document.
- Three non-empty cart variants remained identifiable and correctly priced.
- Empty cart mobile branch removed checkout and supplied a recovery link.
- Header cart link has a meaningful count-aware accessible name.

## Known limitations

- The three after states are now repository images. Matching before-state images remain missing; Phase 3 is therefore incomplete under the strict evidence rule.
- Cart quantity changes still use Shopify's standard form submission; AJAX cart editing belongs to the later Cart Engineering phase.
- The development store remains password protected and the theme remains unpublished.

## Jobs supported

- Shopify Liquid debugging
- AJAX cart-state bugs
- Variant display bugs
- Empty-cart and conditional-rendering fixes
- Responsive cart/template repair
- Accessibility-focused storefront fixes
