import { describe, it, assert } from "vitest";

describe.only("Longest Substring Without Repeating Characters", () => {
    it.each([
        ["ab", 2],
        ["aa", 1],
        ["abc", 3],
    ])("%s => %i", (input, expected) => {
        const result = lengthOfLongestSubstring(input);
        assert.equal(result, expected);
    });
});

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let globalMax = 0;
    let currMax = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i - 1] === s[i]) {
            currMax = 1;
        } else {
            currMax++;
        }
        globalMax = Math.max(globalMax, currMax);
    }
    return globalMax;
};
