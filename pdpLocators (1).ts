import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Talbots PDP — VERIFIED selectors. Native SFCC + PayPal checkout (USD).
 *
 * Like Haven (same platform), color & size share class `a.swatchanchor` and are
 * told apart by the title attribute. sizeOption filters title^="Select size" so
 * we never click a color by mistake.
 */
export const talbotsPDPLocators: PdpLocatorsOverride = {
  productName: (page: Page) => page.locator('h1.product-name'),

  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor[title^="Select size"]:not(.unselectable):not(.disabled)'),

  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled):not(.stickybarbutton)'),

  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
