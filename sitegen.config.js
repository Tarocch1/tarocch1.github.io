const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = {
  title: "Tarocch1's Home Page",
  copyright: '© 2015-present Tarocch1',
  head: [
    '<link rel="icon" href="https://cdn.tarocch1.com/images/favicon.png" type="image/png">',
  ].join('\n'),
  markdown: {
    timeFormatter: (time) =>
      dayjs(time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
    mermaid: false,
    katex: false,
  },
  build: {
    distDir: '../dist',
  },
  dev: {
    host: '127.0.0.1',
    port: 3300,
  }
};
