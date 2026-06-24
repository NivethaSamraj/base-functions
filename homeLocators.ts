import { Page } from '@playwright/test';
import { HomeLocatorsOverride } from '../../contracts/HomeLocators';

/** Haven Well Within Home/Header — VERIFIED selectors (Talbots SFCC instance). */
export const havenwellwithinHomeLocators: HomeLocatorsOverride = {
  // <input id="q" name="q" class="suppress haven-search" placeholder="Search">
  searchInput: (page: Page) => page.locator('input#q[name="q"]').first(),
  searchSubmit: (page: Page) => page.locator('input#q[name="q"]').first(),

  // <a class="top-level has-sub-menu" href=".../clothing-all">Clothing</a>
  categoryNavLink: (page: Page) => page.locator('a.top-level.has-sub-menu').first(),
};
