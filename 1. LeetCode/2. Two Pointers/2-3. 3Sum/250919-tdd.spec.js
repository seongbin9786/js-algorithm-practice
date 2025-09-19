import { describe, it, assert } from "vitest";

/*
1. 조건을 명확히 이해해야 함. 특히, 단일 구현 사이클이 길어지는 경우 정말 명확히 이해해야 함.
2. 
*/
describe.only("3Sum", () => {
    it.each([
        // // // 기본
        // [[0, 0, 0], [[0, 0, 0]]],
        // [[-1, 0, 1], [[-1, 0, 1]]],
        // // 정렬 순서 무관 TC
        // [[1, 0, -1], [[-1, 0, 1]]],
        // // 조합이 없는 경우
        // [[1, 2, 3], []],
        // [[-1, -2, -3], []],
        // // 여러 조합이 가능한 경우
        // [[-3, -2, 1, 2, 3], [[-3, 1, 2]]],
        // value까지도 조합인 Case
        [[0, 0, 0, 0], [[0, 0, 0]]],
        // // 리트코드 TC
        // [
        //     [-1, 0, 1, 2, -1, -4],
        //     [
        //         [-1, -1, 2],
        //         [-1, 0, 1],
        //     ],
        // ],
        // // 나의 예외 체크
        // [
        //     [3, 2, 1, 0, -1, -2, -3],
        //     [
        //         [-3, 1, 2],
        //         [-2, -1, 3],
        //         [-3, 0, 3],
        //         [-2, 0, 2],
        //         [-1, 0, 1],
        //     ],
        // ],
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

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const numLastIdxMap = new Map(); // 오름차순 정렬되어 있으려면, nums를 정렬해야 함. 일단 구현 편의를 위해 정렬해둠.
    nums.forEach((v, index) => {
        numLastIdxMap.set(v, Math.max(index, numLastIdxMap.get(v) ?? 0));
    });

    const usedIdxCombos = new Set();
    const combos = [];

    function addIfPossible(triplet) {
        const key = triplet.toString();
        if (usedIdxCombos.has(key)) {
            return;
        }
        usedIdxCombos.add(key);
        combos.push(triplet);
    }

    // n^2
    // i<j<k 를 유지하면 i != j != k 가 가능함. 그래도 중복이 존재하는데, 어떻게 해야 함?
    // 이미 사용된 조합 같은 걸 만들어야 되나?
    // order of the output and the order of the triplets does not matter. 조건 활용 필요
    // 그냥 정렬하고, 0까지만 찾아볼까? -> 0만 있는 경우는 무의미함
    // 일단 중복 제거가 필요한 거 같은데...

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            const partnerNum = (nums[i] + nums[j]) * -1 + 0; // -0 처리
            console.log(
                `[${i}, ${j}] ${nums[i]} + ${nums[j]} =>  partnerNum: ${partnerNum}`
            );
            let k = numLastIdxMap.get(partnerNum);
            // console.log("parterNumIndices:", parterNumIndices);
            if (k === undefined) {
                continue;
            }
            if (i < k && j < k) {
                const triplet = [nums[i], nums[j], partnerNum].sort();
                addIfPossible(triplet);
            }
        }
    }

    return combos;
};
