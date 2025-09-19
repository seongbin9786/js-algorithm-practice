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
        // [[-3, -2, 1, 2, 3], [[-3, 1, 2]]],
        // 예외 케이스
        // 0,1,2,3 -> (0,1,2), (0,1,3), (0,2,3) -> 3개
        // [
        //     [0, 0, 0, 0],
        //     [[0, 0, 0], [0, 0, 0][(0, 0, 0)]],
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
    // nums.sort(); // n log n
    const numCounter = new Map();
    nums.forEach((v) => {
        const count = numCounter.get(v) ?? 0;
        numCounter.set(v, count + 1);
    });

    const combos = [];

    // n^2
    // j=0으로 시작하면 중복 생김
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            const partnerNum = (nums[i] + nums[j]) * -1;
            console.log(
                `${nums[i]} + ${nums[j]} =>  partnerNum: ${partnerNum}`
            );
            const partnerNumCount = numCounter.get(partnerNum) ?? 0;
            for (let k = 0; k < partnerNumCount; k++) {
                // 흠... [0,0,0]일 때 i,j,k 가 동일하되 순서만 바뀌는 거를 제외해야 함. how?
                // 경우의 수를 1/6을 해야 되나? (i,j,k),(i,k,j),(j,i,k),(j,k,i),(k,i,j),(k,j,i)
                // 흠... 단순 카운팅만 해서 되는 게 아니고, idx를 저장하고 i<j<k 구조로 하면 될 듯?
                console.log("FOUND:", i, j, nums[i], nums[j], partnerNum);
                combos.push([nums[i], nums[j], partnerNum]);
            }
        }
    }
    return combos;
};
