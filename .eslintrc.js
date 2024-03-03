module.exports = {
  env: {
    // 支持浏览器环境
    browser: true,
    // 支持ES2021语法
    es2021: true,
    // 支持Node.js全局变量和Node.js范围
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    // 行尾加分号
    semi: ['error', 'always'],
    /** 允许使用requires */
    '@typescript-eslint/no-var-requires': 0,
    /** 允许单个单词的组件名称 */
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'Header', 'tag', 'Tag'], //需要忽略的组件名
      },
    ],
  },
};
