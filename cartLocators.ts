import { Page } from '@playwright/test';
import { CartLocatorsOverride } from '../../contracts/CartLocators';

/** Haven Well Within Cart / mini-cart — mirrors Talbots (shared SFCC instance). */
export const havenwellwithinCartLocators: CartLocatorsOverride = {
  lineItemName: (page: Page) => page.locator('.mini-cart-name a, .cart-row .name').first(),
  lineItemPrice: (page: Page) => page.locator('.mini-cart-price, .cart-row .price').first(),
  checkoutButton: (page: Page) =>
    page.locator('a.mini-cart-link-checkout, a[href$="/checkout"]').first(),
};
