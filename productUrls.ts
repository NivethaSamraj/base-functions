/**
 * One direct PDP URL per brand for the browse-to-cart proof.
 *
 * The browse-to-cart spec navigates straight to this product, then runs the
 * SAME scenario (read name -> select size -> add to cart -> open cart) through
 * the shared page objects for every brand. Only the selectors differ underneath
 * — that's the architecture proof.
 *
 * Fill a real in-stock PDP URL per brand. '' means "not ready yet" and the spec
 * will skip that brand instead of failing.
 */
export const PRODUCT_URLS: Record<string, string> = {
  // Verified product (Swing V-Neck Tank) on Lane Bryant staging.
  lanebryant: 'https://sfqa.lanebryant.com/swing-v-neck-tank/prd-404863.html?dwvar_404863_color=0000113708',

  // TODO: paste one in-stock product URL per brand to enable it.
  anntaylor: '',
  talbots: 'https://staging.talbots.com/embroidered-voile-top/P262075296.html?cgid=apparel-blouses-and-shirts&dwvar_P262075296_color=IVORY&dwvar_P262075296_sizeType=MS',
  havenwellwithin: 'https://staging.havenwellwithin.com/organic-cotton-slub-jersey-short-sleeve-tee/P262730056.html?dwvar_P262730056_color=GARMENT%20DYE%20WHISPER%20PINK&dwvar_P262730056_sizeType=MS&cgid=haven-categories-lounge-tees-and-tanks',
};
