/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let candidate = null;
    let count = 0;

    for (const num of nums) {
        if (count === 0 && candidate !== num) {
            candidate = num;
        } else if (candidate !== num) {
            count--;
        } else {
            count++;
        }
    }

    return candidate;
};
