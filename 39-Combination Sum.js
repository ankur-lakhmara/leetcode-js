// 39. Combination Sum
// Medium 39% locked:false

// Given a set of candidate numbers (C) (without duplicates) and a target number
// (T), find all unique combinations in C where the candidate numbers sums to T.

// The same repeated number may be chosen from C unlimited number of times.

// Note:

// All numbers (including target) will be positive integers.
//   The solution set must not contain duplicate combinations.

// For example, given candidate set [2, 3, 6, 7] and target 7,
// A solution set is:

// [
//   [7],
//   [2, 2, 3]
// ]


/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function(candidates, target) {
  candidates.sort((a, b) => a - b)

  const n = candidates.length
  const result = []

  const iter = (i, t, sum) => {
    while (i < n && candidates[i] <= t) {
      if (candidates[i] === t) result.push([...sum, t])
      iter(i, t - candidates[i], [...sum, candidates[i]])
      i++
    }
  }

  iter(0, target, [])
  return result
}

console.log(combinationSum([2, 3, 6, 7], 7))