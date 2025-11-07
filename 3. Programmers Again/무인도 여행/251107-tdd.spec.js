/*
[문제 해석]
- 일반적인 '섬' 판별 문제인데 거기서 각 칸의 합계를 구하는 문제

[발상]
- DFS로 방문하되(BFS 무관이긴함), 재귀적으로 합계를 반환해야 한다는 아이디어가 필요

*/
import { describe, it, assert } from "vitest";

describe("무인도 여행 (Lv.2)", () => {
    it.each([
        [
            ["X591X", "X1X5X", "X231X", "1XXX1"],
            [1, 1, 27],
        ],
        [["XXX", "XXX", "XXX"], [-1]],
    ])("%j => %j", (maps, expected) => {
        const result = solution(maps);
        assert.deepEqual(result, expected);
    });
});

function solution(maps) {
    maps = maps.map((row) => [...row]);
    const ROWS = maps.length;
    const COLS = maps[0].length;

    const startY = [];
    const startX = [];

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (maps[y][x] !== "X") {
                startY.push(y);
                startX.push(x);
            }
        }
    }

    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    // DFS
    // 근데 다 돌았다는 걸 어떻게 암?
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    function getSumOfFoods(y, x) {
        if (visited[y][x]) {
            return;
        }

        visited[y][x] = true;

        let foods = Number(maps[y][x]);

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            if (
                nx >= 0 &&
                nx < COLS &&
                ny >= 0 &&
                ny < ROWS &&
                !visited[ny][nx] &&
                maps[ny][nx] !== "X"
            ) {
                foods += getSumOfFoods(ny, nx);
            }
        }

        return foods;
    }

    let foods = [];
    for (let i = 0; i < startX.length; i++) {
        const y = startY[i];
        const x = startX[i];
        if (visited[y][x]) {
            continue;
        }
        foods.push(getSumOfFoods(y, x));
    }

    return foods.length === 0 ? [-1] : foods.sort((a, b) => a - b);
}
