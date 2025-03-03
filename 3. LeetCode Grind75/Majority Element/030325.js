/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const occurMap = new Map();

    for (const num of nums) {
        occurMap.set(num, (occurMap.get(num) ?? 0) + 1);
    }

    let majorityNum;
    let maxOccurrences = 0;
    for (const [num, occurrence] of occurMap.entries()) {
        if (occurrence > maxOccurrences) {
            majorityNum = num;
            maxOccurrences = occurrence;
        }
    }

    return majorityNum;
};
