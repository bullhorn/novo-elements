module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
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
  testURL: 'http://localhost',
};
