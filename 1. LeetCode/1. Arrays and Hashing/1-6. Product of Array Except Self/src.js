/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {

  const productWithZero = nums.reduce((total, cur) => total * cur, 1);
  const productWithoutZero = nums.filter(num => num !== 0).reduce((total, cur) => total * cur, 1);
  const hasMultipleZeros = nums.filter(num => num === 0).length > 1;

  return nums.map(cur => {
    if (cur === 0) {
      if (hasMultipleZeros) {
        return 0;
      }
      return productWithoutZero;
    }
    return productWithZero / cur;
  });
};