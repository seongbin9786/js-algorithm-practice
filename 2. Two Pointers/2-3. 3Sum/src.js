/*
[패인 분석]
- index 기준으로 i, j, k가 서로 달라야 한다는 말을 보고는 정렬을 못 하게 됐네라고 생각했음.
- 같은 원소를 쓰면 안 되는 정도로 충분한 게, 값으로 변환하고 index를 버렸다고 해도, 
  어차피 같은 순번의 원소를 의도적으로 2회 이상 쓰지 않는 한 idx 수준에서의 중복도 없는 거임
  내가 걱정한 건 값 수준에서 중복이 없어도 idx 수준에서 중복이 있을 수 있다는 거임. 같은 값이 가능하기 때문.
  맞음. 나처럼 Pair를 완성하고 하나를 찾으려고 했으면, 무조건 중복이 나올 수 있음. 애초에 접근이 너무 어려운 거임.
  애초에 Map을 썼을 때, value가 배열로 나온 것부터가 문제임. 순회가 계속 들어가기 때문에 Map을 쓰는 게 의미가 없어진 거 같음.

- 정렬 없이 중복 제거를 했고, index 기준으로 중복 제거 후에 value 기준 중복이 발생해으로 또 중복 제거함
- O(n^3)가 나올 리가 없는데 이게 나왔을 때 직감했어야 했는데 쉬었다 푸니 생각을 못 했음...
- 정렬을 못한다고 생각했던 게 너무 컸다. 가장 첫 접근이 정렬이기 때문에 첫 시작부터 실패할 예정이었던 거임

[문제 조건]
정수 배열을 입력 받아 서로 다른 idx를 갖는 세 숫자의 합이 0인 경우 각 숫자(idx 아님)를 배열로 담아 반환
- idx 중복, 값 중복 모두 없어야 함!

[접근 2]
- 반환값은 숫자 3개의 합이 0인 숫자들의 배열의 배열
- 값 기준 중복이 없어야 하며, 동일 원소는 선택할 수 없음
- 값은 필연적으로 -값과 +값이 있을 것
- 투포인터를 쓴다면 일단 정렬을 해야 함
- 정렬한다면 [ -4, -1, -1, 0, 1, 2, 3, 4 ]
- 중복이 없다는 걸 생각하고 접근해야 함
  - 맨 왼쪽의 값에 대한 모든 조합을 다른 값에서 찾겠다고 생각하면 쭉 올라갈 수 있을 듯
  - 진행 이전 idx의 값은 못 쓰나? 
    -4, 0, 4
    -4, 1, 3
  - 반대로 이걸 -4를 앞으로 안 쓰기 위한 조합 찾기로 볼 수도 있지 않을까?
    - 앞으로 -4를 안 쓰니 -4는 앞으로 탐색이 필요 없는 것임
    - 그러면 '안 쓰기 위한 값'이 쌓이므로 계속 앞으로만 진행하며 탐색 범위를 줄일 수 있음.
    - -4 소진, -1 소진, ... => 그런데 동일 값이면? 괜찮으려나
    - 일단 조합은 다르게 나올 듯? 너가 어떻게 알아
    - 같은 -1이면 조합 똑같이 나올 거 같은데. 이러면 중복이 제거 안 됨.
    - 그렇다고 Set을 써서 중복을 제거하자니, -1, -1, 2 같은 조합은 정상임...
    - 
- 포인터를 세 개 쓰면 됨. 3Sum이니까.
- 좌측이 목표값, 우측 2개 커서의 합이 0인걸 찾음
- 위의 예시로 보면, -4 일 때 4를 찾아야 하고, L=-1, R=4
- 이 경우 3이므로, 더 큰 값이 필요함. L, R 중 무엇을 움직이려고? 모름...
-----------
[답안의 설명을 보고난 후]
- 3개의 조합을 고르기 위해서는, 하나를 고르고 나머지 2개를 고르면 됨
- 정렬을 하면 투포인터로 2개를 고를 수 있음
- 이것은 조합임. 중복을 제거할려면 같은 자리에 같은 값을 갖는 원소가 없어야 함.
  - 정렬된 배열에서 같은 값인 원소를 파악하려면 양옆의 원소만 확인하면 됨.
  - 일단 가장 좌측이든 가장 우측이든 원소를 선택해 첫째 자리의 수로 할당한다.
    - 첫째 자리의 수는 다음 순번의 원소만 계속 할당하게 됨 (i=0,1,2,...n-2)
      - 다음 첫째 자리 수가 이전과 동일한 값인 경우 생략함으로써 중복을 제거함 
        (이전 첫째자리와 동일한 조합이 나오기 때문)
    - 둘째 자리 숫자(L 자리)를 정할 때도 첫째 자리 숫자와 마찬가지로 중복 숫자는 제거해야 함
    - 셋째 자리 숫자(R 자리) 선택 시에도 중복을 제거해야 하나? 맞음
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];

  // 1. 정렬해야 함
  nums.sort((a, b) => a - b); // 오름차순 정렬

  // 2. 첫째 자리에 값 할당
  for (let i = 0; i < nums.length; i++) {

    // 2-1. [중복 방지] 첫째 자리 값이 이전 값과 동일하면,
    //      둘째, 셋째가 동일한 조합이 만들어지므로 넘어가야 함.
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // 3. 둘째, 셋째 원소 할당
    let leftIdx = i + 1;
    let rightIdx = nums.length - 1;
    while (leftIdx < rightIdx) {
      // 3-1. [중복 방지] 둘째, 셋째 자리 값 역시 
      //      이전 값과 동일하면 동일 조합이 나오게 되므로 넘어가야 함.
      // 지금 여기서 문제가 발생함 ... 왜 중복 제거가 안 되지?
      // --> if는 한 번만 하잖아요...
      while (leftIdx > i + 1 && nums[leftIdx] === nums[leftIdx - 1]) {
        leftIdx++;
      }
      while (rightIdx < nums.length - 1 && nums[rightIdx] === nums[rightIdx + 1]) {
        rightIdx--;
      }

      // 문제점: left < right 조건이 유지되지 않음...
      if (leftIdx >= rightIdx) {
        break;
      }

      const sum = nums[i] + nums[leftIdx] + nums[rightIdx];
      if (sum === 0) {
        result.push([nums[i], nums[leftIdx], nums[rightIdx]]);
        leftIdx++;
        rightIdx--;
        // 가만히 있으면 무한 루프인데? 양쪽 다 바뀌어야 하나? 그렇지?
      } else if (sum < 0) { // 합이 더 커져야 함
        leftIdx++;
      } else { // 합이 더 작아야 함.
        rightIdx--;
      }
    }
  }
  return result;
};

threeSum([-2, 0, 3, -1, 4, 0, 3, 4, 1, 1, 1, -3, -5, 4, 0]);
