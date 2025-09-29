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
4. 0이 없다면? (답 없는 상태)

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
    ])("%j => %i", (nums, expected) => {
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
        // 노답...
    }

    return result;
};
