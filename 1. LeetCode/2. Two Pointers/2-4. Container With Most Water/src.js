/*

[문제 해석]
입력: 길이=n인 정수 배열
  - height[k]는 k번째 선분의 높이이며 각 선분 간 거리는 1
출력: 컨테이너가 담을 수 있는 물의 최대량

[해답 결론]
- 일단 bruteforce는 맞다.
  - 방법: 모든 기둥의 조합을 시도한다.
    - 첫 기둥을 선택하고, 반대편 기둥을 순회하며 하나씩 선택한다.
- 최적화 방법:
  - 처음에 가장 x축 너비가 큰 기둥 두개를 선택한다. 같은 x축 중에선 이게 제일 크다.
  - 이후 x축의 너비가 1씩 줄어든다.
    - x축 너비가 1씩 작은 후보의 개수는 2이다., (a,b ... c,d 이므로, [a,c], [b,d] 뿐이다)
      - <핵심 아이디어>는 [a,c], [b,d] 중 하나만 탐색하면 된다는 것이다.
        - 왜? 한쪽은 [a,d]와 높이가 같고 x축 너비만 1 줄어들기 때문이다.
          - 이런식으로 x축 너비를 줄일 때마다 한 쪽만 탐색하는 것으로 O(n) 안에 풀 수 있다.

*/
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  let leftIdx = 0;
  let rightIdx = height.length - 1;
  let maxWater = 0;

  while (leftIdx < rightIdx) {
    const left = height[leftIdx];
    const right = height[rightIdx];
    const localWater = (rightIdx - leftIdx) * Math.min(left, right);
    maxWater = Math.max(maxWater, localWater);

    // 단순 Left, Right 비교보단, water 비교로해야 할 듯.
    const nextLeft = height[leftIdx + 1];
    const nextRight = height[rightIdx - 1];
    const nextLeftLocalWater = (rightIdx - leftIdx - 1) * Math.min(nextLeft, right);
    const nextRightLocalWater = (rightIdx - leftIdx - 1) * Math.min(left, nextRight);
    if (nextLeftLocalWater > nextRightLocalWater) {
      leftIdx++;
    } else {
      rightIdx--;
    }
  }
  return maxWater;
};

console.log(maxArea([1, 3, 2, 5, 25, 24, 5]));
