---
title: 剑指 Offer 14- I. 剪绳子
---

# 剑指 Offer 14- I. 剪绳子

[链接](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  const dp = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    let max = 0;
    for (let j = 1; j <= i - 2; j++) {
      max = Math.max(max, j * Math.max(dp[i - j], i - j));
    }
    dp[i] = max;
  }
  return dp[n];
};
```
