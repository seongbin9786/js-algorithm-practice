/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/*
이진 탐색 구현하시오
*/
const search = (nums, target) => {
    let low = 0;
    let high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1;
};
