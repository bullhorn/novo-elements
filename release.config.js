const { versionFiles } = require('./tools/release/bump-version-files');

const isMaster = process.env.GITHUB_REF_NAME === 'master';

module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    {
      "name": "next",
      "prerelease": true,
    },
    {
      "name": "beta",
      "prerelease": true,
    },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'breaking', release: 'major' },
          { type: 'chore', release: 'patch' },
          { type: 'refactor', release: 'minor' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/novo-elements',
      },
    ],
    ...(isMaster
      ? [
          './tools/release/bump-version-files.js',
          [
            '@semantic-release/git',
            {
              assets: [...versionFiles, 'CHANGELOG.md'],
              message: 'chore(Release): ${nextRelease.version} [skip ci]',
            },
          ],
          [
            '@semantic-release/github',
            {
              successComment: false,
              failComment: false,
              releasedLabels: false,
            },
          ],
        ]
      : []),
  ],
  repositoryUrl: 'https://github.com/bullhorn/novo-elements',
};
