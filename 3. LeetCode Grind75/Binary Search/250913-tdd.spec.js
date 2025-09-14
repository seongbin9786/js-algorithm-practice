import { describe, it, assert } from "vitest";

describe("Binary Search (time complexity limit: O(log n)", () => {
    it.each([
        [1, [1], 0],
        [2, [2], 0],
        [1, [2], -1],
        [2, [1, 2], 1],
        [2, [1, 2, 3], 1],
        [3, [1, 2, 3], 2], // 오, 안된다. 신기함. 구현을 반대로 한 거였음..
        // 다양한 예외 케이스들
        [0, [1], -1],
        [2, [1], -1],
        [0, [1, 2, 3], -1],
        [4, [1, 2, 3], -1],
    ])("find [%i] from %j => %s", (target, source, expected) => {
        const result = search(source, target);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    // 재귀도 되고, while도 되는데 일단 재귀로 풀이
    const binarySearch = (start, end) => {
        if (start > end) {
            return -1;
        }
        const mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        return nums[mid] > target
            ? binarySearch(start, mid - 1)
            : binarySearch(mid + 1, end);
    };

    return binarySearch(0, nums.length);
};
