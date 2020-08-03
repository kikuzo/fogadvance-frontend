module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'eslint:recommended',
    //'prettier',
    //'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/recoomended',
    //'prettier/vue',
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }],
  },
}
