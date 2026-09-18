# Phase 4 Product Configurator Validation

Date: 2026-09-17  
Store: Oniel Lab development store  
Theme: Shopify Commerce Lab, unpublished, ID `155175092398`  
Product: Atlas Personalized Bottle, ID `9274376487086`

| Area | Check | Result |
|---|---|---|
| Static analysis | `shopify theme check --path theme` | PASS — 42 files, zero offenses |
| Remote delivery | Strict upload to unpublished theme | PASS |
| Initial state | Sage / 20 oz, $28, available | PASS |
| Variant selection | Navy / 32 oz, $40, navy media | PASS |
| Sold-out state | Sage / 32 oz, $38, submit disabled | PASS |
| URL state | Selected `variant` parameter updates | PASS |
| Live preview | `ONIEL` and Script update preview and summary | PASS |
| Character count | `ONIEL` reports 5/14 | PASS |
| Required validation | Blank personalization rejected | PASS |
| Character validation | `ONIEL@` rejected with allowed-character guidance | PASS |
| Quantity validation | HTML minimum and defensive integer/minimum check | PASS |
| Variant submission | Navy / 32 oz reaches cart at $40 | PASS |
| Line-item property | Personalization = `ONIEL` | PASS |
| Line-item property | Engraving style = `Script` | PASS |
| Line-item property | Gift note = `Happy trails!` | PASS |
| Line-item property | Gift wrap = `Yes` | PASS |
| Cart rendering | Variant options and all custom properties visible | PASS |
| Merchant controls | Section settings and 3 style blocks in Theme Editor | PASS |
| Desktop | Configured storefront preview visually reviewed | PASS |
| Mobile | Shopify mobile preview visually reviewed | PASS |
| Reduced motion | Motion overrides present | PASS |

## Full flow exercised

1. Open the unpublished `personalized` product template.
2. Select Navy and 32 oz.
3. Enter `ONIEL` and select Script.
4. Enter `Happy trails!` and enable recyclable gift wrap.
5. Submit quantity 1 through Shopify's native product form.
6. Confirm the cart line is Atlas Personalized Bottle, Navy / 32 oz, $40.
7. Confirm all four line-item properties render in the cart.

## Invalid-state coverage

- Empty required text returns `Enter the personalization text before adding this bottle.`
- Unsupported characters return `Use letters, numbers, spaces, and simple punctuation only.`
- Quantity values below one are constrained by the number input and guarded before submission.
- An unavailable real variant changes the action to `Sold out` and disables it.

## Regression found and fixed during validation

Shopify stored line-item properties correctly, but the initial cart template guarded the property loop with a hash-size check that did not render reliably in this theme. The guard was replaced with a captured visible-property loop. A second regression came from Shopify's cached compiled section JavaScript during iterative uploads; the final implementation uses an isolated inline controller and native Shopify form submission, eliminating duplicate stale-controller behavior and keeping the variant/property payload authoritative.

## Capture inventory

Authenticated task deliverables include:

- configured desktop live preview;
- corrected desktop heading and variant state;
- final Shopify mobile preview;
- Theme Editor section/settings proof;
- cart proof with Navy / 32 oz and all four personalization properties.
