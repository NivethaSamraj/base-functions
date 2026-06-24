import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Haven Well Within PDP — VERIFIED selectors.
 * Haven runs on Talbots' SFCC instance (Sites-talbotsus-Site / org_talbots).
 *
 * Add to Bag: there are two #add-to-cart buttons — the main one in the product
 * area (visible, what we want) and a 'stickybarbutton' pinned copy (hidden until
 * scroll). We exclude the sticky one AND the disabled pre-size state, leaving the
 * single real button. The base page object scrolls it into view before clicking.
 */
export const havenwellwithinPDPLocators: PdpLocatorsOverride = {
  productName: (page: Page) => page.locator('h1.product-name'),

  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor:not(.unselectable):not(.disabled)'),

  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled):not(.stickybarbutton)'),

  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
