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
  const heightRecords = [];

  let leftIdx = 0;
  let rightIdx = height.length - 1;
  let maxPillarWeight = 0;

  while (leftIdx < rightIdx) {
    // calculate는 어떻게 함? 엄청 쉬움 높이가 더 낮은 칸은 다 더하면 됨
    const leftHeight = height[leftIdx];
    const rightHeight = height[rightIdx];
    const pillarHeight = Math.min(leftHeight, rightHeight);

    // 이전과 높이가 같거나 낮은 경우는 고려하지 않음  
    if (pillarHeight > maxPillarWeight) {
      heightRecords.push([leftIdx, rightIdx, pillarHeight]);
    }

    if (leftHeight > rightHeight) {
      rightIdx--;
    } else {
      leftIdx++;
    }

    maxPillarWeight = Math.max(maxPillarWeight, pillarHeight);
  }

  // 이 순회를 하면 안되나본데? 그런가보다.
  const result = Array(height.length).fill(0);
  for (const [leftIdx, rightIdx, pillarHeight] of heightRecords) {
    for (let i = leftIdx + 1; i < rightIdx; i++) {
      result[i] = Math.max(0, pillarHeight - height[i]);
    }
  }

  // sum
  return result.reduce((a, b) => a + b, 0);
};
