import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. m*n 행렬이 주어졌을 때 각 셀에서 0과 가장 가까운 거리를 반환 (경계를 공유할 때 거리 1)

[제한 조건]
1. m, n <= 10,000
2. m * n <= 10,000

[발상]
1. O(n*m)으로 풀 수 있지 않을까?
    - BFS, DFS 기반 완전 탐색으로 풀 수 있을까? => 가능 O(V+E) 혹은 O(V^2)이기 때문
    - 근데 이건 각 0 혹은 1에서 매번 방문을 반복해야 하므로.. O(n^3)
    - 모든 0을 Q에 넣고 BFS 시작
    - 방문하지 않은 1인 노드만 추가 방문, 거리 보관
    - 모든 1을 방문했다면 중간 종료

*/
describe("01 Matrix", () => {
    it.each([
        // 기본 TC
        // 리트코드 TC
        [
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ],
        ],
        [
            [
                [0, 0, 0],
                [0, 1, 0],
                [1, 1, 1],
            ],
            [
                [0, 0, 0],
                [0, 1, 0],
                [1, 2, 1],
            ],
        ],
    ])("%j => %j", (mat, expected) => {
        const result = updateMatrix(mat);
        assert.deepEqual(result, expected);
    });
});

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const queue = [];

    const MAX_R = mat.length;
    const MAX_C = mat[0].length;

    // visited 겸용
    const distanceMap = Array.from({ length: MAX_R }, () =>
        Array(MAX_C).fill(0)
    );

    for (let r = 0; r < MAX_R; r++) {
        for (let c = 0; c < MAX_C; c++) {
            if (mat[r][c] === 0) {
                queue.push([r, c, 0]);
            }
        }
    }

    let notVisitedOnes = MAX_R * MAX_C - queue.length;

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    while (queue.length > 0 && notVisitedOnes > 0) {
        const [r, c, distance] = queue.shift();
        if (distanceMap[r][c] > 0) {
            continue;
        }
        distanceMap[r][c] = distance;

        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (
                nr >= 0 &&
                nr < MAX_R &&
                nc >= 0 &&
                nc < MAX_C &&
                mat[nr][nc] === 1 &&
                distanceMap[nr][nc] === 0
            ) {
                queue.push([nr, nc, distance + 1]);
            }
        }
    }

    return distanceMap;
};
