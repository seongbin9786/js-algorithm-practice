import { describe, it, assert } from "vitest";

/*
1. 조건을 명확히 이해해야 함. 특히, 단일 구현 사이클이 길어지는 경우 정말 명확히 이해해야 함.
2. 
*/
describe.only("3Sum", () => {
    it.each([
        // // 기본
        [[0, 0, 0], [[0, 0, 0]]],
        [[-1, 0, 1], [[-1, 0, 1]]],
        // 정렬 순서 무관 TC
        [[1, 0, -1], [[-1, 0, 1]]],
        // 조합이 없는 경우
        [[1, 2, 3], []],
        [[-1, -2, -3], []],
        // 여러 조합이 가능한 경우
        [[-3, -2, 1, 2, 3], [[-3, 1, 2]]],
        // value까지도 조합인 Case
        [[0, 0, 0, 0], [[0, 0, 0]]],
        // 리트코드 TC
        [
            [-1, 0, 1, 2, -1, -4],
            [
                [-1, -1, 2],
                [-1, 0, 1],
            ],
        ],
        // 나의 예외 체크
        [
            [3, 2, 1, 0, -1, -2, -3],
            [
                [-3, 1, 2],
                [-2, -1, 3],
                [-3, 0, 3],
                [-2, 0, 2],
                [-1, 0, 1],
            ],
        ],
    ])("%j => %j", (input, expected) => {
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

function parse(stringArray) {
    return stringArray.split(",").map(Number);
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const numLastIdxMap = new Map(); // 오름차순 정렬되어 있으려면, nums를 정렬해야 함. 일단 구현 편의를 위해 정렬해둠.
    nums.forEach((v, index) => {
        numLastIdxMap.set(v, Math.max(index, numLastIdxMap.get(v) ?? 0));
    });

    // n^2
    // i<j<k 를 유지하면 i != j != k
    // nums에서 정렬이 없어도 되나?
    const combos = new Set();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            const partnerNum = (nums[i] + nums[j]) * -1 + 0; // -0 처리
            // console.log(
            //     `[${i}, ${j}] ${nums[i]} + ${nums[j]} =>  partnerNum: ${partnerNum}`
            // );
            let k = numLastIdxMap.get(partnerNum);
            // console.log("parterNumIndices:", parterNumIndices);
            if (k === undefined) {
                continue;
            }
            if (i < k && j < k) {
                const triplet = [nums[i], nums[j], partnerNum]
                    .sort((a, b) => a - b)
                    .toString();
                combos.add(triplet);
            }
        }
    }

    const result = [];
    combos.forEach((v) => {
        // console.log("v:", v, parse(v));
        result.push(parse(v));
    });

    return result;
};
