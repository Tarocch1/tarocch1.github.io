---
title: 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
---

# 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面

[链接](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/)

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    while (nums[left] % 2 === 1) {
      left++;
    }
    while (nums[right] % 2 === 0) {
      right--;
    }
    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
    }
  }
  return nums;
};
```
