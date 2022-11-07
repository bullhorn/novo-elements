const { existsSync } = require('fs');
const path = require('path');


// writeFileSync('./updated-modules.txt', '')
// const data = JSON.parse(readFileSync('./updated-modules.json'));


// function findModuleInData(module) {

// }

module.exports = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  
  const rootDir = './projects/novo-elements';
  const rootPath = path.resolve(rootDir)
   j(fileInfo.source)
    .find(j.ExportAllDeclaration)
    .forEach((node) => {
      let depth = 0
      let modulePath = path.dirname(path.resolve(fileInfo.path));
      const exportDeclaration = node.value;
      const from = exportDeclaration.source?.value;
      if(from) {
        if(existsSync(path.join(modulePath, from))) {
          let dirName = modulePath.split(path.sep).pop()
          exportDeclaration.source.value = `@novo-elements/${dirName}/${from}`
        } else {
          console.log(`Source ${from} does not exist`)
        }
        
      }      
    })

    return j(fileInfo.source).toSource();
};
