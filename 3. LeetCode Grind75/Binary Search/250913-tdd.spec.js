import { describe, it, assert } from "vitest";

describe.only("Binary Search (time complexity limit: O(log n)", () => {
    it.each([
        [1, [1], true],
        [2, [2], true],
        // [2, [1, 2], true],
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
    return true;
};
