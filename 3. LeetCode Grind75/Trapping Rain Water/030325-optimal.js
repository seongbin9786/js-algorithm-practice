/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let left = 0;
    let right = height.length - 1;

    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    while (left < right) {
        // 우측이 벽 역할, left쪽에서 max에서 현재 칸만큼 빼면 그만큼 물이 찬다.
        if (height[left] <= height[right]) {
            maxLeft = Math.max(maxLeft, height[left]);
            totalWater += maxLeft - height[left++];
        } else {
            maxRight = Math.max(maxRight, height[right]);
            totalWater += maxRight - height[right--];
        }
    }

    return totalWater;
};
