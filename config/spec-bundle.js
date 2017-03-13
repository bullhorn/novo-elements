Error.stackTraceLimit = Infinity;
// Language Tools
require('core-js/es6');
require('core-js/es7/reflect');
// Typescript emit helpers polyfill
require('ts-helpers');
// Zone
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');
// RXJS
require('rxjs/Rx');
// NG2
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);
const testContext = require.context('../src/', true, /\.spec\.ts/);
testContext.keys().map(testContext);
