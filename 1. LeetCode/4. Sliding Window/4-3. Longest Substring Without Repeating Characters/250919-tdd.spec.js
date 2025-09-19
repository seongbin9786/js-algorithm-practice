import { describe, it, assert } from "vitest";

describe.only("Longest Substring Without Repeating Characters", () => {
    it.each([
        // 기본 연속 Case
        ["ab", 2],
        ["aa", 1],
        ["abc", 3],
        // 나중에 재등장하는 Case
        ["ababa", 2],
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
    const prevIdxMap = new Map();

    let globalMax = 0;
    let currMax = 0;
    for (let i = 0; i < s.length; i++) {
        const prevIdx = prevIdxMap.get(s[i]);
        if (prevIdx === undefined) {
            currMax++;
        } else {
            currMax = 1;
        }
        prevIdxMap.set(s[i], i);
        globalMax = Math.max(globalMax, currMax);
    }
    return globalMax;
};
