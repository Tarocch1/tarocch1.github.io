---
title: 剑指 Offer 17. 打印从1到最大的n位数
---

# 剑指 Offer 17. 打印从 1 到最大的 n 位数

[链接](https://leetcode-cn.com/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/)

```js
/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  const result = [];
  for (let i = 1; i < Math.pow(10, n); i++) {
    result.push(i);
  }
  return result;
};
```
