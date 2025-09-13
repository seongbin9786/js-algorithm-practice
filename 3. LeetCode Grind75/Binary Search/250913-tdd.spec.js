import { describe, it, assert } from "vitest";

describe.only("Binary Search (time complexity limit: O(log n)", () => {
    it.each([
        [1, [1], true],
        [2, [2], true],
        [1, [2], false],
        [2, [1, 2], true],
        [2, [1, 2, 3], true],
        [3, [1, 2, 3], true], // 오, 안된다. 신기함. 구현을 반대로 한 거였음..
        // 다양한 예외 케이스들
        [0, [1], false],
        [2, [1], false],
        [0, [1, 2, 3], false],
        [4, [1, 2, 3], false],
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
    // 재귀도 되고, while도 되고.
    // 일단 재귀로 풀어볼까.
    const binarySearch = (start, end) => {
        if (start > end) {
            return false;
        }
        const mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) {
            return true;
        }
        if (nums[mid] > target) {
            return binarySearch(start, mid - 1);
        }
        return binarySearch(mid + 1, end);
    };

    return binarySearch(0, nums.length);
};
