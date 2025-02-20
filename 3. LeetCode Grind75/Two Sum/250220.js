var twoSum = function (nums, target) {
    const map = new Map();

    for (let idx = 0; idx < nums.length; idx++) {
        const partnerIdx = map.get(target - nums[idx]);
        if (partnerIdx !== undefined) {
            return [idx, partnerIdx];
        }
        map.set(nums[idx], idx);
    }
};
