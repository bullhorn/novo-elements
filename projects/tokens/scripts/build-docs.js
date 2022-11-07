const fs = require("fs");
const Logger = require("loggy");
const handlebars = require("handlebars");

const colors = [
  "red",
  "pink",
  "orange",
  "yellow",
  "green",
  "teal",
  "aqua",
  "blue",
  "indigo",
  "violet",
  "gray",
];
const swatches = [
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "95",
  "98",
].reverse();
// const swatches = [
//   "50",
//   "100",
//   "200",
//   "300",
//   "400",
//   "500",
//   "600",
//   "700",
//   "800",
//   "900",
// ];

const semanticColors = [
  // "primary",
  // "secondary",
  "selection",
  "success",
  "warning",
  "error",
  "info",
];
const accents = ["light", "dark"];

const generate = async (config) => {
  try {
    let dir = config.directory;
    const htmlSource = fs.readFileSync("./scripts/templates/index.html.hbs", {
      encoding: "utf-8",
    });
    const cssSource = fs.readFileSync("./scripts/templates/index.css.hbs", {
      encoding: "utf-8",
    });
    const htmlTemplate = handlebars.compile(htmlSource);
    const cssTemplate = handlebars.compile(cssSource);

    const html = htmlTemplate({ colors, accents, swatches, semanticColors });
    const css = cssTemplate({ colors, accents, swatches, semanticColors });

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/index.html`, html, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.success(`Done!`);
    });
    fs.writeFile(`${dir}/index.css`, css, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.success(`Done!`);
    });
    fs.copyFileSync(`./css/variables.css`, `${dir}/variables.css`);
    fs.copyFileSync(`./css/novo-base.css`, `${dir}/novo-base.css`);
  } catch (err) {
    Logger.error("✗ An error occurred", err);
  }
};

generate({
  directory: "./docs",
});
