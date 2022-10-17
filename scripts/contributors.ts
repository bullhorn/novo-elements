import { writeFile } from 'fs';
import gh from 'gh-got';
import mm from 'micromatch';
import fetch from 'node-fetch';
import path from 'path';
import { promisify } from 'util';

const writeAsync = promisify(writeFile);

function getRepo(baton) {
  const pkg = require(path.resolve(baton.dir, 'package.json'));
  const repo = pkg.repository && (pkg.repository.url || pkg.repository);

  if (!repo) {
    throw new Error(`${path.join(baton.dir, 'package.json')}: repository is not set.`);
  }
  baton.repo = repo.replace(/https?:\/\/[^\/]+\//, '').replace('.git', '');
  return baton;
}

function retrieve(baton) {
  const searchParams = {
    ['per_page']: baton.limit,
  };

  return gh(`repos/${baton.repo}/contributors`, { searchParams }).then(async (res) => {
    baton.contributors = res.body.sort((a, b) => b.contributions - a.contributions);
    for (let contributor of baton.contributors) {
      contributor.avatar_url = await fetch(contributor.avatar_url)
        .then((r) => r.buffer())
        .then((buf) => `data:image/jpeg;base64,` + buf.toString('base64'));
    }

    return baton;
  });
}

function filter(baton) {
  if (!baton.exclude) return baton;

  const isExcluded = mm.matcher(baton.exclude);
  baton.contributors = baton.contributors.filter((contrib) => !isExcluded(contrib.login));
  return baton;
}

function html(baton) {
  const labelGap = 25;
  const svgWidth = (baton.imageSize + labelGap) * baton.columns;
  const svgHeight = Math.ceil(baton.contributors.length / baton.columns) * (baton.imageSize + labelGap);

  baton.html = baton.contributors.reduce((html, contributor, index) => {
    const x = (index % baton.columns) * (baton.imageSize + labelGap);
    const y = Math.floor(index / baton.columns) * (baton.imageSize + labelGap);
    const lx = x + baton.imageSize / 2;
    const ly = y + labelGap / 2 + baton.imageSize;
    /* eslint-disable */
    const line = `
      <a xlink:href="${contributor.html_url}" class="avatar-svg" target="_blank" rel="nofollow sponsored" id="${contributor.login}">
        <image x="${x}" y="${y}" clip-path="url(#mask)" width="${baton.imageSize}" height="${baton.imageSize}" xlink:href="${contributor.avatar_url}" />
        <text x="${lx}" y="${ly}" class="small" dominant-baseline="middle" text-anchor="middle">${contributor.login}</text>
      </a>`;
    /* eslint-enable */
    html += line.replace(/\n/gm, '').replace(/\s{2,}/g, '') + '\n';
    return html;
  }, '');

  baton.html = `
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${svgWidth}"
      height="${svgHeight}">
    <style>
      .avatar-svg { cursor: pointer; border-radius: 50%; }
      .small { font: 12px sans-serif; }
    </style>
    <defs>
      <clipPath id="mask" clipPathUnits="objectBoundingBox">
        <circle cx="0.5" cy="0.5" r="0.5"></circle>
      </clipPath>
    </defs>

    ${baton.html}
    </svg>
  `;
  return baton;
}

const update = async (baton) => {
  const filepath = path.join(baton.dir, baton.outFile);
  await writeAsync(filepath, baton.html);
  return baton;
};

const start = async (dir, opts) => {
  opts = opts || {};
  opts.dir = dir || '.';
  opts.limit = opts.limit || 60;
  opts.imageSize = opts.imageSize || 64;
  opts.columns = opts.columns || 8;
  opts.outFile = 'contributors.svg';

  return Promise.resolve(opts).then(getRepo).then(retrieve).then(filter);
};

const end = (prop) => {
  return (baton) => baton[prop];
};

/* ────────────────────────────────────────────────────────────────────────── */

function contributors(dir, opts) {
  return start(dir, opts).then(end('contributors'));
}

contributors.html = function (dir, opts) {
  return start(dir, opts).then(html).then(end('html'));
};

contributors.update = function (dir, opts) {
  return start(dir, opts).then(html).then(update).then(end('html'));
};

contributors.update('.', {});
