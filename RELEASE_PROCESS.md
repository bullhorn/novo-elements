# Release Process

[Bullhorn Developer Branch Ops](https://bullhorn.atlassian.net/wiki/x/IAAFTg)

## Automatic

Run the [release action](https://github.com/bullhorn/novo-elements/actions/workflows/release.yml) and select the branch to release from.

- **master**: stable release (e.g. `13.6.1`). Publishes to npm on the `latest` tag, then pushes a
  `chore(Release): x.y.z [skip ci]` commit to master that bumps the version in every `package.json`
  (see [tools/release/bump-version-files.js](tools/release/bump-version-files.js)) and updates `CHANGELOG.md`.
- **next** / **beta**: prerelease (e.g. `13.7.0-next.1`). Publishes to npm on the `next` / `beta` tag.
  No commit is pushed; only the git tag.

Check **Dry Run** to see the next version and release notes without publishing, tagging, or pushing.

The version is decided by semantic-release from commit messages since the last release:

| Commit type                                    | Release |
| ---------------------------------------------- | ------- |
| `breaking()` or a `BREAKING CHANGE:` footer    | major   |
| `feat()`, `refactor()`                         | minor   |
| `fix()`, `perf()`, `chore()`                   | patch   |

Other types (`docs`, `style`, `test`, ...) do not trigger a release.

The action pushes to master with `secrets.API_TOKEN_GITHUB`, which must belong to a repo admin to bypass
branch protection. The first step of the action fails early if it does not.

### Manual (if automatic fails)

    # Update the version in package.json, package-lock.json, projects/novo-elements/src/package.json,
    #   projects/novo-examples/package.json, projects/schematics/package.json, tools/vitest-builder/package.json
    # Add an entry to CHANGELOG.md
    # npm test
    # npm run lint
    # npm run build:ci
    # Commit, then tag the commit as vX.Y.Z and push the commit and tag
    # cd dist/novo-elements && npm publish
