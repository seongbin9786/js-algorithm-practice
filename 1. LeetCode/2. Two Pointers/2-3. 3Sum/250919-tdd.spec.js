import { describe, it, assert } from "vitest";

/*
1. 조건을 명확히 이해해야 함. 특히, 단일 구현 사이클이 길어지는 경우 정말 명확히 이해해야 함.
2. 
*/
describe("3Sum", () => {
    it.each([
        // 기본
        [[0, 0, 0], [[0, 0, 0]]],
        [[-1, 0, 1], [[-1, 0, 1]]],
        // // 정렬 순서 무관 TC
        [[1, 0, -1], [[-1, 0, 1]]],
        // // 조합이 없는 경우
        [[1, 2, 3], []],
        [[-1, -2, -3], []],
        // // 여러 조합이 가능한 경우
        [[-3, -2, 1, 2, 3], [[-3, 1, 2]]],
        // value까지도 조합인 Case
        [[0, 0, 0, 0], [[0, 0, 0]]],
        // // 리트코드 TC
        [
            [-1, 0, 1, 2, -1, -4],
            [
                [-1, -1, 2],
                [-1, 0, 1],
            ],
        ],
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
    nums.sort((a, b) => a - b);

    // 이거 애초에 뭐 index가 걍 필요 없는 거 아니냐?
    // 값으로 unique해야 하는데?
    // indices로 만들되, 값의 조합으로 생각해야 할 듯?
    // 그쵸? ㅇㅇ
    // [값, 등장위치[]]로만 관리하면, 이거 어떻게 중복을 제거하지? 제거할 필요가 있나?
    // 아,,, 이렇게 하면 n^2 이구만?
    // 아니, 이거 n^2 이어도 잘 되어야 함. n=3,000인데;
    // 0이 존나 많다 만약에. 그러면 근데 그러면 사실 아하 nums를 돌아서 그런 거거든요.
    // 흠; nums를 돌아도 빨라야 하는데...? 1억이 아니라 지금 9백만인데 겨우..

    let zeros = 0;
    const numLastIdx = new Map();
    nums.forEach((num, index) => {
        if (num === 0) {
            zeros++;
        }
        numLastIdx.set(num, index);
    });

    const triplets = [];
    if (zeros >= 3) {
        triplets.push([0, 0, 0]);
    }

    /*
    [GPT: 탐색 범위 줄이고, 범위 줄여서 중복을 그걸로 없애야 함]
    --> 애초에 음수만 탐색한다는 아이디어
    */
    // i,j번째 숫자들의 합이 0 이하일 때만 체크. 이렇게 되면 i<j이고, k는 양수/음수 구분으로.
    // 0이 많으면 곤란해짐. 중복 처리에 대한 아이디어가 없으니, 그냥 0,0,0 케이스는 예외로 처리함.
    // nums[i] + nums[j] + nums[i] = 0 인 경우는 어떻게 제외해야 함?
    // lastIdx를 저장해둬서, j보다 클 때만 하면, 중복은 없지 않을까?
    // -3, -2, 1
    // -3, -1, 2
    // -3, 0, 3
    // -3, -2, 1

    // 그동안 이걸 생각 못 했음.
    // -3, 1, 2
    // -3, 2, 1 <--- 이거 어캄? 안되는 거임. 왜냐면, -3,1,2가 이미 있으니깐.
    // --> 무조건 i < j < k 여야 한다.
    // 근데, nums[i] = nums[i+1] 이면? 즉, -1, -1, 0, 1 --> [-1,0,1], [-1,0,1] 이 됨
    // ---> 그럼 어떻게 해결함?
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= 0) {
            break;
        }
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] >= 0) {
                break;
            }
            const partnerNum = (nums[i] + nums[j]) * -1 + 0; // -0 처리
            const parterNumIdx = numLastIdx.get(partnerNum);
            console.log(
                `[i: ${i}][j: ${j}] partnerNum: ${partnerNum}, parterNumIdx: ${parterNumIdx}`
            );
            if (parterNumIdx !== undefined && parterNumIdx > j) {
                const triplet = [nums[i], nums[j], partnerNum];
                triplets.push(triplet);
            }
        }
    }

    return triplets;
};
