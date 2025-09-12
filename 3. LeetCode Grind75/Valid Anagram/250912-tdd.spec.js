import { describe, it, assert } from "vitest";

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    const aCode = "a".charCodeAt(0);
    const counter = Array.from({ length: 30 }, () => 0); // 알파벳 몇개인지 헷갈려서 안전하게 30
    const length = Math.max(s.length, t.length);
    for (let i = 0; i < length; i++) {
        counter[s.charCodeAt(i) - aCode]++;
        counter[t.charCodeAt(i) - aCode]--;
    }
    return counter.findIndex((v) => v !== 0) === -1;
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

    it("[a] != [b]", () => {
        const input = "a";
        const expected = "b";
        const result = isAnagram(input, expected);
        assert.equal(result, false);
    });

    it("[a] != [ab]", () => {
        const input = "a";
        const expected = "ab";
        const result = isAnagram(input, expected);
        assert.equal(result, false);
    });
});
