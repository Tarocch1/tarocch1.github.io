---
title: 剑指 Offer 16. 数值的整数次方
---

# 剑指 Offer 16. 数值的整数次方

[链接](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (x === 0) return 0;
  if (n < 0) {
    x = 1 / x;
  }
  let result = 1;
  n = Math.abs(n);
  while (n) {
    if (n & 1) {
      result *= x;
    }
    x *= x;
    n >>>= 1;
  }
  return result;
};
```
