# Phase 6 AJAX Cart Drawer Demo Script

Target length: 75–90 seconds.

1. Open the authenticated [mobile Theme Editor preview](https://admin.shopify.com/store/oniel-lab/themes/155175092398/editor?previewPath=%2Fproducts%2Fatlas-insulated-bottle&previewMode=mobile).
2. Open the header cart link. Point out the modal drawer, item count, product image, variant, line properties, quantity controls, line total, and subtotal.
3. Increase quantity and pause on the loading overlay and `Updating quantity…` announcement.
4. Show the refreshed count, line total, subtotal, and free-shipping progress.
5. Enter a quantity above inventory. Show Shopify's availability message and explain that the drawer refreshes to Shopify's authoritative quantity rather than leaving stale UI.
6. Correct the quantity with the stepper or typed field and show the cleared error.
7. Close the drawer and add Sage / 20 oz from the PDP. Show the drawer open automatically with a second line and updated subtotal.
8. Show that the earlier Navy / 32 oz line still includes requested bottles, reserve percentage, bottles per case, and the purchase equation.
9. Remove Sage and show Navy remains. Remove the final line and show the complete empty state.
10. Add one product back and show the below-goal free-shipping progress.
11. Demonstrate keyboard behavior: Close is focused on open, Shift+Tab wraps to Checkout, and Escape closes and returns focus to the cart icon.
12. Open the Cart drawer section in Theme Editor and show the merchant-configurable $75 goal.
13. Close on the architecture: Shopify endpoints mutate the cart, server-rendered section HTML refreshes the drawer, and Shopify remains authoritative for totals and inventory.
