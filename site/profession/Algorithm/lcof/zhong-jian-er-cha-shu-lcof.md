---
title: 剑指 Offer 07. 重建二叉树
---

# 剑指 Offer 07. 重建二叉树

[链接](https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null;
  const top = new TreeNode(preorder[0]);
  const topIndex = inorder.findIndex((n) => n === preorder[0]);
  const leftInorder = inorder.slice(0, topIndex);
  const rightInorder = inorder.slice(topIndex + 1);
  const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
  const rightPreorder = preorder.slice(1 + leftInorder.length);
  top.left = buildTree(leftPreorder, leftInorder);
  top.right = buildTree(rightPreorder, rightInorder);
  return top;
};
```
