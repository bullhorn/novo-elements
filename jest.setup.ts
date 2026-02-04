import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// polyfill
globalThis.ResizeObserver = globalThis.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

// Mock angular-imask to avoid ESM import issues in tests
jest.mock('angular-imask', () => {
  const { NgModule, Directive, Input } = require('@angular/core');

  @Directive({
    selector: '[imask]',
    standalone: true
  })
  class IMaskDirective {
    @Input() imask: any;
  }

  @NgModule({
    imports: [IMaskDirective],
    exports: [IMaskDirective],
  })
  class IMaskModule {}

  return { IMaskModule, IMaskDirective };
});

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Restore all mocks after each test to prevent test pollution
// For tests using jest.spyOn on shared instances, we need to restore
// but we do this AFTER the test assertions have run
afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});