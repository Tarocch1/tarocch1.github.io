---
title: 剑指 Offer 24. 反转链表
---

# 剑指 Offer 24. 反转链表

[链接](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null) return null;
  let h = head;
  let cur = head.next;
  h.next = null;
  while (cur) {
    const temp = cur.next;
    cur.next = h;
    h = cur;
    cur = temp;
  }
  return h;
};
```
