#Release Process

## Automatic

    # On the Github Actions Tab, run the Workflow for "Release Novo Elements" 


### Manual (if automatic fails)
    # Manually update the projects/*/package.json to the version you want
    # TAG
    # npm test
    # npm run lint
    # npm run build
    # CD INTO EACH PROJECT IN DIST
    # npm publish
