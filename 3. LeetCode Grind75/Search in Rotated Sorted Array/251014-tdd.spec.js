import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 오름차순으로 정렬된 서로 다른 정수로 구성된 배열 주어짐
2. k칸 왼쪽으로 회전될 수 있다 (회전이 없을 수도 있다)
    - e.g. [ k, k+1, ... n-1, 0, 1, ..., k-1 ] (index) 순서로 구성될 수 있다.
3. O(log N)만에 주어진 배열에서 target을 찾아야 함. 있으면 index, 없으면 -1 반환

[제한 조건]
1. 배열 길이 <= 5,000 라서 신경 쓸 부분 없음

[발상]
1. 이진 탐색 말고 해결할 방법이 없을 것 같음. 정렬도 되어 있고, log N 제약도 있음.
2. 이진 탐색으로 k의 위치를 찾고, 각 구간에 대해 이진 탐색으로 풀면 됨
    - 회전 후에는 정렬이 깨진 상태라 이진 탐색이 안 될 것 같은데..방법 = ?

[k 위치 찾기]
1. 회전 여부 판단: 회전 했다면 arr[0] > arr[arr.length - 1] 일 것 (k,k-1 번째 관계이기 때문에)
2. 회전 위치 찾기: 전체에서 최솟값을 찾아야 함 (회전 이전의 arr[0])
3. 이진 탐색 시작
    - left=0, right=length-1
        - 특정 값이 아닌 최솟값을 찾는 일이다보니, 기존 값을 제외하지 않고 [left, right] 구간으로 잡음.
    - 현재값이
        - arr[0]보다 크다면, 아직 원래 arr[0]를 못 찾은 것으로 우측으로 가야 함
            - left = mid + 1
        - arr[0]보다 작다면, arr[n-1] 이후 구간이므로, arr[0]을 찾으러 좌측으로 가야 함
            - right = mid - 1
        - arr[0]과 같다면 얘는 절대 아니므로 +1 처리
            - left = mid + 1

[코딩하면서 찾은 풀이]
1. 최솟값을 찾을 때의 이진 탐색은 <lowerBound>를 써야 함.
    - lowerBound는 target보다 큰 최솟값이지만 여기는 별도 제한은 없음
    - lowerBound의 아이디어대로 right = mid 로 두어야 함

[풀이 개선]

*/
describe("Search in Rotated Sorted Array", () => {
    it.each([
        // 자체 코드 TC
        // [[0, 1, 2, 3, 4, 5, 6, 7], 0, 0],
        [[0, 1, 2, 3, 4, 5, 6, 7], 7, 7],
        // // 리트코드 TC
        // [[4, 5, 6, 7, 0, 1, 2], 0, 4],
        // [[4, 5, 6, 7, 0, 1, 2], 3, -1],
        // [[1], 0, -1],
        // [[2, 3, 4, 5, 6, 7, 8, 9, 10, 1], 0, -1],
        // // 틀린 TC
        // [[5, 1, 2, 3, 4], 1, 1],
        // [[4, 5, 1, 2, 3], 1, 2],
    ])("%j => %j", (nums, target, expected) => {
        const result = search(nums, target);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    // 5, 1, 2, 3, 4 일 때 minIdx = 0으로 판정하는 문제
    function findMin() {
        const elementK = nums[0];
        let left = 0,
            right = nums.length;

        // idx 계산 내용 정리:
        // elementK 기준으로 우측 영역으로 이동하되, 우측 영역으로 이동 후에는 lowerBound 방식으로 해야 함.
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            const curr = nums[mid];
            console.log(`visit: ${mid}[=${curr}] of [${left},${right}]`);

            // curr > elementK 이면 아직 좌측 공간이므로 우측 공간으로 이동 필요
            // curr = elementK 이면 얘는 절대 아니므로 +1 처리
            if (curr >= elementK) {
                left = mid + 1;
            } else {
                // curr < elementK 이면 우측 공간에 온 것이므로, lowerBound 탐색 필요
                right = mid;
            }
        }

        return left;
    }

    function binarySearch(left, right) {
        // 흠... 우측 끝은 도달 가능한데, 좌측 끝은 도달 불가능함
        // idx 계산 내용 정리:
        // 특정 값 도달 필요 시: [left, right] 실제 도달 가능 구간으로 탐색, 양 끝 모두 탐색
        // left,right가 한 칸 차이 일 때 mid+/-1 로 1칸씩 이동함
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const curr = nums[mid];
            console.log(`bin: ${mid}[=${curr}] of [${left},${right}]`);

            if (curr === target) {
                return mid;
            } else if (curr > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }

    // 이동 없음
    if (nums[0] < nums[nums.length - 1]) {
        return binarySearch(0, nums.length - 1);
    }

    // 이동 있음
    const minIdx = findMin();
    console.log(`minIdx: ${minIdx}`);
    console.log(`from left--- [${nums.slice(0, minIdx)}]`);
    const fromLeft = binarySearch(0, minIdx - 1);
    console.log(`from right--- [${nums.slice(minIdx, nums.length)}]`);
    const fromRight = binarySearch(minIdx, nums.length - 1);

    return fromLeft >= 0 ? fromLeft : fromRight;
};
