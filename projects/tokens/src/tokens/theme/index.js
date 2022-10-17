const { tokenize } = require("../../utils/token-utils.js");

module.exports = tokenize({
  background: {
    color: "{color.white}", // body Color
    secondary: "{color.bright}", // alt background color for containers
    muted: "{color.silver}", // a muted state for backgrounds, do we need this
    disabled: "{color.sand}", // Background color for whenever a components is disabled
    overlay: "#0000001f",
  },
  text: {
    color: `{color.gray-10}`,
    secondary: `{color.gray-30}`,
    muted: `{color.gray-70}`,
    disabled: `{color.gray-50}`,
    code: `{color.red-30}`,
  },
  border: {
    color: `{color.gray-70}`,
    width: `{border.width.thin}`,
    radius: `{border.radius.round}`,
  },
  ...{
    selection: "{color.blue-50}",
    selectionLight: "{color.blue-70}",
    selectionDark: "{color.blue-30}",
    selectionContrast: "{color.blue-50-contrast}",
  },
  ...{
    success: "{color.green-50}",
    successLight: "{color.green-70}",
    successDark: "{color.green-30}",
    successContrast: "{color.green-50-contrast}",
  },
  ...{
    warning: "{color.yellow-95}",
    warningLight: "{color.yellow-90}",
    warningDark: "{color.yellow-80}",
    warningContrast: "{color.yellow-90-contrast}",
  },
  ...{
    error: "{color.red-50}",
    errorLight: "{color.red-70}",
    errorDark: "{color.red-30}",
    errorContrast: "{color.red-50-contrast}",
  },
  ...{
    info: "{color.aqua-50}",
    infoLight: "{color.aqua-70}",
    infoDark: "{color.aqua-30}",
    infoContrast: "{color.aqua-50-contrast}",
  },
});

// --background-body: #{$color-white};
// --background-main: #{$color-bright}; //efefef
// --background-bright: #{$color-white}; //f7f7f7
// --background-muted: #{$color-sand}; //f7f7f7
// --selection: #{$color-ocean}; //#9e9e9e;
// --text-main: #{$color-dark}; //#363636;
// --text-bright: #{$color-black};
// --text-muted: #{$color-slate}; //#70777f;
// --links: #{$color-ocean};
// --focus: #{$color-ocean};
// --border: #{$color-light}; //#dbdbdb;
// --code: #000;
// --animation-duration: 0.1s;
// --button-hover: #aaa;
// --scrollbar-thumb: #{$color-dark};
// --scrollbar-thumb-hover: #{$color-dark};
// --form-placeholder: #949494;
// --form-text: #000;
// --variable: #39a33c;
// --highlight: #ff0;
