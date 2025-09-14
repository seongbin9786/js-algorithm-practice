/*
Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

*/

import { describe, it, assert } from "vitest";

describe.only("Maximum Subarray (time complexity limit: O(n))", () => {
    it.each([
        [[0], 0],
        [[1], 1],
        [[0, 1], 1],
        [[0, -1], 0],
        [[-1, 0], 0],
        [[-1, 2, -1], 2],
        [[-1, 2, -1, 2], 3],
    ])("max sum of %j => %i", (source, expected) => {
        const result = maxSubArray(source);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let globalMax = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // 1. 기존 max까지만 씀
        // 2. 기존 max + 현재값 씀 (이어서 못 쓰게 해야 함 <- how?)
        // --> 지금 case에서 2+2를 해버려서, 해결해줘야 함.
        // --> 기존 것까지 다 더해서 쓰거나, 새로 시작해야 함.
        // --> 흠.. 옛날의 max가 더 클 때가 있음... 이러면 케이스 제한이 어려운데? 아 이해함.
        // --> globalMax랑 max를 분리하면 됨.
        // 3. 현재값만 씀
        max = Math.max(nums[i], max + nums[i]);
        globalMax = Math.max(globalMax, max);
    }

    return globalMax;
};
