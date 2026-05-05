import 'zone.js';
import 'zone.js/plugins/sync-test';
import 'zone.js/plugins/proxy';
import 'zone.js/testing';

/**
 * Patch Vitest's describe/test/beforeEach/afterEach functions so test code
 * always runs in a testZone (ProxyZone). This is required for fakeAsync/tick
 * to work in Vitest.
 *
 * Inlined from @analogjs/vitest-angular/setup-zone to avoid peer dep conflicts.
 */
const Zone = (globalThis as any)['Zone'];

if (Zone === undefined) {
  throw new Error('Missing: Zone (zone.js)');
}

if ((globalThis as any)['__vitest_zone_patch__'] === true) {
  throw new Error("'vitest' has already been patched with 'Zone'.");
}

(globalThis as any)['__vitest_zone_patch__'] = true;
const SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
const ProxyZoneSpec = Zone['ProxyZoneSpec'];

if (SyncTestZoneSpec === undefined) {
  throw new Error('Missing: SyncTestZoneSpec (zone.js/plugins/sync-test)');
}
if (ProxyZoneSpec === undefined) {
  throw new Error('Missing: ProxyZoneSpec (zone.js/plugins/proxy.js)');
}

const env = globalThis as any;
const ambientZone = Zone.current;

const syncZone = ambientZone.fork(new SyncTestZoneSpec('vitest.describe'));
function wrapDescribeInZone(describeBody: any) {
  return function (...args: any) {
    return syncZone.run(describeBody, null, args);
  };
}

const testProxyZone = ambientZone.fork(new ProxyZoneSpec());
function wrapTestInZone(testBody: any) {
  if (testBody === undefined) {
    return;
  }
  const wrappedFunc = function () {
    return testProxyZone.run(testBody, null, arguments);
  };
  try {
    Object.defineProperty(wrappedFunc, 'length', {
      configurable: true,
      writable: true,
      enumerable: false,
    });
    wrappedFunc.length = testBody.length;
  } catch (e) {
    return testBody.length === 0
      ? () => testProxyZone.run(testBody, null)
      : (done: any) => testProxyZone.run(testBody, null, [done]);
  }
  return wrappedFunc;
}

const bindDescribe = (self: any, originalVitestFn: any) =>
  function (...eachArgs: any) {
    return function (...args: any[]) {
      args[1] = wrapDescribeInZone(args[1]);
      return originalVitestFn.apply(self, eachArgs).apply(self, args);
    };
  };

const bindTest = (self: any, originalVitestFn: any) =>
  function (...eachArgs: any) {
    return function (...args: any[]) {
      args[1] = wrapTestInZone(args[1]);
      return originalVitestFn.apply(self, eachArgs).apply(self, args);
    };
  };

['describe'].forEach((methodName) => {
  const originalvitestFn = env[methodName];
  env[methodName] = function (...args: any[]) {
    args[1] = wrapDescribeInZone(args[1]);
    return originalvitestFn.apply(this, args);
  };
  env[methodName].each = bindDescribe(originalvitestFn, originalvitestFn.each);
  if (methodName === 'describe') {
    env[methodName].only = bindDescribe(originalvitestFn, originalvitestFn.only);
    env[methodName].skip = bindDescribe(originalvitestFn, originalvitestFn.skip);
  }
});

['test', 'it'].forEach((methodName) => {
  const originalvitestFn = env[methodName];
  env[methodName] = function (...args: any[]) {
    args[1] = wrapTestInZone(args[1]);
    return originalvitestFn.apply(this, args);
  };
  env[methodName].each = bindTest(originalvitestFn, originalvitestFn.each);
  env[methodName].only = bindTest(originalvitestFn, originalvitestFn.only);
  env[methodName].skip = bindTest(originalvitestFn, originalvitestFn.skip);
  if (methodName === 'test' || methodName === 'it') {
    env[methodName].todo = function (...args: any) {
      return originalvitestFn.todo.apply(this, args);
    };
  }
});

['beforeEach', 'afterEach', 'beforeAll', 'afterAll'].forEach((methodName) => {
  const originalvitestFn = env[methodName];
  env[methodName] = function (...args: any[]) {
    args[0] = wrapTestInZone(args[0]);
    return originalvitestFn.apply(this, args);
  };
});
