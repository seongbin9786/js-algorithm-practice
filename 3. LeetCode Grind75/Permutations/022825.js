/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    nums.sort((a, b) => a - b);
    const permutations = [];
    const currPicked = [];
    const picked = Array(nums.length).fill(false);

    const backtrack = (stage) => {
        if (stage === nums.length) {
            permutations.push([...currPicked]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (picked[i]) continue;
            currPicked.push(nums[i]);
            picked[i] = true;
            backtrack(stage + 1);
            currPicked.pop();
            picked[i] = false;
        }
    };

    backtrack(0);

    return permutations;
};
