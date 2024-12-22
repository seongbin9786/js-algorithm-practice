const calculateSumOfShortestPaths = (cache, y, x) => {
    if (cache[y][x] >= 0) {
        return cache[y][x];
    }
    if (y === 0) {
        return (cache[y][x] =
            calculateSumOfShortestPaths(cache, y, x - 1) % 1_000_000_007);
    }
    if (x === 0) {
        return (cache[y][x] =
            calculateSumOfShortestPaths(cache, y - 1, x) % 1_000_000_007);
    }
    return (cache[y][x] =
        calculateSumOfShortestPaths(cache, y - 1, x) +
        (calculateSumOfShortestPaths(cache, y, x - 1) % 1_000_000_007));
};

const solution = (m, n, puddles) => {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    cache[1][0] = 1;
    cache[0][1] = 1;

    puddles.forEach(([x, y]) => {
        cache[y - 1][x - 1] = 0;
    });

    return calculateSumOfShortestPaths(cache, n - 1, m - 1) % 1_000_000_007;
};
