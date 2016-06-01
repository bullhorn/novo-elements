import 'phantomjs-polyfill';
import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import {
    TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing/browser';
import {
    setBaseTestProviders,
    afterEach, beforeEach, beforeEachProviders,
    describe, it, expect,
    inject, injectAsync,
    async, getTestInjector
} from '@angular/core/testing';

import { NOVO_ELEMENTS_LABELS_PROVIDERS } from './../src/novo-elements';

getTestInjector().addProviders(NOVO_ELEMENTS_LABELS_PROVIDERS);
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

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

Error.stackTraceLimit = Infinity;

let testContext = require.context('../src', true, /\.spec\.js/);
testContext.keys().forEach(testContext);
