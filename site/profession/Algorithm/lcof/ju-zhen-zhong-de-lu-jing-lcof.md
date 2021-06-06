---
title: 剑指 Offer 12. 矩阵中的路径
---

# 剑指 Offer 12. 矩阵中的路径

[链接](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/)

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  if (m === 0) return false;
  const n = board[0].length;
  if (n === 0) return false;
  if (word.length === 0) return false;
  /**
   * @param {number} x
   * @param {number} y
   * @param {string} str
   * @param {Set} set
   * @return {boolean}
   */
  function dfs(x, y, str, set) {
    if (str.length === 0) return true;
    const next = [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];
    for (const item of next) {
      const key = `${item[0]}-${item[1]}`;
      if (read(item[0], item[1]) === str[0] && !set.has(key)) {
        set.add(key);
        if (dfs(item[0], item[1], str.slice(1), set)) {
          return true;
        } else {
          set.delete(key);
        }
      }
    }
    return false;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {string}
   */
  function read(x, y) {
    if (x < 0 || x >= n || y < 0 || y >= m) {
      return '';
    } else {
      return board[y][x];
    }
  }
  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === word[0]) {
        const set = new Set();
        set.add(`${x}-${y}`);
        if (dfs(x, y, word.slice(1), set)) {
          return true;
        }
      }
    }
  }
  return false;
};
```
