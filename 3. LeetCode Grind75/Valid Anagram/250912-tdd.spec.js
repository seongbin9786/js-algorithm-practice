import { describe, it, assert } from "vitest";

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    const aCode = "a".charCodeAt(0);
    const counter = Array.from({ length: 30 }, () => 0); // 알파벳 몇개인지 헷갈려서 안전하게 30
    for (let i = 0; i < s.length; i++) {
        counter[s.charCodeAt(i) - aCode]++;
        counter[t.charCodeAt(i) - aCode]--;
    }
    return !counter.find((v) => v !== 0);
};

describe.only("Valid Anagram", () => {
    it("[] = []", () => {
        const input = "";
        const expected = "";
        const result = isAnagram(input, expected);
        assert.equal(result, true);
    });

    it("[a] = [a]", () => {
        const input = "a";
        const expected = "a";
        const result = isAnagram(input, expected);
        assert.equal(result, true);
    });

    it("[a] = [b]", () => {
        const input = "a";
        const expected = "b";
        const result = isAnagram(input, expected);
        assert.equal(result, false);
    });

    it("[ab] = [ba]", () => {
        const input = "ab";
        const expected = "ba";
        const result = isAnagram(input, expected);
        assert.equal(result, true);
    });
});
