export default {
  displayName: 'novo-elements',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  // collectCoverage: true,
  // coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'html'],
  // coveragePathIgnorePatterns: ['/node_modules/'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // reporters: [ "default", "jest-junit" ],
  coverageDirectory: './coverage',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
