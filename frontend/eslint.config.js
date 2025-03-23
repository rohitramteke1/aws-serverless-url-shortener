// eslint.config.js
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
