import { describe, it, assert } from "vitest";

describe.only("Longest Substring Without Repeating Characters", () => {
    it.each([
        ["ab", 1],
        // ["aa", 2],
    ])("%i => %i", (input, expected) => {
        const result = lengthOfLongestSubstring(input);
        assert.equal(result, expected);
    });
});

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    return 1;
};
