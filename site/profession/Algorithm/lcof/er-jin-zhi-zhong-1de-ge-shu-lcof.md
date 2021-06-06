---
title: 剑指 Offer 15. 二进制中1的个数
---

# 剑指 Offer 15. 二进制中 1 的个数

[链接](https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/)

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let result = 0;
  while (n > 0) {
    result += n % 2;
    n = Math.floor(n / 2);
  }
  return result;
};
```
