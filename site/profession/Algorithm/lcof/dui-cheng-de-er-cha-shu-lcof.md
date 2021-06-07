---
title: 剑指 Offer 28. 对称的二叉树
---

# 剑指 Offer 28. 对称的二叉树

[链接](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  /**
   * @param {Array} array
   * @return {boolean}
   */
  function arrayIsSymmetric(array) {
    let left = 0,
      right = array.length - 1;
    while (left < right) {
      const leftVal = array[left] ? array[left].val : null;
      const rightVal = array[right] ? array[right].val : null;
      if (leftVal !== rightVal) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
  let level = [root];
  while (level.length > 0) {
    if (!arrayIsSymmetric(level)) {
      return false;
    }
    const next = [];
    level.forEach((node) => {
      if (node) {
        next.push(node.left, node.right);
      }
    });
    level = next;
  }
  return true;
};
```
