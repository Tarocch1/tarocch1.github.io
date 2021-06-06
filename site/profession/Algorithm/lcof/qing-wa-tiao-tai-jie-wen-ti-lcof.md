---
title: 剑指 Offer 10- II. 青蛙跳台阶问题
---

# 剑指 Offer 10- II. 青蛙跳台阶问题

[链接](https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % (1e9 + 7);
  }
  return dp[n];
};
```
