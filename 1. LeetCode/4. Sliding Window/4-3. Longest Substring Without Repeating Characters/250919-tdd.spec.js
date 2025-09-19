import { describe, it, assert } from "vitest";

describe("Longest Substring Without Repeating Characters", () => {
    it.each([
        // 예외 Case
        ["a", 1],
        ["", 0],
        // 기본 연속 Case
        ["ab", 2],
        ["aa", 1],
        ["abc", 3],
        // 나중에 재등장하는 Case
        ["ababa", 2],
        ["abcdabc", 4],
        // 음.. 뭐지 이걸로 그냥 구현이 되는 건가?
        // TC를 못 떠올리겠어서 제출해봤더니 반례 줌
        // 근데 해당 TC도 고려해서 미리 설계를 했는데도 기억을 못 했음. 반성 필요
        ["abac", 3],
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
    let startIdx = 0;

    let max = 0;
    for (let i = 0; i < s.length; i++) {
        const prevIdx = prevIdxMap.get(s[i]);
        if (prevIdx === undefined) {
            // 중복 없이 잘 가는 중.
        } else if (startIdx <= prevIdx) {
            // 다시 시작한 구간 이전에 등장한 경우 -> 해당 idx 다음으로 startIdx를 줘야 함
            startIdx = prevIdx + 1;
        } else {
            // startIdx > prevIdx
            // 현재 문자열 구간 바깥이므로, 없는 값 취급하면 됨
            // 대신 갱신은 해줘야 함.
        }
        prevIdxMap.set(s[i], i);
        max = Math.max(max, i - startIdx + 1);
    }
    return max;
};
