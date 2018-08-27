'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, 'projects/novo-elements/src');
const distFolder = path.join(rootFolder, 'dist/novo-elements');

return Promise.resolve()
  .then(() => _relativeCopy('**/*.scss', srcFolder, distFolder))
  .then(() => console.log('SCSS files copy succeeded.'))
  .catch(e => {
    console.error('Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });

// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(
      fileGlob,
      {
        cwd: from,
        nodir: true,
      },
      (err, files) => {
        if (err) reject(err);
        files.forEach(file => {
          const origin = path.join(from, file);
          const dest = path.join(to, file);
          const data = fs.readFileSync(origin, 'utf-8');
          _recursiveMkDir(path.dirname(dest));
          fs.writeFileSync(dest, data);
          resolve();
        });
      },
    );
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
