import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import next from '@next/eslint-plugin-next'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint,
      prettier: prettier,
      next: next,
    },
    rules: {
      indent: ['off', 2, { SwitchCase: 1 }],
      quotes: 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'warn',
      'prettier/prettier': [
        'warn',
        {
          parser: 'typescript',
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],
      'import/no-anonymous-default-export': [
        'warn',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    ignores: ['./src/app/(blank)/tools/glslEditor/libs/glslEditor.min.js', './packages/**/*'],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier.configs.recommended,
  next.configs.recommended,
  next.configs['core-web-vitals'],
]
