const { appendFileSync, existsSync, writeFileSync } = require( 'fs');
const path = require('path');

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

const outputFile = `./updated-modules-${generateRandomInteger(1000)}.txt`;

writeFileSync(outputFile, '')

module.exports = (fileInfo, api) => {
  const j = api.jscodeshift;
  const rootDir = './projects/novo-elements';
  const rootPath = path.resolve(rootDir)

  let depth = 0
  let modulePath = path.dirname(path.resolve(fileInfo.path));
  while(!existsSync(path.join(modulePath, 'ng-package.json')) && depth < 4) {
    modulePath = path.resolve(modulePath, '..')
    depth++;
  }
  
  if(depth >= 4) {
    // didn't find module
    return null;
  }
  modulePath = modulePath.replace(rootPath, '')

  const appendExportIdentifier = (id) => {
    appendFileSync(outputFile, `${id.name}|${modulePath}\n`)
  }

  j(fileInfo.source)
    .find(j.ExportNamedDeclaration)
    .forEach((node) => {
      const exportDeclaration = node.value;
      if(exportDeclaration.declaration.id) {
        appendExportIdentifier(exportDeclaration.declaration.id)
      } else if(exportDeclaration.declaration.declarations) {
        exportDeclaration.declaration.declarations.forEach(it => {
          appendExportIdentifier(it.id);
        })
      }
    })

    return j(fileInfo.source).toSource();
};
