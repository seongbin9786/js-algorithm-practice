/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function (nums, k) {
  const CountByNumber = new Map();
  for (const num of nums) {
    if (!CountByNumber.has(num)) {
      CountByNumber.set(num, 1);
      continue;
    }
    CountByNumber.set(num, CountByNumber.get(num) + 1);
  };

  const NumberByCount = new Map();
  for (const [key, value] of CountByNumber.entries()) {
    if (!NumberByCount.has(value)) {
      NumberByCount.set(value, [key]);
      continue;
    }
    NumberByCount.get(value).push(key);
  }

  const toSort = [...NumberByCount.keys()].flat();
  const sorted = toSort.sort((a, b) => b - a); //DESC

  const result = [];
  let nextPullIdx = 0; // 이름이 별론데, 나중에 리팩토링~!
  let numbersPushed = 0;
  // 출력 조건이 틀림: for (let i = 0; i < k; i++) {
  // 실제로 출력된 개수로 세야 함.
  while (k - numbersPushed > 0) {
    const numbersToBePushed = NumberByCount.get(sorted[nextPullIdx++]);
    numbersPushed += numbersToBePushed.length;
    result.push(numbersToBePushed);
  }
  return result.flat();
};

const result = topKFrequent([3, 0, 1, 0], 1);
console.log("result", result);
