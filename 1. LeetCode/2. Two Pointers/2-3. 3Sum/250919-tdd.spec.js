import { describe, it, assert } from "vitest";

describe.only("3Sum", () => {
    it.each([
        [
            [0, 0, 0],
            [0, 0, 0],
        ],
        // ["", 0],
    ])("%s => %i", (input, expected) => {
        const result = threeSum(input);
        assert.deepEqual(result, expected);
    });
});
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    return nums;
};
