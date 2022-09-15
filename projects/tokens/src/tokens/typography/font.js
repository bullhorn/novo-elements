const { tokenize } = require("../../utils/token-utils");

module.exports = {
  weight: tokenize({
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    heavy: "900",
  }),

  family: tokenize({
    // body: `'Roboto', Helvetica, Arial, sans-serif`,
    // mono: `'Roboto Mono', Menlo, Monaco, Consolas, "Courier New", monospace`,
    body: `'Montserrat', Helvetica, Arial, sans-serif`,
    mono: `'Fira Code', Menlo, Monaco, Consolas, "Courier New", monospace`,
    base: `{font.family.body.value}`,
  }),

  size: tokenize({
    base: "10px",
    body: "1.3rem", // body, form, p
    xs: "1.0rem", // caption
    sm: "1.2rem", // label
    md: "1.3rem", // input, text, button
    lg: "1.6rem", // ??
    xl: "2.0rem", // title --was 1.8
    "2xl": "2.6rem",
    "3xl": "3.2rem",
    "4xl": "4rem",
  }),

  spacing: tokenize({
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  }),

  height: tokenize({
    normal: "normal",
    none: "1",
    shorter: "1.25",
    short: "1.375",
    base: "1.5",
    tall: "1.625",
    taller: "2",
  }),

  // color: tokenize({
  //   body: "{theme.text.primary}",
  //   link: "{theme.selection}",
  //   caption: "{theme.text.secondary}",
  //   label: "{theme.text.secondary}",
  //   text: "{theme.text.primary}",
  //   title: "{theme.text.primary}",
  //   button: "{theme.text.primary}",
  // }),
};
