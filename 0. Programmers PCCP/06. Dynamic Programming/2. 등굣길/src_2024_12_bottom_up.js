const solution = (m, n, puddles) => {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    cache[0][0] = 0;
    cache[1][0] = 1;
    cache[0][1] = 1;

    puddles.forEach(([x, y]) => {
        cache[y - 1][x - 1] = 0;
    });

    // 아래, 우측 방향으로만 이동
    // (y,x)에 대해 (y,x-1), (y-1,x)의 값은 항상 존재한다.
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            if (cache[y][x] >= 0) {
                continue;
            } else if (y === 0) {
                cache[y][x] = cache[y][x - 1] % 1_000_000_007;
            } else if (x === 0) {
                cache[y][x] = cache[y - 1][x] % 1_000_000_007;
            } else {
                cache[y][x] =
                    (cache[y - 1][x] + cache[y][x - 1]) % 1_000_000_007;
            }
        }
    }

    return cache[n - 1][m - 1] % 1_000_000_007;
};
