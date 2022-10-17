module.exports = () => {
  return {
    source: ["src/tokens/index.js", "src/components/index.js"],
    platforms: {
      css: {
        transformGroup: "bh-css",
        buildPath: "css/",
        files: [
          {
            destination: `variables.css`,
            format: `css/variables`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      scss: {
        transformGroup: "scss",
        buildPath: "scss/",
        files: [
          {
            destination: "variables.scss",
            format: "scss/map-deep",
          },
        ],
      },
      js: {
        transformGroup: "js",
        files: [
          {
            format: "javascript/module",
            destination: "lib/variables.js",
          },
        ],
      },
      mjs: {
        transformGroup: "js",
        files: [
          {
            format: "javascript/esm",
            destination: "lib/variables.esm.js",
          },
        ],
      },
      json: {
        transformGroup: "js",
        files: [
          {
            format: "json/nested",
            destination: "lib/variables.json",
          },
        ],
      },
    },
  };
};
