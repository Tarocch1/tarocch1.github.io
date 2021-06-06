---
title: 剑指 Offer 22. 链表中倒数第k个节点
---

# 剑指 Offer 22. 链表中倒数第 k 个节点

[链接](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

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
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let left = head,
    right = head;
  for (let i = 1; i <= k; i++) {
    if (right) {
      right = right.next;
    } else {
      return null;
    }
  }
  while (right) {
    right = right.next;
    left = left.next;
  }
  return left;
};
```
