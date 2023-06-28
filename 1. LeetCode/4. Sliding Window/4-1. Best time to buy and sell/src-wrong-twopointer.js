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
    let right = prices.length - 1;
    let maxDiff = 0;

    // O(n)
    // 투포인터
    while (left < right) {
        // 그냥 브루트포스로 진행함
        const nextMinDiff = prices[left + 1] - prices[left];
        const nextMaxDiff = prices[right - 1] - prices[right];

        // 각자 안쪽으로 좁혀들어오면서,
        // 더 격차가 큰 쪽으로 계속 진행하면 될 듯
        // 안 됨. 좁혀 들어가는 건 optimal한 값을 내지 못 함.
        // 이동은 한 쪽만 해야 됨.
        // ㄴㄴ. 이동은 왼쪽만 해야 함.
        // 1. 일단 (왼쪽, 왼쪽+1) 이 정상인 case를 찾음
        // 2. (왼쪽, 왼쪽+i)로 계속 찾으면서 max값 찾음
        // 3. 그러다 (왼쪽+i)가 왼쪽보다 작아지면, (왼쪽+i)가 새로운 왼쪽이 됨.
        // 4. (2)로 가서 진행.
        if (nextMinDiff > nextMaxDiff) {
            left++;
        } else {
            right--;
        }
        maxDiff = Math.max(maxDiff, prices[right] - prices[left]);
    }

    return maxDiff;
};

// [3, 1, 2]도 잘 되는데, [4, 1, 2]가 안 됨.
console.log(maxProfit([9, 7, 5, 1, 2])); // [4, 1, 2]와 같은 원리로 동작하지 않음.
