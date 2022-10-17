const { tokenizeAssets } = require("../../utils/token-utils");

module.exports = {
  box: tokenizeAssets({
    empty: "src/assets/icons/box-empty.svg",
    checked: "src/assets/icons/box-checked.svg",
    unknown: "src/assets/icons/box-unknown.svg",
  }),
  radio: tokenizeAssets({
    empty: "src/assets/icons/radio-empty.svg",
    checked: "src/assets/icons/radio-checked.svg",
  }),
  select: tokenizeAssets({
    caret: "src/assets/icons/collapse.svg",
  }),
};
