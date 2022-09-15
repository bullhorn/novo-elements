const { tokenize } = require("../../utils/token-utils.js");

module.exports = tokenize({
  theme: {
    background: {
      body: "{color.white}",
      main: "{color.bright}",
      bright: "{color.white}",
      muted: "{color.sand}",
    },
    ...{
      selection: "{color.blue-50}",
      selectionLight: "{color.blue-70}",
      selectionDark: "{color.blue-30}",
      selectionContrast: "{color.blue-30-contrast}",
    },
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
