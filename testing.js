var simpleGit = require('simple-git');

simpleGit().diffSummary(['HEAD', 'master'], (err, data) => {
    if (err) {
        throw err;
    }
    console.log('D', data);
});
