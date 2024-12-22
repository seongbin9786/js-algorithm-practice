const createSumArray = (length, rootLevelValue) => {
    // fill([])는 동일한 참조의 배열로 채워진다.
    const sum = [...Array(length)];
    for (let level = 1; level <= length; level++) {
        sum[level - 1] = Array(level).fill(0);
    }

    sum[0][0] = rootLevelValue;

    return sum;
};

// sum은 이미 초기화되어있다고 가정한다.
const calculateMaxSumOfAllPaths = (triangle, sum) => {
    let lastLevelMax = sum[0][0];

    // 레벨 1 ~ 끝-1 까지 순회
    for (let level = 1; level < triangle.length; level++) {
        const currLevelNodes = triangle[level - 1];
        const nextLevelNodes = triangle[level];

        const currLevelSums = sum[level - 1];
        const nextLevelSums = sum[level];

        // 현재 레벨을 순회하며 다음 레벨의 합계를 계산
        for (let i = 0; i < currLevelNodes.length; i++) {
            const currSum = currLevelSums[i];
            // 왼쪽
            const sum1 = currSum + nextLevelNodes[i];
            nextLevelSums[i] = Math.max(nextLevelSums[i], sum1);

            // 오른쪽
            const sum2 = currSum + nextLevelNodes[i + 1];
            nextLevelSums[i + 1] = Math.max(nextLevelSums[i + 1], sum2);

            if (level === triangle.length - 1) {
                lastLevelMax = Math.max(lastLevelMax, sum1, sum2);
            }
        }
    }

    return lastLevelMax;
};

const solution = (triangle) => {
    const sum = createSumArray(triangle.length, triangle[0][0]);
    const max = calculateMaxSumOfAllPaths(triangle, sum);
    return max;
};
