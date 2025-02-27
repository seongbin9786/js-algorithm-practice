/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
[문제]
- 정수 배열을 입력받고 answer[i] = i != j인 nums[j]의 곱의 배열을 반환
- 정수 배열 길이 <= 10만
- -30 <= 각 숫자 <= 30
- (ex) [1,2,3,4] => [24,12,8,6]

[해결 방법]
- 전체의 곱을 O(N)으로 구하고 nums[i]로 나누면 되긴 함
- 더 빠르게?
    - 앞에 곱을 계속 가져오는 방법?
- 0이 섞여 있으면 해결이 안 되네
- 

*/
var productExceptSelf = function (nums) {
    let zeros = 0;
    let allProduct = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeros++;
            continue;
        }
        allProduct = allProduct === 0 ? nums[i] : allProduct * nums[i];
    }

    return nums.map((num) => {
        if (zeros > 1) {
            return 0;
        }
        if (zeros === 1) {
            if (num === 0) return allProduct;
            if (num !== 0) return 0;
        }
        return allProduct / num;
    });
};
