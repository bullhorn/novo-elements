const { tokenize } = require("../../utils/token-utils.js");

module.exports = tokenize({
  font: {
    size: {
      base: "12px",
    },
  },
  theme: {
    background: {
      color: "{color.white}", // body Color
      secondary: "{color.bright}", // alt background color for containers
      muted: "{color.silver}", // a muted state for backgrounds, do we need this
      disabled: "{color.sand}", // Background color for whenever a components is disabled
      overlay: "#0000001f",
    },
    text: {
      color: "{color.charcoal}",
      secondary: "{color.neutral}",
      muted: "{color.slate}",
      disabled: "{color.slate}",
      inverted: "{color.white}",
    },
    ...{
      selection: "{color.blue-50}",
      selectionLight: "{color.blue-70}",
      selectionDark: "{color.blue-30}",
      selectionContrast: "{color.blue-30-contrast}",
    },
  },
  card: {
    shadow: "{shadow.low}",
  },
  fab: {
    shadow: "{shadow.mid}",
  },
  toast: {
    shadow: "{shadow.high}",
  },
  drawer: {
    shadow: "{shadow.high}",
  },
  button: {
    height: "2.7rem",
    borderRadius: "8px",
    small: {
      height: "20px",
    },
    large: {
      height: "40px",
      borderRadius: "40px",
    },
  },

  // Actions
});

// Button sm, md, lg
// height

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
