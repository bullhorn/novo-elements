module.exports = {
  preset: 'jest-preset-angular',
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      }
    ]
  },
  moduleNameMapper: {
    '^novo-elements$': '<rootDir>/projects/novo-elements/src/index',
    '^novo-elements/(.*)$': '<rootDir>/projects/novo-elements/src/$1',
    '^novo-examples$': '<rootDir>/projects/novo-examples/src/index',
    '^novo-examples/(.*)$': '<rootDir>/projects/novo-examples/src/$1',
  },
  testMatch: [
    '<rootDir>/projects/**/*.spec.ts'
  ],
  roots: [
    '<rootDir>/projects'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'projects/novo-elements/**/*.ts',
    '!projects/novo-elements/**/*.spec.ts',
    '!projects/novo-elements/**/index.ts'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary', 'html'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testRunner: 'jest-jasmine2',
};
