import { describe, it, assert } from "vitest";

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    return true;
};

describe.only("Valid Anagram", () => {
    it("[] = []", () => {
        const input = "";
        const expected = "";
        const result = isAnagram(input, expected);
        assert.equal(result, true);
    });
});
