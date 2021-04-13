const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = {
  title: "Tarocch1's Home Page",
  copyright: '© 2015-present Tarocch1',
  markdown: {
    timeFormatter: (time) =>
      dayjs(time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'),
    mermaid: false,
    katex: false,
  },
  build: {
    distDir: '../dist',
  },
};
