import type { Config } from 'prettier'
import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

const defaultConfig: Config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  objectWrap: 'collapse',
  bracketSameLine: false,
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  checkIgnorePragma: true,
  proseWrap: 'preserve',
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  experimentalOperatorPosition: 'end',
  experimentalTernaries: false,
  parser: 'babel',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [prettierPluginBabel, prettierPluginEstree as any],
}

/** 使用 prettier 格式化代码 */
export const formatCode = async (source: string, config: Config = {}) => {
  const cfg = { ...defaultConfig, ...config }
  const code = await format(source, cfg)
  return code.trim().replace(/^;/, '') // 去掉开头的分号
}
