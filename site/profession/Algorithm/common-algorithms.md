---
title: 常用算法
---

# 常用算法

## 二叉树

### 前序遍历

#### 递归

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (root === null) return [];
  return [
    root.val,
    ...preorderTraversal(root.left),
    ...preorderTraversal(root.right),
  ];
};
```

#### 迭代

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (root === null) return [];
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
};
```

### 中序遍历

#### 递归

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  if (root === null) return [];
  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right),
  ];
};
```

#### 迭代

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length > 0) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
};
```

### 后序遍历

#### 递归

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  if (root === null) return [];
  return [
    ...postorderTraversal(root.left),
    ...postorderTraversal(root.right),
    root.val,
  ];
};
```

#### 迭代

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  if (root === null) return [];
  const result = [];
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return result;
};
```

### 层序遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) return [];
  const result = [];
  let level = [root];
  while (level.length > 0) {
    const next = [];
    const row = [];
    level.forEach((node) => {
      row.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    });
    result.push(row);
    level = next;
  }
  return result;
};
```

### 翻转二叉树

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null;
  const tempLeft = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(tempLeft);
  return root;
};
```

## 排序

### 快速排序

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  /**
   * @param {number[]} nums
   * @param {number} left
   * @param {number} right
   */
  function sort(array, left, right) {
    if (left >= right) return;
    const base = array[left];
    let l = left,
      r = right;
    while (l < r) {
      while (l < r && array[r] >= base) {
        r--;
      }
      if (l < r) {
        array[l] = array[r];
      }
      while (l < r && array[l] <= base) {
        l++;
      }
      if (l < r) {
        array[r] = array[l];
      }
    }
    array[l] = base;
    sort(array, left, l - 1);
    sort(array, l + 1, right);
  }
  sort(nums, 0, nums.length - 1);
  return nums;
};
```

## 二分查找

### [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    if (nums[mid] > target) right = mid - 1;
  }
  return -1;
};
```

## 动态规划

### [509. 斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
```
