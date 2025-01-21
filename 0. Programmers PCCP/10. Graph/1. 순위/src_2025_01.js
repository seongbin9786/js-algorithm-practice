const solution = (n, results) => {
    const win = [...Array(n)].map(() => Array(n).fill(undefined));

    results.forEach(([rawA, rawB]) => {
        // 1-indexed -> 0-indexed
        const a = rawA - 1;
        const b = rawB - 1;

        const nestedWinners = [a];
        const nestedLosers = [b];

        // 먼저 수집을 해야 한 번에 순회가 가능함
        for (let x = 0; x < n; x++) {
            // 승자에게 이긴 자들을 모집
            if (win[x][a]) {
                nestedWinners.push(x);
            }
            // 패자에게 진 자들을 모집
            if (win[b][x]) {
                nestedLosers.push(x);
            }
        }

        nestedWinners.forEach((winner) => {
            nestedLosers.forEach((loser) => {
                win[loser][winner] = false;
                win[winner][loser] = true;
            });
        });
    });

    // 오직 arr[x][x]만 undefined인 칸이면 순위가 결정된 상태
    return win.filter(
        (row) => row.filter((cell) => cell === undefined).length === 1
    ).length;
};
