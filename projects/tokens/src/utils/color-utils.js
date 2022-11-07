const {
  darken,
  lighten,
  meetsContrastGuidelines,
  setLightness,
  shade,
  tint,
} = require("polished");
const { calcAPCA } = require("./apca-w3");

// Color Primitives
const transparent = "transparent";
const current = "currentColor";
const black = "#000";
const white = "#fff";

const contrastThresholds = {
  largeFont: { aa: 3.0, aaa: 4.5 },
  normalFont: { aa: 4.5, aaa: 7.0 },
};

const Abs = (num) => Math.ceil(Math.abs(num));

// Lc 45 is "sort of" like 3:1
// Lc 60 is "sort of" like 4.5:1
// Lc 75 is "sort of" like 7:1
const apcaContrastColor = (
  key,
  bg,
  desiredText = white,
  altText = black,
  overrides = []
) => {
  let contrastLc = Abs(calcAPCA(desiredText, bg));
  let altLc = Abs(calcAPCA(altText, bg));

  if (contrastLc < 60 && altLc < 60) {
    console.warn(
      `Neither text color meets contrast ratio for ${key}: `,
      bg,
      `${contrastLc} <-> ${altLc}`
    );
  }
  if (contrastLc >= 75 || contrastLc > altLc) {
    return desiredText;
  }

  return altText;
};

const contrastColor = (color, light = white, dark = black, overrides = []) => {
  if (
    overrides.includes(color) ||
    meetsContrastGuidelines(color, light).AALarge
  ) {
    return light;
  }
  return dark;
  // return readableColor(color, light, dark, false);
};

/**
 * Create ColorScale object for a Color
 * @param {*} color: string // hex
 * @returns
 */
const makeColorScale = (name, color, light, dark) => {
  return {
    "@": { value: color },
    shade: { value: darken(0.2, color) },
    tint: { value: lighten(0.2, color) },
    contrast: { value: apcaContrastColor(name, color, light, dark) },
    50: { value: setLightness(0.5, color) },
    10: { value: setLightness(0.8, color) },
  };
};

// interface ColorScale<T = string> {
//   default: T;
//   shade: T;
//   tint: T;
//   contrast: T;
//   50: T;
//   10: T;
// }

const loopColors = (colors, fn) => {
  return Object.keys(colors).reduce((ret, name) => {
    const color = colors[name];
    return Object.assign({}, ret, {
      [name]: fn([color, name]),
    });
  }, {});
};

const makeColors = (colors) => loopColors(colors, ([c, n]) => ({ value: c }));
const makeScaledColors = (colors, light, dark) =>
  loopColors(colors, ([c, n]) => makeColorScale(n, c, light, dark));

const makeTintColors = (colors) =>
  loopColors(colors, ([c, n]) => ({ value: tint(0.2, c) }));
const makeShadeColors = (colors) =>
  loopColors(colors, ([c, n]) => ({ value: shade(0.2, c) }));
const makeContrastColors = (colors, light, dark, overrides) =>
  loopColors(colors, ([c, n]) => ({
    value: apcaContrastColor(n, c, light, dark, overrides),
  }));
const makePaleColors = (colors) =>
  loopColors(colors, ([c, n]) => ({ value: setLightness(0.9, c) }));

module.exports = {
  makeColors,
  makeContrastColors,
  makeShadeColors,
  makeTintColors,
  makePaleColors,
  makeScaledColors,
  black,
  white,
  transparent,
  apcaContrastColor,
};
