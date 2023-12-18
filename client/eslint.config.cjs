const reactRecommended = require('eslint-plugin-react/configs/recommended')

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ...reactRecommended,
  },
]
