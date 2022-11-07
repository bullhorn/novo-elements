// const core = require("./core");

// TODO: Replace our color wheel with HSL values
const scale1 = [
  "20%",
  "28%",
  "41%",
  "50%",
  "65%",
  "77%",
  "84%",
  "90%",
  "94%",
  "98%",
];
const scale2 = [
  "24.9%",
  "28%",
  "41%",
  "57.8%",
  "67.4%",
  "76.2%",
  "84%",
  "85%",
  "93.9%",
  "98.2%",
];

const tokenize = (obj) =>
  Object.keys(obj).reduce((ret, name) => {
    const scale = scale1;
    const value = obj[name];
    return Object.assign({}, ret, {
      [name]: { value },
      // [`${name}-05`]: { value: `hsla({color.hsl.${name}.value}, 8%, 100%)` },
      [`${name}-10`]: { value: `hsla({color.${name}}, ${scale[0]}, 100%)` },
      [`${name}-20`]: { value: `hsla({color.${name}}, ${scale[1]}, 100%)` },
      [`${name}-30`]: { value: `hsla({color.${name}}, ${scale[2]}, 100%)` },
      [`${name}-40`]: { value: `hsla({color.${name}}, ${scale[3]}, 100%)` },
      [`${name}-50`]: { value: `hsla({color.${name}}, ${scale[4]}, 100%)` },
      [`${name}-60`]: { value: `hsla({color.${name}}, ${scale[5]}, 100%)` },
      [`${name}-70`]: { value: `hsla({color.${name}}, ${scale[6]}, 100%)` },
      [`${name}-80`]: { value: `hsla({color.${name}}, ${scale[7]}, 100%)` },
      [`${name}-90`]: { value: `hsla({color.${name}}, ${scale[8]}, 100%)` },
      [`${name}-95`]: { value: `hsla({color.${name}}, ${scale[9]}, 100%)` },
    });
  }, {});

module.exports = tokenize({
  //   jobOrder: '350, 43%',
  //   candidate: '146, 47%',
  //   contact: '33, 100%',
  //   company: '204, 71%,',
  //   lead: '315, 29%',

  // Are these HS? :^^^:
  gray: "0, 0%",
  red: "354, 67%",
  pink: "324, 56%",
  orange: "13, 81%",
  yellow: "37, 91%",
  green: "89, 47%",
  teal: "165, 55%",
  aqua: "196, 68%",
  blue: "214, 68%",
  indigo: "257, 58%",
  violet: "269, 30%",
});
