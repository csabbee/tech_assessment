module.exports = {
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ['@typescript-eslint', 'import'],
  root: true,
}
