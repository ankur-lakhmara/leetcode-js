// 113. Path Sum II
// Medium   34%

// Given a binary tree and a sum, find all root-to-leaf paths where each path's
// sum equals the given sum.

// For example:
// Given the below binary tree and sum = 22,

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1

// return

// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

function toBTree(array, i=0) {
  if (array[i] == null) return null
  const root = new TreeNode(array[i])
  root.left = toBTree(array, i * 2 + 1)
  root.right = toBTree(array, i * 2 + 2)
  return root
}


/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
const pathSum = function(root, sum) {
  const res = [], path = []
  function iter (root, sum) {
    if (root == null) return
    if (root.val === sum && root.left == null && root.right == null) {
      res.push([...path, root.val])
    } else {
      path.push(root.val)
      sum -= root.val
      iter(root.left, sum)
      iter(root.right, sum)
      path.pop()
    }
  }
  iter(root, sum)
  return res
}

;[
  [[5,4,8,11,null,13,4,7,2,null,null,null,null,5,1], 22],
].forEach(([array, sum]) => {
  console.log(pathSum(toBTree(array), sum))
})

// Solution:
// 使用递归和回溯，将结果记录下来。

// Submission Result: Accepted
