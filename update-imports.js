const { appendFileSync, existsSync, readFileSync } = require( 'fs');
const path = require('path');

const data = JSON.parse(readFileSync('./updated-modules.json'));


function findCurrentModulePath(modulePath) {
  let depth = 0;
  while(!existsSync(path.join(modulePath, 'ng-package.json')) && depth < 4) {
    modulePath = path.resolve(modulePath, '..')
    depth++;
  }
  if(depth < 4) {
    return path.resolve(modulePath);
  }
  return false;
}

const kebabCase = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
  

module.exports = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const rootDir = './projects/novo-elements';
  const rootPath = path.resolve(rootDir)
  const fullDirPath = path.dirname(fileInfo.path)
  const relativeDirPath = fullDirPath.replace(rootPath, '');
  const currentFileModulePath = findCurrentModulePath(fullDirPath).replace(rootPath, '');
  const allImportSpecifiers = new Map()

  function findSpecifiersModulePath(spec) {
    if(data[spec]) {
      return path.resolve(path.join(rootPath, data[spec])).replace(rootPath, '');
    }
    return false;
  }

  const makeImport = (specifiers, mod) => {
    return j.importDeclaration(
      specifiers.map(spec => j.importSpecifier(j.identifier(spec))),
      j.stringLiteral(mod),
    );
  };

  const addAllNewImports = (lastImport) => {
    for (let [mod, specs] of allImportSpecifiers.entries()) {
      const modPath = mod.startsWith('/') ? `novo-elements${mod}` : mod
      // console.log('Insert After', specs, modPath)
      lastImport.insertAfter(makeImport(specs, modPath))
    }
  }

  const aggregateSpecifiers = (importSpecifier, importDeclaration) => {
    const spec = importSpecifier.value.local.name;
    const mod = kebabCase(importDeclaration.value.source.value);
    const currentModPath = path.resolve(path.join(relativeDirPath, mod));
    const currentRelativePath = currentModPath.replace(rootPath, '');
    const modPath = findSpecifiersModulePath(spec);
    
    if( !modPath ) {
      console.warn(`Did not find path for ${spec}`)
      const specs = allImportSpecifiers.get(mod) || []
      allImportSpecifiers.set(mod, [...specs, spec]);
    } else if( currentFileModulePath.includes(modPath)) {
      const specs = allImportSpecifiers.get(mod) || []
      allImportSpecifiers.set(mod, [...specs, spec]);
    } else if (allImportSpecifiers.has(modPath)) {
      const specs = allImportSpecifiers.get(modPath) || []
      allImportSpecifiers.set(modPath, [...specs, spec]);
    } else {
      allImportSpecifiers.set(modPath, [spec]);
    }
  };
 
  const processImportSpecifiers = (importDeclaration) => {
    return j(importDeclaration).find(j.ImportSpecifier).forEach((s) => aggregateSpecifiers(s, importDeclaration));
  };

  // Return True if somethin was transformed.
  const processImportDeclaration = (importDeclaration) => {
    // e.g. import 'styles.css'; // please Don't Touch these imports!
    if (importDeclaration.value.specifiers.length === 0) return false;
    const hadNewImports = processImportSpecifiers(importDeclaration);
    j(importDeclaration).remove();
    
    return hadNewImports;
  };

  root.find(j.ImportDeclaration)
    .filter(({value}) => value.source.value.startsWith('.'))
    .forEach(processImportDeclaration)
    
  addAllNewImports(root.find(j.ImportDeclaration).at(-1))  
  
  return root.toSource({ quote: 'single' })
    // .size() > 0 ? root.toSource(options.printOptions || { quote: "single" }) : null;
};
