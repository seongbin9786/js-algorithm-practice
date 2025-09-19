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
        [
            [0, 0, 0, 0], // 4*3*2/3!=3*2 = 4개 맞음. (조합 개올만)
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        ],
        // 리트코드 TC (제출 전 틀림..)
        // [
        //     [-1, 0, 1, 2, -1, -4],
        //     [
        //         [-1, -1, 2],
        //         [-1, 0, 1],
        //     ],
        // ],
        // 아니 이거 조합이 아니었네?
        // index 뿐만 아니라 value도 안 겹쳐야 함.
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
    // 흠... [0,0,0]일 때 i,j,k 가 동일하되 순서만 바뀌는 거를 제외해야 함. how?
    // 경우의 수를 1/6을 해야 되나? (i,j,k),(i,k,j),(j,i,k),(j,k,i),(k,i,j),(k,j,i)
    // 흠... 단순 카운팅만 해서 되는 게 아니고, idx를 저장하고 i<j<k 구조로 하면 될 듯?
    // 되긴 할텐데, 굳이 index를 다 봐야 하나? 흠.. 고민이 됨..
    // 그냥 개수를 빼면 됨.
    // 노답이네. 개수를 빼줘도, 순서 때문에 생김. (백트래킹으로도 답 없는 듯)
    // 어떻게 순서가 없이 체크할 수 있을까?
    // 그리고 k에서 순회를 하면 안 됨. 그러면 0으로 매우 채워진 경우 n^3가 될 거임.
    // i,j,k가 순서만 바뀌는 경우에도 중복 체크하려면? (1) i,j,k를 항상 정렬해서 해시한다.
    // (2) k도 알 수는 있음. 근데 그걸 다 순회하면 최악의 경우 n^3임
    // (3) 조합을 구하는 방법이 있을 거임.
    // 애매한데.. i,j,k를 다 백트래킹하는 수밖에 없지 않나?
    // k를 직접 고르지 않으면, i,j에서 다 고르게 됨.
    // 한 번 고른 놈을 못 고르게 하려면?
    // -> 0,0,0을 한 번 찍으면, 해당 0들을 모두 제거? -> 그럼 다른 조합이 부숴짐
    // 모든 경우를 체크하되 중복을 무시하면? -> n^3임
    /*
        1. 그럼 indices를 일단 모은다고 치고
        2. nums에 대해 순회, i,j, i<j 로 (i,j)중복 없이 순회
        3. k를 고르는 건 counterpart의 숫자들. 여기서 i,j가 아닌 indices만 골라 그 개수만큼 결과에 추가
        4. 만약 k=i, k=j인 경우가 있다면 생략
        5. 아, i<j<k로 두면 되겠는데?
        6. 그럼 될 듯?
    */

    nums.sort(); // n log n
    const numIndices = new Map(); // 오름차순 정렬되어 있으려면, nums를 정렬해야 함. 일단 구현 편의를 위해 정렬해둠.
    nums.forEach((v, index) => {
        const indices = numIndices.get(v) ?? [];
        indices.push(index);
        numIndices.set(v, indices);
    });

    // n^2
    // j=0으로 시작하면 중복 생김
    const combos = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            const partnerNum = (nums[i] + nums[j]) * -1 + 0; // -0 처리
            console.log(
                `[${i}, ${j}] ${nums[i]} + ${nums[j]} =>  partnerNum: ${partnerNum}`
            );
            let parterNumIndices = numIndices.get(partnerNum);
            console.log("partnerNumCount:", parterNumIndices);
            if (!parterNumIndices) {
                continue;
            }
            for (let k = 0; k < parterNumIndices.length; k++) {
                const parterIndex = parterNumIndices[k];
                if (i >= parterIndex || j >= parterIndex) {
                    continue;
                }
                console.log("parterIndex:", parterNumIndices[k]);
                combos.push([nums[i], nums[j], partnerNum]);
            }
        }
    }
    return combos;
};
