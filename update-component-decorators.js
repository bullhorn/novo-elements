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
    .find(j.ClassDeclaration)
    .filter(({value}) => value.decorators.length)
    .filter(({value}) => value.decorators[0].expression?.callee?.name === 'Component')
    // .filter(({value}) => value.expression.callee?.name === 'Component')
    .forEach((node) => {
      for(let decorator of node.value.decorators) {
        for(let argument of decorator.expression.arguments) {
          for( let prop of argument.properties) {
            if(prop.key.name === 'templateUrl') {
              console.log('change templateUrl', prop.value.value)     
              prop.value.value = kebabCase(prop.value.value)
            }
            if(prop.key.name === 'styleUrls') {
              prop.value.elements.forEach((lit) => {
                lit.value = kebabCase(lit.value);
              })
            }
          }
        }
      } 
    }).toSource({ quote: 'single' })

};
