/*
[문제]
- 정수 배열에서 두 개의 합이 target이 되는 두 숫자의 페어를 반환
- 정답은 오직 한 개
- 정수 개수는 1만개

[해결 방법]
- brute-force로 해결 
    - 루프 2개로 O(n^2)
- 2개의 페어만 찾으면 되므로 curr를 Set에 저장해두고, target-curr가 Set에 있으면 반환
- 아 index가 필요하므로 - Map 사용

*/
var twoSum = function (nums, target) {
    const existing = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (existing.has(target - nums[i])) {
            return [existing.get(target - nums[i]), i];
        }
        existing.set(nums[i], i);
    }
};
