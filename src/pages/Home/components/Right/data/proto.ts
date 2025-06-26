import type { Data } from './'

// 原型链
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      function Person() {}
      Person.prototype.hi = function () {
        return \`Hi 👋, I'm \${this.name}.\`
      }
    `,
    fn: function (ctx) {
      function Person() {}
      Person.prototype.hi = function () {
        return `Hi 👋, I'm ${this.name}.`
      }
      ctx.Person = Person
    },
  },
  {
    component: 'CodeBlock',
    content: `
      function Me(name) {
        this.name = name
      }
      Me.prototype = new Person()
    `,
    fn: function (ctx) {
      function Me(name: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.name = name
      }
      Me.prototype = new ctx.Person()
      ctx.Me = Me
    },
  },
  {
    component: 'CodeBlock',
    content: "const me = new Me('Tarocch1')",
    fn: function (ctx) {
      ctx.me = new ctx.Me('Tarocch1')
    },
  },
  { component: 'CodeBlock', content: 'me.hi()' },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      return ctx.me.hi()
    },
    prettier: false,
  },
]
