/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (numbers, target) {
  const map = new Map();

  numbers.forEach((num, idx) => {
    map.set(num, idx);
  });

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (map.has(target - num)) {
      const idx = map.get(target - num);
      return i > idx ? [idx + 1, i + 1] : [i + 1, idx + 1];
    }
  }
};
