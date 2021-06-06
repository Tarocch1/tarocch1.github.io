---
title: 剑指 Offer 18. 删除链表的节点
---

# 剑指 Offer 18. 删除链表的节点

[链接](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

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
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  const h = new ListNode();
  h.next = head;
  let pre = h,
    cur = head;
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
      break;
    }
    pre = cur;
    cur = cur.next;
  }
  return h.next;
};
```
