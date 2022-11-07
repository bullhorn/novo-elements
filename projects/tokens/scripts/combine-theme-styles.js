/* eslint-disable import/no-extraneous-dependencies, no-console */
const fs = require("fs");
const path = require("path");

const safeReadFile = (file) => {
  try {
    if (fs.existsSync(file)) {
      return fs.readFileSync(file, "utf8");
    }
  } catch {}
  return "";
};

const safeRemoveFile = (file) => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  } catch {}
};

const formatTheme = (path) => {
  const theme = safeReadFile(path);
  return theme.replace(":root {", "").replace("}", "");
};

const getLightMode = (themeName) => {
  const lightTheme = formatTheme(path.join("css", `${themeName}-light.css`));
  return `
    :root,
    [data-theme='${themeName}-light'] {
      color-scheme: light;
      ${lightTheme}
    }
  `;
};

const getDarkMode = (themeName) => {
  const darkTheme = formatTheme(path.join("css", `${themeName}-dark.css`));
  return `
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme='${themeName}-light']) {
        color-scheme: dark;
        ${darkTheme}
      }
    }
    [data-theme='${themeName}-dark'],
    :root[data-theme='${themeName}-dark'] {
      color-scheme: dark;
      ${darkTheme}
    }
  `;
};

const combineThemeModes = (themeName) => {
  const light = getLightMode(themeName);
  const dark = getDarkMode(themeName);
  const template = `
  /**
   * Do not edit directly
   * Generated on ${new Date().toLocaleDateString()}
   */
    ${light}
    ${dark}
  `;
  fs.writeFileSync(path.join("css", `theme-${themeName}.css`), template);
};

const cleanupBuildArtifacts = (theme) => {
  ["light", "dark"].forEach((mode) => {
    safeRemoveFile(path.join("css", `${theme}-${mode}.css`));
  });
};

const combineThemeStyles = (themes) => {
  try {
    themes.forEach((theme) => {
      console.log(`\n\n🌈☀️🌙 Combining ${theme} light & dark modes...`);
      combineThemeModes(theme);
      cleanupBuildArtifacts(theme);
    });
  } catch (error) {
    console.log(
      "————————————————————————————————————————————————————————————————————————————————————— \n"
    );
    console.error("⚠️  Something went wrong:", error);
    console.log(
      "\n————————————————————————————————————————————————————————————————————————————————————— \n\n"
    );
  }
};

module.exports = combineThemeStyles;
