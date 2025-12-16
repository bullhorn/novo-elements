const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'projects/schematics/**']
  },
  {
    files: ['projects/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-fallthrough': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'use-isnan': 'error',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      radix: 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'one-var': ['error', 'never'],
      'no-unused-labels': 'error',
      'no-undef-init': 'error',
      'no-trailing-spaces': 'error',
      'no-throw-literal': 'error',
      'no-redeclare': 'error',
      'no-multiple-empty-lines': 'error',
      'no-new-wrappers': 'error',
      'no-invalid-this': 'error',
      'no-fallthrough': 'error',
      'no-eval': 'error',
      'no-debugger': 'error',
      'no-caller': 'error',
      'id-denylist': ['error', 'Number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
      'id-match': 'error',
      eqeqeq: ['error', 'smart'],
      'eol-last': 'error',
      'default-case': 'error',
      curly: 'error',
    }
  }
];
