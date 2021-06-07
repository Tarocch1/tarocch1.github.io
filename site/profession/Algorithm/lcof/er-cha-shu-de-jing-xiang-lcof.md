---
title: 剑指 Offer 27. 二叉树的镜像
---

# 剑指 Offer 27. 二叉树的镜像

[链接](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

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
 * @return {TreeNode}
 */
var mirrorTree = function (root) {
  if (root === null) return null;
  const tempLeft = root.left;
  root.left = mirrorTree(root.right);
  root.right = mirrorTree(tempLeft);
  return root;
};
```
