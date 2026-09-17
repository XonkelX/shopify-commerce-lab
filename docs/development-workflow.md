# Safe Shopify Delivery Workflow

This workflow is part of the evidence kit. It is designed to keep experiments and unreviewed changes away from a merchant's published theme.

## Before implementation

- Confirm the requested behavior and its acceptance criteria.
- Duplicate the merchant theme or use a Shopify development theme.
- Create a focused branch from the agreed baseline.
- Record the theme ID/name and the rollback theme before changing remote state.
- Never place access tokens, Theme Access passwords, or customer data in the repository.

## During implementation

- Keep the change limited to the requested feature or fix.
- Use Shopify-native Liquid, sections, blocks, product forms, and Cart API behavior where appropriate.
- Test missing optional settings and empty content, not just the ideal configuration.
- Run Theme Check before requesting review.

## Verification

- Test the relevant desktop viewport.
- Test at least one narrow mobile viewport and touch interaction.
- Verify keyboard access, visible focus, labels, and error messaging for interactive UI.
- Verify real Shopify state: selected variant, cart line, quantity, properties, price, and availability as applicable.
- Capture screenshots and concise reproduction/verification notes.
- Record known limitations instead of hiding them.

## Review and release

- Share an unpublished preview URL.
- Obtain approval before publishing or merging to a release branch.
- Re-run the scoped checks after any review change.
- Publish only the approved theme/version.
- Retain the previously published theme so rollback does not depend on reconstructing old code.

## Rollback

If a released change causes a regression, republish the recorded prior theme, confirm storefront recovery, then diagnose the failed change in an isolated theme.

