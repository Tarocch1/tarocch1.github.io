---
title: 剑指 Offer 06. 从尾到头打印链表
---

# 剑指 Offer 06. 从尾到头打印链表

[链接](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val;
 *   this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  if (!head) return [];
  const r = [];
  if (head.next) {
    r.push(...reversePrint(head.next));
  }
  r.push(head.val);
  return r;
};
```
