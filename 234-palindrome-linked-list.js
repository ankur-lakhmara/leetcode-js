// 234. Palindrome Linked List
// Easy   33%

// Given a singly linked list, determine if it is a palindrome.

// Follow up:
// Could you do it in O(n) time and O(1) space?

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

function toList(array) {
  const head = new ListNode()
  let node = head
  for (let i = 0, n = array.length; i < n; i++) {
    node.next = new ListNode(array[i])
    node = node.next
  }
  return head.next
}


/**
 * @param {ListNode} head
 * @return {boolean}
 */
const isPalindrome = function(head) {
  function iter(node) {
    let result = node.next ? iter(node.next) : true
    if (head.val === node.val) {
      head = head.next
      return result
    } else return false
  }
  return head ? iter(head) : true
}

;[
  toList([1,2,3,4,5,4,3,2,1]),  // true
  toList([1,2,3,3,2,1]),        // true
  toList([1,2,3,4,3,2,0,1]),    // false
].forEach(head => {
  console.log(isPalindrome(head))
})

// Solution:
// 利用函数的堆栈来实现一般的堆栈。


// Submission Result: Accepted
