import type { Data } from './'

// this 指向
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      class C {
        constructor(name) {
          this.name = name
        }
        foo = function () {
          return this.name
        }
        bar = () => this.name
      }
    `,
    fn: function (ctx) {
      class C {
        name: string
        constructor(name: string) {
          this.name = name
        }
        foo = function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return this.name
        }
        bar = () => this.name
      }
      ctx.C = C
    },
  },
  {
    component: 'CodeBlock',
    content: "const [a, b] = [new C('a'), new C('b')]",
    fn: function (ctx) {
      ;[ctx.a, ctx.b] = [new ctx.C('a'), new ctx.C('b')]
    },
  },
  { component: 'CodeBlock', content: '[a.foo(), a.bar()]' },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      const result = [ctx.a.foo(), ctx.a.bar()]
      return `[${result.map((s) => `'${s}'`).join(', ')}]`
    },
    prettier: { parser: 'json' },
  },
  {
    component: 'CodeBlock',
    content: '[a.foo, a.bar] = [b.foo, b.bar]',
    fn: function (ctx) {
      ;[ctx.a.foo, ctx.a.bar] = [ctx.b.foo, ctx.b.bar]
    },
  },
  { component: 'CodeBlock', content: '[a.foo(), a.bar()]' },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      const result = [ctx.a.foo(), ctx.a.bar()]
      return `[${result.map((s) => `'${s}'`).join(', ')}]`
    },
    prettier: { parser: 'json' },
  },
]
