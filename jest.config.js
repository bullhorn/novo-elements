module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jest-environment-jsdom-fourteen',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/novo-elements/tsconfig.spec.json',
      diagnostics: true,
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['jest-preset-angular/build/InlineFilesTransformer', 'jest-preset-angular/build/StripStylesTransformer'],
    },
  },
};
