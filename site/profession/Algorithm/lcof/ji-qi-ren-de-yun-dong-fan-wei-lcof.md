---
title: 剑指 Offer 13. 机器人的运动范围
---

# 剑指 Offer 13. 机器人的运动范围

[链接](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

```js
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
  if (m === 0 || n === 0) return 0;
  const set = new Set();
  set.add('0-0');
  let result = 1;
  function dfs(x, y) {
    const next = [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];
    next.forEach((item) => {
      const key = `${item[0]}-${item[1]}`;
      if (
        !set.has(key) &&
        inMatrix(item[0], item[1]) &&
        lessThanK(item[0], item[1])
      ) {
        result++;
        set.add(key);
        dfs(item[0], item[1]);
      }
    });
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  function inMatrix(x, y) {
    return x >= 0 && x < n && y >= 0 && y < m;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  function lessThanK(x, y) {
    let sum = 0;
    while (x > 0) {
      sum += x % 10;
      x = Math.floor(x / 10);
    }
    while (y > 0) {
      sum += y % 10;
      y = Math.floor(y / 10);
    }
    return sum <= k;
  }
  dfs(0, 0);
  return result;
};
```
