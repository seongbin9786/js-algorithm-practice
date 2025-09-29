import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 정수 배열 nums가 주어질 때, nums[i]가 nums[i]를 제외한 다른 값들의 곱인 배열을 반환
2. 나눗셈 없이, O(n)으로 돌아야 함
3. 결과 nums[i]은 32비트 정수 범위, nums[i] <= |30|, 2 <= nums.length <= 100,000 

[풀이]
1. 나눗셈 없이 어떻게 풀지? 매번 곱해야 할까? 매번 곱하면 O(n * n)
2. 0이 하나라도 있다면, 걔 빼고는 계산 불필요함
3. 0이 2개 이상 있다면, 다 0임
4. 0이 없으면, 제대로 계산 필요함.
    - [1, 1...n] 구간과 [1...n-1, n] 구간의 곱을 구함. 그러면 i = [1, i-1] * [i+1, n] 으로 구할 수 있음.
    - 위의 곱은 2n개가 나오며, O(n)으로 구할 수 있음. (diff=[0,n])

*/
describe("Product of Array Except Self", () => {
    it.each([
        // 가장 기초적인 TC
        [
            [0, 0],
            [0, 0],
        ],
        [
            [1, 0],
            [0, 1],
        ],
        [
            [1, 2],
            [2, 1],
        ],
        // 테스트
        [
            [1, 2, 3, 4, 5],
            [120, 60, 40, 30, 24],
        ],
        [
            [1, 2, 0, 4, 5],
            [0, 0, 40, 0, 0],
        ],
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
        ],
        [
            [2, 2],
            [2, 2],
        ],
    ])("%j => %j", (nums, expected) => {
        const result = productExceptSelf(nums);
        assert.deepEqual(result, expected);
    });
});
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const result = Array(nums.length).fill(0);

    let zeros = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeros++;
        }
    }

    if (zeros === 1) {
        let product = 1;
        let zeroIdx = -1;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== 0) {
                product *= nums[i];
            } else {
                zeroIdx = i;
            }
        }
        result[zeroIdx] = product;
    }

    if (zeros === 0) {
        // [startIdx][endIdx] 로 접근할 수 있게
        // [start][n] --> 이게 골떄리는데?
        // [0][end] 이거만 있으면 됨
        // 그냥, fromStart[0] = nums[0],
        // fromEnd[nums.length - 1] = nums[nums.length - 1]
        // 이렇게 쓰는 게 맞을 듯
        const fromStartTo = Array(nums.length).fill(0);
        const fromEndTo = Array(nums.length).fill(0);

        fromStartTo[0] = nums[0];
        fromEndTo[nums.length - 1] = nums[nums.length - 1];

        for (let i = 1; i < nums.length - 1; i++) {
            fromStartTo[i] = fromStartTo[i - 1] * nums[i];
            fromEndTo[nums.length - 1 - i] =
                fromEndTo[nums.length - i] * nums[nums.length - 1 - i]; // from-last-to-last-1 = last * last-1
        }

        result[0] = fromEndTo[1];
        result[result.length - 1] = fromStartTo[nums.length - 2];
        for (let i = 1; i < nums.length - 1; i++) {
            result[i] = fromStartTo[i - 1] * fromEndTo[i + 1];
        }
    }

    return result;
};
