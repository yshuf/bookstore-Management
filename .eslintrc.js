// https://eslint.bootcss.com/docs/rules/
/**
 * parserOptions - 解析器选项
 * env 和 globals - 环境和全局变量
 * rules - 规则
 *   off或0，关闭规则
 *   warn或1，开启规则
 *   error或2，开启规则，并会出错阻止代码运行
 * plugins - 插件
 * extends - 拓展
 */
const configObj = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint', // 解析器配置选项-定义ESLint的解析器
    ecmaVersion: 2020
  },
  env: {
    // 环境
    browser: true
  },
  // 定义文件继承的子规范-扩展
  extends: [
    'plugin:vue/essential',
    'standard',
    // '@vue/typescript/recommended'
    '@vue/prettier'
  ],
  // required to lint *.vue files
  plugins: ['vue'], // 定义了该eslint文件所依赖的插件
  rules: {
    'prettier/prettier': 'error', // 被prettier标记的地方抛出错误信息，vue CLI 默认是 warn
    // allow async-await
    'no-console': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    semi: ['error', 'always'],
    /* 'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never' // 和 prettierrc 格式化插件会冲突，主要是 function 后和()之间的空格问题
      }
    ], */
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    // semi: 'off',
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0
  },
  globals: {
    $: true,
    Vue: true,
    jQuery: true,
    AMap: true
  }
};

module.exports = configObj;
