/// <reference types="vitest/globals" />
import 'zone.js';
import 'zone.js/testing';
import 'reflect-metadata';
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { afterEach, beforeAll, beforeEach, vi } from 'vitest';

// ==============================================================================
// Module mocks for const enums incompatible with isolatedModules/SWC.
// novo-elements/utils exports `const enum Key`, which SWC cannot inline.
// Replace with a plain object so specs can import Key.ArrowDown etc.
// ==============================================================================
vi.mock('novo-elements/utils', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  const mock = {
    ...actual,
    Key: {
      ArrowDown: 'ArrowDown',
      ArrowUp: 'ArrowUp',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
      Enter: 'Enter',
      Escape: 'Escape',
      Space: ' ',
      Tab: 'Tab',
      Backspace: 'Backspace',
      Delete: 'Delete',
      Home: 'Home',
      End: 'End',
      PageDown: 'PageDown',
      PageUp: 'PageUp',
    },
  };
  // Proxy with `has` trap so Vitest doesn't throw "export not defined" for
  // type-only imports that SWC strips (interfaces, type aliases).
  return new Proxy(mock, {
    has(_target, _prop) {
      return true;
    },
  });
});

// Guard for browser environment
if (typeof window === 'undefined') {
  throw new Error('Vitest setup requires browser environment (happy-dom). Check vitest.config.ts');
}

// ==============================================================================
// Track global event listeners for cleanup between tests (isolate: false)
// ==============================================================================
const trackedListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject }> = [];

function trackListeners(target: EventTarget) {
  const origAdd = target.addEventListener.bind(target);
  const origRemove = target.removeEventListener.bind(target);

  target.addEventListener = function (type: string, listener: EventListenerOrEventListenerObject, options?: any) {
    trackedListeners.push({ target, type, listener });
    return origAdd(type, listener, options);
  } as typeof target.addEventListener;

  target.removeEventListener = function (type: string, listener: EventListenerOrEventListenerObject, options?: any) {
    const idx = trackedListeners.findIndex((e) => e.target === target && e.type === type && e.listener === listener);
    if (idx >= 0) trackedListeners.splice(idx, 1);
    return origRemove(type, listener, options);
  } as typeof target.removeEventListener;
}

trackListeners(window);
trackListeners(document);

// ==============================================================================
// Polyfills & Browser APIs
// ==============================================================================

(globalThis as any).ngDevMode = true;

try {
  Object.defineProperty(window, 'CSS', { value: null });
} catch {
  /* Already defined */
}

try {
  Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });
} catch {
  /* Already defined */
}

if (!window.ResizeObserver) {
  Object.defineProperty(window, 'ResizeObserver', {
    value: class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });
}

if (!window.IntersectionObserver) {
  Object.defineProperty(window, 'IntersectionObserver', {
    value: class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });
}

// Force-override MutationObserver — happy-dom's implementation doesn't fully work
// with Angular CDK's OverlayRef._detachContentWhenEmpty
Object.defineProperty(window, 'MutationObserver', {
  writable: true,
  configurable: true,
  value: class MutationObserver {
    observe() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  },
});

// Polyfill window.event
if (typeof (globalThis as any).event === 'undefined') {
  (globalThis as any).event = undefined;
}

// Polyfill deprecated createEvent/initMouseEvent (used by data-table specs)
const _origCreateEvent = document.createEvent.bind(document);
(document as any).createEvent = function (type: string) {
  if (type === 'MouseEvents' || type === 'MouseEvent') {
    const evt: any = new MouseEvent('click');
    evt.initMouseEvent = function (
      evtType: string,
      canBubble: boolean,
      cancelable: boolean,
      view: any,
      detail: number,
      screenX: number,
      screenY: number,
      clientX: number,
      clientY: number,
    ) {
      Object.defineProperties(this, {
        type: { value: evtType, writable: true },
        bubbles: { value: canBubble },
        cancelable: { value: cancelable },
        view: { value: view },
        detail: { value: detail },
        screenX: { value: screenX },
        screenY: { value: screenY },
        clientX: { value: clientX, writable: true },
        clientY: { value: clientY, writable: true },
      });
    };
    return evt;
  }
  return _origCreateEvent(type);
};

// Polyfill FileReader.readAsDataURL
if (typeof FileReader !== 'undefined' && !FileReader.prototype.readAsDataURL) {
  FileReader.prototype.readAsDataURL = function (_blob: Blob) {
    setTimeout(() => {
      (this as any).result = 'data:application/octet-stream;base64,';
      this.dispatchEvent(new Event('load'));
    }, 0);
  };
}

// Prevent happy-dom from making real HTTP requests
vi.stubGlobal(
  'open',
  vi.fn(() => null),
);

if ((window as any).happyDOM?.settings) {
  (window as any).happyDOM.settings.fetch = {
    ...(window as any).happyDOM.settings.fetch,
    interceptor: {
      beforeAsyncRequest: async ({ request }: any) => {
        if (process.env.DEBUG_TESTS) {
          console.warn(`[unmocked fetch] ${request?.method || 'GET'} ${request?.url}`);
        }
        return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
      },
      beforeSyncRequest: ({ request }: any) => {
        if (process.env.DEBUG_TESTS) {
          console.warn(`[unmocked fetch] ${request?.method || 'GET'} ${request?.url}`);
        }
        return { status: 200, statusMessage: 'OK', headers: {}, body: Buffer.from('{}') };
      },
    },
  };
}

// Suppress unhandled async errors that leak from zone.js
process.setMaxListeners(0);
process.on('unhandledRejection', (reason) => {
  if (process.env.DEBUG_TESTS) {
    console.warn('[suppressed unhandledRejection]', reason);
  }
});
process.on('uncaughtException', (err) => {
  if (process.env.DEBUG_TESTS) {
    console.warn('[suppressed uncaughtException]', err);
  }
});

// ==============================================================================
// Global Test Session Setup
// ==============================================================================

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
  });

  globalThis.console.log = vi.fn();
  globalThis.console.debug = vi.fn();
  globalThis.console.info = vi.fn();
  const origWarn = console.warn.bind(console);
  const origError = console.error.bind(console);
  globalThis.console.warn = vi.fn((...args: any[]) => {
    if (process.env.DEBUG_TESTS) origWarn(...args);
  });
  globalThis.console.error = vi.fn((...args: any[]) => {
    if (process.env.DEBUG_TESTS) origError(...args);
  });
}, 60000);

beforeEach(() => {
  TestBed.resetTestingModule();
});

afterEach(() => {
  // Remove all global event listeners registered during the test
  while (trackedListeners.length > 0) {
    const { target, type, listener } = trackedListeners.pop()!;
    target.removeEventListener(type, listener);
  }

  // Clear localStorage to prevent cross-file contamination
  try {
    localStorage.clear();
  } catch {
    /* may not be available */
  }

  // Clean up any DOM elements leaked to document.body by component fixtures
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
});
