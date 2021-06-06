---
title: 剑指 Offer 05. 替换空格
---

# 剑指 Offer 05. 替换空格

[链接](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  return s.split(' ').join('%20');
};
```
