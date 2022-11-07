const { tokenize } = require("../../utils/token-utils");

module.exports = {
  ...tokenize({
    fontFamily: `{font.family.mono}`,
    backgroundColor: `{theme.background.color}`,
    textColor: `{theme.text.color}`,
    tagColor: `{color.blue-30}`,
    propertyColor: `{color.gray-40}`,
    valueColor: `{color.gray-20}`,
    commentColor: `{color.aqua-30}`,
  }),
  kbd: tokenize({
    backgroundColor: `{theme.background.color}`,
    textColor: `{theme.text.color}`,
  }),
};
