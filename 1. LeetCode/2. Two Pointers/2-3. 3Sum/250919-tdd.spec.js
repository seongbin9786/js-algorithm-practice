import { describe, it, assert } from "vitest";

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
    nums.sort(); // n log n
    const numIndices = new Map(); // 오름차순 정렬되어 있으려면, nums를 정렬해야 함. 일단 구현 편의를 위해 정렬해둠.
    nums.forEach((v, index) => {
        const indices = numIndices.get(v) ?? [];
        indices.push(index);
        numIndices.set(v, indices);
    });

    // n^2
    // j=0으로 시작하면 중복 생김
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
            let parterNumIndices = numIndices.get(partnerNum);
            // console.log("parterNumIndices:", parterNumIndices);
            if (!parterNumIndices) {
                continue;
            }

            // index 체크는 꼭 필요함. i<j<k 여야 함
            // value 체크도 해야 함. Set으로 해야되나? 더 쉬운 방법 = ?
            // 분명히 쉬운 방법이 있을 거 같은데.. 심지어 순서가 달라도 맞아야 함;
            for (let k = 0; k < parterNumIndices.length; k++) {
                const parterIndex = parterNumIndices[k];
                if (i >= parterIndex || j >= parterIndex) {
                    continue;
                }
                const triplet = [nums[i], nums[j], partnerNum]
                    .sort((a, b) => a - b)
                    .toString(); // NOTE: []가 주변에 붙지 않음.
                combos.add(triplet);
                break;
            }
        }
    }

    const result = [];
    combos.forEach((v) => {
        console.log("v:", v, parse(v));
        result.push(parse(v));
    });

    return result;
};
