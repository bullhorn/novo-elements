Error.stackTraceLimit = Infinity;

import 'phantomjs-polyfill';
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'rxjs/Rx';

import { TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS } from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders, afterEach, beforeEach, beforeEachProviders, describe, it, expect, inject, injectAsync, async, getTestInjector } from '@angular/core/testing';
import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../src/novo-elements';

// Setup the test injector and set base providers
getTestInjector().addProviders(NOVO_ELEMENTS_LABELS_PROVIDERS);
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// Assign all these to the global namespace
Object.assign(global, {
    afterEach,
    beforeEach,
    beforeEachProviders,
    describe,
    it,
    expect,
    inject,
    injectAsync,
    async
});

// Get all the spec files
let testContext = require.context('../src', true, /\.spec\.js/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// requires and returns all modules that match
requireAll(testContext);
