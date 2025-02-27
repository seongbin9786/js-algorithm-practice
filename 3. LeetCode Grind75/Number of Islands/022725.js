/**
 * @param {character[][]} grid
 * @return {number}
 */
/*

*/
/*
[문제]
- m*n 격자에 '1' = 땅, '0' = 바다 , 섬의 개수 반환
- 격자의 끝 부분은 바다로 가정
- 최대 300 * 300 칸

[해결 방법]
- 모든 미방문 '1'에 대해 방문 시도 (바깥 for)
- '1'을 만나면 인접 '1'을 모두 DFS 방문하면 됨 (안쪽 for)
- 바깥 for에서 섬++

*/
var numIslands = function (grid) {
    const MAX_Y = grid.length;
    const MAX_X = grid[0].length;
    const visited = Array.from({ length: MAX_Y }, () =>
        Array(MAX_X).fill(false)
    );

    const d = [1, 0, -1, 0, 1]; // 이거 하나로 퉁치기 가능함.

    const dfs = (y, x) => {
        if (visited[y][x]) {
            return;
        }
        visited[y][x] = true;
        for (let i = 0; i < 4; i++) {
            const ny = y + d[i];
            const nx = x + d[i + 1];
            if (ny < 0 || ny >= MAX_Y || nx < 0 || nx >= MAX_X) continue;
            if (visited[ny][nx] || grid[ny][nx] === "0") continue;

            dfs(ny, nx);
        }
    };

    let islands = 0;
    for (let y = 0; y < MAX_Y; y++) {
        for (let x = 0; x < MAX_X; x++) {
            if (grid[y][x] === "1" && !visited[y][x]) {
                dfs(y, x);
                islands++;
            }
        }
    }

    return islands;
};
