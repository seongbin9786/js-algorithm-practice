/**
 * @param {number[]} nums
 * @return {number}
 */
/*
[주요 지점]
- 우선, 합계가 0미만이 되면 구간에서 버려야 함
    - 현재 값이 양수라면, 현재값은 남겨야 함

[일단 다른 거 말고 sum만 구해보자]
- 일단 0을 넣어놓고 sum = arr[0], 1부터 시작
- 현재까지의 합 = 음수이면 sum = 0; 양수이면 sum = arr[i]
- Max는 그냥 지나치기만 해도 됨. maxSum = max(maxSum, sum);

-2 1 -3 4 -1 2 1 -5 4
0  1 0  4  3 5 6 1 5

max=6

5, 4, -1, 7, 8
5  9  8  15  23

-1 -2 -3 -4 -5 -6 -7 -8 -9
0  0 0 0 00 0 0 0 00 0 0 0

-5 5 5 이면 10이 나올까?

계속 틀리네;;

-2 -1 -> 예외 케이스 해소 필요. maxSum = -1 이어야 함
*/
var maxSubArray = function (nums) {
    let sum = nums[0];
    let maxSum = sum;

    for (let i = 1; i < nums.length; i++) {
        sum = Math.max(0, sum);
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
    }

    return maxSum;
};
