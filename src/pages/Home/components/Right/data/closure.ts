import type { Data } from './'

// 闭包
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      function Counter(start) {
        let value = start
        return {
          get: () => value,
          increment: () => ++value,
          decrement: () => --value,
          reset: () => (value = start),
        }
      }
    `,
    fn(ctx) {
      function Counter(start: number) {
        let value = start
        return {
          get: () => value,
          increment: () => ++value,
          decrement: () => --value,
          reset: () => (value = start),
        }
      }
      ctx.Counter = Counter
    },
  },
  {
    component: 'CodeBlock',
    content: 'const counter = Counter(0)',
    fn(ctx) {
      ctx.counter = ctx.Counter(0)
    },
  },
  { component: 'CodeBlock', content: 'counter.get()' },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.counter.get()}`
    },
    prettier: false,
  },
  { component: 'CodeBlock', content: 'counter.increment()' },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.counter.increment()}`
    },
    prettier: false,
  },
  { component: 'CodeBlock', content: 'counter.increment()' },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.counter.increment()}`
    },
    prettier: false,
  },
  { component: 'CodeBlock', content: 'counter.decrement()' },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.counter.decrement()}`
    },
    prettier: false,
  },
  { component: 'CodeBlock', content: 'counter.reset()' },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.counter.reset()}`
    },
    prettier: false,
  },
]
