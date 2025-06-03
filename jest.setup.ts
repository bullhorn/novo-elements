import 'jest-preset-angular/setup-jest';
// polyfill
globalThis.ResizeObserver = globalThis.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));