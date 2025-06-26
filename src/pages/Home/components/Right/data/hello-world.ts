import type { Data } from './'

export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: '',
    fn: function (ctx) {
      ctx.text = 'Hello, World!'
      return `console.log('${ctx.text}')`
    },
  },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      return ctx.text
    },
    prettier: false,
  },
]
