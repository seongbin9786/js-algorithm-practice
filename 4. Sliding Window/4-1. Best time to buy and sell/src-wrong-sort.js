function Item(value, index) {
  this.value = value;
  this.index = index;
}

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (rawPrices) => {
  // O(n)
  const prices = rawPrices.map((v, i) => new Item(v, i));

  // O(n log n)
  // 오름차순 정렬
  prices.sort((a, b) => a.value - b.value);

  // 정렬된 거 사용
  // [4, 1, 2]
  let maxValueIdx = prices.length - 1;
  let minValueIdx = 0;
  let maxPriceItem = prices[maxValueIdx]; // 4, idx=0
  let minPriceItem = prices[minValueIdx]; // 1, idx=1

  // O(n)
  // 투포인터네 이거.
  while (minPriceItem.index >= maxPriceItem.index) {

    // 마지막에서 -1인 경우
    if (minValueIdx >= prices.length - 1) {
      return 0;
    }
    if (maxValueIdx <= 0) {
      return 0;
    }

    // 예외처리 해줘야 함
    let nextMaxValueIdx = maxValueIdx - 1;
    let nextMinValueIdx = minValueIdx + 1;
    let nextMaxPriceItem = prices[nextMaxValueIdx];
    let nextMinPriceItem = prices[nextMinValueIdx];

    let maxDiff = maxPriceItem.value - nextMaxPriceItem.value;
    let minDiff = nextMinPriceItem.value - minPriceItem.value;

    // [4, 1, 2]에서 [4], [1]에 커서가 있는데,
    // [1]->[2]로 이동함
    // 실제로는 [4]->[1], [1]->[2]가 되어야 하는데.
    if (minDiff >= maxDiff) { // 1 >= 2
      maxValueIdx--;
    } else {
      minValueIdx++;
    }

    // TODO: idx 거리도 중요함. ex: 
    if (minValueIdx)

      // 매번 귀찮게...
      minPriceItem = prices[minValueIdx];
    maxPriceItem = prices[maxValueIdx];
  }

  return maxPriceItem.value - minPriceItem.value;
};

// [3, 1, 2]도 잘 되는데, [4, 1, 2]가 안 됨.
console.log(maxProfit([9, 7, 5, 1, 2])); // [4, 1, 2]와 같은 원리로 동작하지 않음.
// [9, 7, 1, 2, 5] -> 3 (...?)
// 정렬로는 아예 못 풀겠는데? 예외가 너무 많음.
