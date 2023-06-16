/*
// pillarHeight가 증가함에 따라 기록을 해야 될 듯?
// pillarHeight가 증가했을 때 그 구역을 알아내야 함
// 그러면 일단은 체크를 해야겠는데
// e.g. [0,1,0,2,1,0,1,3,2,1,2,1] 일 때
// [ 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 ] 으로 1층 물 추가 ([1, 11])
// [ 0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 0 ] 으로 2층 물 추가 ([3, 10])

// 둘의 합집합(덮어쓰기)을 하면:
// [ 0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0 ] => sum=6
*/
/**
 * @param {number[]} height
 * @return {number}
 */
const trap = (height) => {
  let sum = 0;
  let leftIdx = 0;
  let rightIdx = height.length - 1;
  let maxLeftHeight = 0;
  let maxRightHeight = 0;

  while (leftIdx < rightIdx) {
    const curLeftHeight = height[leftIdx];
    const curRightHeight = height[rightIdx];

    // 둘이 같을 때는 둘 중 아무거나 해도 됨. 둘 다 한 칸씩만 전진함.
    if (curLeftHeight < curRightHeight) {
      // 일단 오른쪽 높이가 더 높으니, 왼쪽은 Max와 차이만 계산하면 된다.
      if (curLeftHeight >= maxLeftHeight) { // max 갱신, 다음 블록부터는 새 max 기준으로 물을 넣으면 됨
        maxLeftHeight = curLeftHeight;
      } else {
        sum += maxLeftHeight - curLeftHeight;
      }
      leftIdx++;
    } else {
      // 왼쪽 높이가 더 높은 상황이므로, 오른쪽이 따라가야 함
      if (curRightHeight > maxRightHeight) {
        maxRightHeight = curRightHeight;
      } else {
        sum += maxRightHeight - curRightHeight;
      }
      rightIdx--;
    }
  }
  return sum;
};
