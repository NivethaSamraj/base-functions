import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Haven Well Within PDP — VERIFIED selectors (Talbots SFCC instance).
 *
 * Swatch disambiguation: a.swatchanchor covers color, sizeType (where present),
 * and size. We match title^="Select size: " (colon + space) so we never grab a
 * color or a "sizeType" swatch by mistake. This was the root cause of the
 * add-to-cart-never-enables failure.
 */
export const havenwellwithinPDPLocators: PdpLocatorsOverride = {
  productName: (page: Page) => page.locator('h1.product-name'),

  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor[title^="Select size: "]:not(.unselectable):not(.disabled)'),

  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled):not(.stickybarbutton)'),

  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
