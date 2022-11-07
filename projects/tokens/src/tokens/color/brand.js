const core = require("./core");
const { tokenize } = require("../../utils/token-utils");

module.exports = tokenize({
  navigation: "{color.navigation}",
  presentation: "{color.steel}",
  bullhorn: "{color.orange-50}",
  pulse: "{color.aqua-50}",
});
