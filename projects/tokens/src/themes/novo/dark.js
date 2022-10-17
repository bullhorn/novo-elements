const { tokenize } = require("../../utils/token-utils.js");

module.exports = tokenize({
  theme: {
    background: {
      body: "{color.midnight}",
      main: "{color.darkness}",
      bright: "{color.moonlight}",
      muted: "{color.neutral}",
    },
    ...{
      selection: "{color.blue-50}",
      selectionLight: "{color.blue-70}",
      selectionDark: "{color.blue-30}",
      selectionContrast: "{color.blue-30-contrast}",
    },
  },
});
