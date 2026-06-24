import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Talbots PDP — VERIFIED selectors (from live staging outerHTML).
 *
 * Platform note: checkout is native SFCC + PayPal (USD), NOT EShopWorld.
 * Sizes are <a class="swatchanchor"> anchors (not buttons like Lane Bryant) —
 * a good example of the registry absorbing a per-brand DOM difference while the
 * base page-object method stays identical.
 */
export const talbotsPDPLocators: PdpLocatorsOverride = {
  // <h1 class="product-name" itemprop="name">Embroidered Voile Top</h1>
  productName: (page: Page) => page.locator('h1.product-name'),

  // <a class="swatchanchor" title="Select size: XS">XS</a>
  // Pick visible swatch anchors. NOTE: pasted HTML showed no explicit
  // disabled/unselectable class — if out-of-stock sizes turn out to carry one
  // (e.g. .unselectable / .disabled), exclude it here.
  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor:not(.unselectable):not(.disabled)'),

  // <button id="add-to-cart" ... class="add-to-cart">Add to Bag</button>
  // Target the ENABLED button only: like Haven (same SFCC instance), Add to Bag
  // starts as .add-to-cart-disabled until a size is picked, then becomes enabled.
  // Excluding the disabled state makes Playwright auto-wait for it to be clickable.
  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled)'),

  // <a class="mini-cart-link-cart" href=".../cart">View Bag</a>
  // Header bag icon opens the mini-cart; this links straight to the cart page.
  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
