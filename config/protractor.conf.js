require('babel-core/register');
const helpers = require('./helpers');

const config = {
    // base url where the app is being ran
    baseUrl: 'http://localhost:3000/',

    // where to find our protractor specs
    specs: [
        helpers.root('src/**/**.e2e.js'),
        helpers.root('src/**/*.e2e.js')
    ],

    // files to exclude
    exclude: [],

    // framework to use
    framework: 'jasmine2',

    // max timeout for all scripts
    allScriptsTimeout: 110000,

    // jasmine settings
    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },

    // The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster.
    directConnect: true,

    // protractor capabilities
    multiCapabilities: [{
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true', 'no-sandbox']
        }
    }, {
        'browserName': 'firefox'
    }],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
    },

    // selenium server location
    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

    // wait for ng2 to boot up
    useAllAngular2AppRoots: true
};

// special travis settings for running in CI
if (process.env.TRAVIS) {
    config.multiCapabilities[0].chromeOptions.binary = helpers.root('/chrome-linux/chrome');
}

exports.config = config;
