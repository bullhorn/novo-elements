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
    }
  }
];
