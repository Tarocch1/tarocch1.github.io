---
title: 剑指 Offer 26. 树的子结构
---

# 剑指 Offer 26. 树的子结构

[链接](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
  if (!A || !B) {
    return false;
  }
  /**
   * @param {TreeNode} A
   * @param {TreeNode} B
   * @return {boolean}
   */
  function recur(A, B) {
    if (!B) return true;
    if (!A || A.val !== B.val) return false;
    return recur(A.left, B.left) && recur(A.right, B.right);
  }
  return recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
```
