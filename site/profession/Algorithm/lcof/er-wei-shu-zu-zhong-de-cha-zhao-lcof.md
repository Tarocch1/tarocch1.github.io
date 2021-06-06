---
title: 剑指 Offer 04. 二维数组中的查找
---

# 剑指 Offer 04. 二维数组中的查找

[链接](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  const m = matrix.length;
  if (m === 0) return false;
  const n = matrix[0].length;
  if (n === 0) return false;
  let x = n - 1,
    y = 0;
  while (x >= 0 && y < m) {
    const cur = matrix[y][x];
    if (cur === target) return true;
    if (cur > target) x--;
    if (cur < target) y++;
  }
  return false;
};
```
