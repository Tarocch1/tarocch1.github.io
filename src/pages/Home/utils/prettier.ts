import { PrettierOptions } from '@tarocch1/eslint-config/prettier'
import type { Config } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'
// eslint-disable-next-line import-x/namespace
import * as prettierPluginEstree from 'prettier/plugins/estree'
import { format } from 'prettier/standalone'

const defaultConfig: Config = {
  ...PrettierOptions,
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
