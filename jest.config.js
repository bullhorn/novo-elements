module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/novo-elements/tsconfig.spec.json',
      diagnostics: true,
      stringifyContentPathRegex: '\\.html$',
    },
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', 'novo-elements/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  modulePathIgnorePatterns: ['/dist/', '/novo-elements/package.json'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  testRunner: 'jest-jasmine2',
};
