import { Page } from '@playwright/test';
import { PdpLocatorsOverride } from '../../contracts/PDPLocators';

/**
 * Haven Well Within PDP — VERIFIED selectors (from live staging outerHTML).
 *
 * Haven runs on Talbots' SFCC instance (note Sites-talbotsus-Site / org_talbots
 * in the DOM), so selectors mirror Talbots almost exactly — a clean example of
 * reuse: same platform, near-identical overrides.
 *
 * IMPORTANT: Add to Bag starts DISABLED (class="add-to-cart-disabled",
 * type="button") until a size is selected, then becomes enabled
 * (id="add-to-cart", type="submit"). We target the ENABLED button so Playwright
 * auto-waits for it to become clickable instead of clicking the dead one.
 */
export const havenwellwithinPDPLocators: PdpLocatorsOverride = {
  // <h1 class="product-name" itemprop="name">Organic Cotton Slub Jersey ...</h1>
  productName: (page: Page) => page.locator('h1.product-name'),

  // <a class="swatchanchor" title="Select size: XS">XS</a>
  sizeOption: (page: Page) =>
    page.locator('a.swatchanchor:not(.unselectable):not(.disabled)'),

  // Enabled Add to Bag only (excludes the disabled pre-size-selection state).
  addToCart: (page: Page) =>
    page.locator('button#add-to-cart:not(.add-to-cart-disabled)'),

  // Header bag link to cart (same as Talbots' mini-cart).
  goToCartLink: (page: Page) => page.locator('a.mini-cart-link-cart').first(),
};
