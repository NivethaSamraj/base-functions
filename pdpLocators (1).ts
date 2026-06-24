import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Talbots PDP — VERIFIED selectors. Native SFCC + PayPal checkout (USD).
 *
 * Swatch disambiguation (IMPORTANT): on Talbots, a.swatchanchor is used for
 * THREE attributes, told apart only by title:
 *   - "Select sizeType: Misses/Petite/Plus..."
 *   - "Select color: IVORY..."
 *   - "Select size: XS/S/M..."
 * Note "Select size:" (with colon) vs "Select sizeType:" — we MUST match the
 * colon, or title^="Select size" also grabs the sizeType swatches and we click
 * the wrong thing (Add to Bag never enables).
 */
export const talbotsPDPLocators: PdpLocatorsOverride = {
  productName: (page: Page) => page.locator('h1.product-name'),

  // Real SIZE swatches only: title begins "Select size: " (colon + space).
  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor[title^="Select size: "]:not(.unselectable):not(.disabled)'),

  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled):not(.stickybarbutton)'),

  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
