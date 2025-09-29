import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. m*n 격자에 0=빈칸, 1=정상, 2=썩은오렌지 로 구성해서 시작 (m,n <= 10)
2. 썩은 오렌지는 매 '분' 주변을 썩은 오렌지로 바꿈
3. 전체를 썩히는데 걸리는 '분' = ? / 다 썩힐 수 없다면 -1 반환

[풀이]
1. 1칸씩 전진해야 하므로 BFS로 풀어야 함.
2. 2차원 배열을 순회해 Q에 넣되, {y,x,minutes:0}로 넣음, 1,2의 전체 개수 totalCount를 구함
3. Q에서 노드를 뺄 때마다 visitMinutes = max(minutes)하고, visitCount++, 주위의 1을 visited = true하고 Q에 넣음
4. Q가 빌 때까지 진행 후 visitCount = totalCount 이면 visitMinutes 반환, 아니면 -1 반환
*/
describe("Rotting Oranges", () => {
    it.each([
        // 가장 기초적인 TC
        [[[0]], 0],
        [[[1]], -1],
        [
            [
                [0, 0],
                [0, 0],
            ],
            0,
        ],
        [
            [
                [2, 0],
                [0, 0],
            ],
            0,
        ],
        [
            [
                [1, 0],
                [0, 0],
            ],
            -1,
        ],
        [
            [
                [2, 1],
                [1, 0],
            ],
            1,
        ],
        // 여러 번 이동해야 하는 TC
        [
            [
                [2, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ],
            4,
        ],
        [
            [
                [2, 1, 1],
                [0, 0, 1],
                [1, 1, 1],
            ],
            6,
        ],
        [
            [
                [1, 1, 1],
                [1, 2, 1],
                [1, 1, 1],
            ],
            2,
        ],
        [
            [
                [0, 1, 0],
                [1, 2, 1],
                [0, 1, 0],
            ],
            1,
        ],
        [
            [
                [2, 1, 0],
                [1, 0, 1],
                [0, 1, 2],
            ],
            1,
        ],
        [
            [
                [2, 0, 0],
                [0, 0, 0],
                [0, 0, 2],
            ],
            0,
        ],
        [
            [
                [2, 0, 0],
                [0, 0, 0],
                [0, 0, 1],
            ],
            -1,
        ],
        // 리트코드 TC
        [
            [
                [2, 1, 1],
                [1, 1, 0],
                [0, 1, 1],
            ],
            4,
        ],
        [
            [
                [2, 1, 1],
                [0, 1, 1],
                [1, 0, 1],
            ],
            -1,
        ],
    ])("%j => %i", (grid, expected) => {
        const result = orangesRotting(grid);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    const MAX_Y = grid.length;
    const MAX_X = grid[0].length;

    const queue = [];
    const visited = Array.from({ length: MAX_Y }, () =>
        Array(MAX_X).fill(false)
    );

    let totalOranges = 0;
    let visitedOranges = 0;
    let maxMinutes = 0;

    for (let y = 0; y < MAX_Y; y++) {
        for (let x = 0; x < MAX_X; x++) {
            if (grid[y][x] > 0) {
                totalOranges++;
            }
            if (grid[y][x] === 2) {
                console.log(`pushing: ${y},${x}`);
                queue.push({ y, x, minutes: 0 });
            }
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    while (queue.length > 0) {
        const { y, x, minutes } = queue.shift();
        if (visited[y][x]) {
            continue; // 중첩되면 중복 방문이 가능함.
        }
        visited[y][x] = true;
        console.log(`visiting ${y},${x}`);
        visitedOranges++;
        maxMinutes = Math.max(maxMinutes, minutes);

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            if (
                ny >= 0 &&
                ny < MAX_Y &&
                nx >= 0 &&
                nx < MAX_X &&
                !visited[ny][nx] &&
                grid[ny][nx] === 1
            ) {
                queue.push({ y: ny, x: nx, minutes: maxMinutes + 1 });
            }
        }
    }

    if (totalOranges === visitedOranges) {
        return maxMinutes;
    }

    return -1;
};
