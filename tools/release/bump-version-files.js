const fs = require('fs');

// Source package.json files that should carry the released version
const versionFiles = [
  'package.json',
  'package-lock.json',
  'projects/novo-elements/src/package.json',
  'projects/novo-examples/package.json',
  'projects/schematics/package.json',
  'tools/vitest-builder/package.json',
];

function prepare(pluginConfig, { nextRelease, logger }) {
  for (const file of versionFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const indent = raw.match(/^[ \t]+/m)?.[0] ?? '  ';
    const json = JSON.parse(raw);
    json.version = nextRelease.version;
    if (json.packages?.['']) {
      json.packages[''].version = nextRelease.version;
    }
    const eol = raw.endsWith('\n') ? '\n' : '';
    fs.writeFileSync(file, `${JSON.stringify(json, null, indent)}${eol}`);
    logger.log(`Set version ${nextRelease.version} in ${file}`);
  }
}

module.exports = { prepare, versionFiles };
