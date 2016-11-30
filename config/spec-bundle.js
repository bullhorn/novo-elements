Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');

// Typescript emit helpers polyfill
require('ts-helpers');
require('./matchers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

// RxJS
require('rxjs/Rx');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.getTestBed().initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);

/**
 * Add Providers (was removed)
 * @param providers
 */
function addProviders(providers) {
    if (!providers) {
        return;
    }
    testing.TestBed.configureTestingModule({
        providers: providers
    });
}

// Assign all these to the global namespace
Object.assign(global, {
    addProviders,
    inject: testing.inject
});

const testContext = require.context('../src', true, /\.spec\.ts/);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
const modules = requireAll(testContext);
