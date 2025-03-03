/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const maxLefts = Array(height.length).fill(0);
    const maxRights = Array(height.length).fill(0);

    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    // for 문 말고 되나? index가 다 필요함.
    // maxL 갱신
    for (let i = 0; i < height.length; i++) {
        maxLeft = Math.max(maxLeft, height[i]);
        maxLefts[i] = maxLeft;
    }

    // maxR 갱신
    for (let i = height.length - 1; i >= 0; i--) {
        maxRight = Math.max(maxRight, height[i]);
        maxRights[i] = maxRight;
    }

    for (let i = 0; i < height.length; i++) {
        totalWater += Math.max(
            0,
            Math.min(maxLefts[i], maxRights[i]) - height[i]
        );
    }

    return totalWater;
};
