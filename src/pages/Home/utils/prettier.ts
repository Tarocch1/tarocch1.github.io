import type { Config } from 'prettier'
import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

const defaultConfig: Config = {
  printWidth: 50,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  objectWrap: 'collapse',
  bracketSameLine: false,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  parser: 'babel',
  plugins: [prettierPluginBabel, prettierPluginEstree as any],
}

/** 使用 prettier 格式化代码 */
export const formatCode = async (source: string, config: Config = {}) => {
  const cfg = { ...defaultConfig, ...config }
  const code = await format(source, cfg)
  return code.trim().replace(/^;/, '') // 去掉开头的分号
}
