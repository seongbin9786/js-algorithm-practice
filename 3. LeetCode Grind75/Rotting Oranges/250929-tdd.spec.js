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
    ])("%j => %i", (grid, expected) => {
        const result = orangesRotting(grid);
        assert.deepEqual(result, expected);
    });
});

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 1) {
                return -1;
            }
        }
    }
    return 0;
};
