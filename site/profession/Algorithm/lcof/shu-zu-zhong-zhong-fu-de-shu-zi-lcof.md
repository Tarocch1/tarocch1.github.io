---
title: 剑指 Offer 03. 数组中重复的数字
---

# 剑指 Offer 03. 数组中重复的数字

[链接](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  const set = new Set();
  for (let num of nums) {
    if (set.has(num)) {
      return num;
    } else {
      set.add(num);
    }
  }
  return -1;
};
```
