const chroma = require("chroma-js");
const { apcaContrastColor } = require("../../utils/color-utils");

const scale = [98, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
const bow = "#3d464d";
const wob = "#ffffff";

const expandColorScale = (
  name,
  hex,
  { h = [0, 0], c = [20, 20], l = [20, 120] } = {}
) => {
  // Only uses (L)ightness from B
  const combine = (a, b) => [a[0] + b[0], a[1] + b[1], b[2]];
  const [l0, l1, l2] = l;
  const pale = [h[1], c[2], l2];
  const lightShift = [h[1], c[1], l1];
  const darkShift = [h[0], c[0], l0];
  console.log(lightShift, darkShift);
  const hcl = chroma(hex).hcl();
  const high = combine(hcl, lightShift);
  const low = combine(hcl, darkShift);
  const light = chroma.hcl(high).hex();
  const dark = chroma.hcl(low).hex();
  const colors =
    l2 >= 0
      ? [
          chroma.hcl(combine(hcl, pale)).hex(),
          ...chroma.scale([light, dark]).mode("lch").colors(10),
        ]
      : chroma.scale([light, dark]).mode("lch").colors(11);
  const contrast = apcaContrastColor(name, hex, wob, bow);
  return {
    [name]: { value: hex },
    [`${name}-contrast`]: { value: contrast },
    ...colors.reduce((record, color, i) => {
      const key = `${name}-${scale[i]}`;
      const text = apcaContrastColor(key, color, wob, bow);
      return {
        ...record,
        [key]: { value: color },
        [`${key}-contrast`]: { value: text },
      };
    }, {}),
  };
};

const expandColors = (colors) => {
  const expanded = Object.keys(colors).reduce((record, name) => {
    const [color, shift] = Array.isArray(colors[name])
      ? colors[name]
      : [colors[name]];
    return {
      ...record,
      ...expandColorScale(name, color, shift),
    };
  }, {});
  return expanded;
};

module.exports = {
  ...expandColors({
    red: ["#ee204d", { l: [10, 110, 130] }], // "#DA4453",
    pink: "#D770AD",
    orange: "#ff6900",
    yellow: ["#DFFF00", { h: [-15, 0], c: [45, 20, 5], l: [50, 120, 140] }],
    green: "#50C878", //"#8CC152",
    teal: "#008080",
    aqua: "#3bafda",
    blue: "#1E88E5", //"007AFD", //"#4a89dc",
    indigo: "#4b0082", //"#5c6bc0",
    // indigo: "#967ADC",
    violet: "#9678B6",
    gray: ["#808080", { c: [0, 0], l: [16, 98] }],
  }),
};
