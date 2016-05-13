import test from 'ava';
import DOM from 'jsdom';

global.document = DOM.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.window.beforeEach = test.before;
global.window.afterEach = test.after;