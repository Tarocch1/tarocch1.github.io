---
title: 剑指 Offer 09. 用两个栈实现队列
---

# 剑指 Offer 09. 用两个栈实现队列

[链接](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

```js
var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length === 0) {
    let c = this.stack1.pop();
    while (c > 0) {
      this.stack2.push(c);
      c = this.stack1.pop();
    }
  }
  if (this.stack2.length === 0) {
    return -1;
  }
  return this.stack2.pop();
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
