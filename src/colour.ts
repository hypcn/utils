
// random?
// conversion?
// find contrasting?

/**
 * Converts a hex colour string to separate r, g, and b values.
 * Also accommodates 3-value syntax (e.g. "#222")
 * 
 * https://stackoverflow.com/a/5624139
 * @param hex 
 * @returns 
 * @example "#123abc" -> { r: 18, g: 58, b: 188 }
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } {

  const rs = hex.length < 5 ? hex[1] : hex.slice(1, 3);
  const gs = hex.length < 5 ? hex[2] : hex.slice(3, 5);
  const bs = hex.length < 5 ? hex[3] : hex.slice(5, 7);

  return {
    r: parseInt(rs, 16),
    g: parseInt(gs, 16),
    b: parseInt(bs, 16)
  };
}

/**
 * 
 * @param rgbString 
 * @returns 
 */
export function rgbFromString(rgbString: string): { r: number, g: number, b: number } {
  const [r, g, b] = rgbString.replace("rgb", "").replace("(", "").replace(")", "").split(",").map(rgb => Number(rgb.trim()));
  return { r, g, b };
}

/**
 * Find a contrasting colour ("#ffffff" or "#000000" by default) for a given CSS colour string
 */
export function contrastColour(cssColour: string, light = "#ffffff", dark = "#000000"): string {
  if (!cssColour) return dark;

  if (cssColour.startsWith("hsl")) {
    throw new Error(`Finding contrast colours of HSL colours is not yet implemented!`);
  }
  const { r, g, b } = cssColour.startsWith("#")
    ? hexToRgb(cssColour)
    : rgbFromString(cssColour);

  // https://gist.github.com/dcondrey/183971f17808e9277572
  var contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
  return (contrast >= 128) ? dark : light;
}
