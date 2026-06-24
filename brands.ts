/**
 * Brand registry: maps a brand id to its platform and base URL.
 *
 * The `platform` field is what drives "run once": it selects which base Page
 * Object (and which payment strategy) is used. Brands on the same platform
 * share method bodies; only their locators differ.
 */
export type Platform = 'demo' | 'sfcc' | 'other';

export interface BasicAuth {
  username: string;
  password: string;
}

export interface BrandConfig {
  id: string;
  displayName: string;
  platform: Platform;
  baseUrl: string;
  /** HTTP Basic Auth for staging gate, if any. Read from env, never hardcoded. */
  basicAuth?: BasicAuth;
}

/**
 * Reads per-brand basic-auth creds from env vars of the form:
 *   <BRANDID>_AUTH_USER / <BRANDID>_AUTH_PASS   (brand id upper-cased)
 * e.g. LANEBRYANT_AUTH_USER, LANEBRYANT_AUTH_PASS
 * Returns undefined if not set (brand has no gate).
 */
function authFromEnv(brandId: string): BasicAuth | undefined {
  const key = brandId.toUpperCase();
  const username = process.env[`${key}_AUTH_USER`];
  const password = process.env[`${key}_AUTH_PASS`];
  return username && password ? { username, password } : undefined;
}

export const BRANDS: Record<string, BrandConfig> = {
  saucedemo: {
    id: 'saucedemo',
    displayName: 'SauceDemo (reference)',
    platform: 'demo',
    baseUrl: 'https://www.saucedemo.com',
  },
  anntaylor: {
    id: 'anntaylor',
    displayName: 'Ann Taylor',
    platform: 'sfcc',
    baseUrl: 'https://sfqa.anntaylor.com',
    basicAuth: authFromEnv('anntaylor'),
  },
  talbots: {
    id: 'talbots',
    displayName: 'Talbots',
    platform: 'sfcc',
    baseUrl: 'https://staging.talbots.com',
    basicAuth: authFromEnv('talbots'),
  },
  lanebryant: {
    id: 'lanebryant',
    displayName: 'Lane Bryant',
    platform: 'sfcc',
    baseUrl: 'https://sfqa.lanebryant.com',
    basicAuth: authFromEnv('lanebryant'),
  },
  havenwellwithin: {
    id: 'havenwellwithin',
    displayName: 'Haven Well Within',
    platform: 'sfcc',
    baseUrl: 'https://staging.havenwellwithin.com',
    basicAuth: authFromEnv('havenwellwithin'),
  },
  // loft / etc. — add here as wired
};

/** The brand under test for this run, from BRAND env var (default saucedemo). */
export function activeBrand(): BrandConfig {
  const id = process.env.BRAND || 'saucedemo';
  const cfg = BRANDS[id];
  if (!cfg) {
    throw new Error(
      `Unknown BRAND "${id}". Known: ${Object.keys(BRANDS).join(', ')}`
    );
  }
  return cfg;
}
