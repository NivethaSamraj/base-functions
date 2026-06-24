import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Haven Well Within PDP — VERIFIED selectors.
 * Haven runs on Talbots' SFCC instance (Sites-talbotsus-Site / org_talbots).
 *
 * CRITICAL: color and size swatches share the SAME class `a.swatchanchor`.
 * They are distinguished only by the title attribute:
 *   - colors: title="Select color: ..."
 *   - sizes:  title="Select size: ..."
 * So sizeOption MUST filter on title*="Select size" or we accidentally click a
 * color (which never enables Add to Bag). This was the root cause of the
 * add-to-cart timeout.
 */
export const havenwellwithinPDPLocators: PdpLocatorsOverride = {
  productName: (page: Page) => page.locator('h1.product-name'),

  // Size swatches ONLY (title starts with "Select size"), excluding disabled.
  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor[title^="Select size"]:not(.unselectable):not(.disabled)'),

  // Enabled, non-sticky Add to Bag (becomes enabled once a real size is picked).
  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled):not(.stickybarbutton)'),

  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
