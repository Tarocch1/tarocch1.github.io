import type { Data } from './'

export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: '',
    fn(ctx) {
      ctx.text = 'Hello, World!'
      return `console.log('${ctx.text}')`
    },
  },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return ctx.text
    },
    prettier: false,
  },
]
