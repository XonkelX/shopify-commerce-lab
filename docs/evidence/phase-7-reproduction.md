# Phase 7 Reproduction Guide

## Local quality gate

Prerequisites: Shopify CLI, Node/npm, and PowerShell.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-phase-7.ps1
```

This validates theme/template JSON, embedded section schema JSON, the absence of Theme Check suppressions, cart/PDP accessibility invariants, shipping-copy consistency, and Theme Check at warning severity.

## Repeat Lighthouse

The public-theme form needs no preview credentials:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-lighthouse.ps1 -Runs 3
```

For this password-protected unpublished theme, open the theme in Shopify Theme Editor, copy the fresh storefront preview query containing `key` and `_bt`, and pass it only at runtime:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-lighthouse.ps1 `
  -PreviewThemeId 155175092398 `
  -PreviewQuery 'key=REDACTED&_bt=REDACTED' `
  -Runs 3
```

Do not commit or paste the signed query into documentation. The script pins Lighthouse `12.8.2`, tests home/product/collection, stores raw JSON under gitignored `output/lighthouse/`, and writes a sanitized `summary.json` with all runs and medians.

## Manual accessibility pass

1. Open the unpublished product preview.
2. Tab from the header through media controls, option groups, quantity, Add to cart, and footer. Confirm logical order and visible focus.
3. Open the cart with the keyboard. Confirm focus begins on Close.
4. Press Shift+Tab on Close. Confirm focus wraps to the final Checkout control.
5. Press Escape. Confirm the drawer closes and focus returns to the cart trigger.
6. Enter quantity `0` on the PDP and submit. Confirm the visible error is announced and receives focus.
7. Inspect headings, labels, fieldsets, status/alert regions, and the dialog's accessible name.
8. Review automated contrast findings, then visually inspect important foreground/background pairs.

## CI

GitHub Actions runs on push and pull request:

- `shopify/theme-check-action@v2` with `theme_root: ./theme` and `--fail-level warning`;
- `scripts/verify-phase-7.ps1 -SkipThemeCheck` for repository structure and invariants.

