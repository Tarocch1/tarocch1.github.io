import antfu from '@antfu/eslint-config'

export default antfu({
  pnpm: true,
  vue: {
    overrides: {
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
    },
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    jsx: true,
    semi: false,
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
    prettierOptions: {
      /** 最大行宽 */
      printWidth: 80,

      /** 缩进空格数 */
      tabWidth: 2,

      /** 不使用 tab 缩进 */
      useTabs: false,

      /** 不添加分号 */
      semi: false,

      /** 使用单引号 */
      singleQuote: true,

      /** 对象属性名按需添加引号 */
      quoteProps: 'as-needed',

      /** JSX 使用双引号 */
      jsxSingleQuote: false,

      /** 尽量添加尾逗号 */
      trailingComma: 'all',

      /** 括号内添加空格 */
      bracketSpacing: true,

      /** 对象字面量不折叠 */
      // objectWrap: 'preserve',

      /** HTML `>` 符号换行 */
      bracketSameLine: false,

      /** 箭头函数参数始终添加括号 */
      arrowParens: 'always',

      /** 处理范围开始 */
      rangeStart: 0,

      /** 处理范围结束 */
      rangeEnd: Infinity,

      /** 无需注释 */
      // requirePragma: false,

      /** 不插入注释 */
      // insertPragma: false,

      /** 检查忽略注释 */
      // checkIgnorePragma: true,

      /** 不处理 markdown 换行 */
      proseWrap: 'preserve',

      /** 忽略 HTML 空格 */
      htmlWhitespaceSensitivity: 'ignore',

      /** 不锁进 Vue 文件的 script 和 style */
      vueIndentScriptAndStyle: false,

      /** 换行符使用 LF */
      endOfLine: 'lf',

      /** 处理嵌入的语言格式 */
      // embeddedLanguageFormatting: 'auto',

      /** HTML 一行多个参数 */
      singleAttributePerLine: false,

      /** 实验性操作符位置 */
      // experimentalOperatorPosition: 'end',

      /** 实验性三元表达式 */
      // experimentalTernaries: false,
    },
  },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        newlinesBetween: 'always',
      },
    ],
  },
})
