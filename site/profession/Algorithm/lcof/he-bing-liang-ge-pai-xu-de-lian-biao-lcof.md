---
title: 剑指 Offer 25. 合并两个排序的链表
---

# 剑指 Offer 25. 合并两个排序的链表

[链接](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val;
 *   this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const h = new ListNode();
  let cur = h;
  let p1 = l1,
    p2 = l2;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : Infinity;
    const n2 = p2 ? p2.val : Infinity;
    if (n1 <= n2) {
      cur.next = p1;
      p1 = p1.next;
    } else {
      cur.next = p2;
      p2 = p2.next;
    }
    cur = cur.next;
  }
  return h.next;
};
```
