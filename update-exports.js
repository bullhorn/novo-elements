const { existsSync } = require('fs');
const path = require('path');


// writeFileSync('./updated-modules.txt', '')
// const data = JSON.parse(readFileSync('./updated-modules.json'));


const kebabCase = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
  
module.exports.parser = 'ts';
module.exports = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  
  const rootDir = './projects/novo-elements';
  const rootPath = path.resolve(rootDir)
  return j(fileInfo.source)
    .find(j.ExportAllDeclaration)
    .filter(({value}) => value.source.value.startsWith('.'))
    .forEach((node) => {
      node.value.source.value = kebabCase(node.value.source.value);
    }).toSource({ quote: 'single' })

};
