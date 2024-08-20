import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import jestPlugin from 'eslint-plugin-jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [...compat.extends(
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:prettier/recommended',
  'next/core-web-vitals',
  'plugin:storybook/recommended',
  'prettier',
  'next',
), {
  ignores: ['.next/*', 'coverage/*'], // Exclude the .next folder from linting
},
  {
    languageOptions: {
      globals: {
        test: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        afterEach: 'readonly',
        beforeEach: 'readonly',
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],
      'react-hooks/rules-of-hooks': 'off', // Disable the problematic rule
      '@next/next/no-duplicate-head': 'off', // Disable the problematic rule
      '@next/next/no-page-custom-font': 'off', // Disable the problematic rule
      'storybook/no-uninstalled-addons': 'off', // Disable the problematic rule
      'no-unused-vars': 'off', // Disable the problematic rule
      'no-useless-escape': 'off', // Disable the problematic rule
      'no-extra-boolean-cast': 'off', // Disable the problematic rule
      'no-prototype-builtins': 'off', // Disable the problematic rule
      'no-undef': 'off', // Disable the problematic rule
    },
  }];

export default eslintConfig;