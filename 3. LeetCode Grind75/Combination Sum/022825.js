/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b);

    const combinations = [];
    const currPicked = [];
    const pick = (sum, lastPickIdx) => {
        if (sum < 0) return;
        if (sum === 0) {
            combinations.push([...currPicked]);
            return;
        }
        for (let i = lastPickIdx; i < candidates.length; i++) {
            currPicked.push(candidates[i]);
            pick(sum - candidates[i], i);
            currPicked.pop();
        }
    };

    pick(target, 0);

    return combinations;
};
