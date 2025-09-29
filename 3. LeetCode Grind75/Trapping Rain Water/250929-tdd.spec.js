import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 벽의 높이를 나타내는 n개의 0 혹은 자연수의 배열을 입력 받아, 담을 수 있는 물의 양을 계산해야 함 (벽의 두께는 1)
2. 1 <= n <= 20,000, 0 <= 높이 <= 100,000

[풀이]
1. 
*/
describe("Trapping Rain Water", () => {
    it.each([
        // 가장 기초적인 TC
        [[0], 0],
        [[1, 0, 1], 1],
    ])("%j => %i", (intervals, expected) => {
        const result = trap(intervals);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let min = Infinity;
    let max = -Infinity;

    for (let i = 0; i < height.length; i++) {
        min = Math.min(min, height[i]);
        max = Math.max(max, height[i]);
    }

    return max - min;
};
