# Release Process

[Bullhorn Developer Branch Ops](https://bullhorn.atlassian.net/wiki/x/IAAFTg)

## Automatic

Run the [release action](https://github.com/bullhorn/novo-elements/actions/workflows/release.yml).

The release version number will be decided based on commits tagged with
"feat()", "fix()", "chore()", "breaking()", "refactor()" messages.
Others may not trigger a release.

### Manual (if automatic fails)

    # Manually update the projects/*/package.json to the version you want
    # TAG
    # npm test
    # npm run lint
    # npm run build
    # CD INTO EACH PROJECT IN DIST
    # npm publish