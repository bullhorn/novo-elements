'use strict';

const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, 'projects/novo-elements/src');
const distFolder = path.join(rootFolder, 'dist/novo-elements');

async function copyScssFiles() {
  try {
    await _relativeCopy('**/*.scss', srcFolder, distFolder);
    console.log('SCSS files copy succeeded.');
  } catch (error) {
    console.error('Build failed. See below for errors.\n');
    console.error(error);
    process.exit(1);
  }
}

async function _relativeCopy(fileGlob, from, to) {
  const files = await glob(fileGlob, { cwd: from, nodir: true, });
  for (const file of files) {
    const origin = path.join(from, file);
    const dest = path.join(to, file);
    const data = await fs.readFile(origin, 'utf-8');
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, data);
  }
}

copyScssFiles();
