---
title: 剑指 Offer 10- I. 斐波那契数列
---

# 剑指 Offer 10- I. 斐波那契数列

[链接](https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (1e9 + 7);
  }
  return dp[n];
};
```
