/*
입력: 정렬되지 않은 정수 배열
출력: 가장 긴 연속된 요소 배열의 길이
  - 0,3,7,2,5,8,4,6,0,1
  - 0 0 1 2 3 4 5 6 7 8 => 0 0은 연속이 아니다. 따라서 길이=9.
제한: 시간복잡도 O(n)

[접근 1]
- Hashing에서 영감을 얻자.
- (각 정수, idx)를 저장한다.
- HashMap get/set은 amortized O(1) 이므로, 시간 내에 돌 것으로 가정하자.
- 첫 순회에서 모든 원소를 set한다.
- 사실 value가 필요 없다. 그냥 Set을 쓰자.
- Set에 모든 원소를 저장한다.
- 값의 범위가 넓다. 
- 모든 범위를 순회한다면 O(n) 초과이므로 불가능하다.
- 저장하면서 min, max 저장한다.
- min, max가 outlier인 경우도 O(n) 초과이므로 불가능하다.
- 어떻게 해야 하지?
- 그냥 저장만 한다. min, max도 쓰지 않는다.

- HashSet을 사용한 이후, 순회를 다시 시작한다.
- 첫 원소에서 시작해 원소 + 1을 Set에 질의한다. 
  - 없을 때까지 반복한다.
  - [!] 조회한 원소는 true로 세팅한다. 
    - 이렇게 하면 Set 대신 Map을 써야 한다.
    - 이렇게 하면 O(n)을 초과하지 않을 수 있다.
  - 위 쪽으로 끝났으면, 내려도 가본다. 원소 - 1을 Set에 질의한다.
  - 이 때 길이를 저장한다.
  - max길이에 저장한다.
- 이후 원소는 visited=true인 경우 스킵한다.
- 새로운 원소가 visited=false인 경우 또 위, 아래로 합산한다.
  - 이 때 길이를 저장한다.
  - 길이가 파악된 경우 max길이를 갱신한다.

- Set을 사용한 답안의 경우,
  - 모든 원소에 대해 반복한다.
    - 자신보다 1만큼 작은 요소가 있으면 루프의 다음 요소로 넘어간다.
    - 자신보다 1만큼 작은 요소가 없으면 그 요소+1을 계속 찾으면서 센다.
    - 그래서 모든 요소를 방문한다.

  - 내 코드에 비해 - 76ms / 115ms - 66% 속도만 갖는다 - 1.5배 빠르다.
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  const visitedMap = new Map();
  for (const num of nums) {
    if (!visitedMap.has(num)) {
      visitedMap.set(num, false);
    }
  }

  let maxLength = 0;

  for (const startingInteger of nums) {
    const visited = visitedMap.get(startingInteger);
    if (visited) {
      continue;
    }
    let length = 1; // startingInteger의 몫

    // 위쪽부터 쭉 방문
    let nextInteger = startingInteger + 1;
    while (visitedMap.get(nextInteger) === false) {
      visitedMap.set(nextInteger, true);
      length++;
      nextInteger++;
    }

    // 아래쪽 쭉 방문
    let prevInteger = startingInteger - 1;
    while (visitedMap.get(prevInteger) === false) {
      visitedMap.set(prevInteger, true);
      length++;
      prevInteger--;
    }

    if (maxLength < length) {
      maxLength = length;
    }
  }
  return maxLength;
};

longestConsecutive([100, 4, 200, 1, 3, 2]);
