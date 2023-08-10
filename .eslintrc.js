module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['postcss.config.js', 'config.js'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports', 'react', 'prettier'],
  rules: {
    'tailwindcss/classnames-order': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    'react/react-in-jsx-scope': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
