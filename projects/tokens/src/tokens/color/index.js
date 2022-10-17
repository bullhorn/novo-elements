// This is kinda cool, don't have to do that
// weird JSON structure nesting in every file.
const {
  makeColors,
  makeContrastColors,
  makeShadeColors,
  makeTintColors,
  makePaleColors,
  makeScaledColors,
} = require("../../utils/color-utils");
const core = require("./core");
const app = require("./app");
const brand = require("./brand");
const palette = require("./palette.hcl");
const entity = require("./entity");
const allColors = { ...core, ...app, ...entity };
const colorOverides = [
  core.grass,
  core.sunflower,
  entity.candidate,
  entity.contact,
];
module.exports = {
  ...palette,
  ...brand,
  ...makeColors(allColors),
  shade: makeShadeColors(allColors),
  tint: makeTintColors(allColors),
  contrast: makeContrastColors(allColors, core.white, core.dark, colorOverides),
  // pale: makePaleColors(allColors),
  // hsl: require("./hsl"),
};
