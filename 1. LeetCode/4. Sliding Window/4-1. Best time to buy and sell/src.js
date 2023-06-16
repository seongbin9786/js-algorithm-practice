function Item(value, index) {
  this.value = value;
  this.index = index;
}

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let left = 0;
  let right = 1;
  let profit = 0;

  // O(n)
  // 투포인터
  // 하 왜 이렇게 안 되는 case가 많냐.
  while (left <= prices.length - 2 && right <= prices.length - 1) {

    // left가 더 큰 순간이 오면 right를 left로 지정함
    if (prices[left] > prices[right]) {
      left = right;
      continue; // 전제 조건 체크하게
    }

    // 계산
    profit = Math.max(profit, prices[right] - prices[left]);

    // (왼쪽, 왼쪽+i)로 계속 찾으면서 max값 찾음
    right++;
  }

  return profit;
};

// [3, 1, 2]도 잘 되는데, [4, 1, 2]가 안 됨.
console.log(maxProfit([1, 2]));