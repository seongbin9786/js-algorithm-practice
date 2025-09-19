import { describe, it, assert } from "vitest";

describe.only("3Sum", () => {
    it.each([
        // 기본
        [[0, 0, 0], [[0, 0, 0]]],
        [[-1, 0, 1], [[-1, 0, 1]]],
        // 정렬 순서 무관 TC
        [[1, 0, -1], [[-1, 0, 1]]],
        // 조합이 없는 경우
        [[1, 2, 3], []],
        [[-1, -2, -3], []],
        // 여러 조합이 가능한 경우
        [[-3, -2, 1, 2, 3], [[-3, 1, 2]]],
        // 예외 케이스
        // 0,1,2,3 -> (0,1,2), (0,1,3), (0,2,3) -> 3개
        // [
        //     [0, 0, 0, 0],
        //     [[0, 0, 0], [0, 0, 0][(0, 0, 0)]],
        // ],
    ])("%s => %i", (input, expected) => {
        const result = threeSum(input);

        assert.deepEqual(
            result.map((combo) => combo.sort()).sort(compareTriple),
            expected.map((combo) => combo.sort()).sort(compareTriple)
        );
    });
});

function compareTriple(a, b) {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    }
    if (a[1] !== b[1]) {
        return a[1] - b[1];
    }
    if (a[2] !== b[2]) {
        return a[2] - b[2];
    }
    return 0;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const sum = nums.reduce((sum, curr) => sum + curr, 0);
    if (sum !== 0) {
        return [];
    }
    return [nums];
};
