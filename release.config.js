module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    {
      "name": "next",
      "prerelease": true
    },
    {
      "name": "beta",
      "prerelease": true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/novo-elements',
      },
    ],
  ],
  repositoryUrl: 'https://github.com/bullhorn/novo-elements',
};