---
title: 剑指 Offer 11. 旋转数组的最小数字
---

# 剑指 Offer 11. 旋转数组的最小数字

[链接](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

```js
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let left = 0,
    right = numbers.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (numbers[mid] < numbers[right]) {
      right = mid;
    } else if (numbers[mid] > numbers[right]) {
      left = mid + 1;
    } else {
      right--;
    }
  }
  return numbers[left];
};
```
