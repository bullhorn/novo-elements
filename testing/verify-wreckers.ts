import { globIterate, globIterateSync, globStream, globSync } from 'glob';
import { execSync } from 'node:child_process';

const patches = globIterateSync('projects/novo-e2e/wreckers/*.patch');
globIterate
let iter = patches.next();
while (!iter.done) {
    const patchFile = iter.value;
    console.log(`\n---Verifying e2e failure on broken patch: ${patchFile}---`);
    execSync(`git apply --ignore-whitespace "${patchFile}"`);
    try {
        console.log('Rebuilding novo-elements w/ wrecker...');
        execSync('rm -r .angular/cache');
        execSync('npm run build');
        let didNotFail = false;
        try {
            console.log('Running e2e test suite...');
            execSync('npm run e2e:headless');
            didNotFail = true;
        } catch(ex) {
            console.log('Received expected failure. Continuing to next.');
        }
        if (didNotFail) {
            throw new Error(`Broken patch ${patchFile} should have failed e2e tests, but didn't.`);
        }
    } finally {
        execSync(`git apply -R --ignore-whitespace "${patchFile}"`);
    }
}