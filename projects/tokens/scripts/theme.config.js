module.exports = (theme, mode) => {
  return {
    // tokens: {
    //   ...tkns,
    // },
    include: ["src/tokens/index.js"],
    source: [`src/themes/${theme}/${mode}.js`],
    platforms: {
      css: {
        // prefix: "theme",
        transformGroup: "bh-css",
        buildPath: "css/",
        files: [
          {
            destination: `${theme}-${mode}.css`,
            format: "css/variables",
            filter: "fromSource",
            options: {
              outputReferences: true,
              showFileHeader: false,
            },
          },
        ],
      },
    },
  };
};
