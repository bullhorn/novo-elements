#!/usr/bin/env zx

import { run } from 'jscodeshift/src/Runner.js';

// VARIABLES 
const jscodeshift = run;
const writeJsonOptions = {
  spaces: 2
}
const codeShiftOptions = {
  parser: 'tsx'
}
const packagerJson = {
  "lib": {
    "entryFile": "index.ts"
  }
}

// BEGIN SCRIPT

// Install NX Workspace
await $`npm install --save-dev @nrwl/cli @nrwl/workspace`
await $`rm ./projects/novo-elements/index.ts`
await $`git mv -f ./projects/novo-elements/src/elements/common ./projects/novo-elements/common`
await $`mkdir -p ./projects/novo-elements/addons`
await $`git mv -f ./projects/novo-elements/src/elements/ace-editor ./projects/novo-elements/addons/ace-editor`
await $`git mv -f ./projects/novo-elements/src/elements/ckeditor ./projects/novo-elements/addons/ck-editor`
await $`git mv -f ./projects/novo-elements/src/elements/dragula ./projects/novo-elements/addons/dragula`

// Move Convience Modules
await $`mkdir -p ./projects/novo-elements/modules`
await $`git mv -f ./projects/novo-elements/src/novo-elements.module.ts ./projects/novo-elements/modules/novo-elements.module.ts`
await $`git mv -f ./projects/novo-elements/src/novo-elements.providers.ts ./projects/novo-elements/modules/novo-elements.providers.ts`

// Move Form Utils
await $`git mv -f ./projects/novo-elements/src/utils/form-utils ./projects/novo-elements/src/elements/form/utils`

// Move AppBridge
await $`git mv -f ./projects/novo-elements/src/utils/app-bridge ./projects/novo-elements/src/services/app-bridge`

// Move ComponentUtils
await $`git mv -f ./projects/novo-elements/src/utils/component-utils ./projects/novo-elements/src/services/component-utils`

// Fix Case
await makeFilesLowercase();

// Move everything else
await $`git mv -f ./projects/novo-elements/src/elements ./projects/novo-elements/src/components`
await $`git mv -f ./projects/novo-elements/src/* ./projects/novo-elements/. -k`
// await $`git rm -r ./projects/novo-elements/src`

await $`git mv -f ./tools ./scripts`
await $`mkdir -p ./scripts/nx`
await $`mkdir -p ./scripts/testing`
await $`git mv -f ./copy-scss.js ./scripts/copy-scss.js`
await $`git mv -f ./jest.setup.ts ./scripts/testing/jest.setup.ts`
await $`git mv -f ./utils/test-setup.ts ./scripts/testing/test-setup.ts`
await $`git mv -f ./snapshot-publish ./scripts/snapshot-publish`
// await $`mv ./decorate-angular-cli.js ./scripts/nx/`
// await $`git rm ./utils`

// Adding NG Packager Files
await addNgPackagerFiles();
await addPackageJson(path.resolve('./projects/novo-elements/addons'))
await addPackageJson(path.resolve('./projects/novo-elements/utils'))
await addPackageJson(path.resolve('./projects/novo-elements/services'))

await createNxWorkspaceFiles();
await updateTsConfig();

// Phase II
await findNewModules();
// await fixBarrelFiles();
// await updateTsImports();

// Add Update Barrel Files in certain dirs
await addBarrelFile('./projects/novo-elements/addons')
await addBarrelFile('./projects/novo-elements/common')
await addBarrelFile('./projects/novo-elements/components')
await addBarrelFile('./projects/novo-elements/pipes')
await addBarrelFile('./projects/novo-elements/services')
await addBarrelFile('./projects/novo-elements/utils')
await addBarrelFile('./projects/novo-elements/modules', true)
await addBarrelFile('./projects/novo-elements/common/directives', true)
await addBarrelFile('./projects/novo-elements')

await fixComponentDecorators();
await fixExportStatements();
await updateTsImports();

// Rename Root Directories
await $`git mv -f ./projects/novo-elements ./projects/elements`
await $`git mv -f ./projects/novo-examples ./projects/examples`

// Add thing for easy rollback
await $`rm -rf ./projects/novo-elements/src`
await $`git add ./projects/elements/\\*`
await $`git add ./projects/examples/\\*`
await $`git add ./scripts/\\*`


// END SCRIPT 

// FUNCTIONS

function exitWithError(errorMessage) {
  console.error(chalk.red(errorMessage));
  process.exit(1);
}

async function makeFilesLowercase() {
  let files = await glob(['projects/novo-elements/**/*.{html,scss,ts}'])
  const kebabCase = string => string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
  try {
    for (let file of files) {
      const dirName = path.dirname(file);
      const oldFileName = path.basename(file);
      const newFileName = kebabCase(oldFileName);
      if(oldFileName !== newFileName) {
        await $`git mv -f ${file} ${dirName}/${newFileName}`;
      }
    }
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
}

async function addBarrelFile(parentDirectory, includeFiles = false) {
  echo`writing ${chalk.yellow('index.ts')} to ${chalk.blue(parentDirectory)}`
  const list = await fs.readdir(parentDirectory, { withFileTypes: true })
  let dirName = parentDirectory.split(path.sep).pop()
  dirName = dirName==='novo-elements' ? '' : dirName;
  const contents = list
    .filter(fileOrDir => includeFiles || fileOrDir.isDirectory())
    .map((dir) => dir.name)
    .filter((dir) => !['styles', 'src', 'package.json', 'index.ts'].includes(dir))
    .map((dir) => {
      if(includeFiles) {
        return `export * from './${dir}';`;
      } else {
        return `export * from 'novo-elements/${dirName}/${dir}';`;
      }
    })
    .join('\n')
  
  await fs.writeFile(`${parentDirectory}/index.ts`, contents)
}

/**
 * Add package.json with ngPackager Config to each module directory.
 */
async function addPackageJson(directory) {
  echo`writing ${chalk.yellow('package.json')} to ${chalk.blue(directory)}`
  await fs.writeJson(`${directory}/ng-package.json`, packagerJson, writeJsonOptions)
}

 async function addNgPackagerFiles() {
  let modules = await glob(['projects/novo-elements/**/*.module.ts'])
  try {
    for (let module of modules) {
      const dir = path.dirname(module);
      await addPackageJson(dir)
    }
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
}

/**
 * create project.json for nx workspaces
 */
 async function createNxWorkspaceFiles() {
  let root = await fs.readJson('angular.json')
  try {
    // Move the json config for each project to the subdirectory
    for (let key of Object.keys(root.projects)) {
      const projectJson = root.projects[key];
      const projectFilePath = `${projectJson.root}/project.json`
      console.log(`making project.json for ${chalk.blue(key)}`)
      await fs.writeJson(projectFilePath, projectJson, writeJsonOptions)
      root.projects[key] = path.dirname(projectFilePath);
    }
    // update root properties based on nx workspace schema
    root['$schema'] =  "./node_modules/nx/schemas/workspace-schema.json"
    root.version = 2
    root.defaultProject = "demo"
    // update angular config to point to each config file
    await fs.writeJson('./angular.json', root, writeJsonOptions)
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
} 

async function updateTsConfig() {
  try {
    let file = await fs.readJson('tsconfig.json')
    // update novo-element path
    file.compilerOptions.paths["novo-elements"] = ["projects/elements/index"]
    file.compilerOptions.paths["novo-elements/*"] = ["projects/elements/*"]
    file.compilerOptions.paths["novo-examples"] = ["projects/examples/index"]
    file.compilerOptions.paths["novo-examples/*"] = ["projects/examples/*"]
    // write the changes back
    await fs.writeJson('./tsconfig.json', file, writeJsonOptions)
  } catch (error) {
    exitWithError(`Error: Required command ${error.message}`);
  }
} 

async function findNewModules() {
  console.log(`finding new import statements...`)
  
  const transformPath = path.resolve('./update-find-submodules.js');
  const paths = await glob(['projects/novo-elements/**/*.ts'])
  const res = await jscodeshift(transformPath, paths, codeShiftOptions)
  console.log(res)
  
  let modules = {}
  let txtFiles = await glob(['./updated-modules-*.txt'])
  for ( let txt of txtFiles ) {
    const modulesData = await fs.readFile(txt, {encoding: 'utf8'});
    modules = modulesData.split('\n').map(line => line.split('|')).reduce((res, [key, value]) => ({
      ...res,
      [key]: value
    }), modules);
    $`rm -f ${txt}`;
  }
  
  await fs.writeJson('./updated-modules.json', modules, writeJsonOptions);
  console.log(chalk.green('[done]'))
}

async function fixComponentDecorators() {
  // jscodeshift -t ./update-component-decorators.js ./projects/novo-elements/**/*.ts --parser=tsx
  console.log(`updating component decorators...`)
  const transformPath = path.resolve('./update-component-decorators.js');
  const paths = await glob(['projects/novo-elements/**/*.ts'])
  const res = await jscodeshift(transformPath, paths, codeShiftOptions)
  console.log(res)
  console.log(chalk.green('[done]'))
}

async function fixExportStatements() {
  // jscodeshift -t ./update-exports.js ./projects/elements/**/*.ts --parser=tsx
  // jscodeshift -t ./update-exports.js ./projects/elements/components/search/*.ts --parser=tsx
  console.log(`updating export statements...`)
  const transformPath = path.resolve('./update-exports.js');
  const paths = await glob(['projects/novo-elements/**/*.ts'])
  const res = await jscodeshift(transformPath, paths, codeShiftOptions)
  console.log(res)

  console.log(chalk.green('[done]'))
}

async function fixBarrelFiles() {
  console.log(`finding new export all statements...`)
  const transformPath = path.resolve('./update-barrel-files.js');
  const paths = await glob(['projects/novo-elements/**/index.ts'])
  const res = await jscodeshift(transformPath, paths, codeShiftOptions)
  console.log(res)

  console.log(chalk.green('[done]'))
}

async function updateTsImports() {  
  // jscodeshift -t ./update-imports-test.js ./projects/elements/components/breadcrumbs/breadcrumb.module.ts --parser=tsx
  console.log(`fixing import statements...`)
  const transformPath = path.resolve('./update-imports.js');
  const paths = await glob(['projects/novo-elements/**/*.ts'])
  const res = await jscodeshift(transformPath, paths, codeShiftOptions)
  console.log(res)
  //jscodeshift --parser tsx --extensions js,jsx,ts,tsx -t
  // jscodeshift -t ./update-find-modules.js ./projects/novo-elements/**.ts --parser=tsx
}


