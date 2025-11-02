/*
[문제 해석]
- 직사각형 격자에서 시작지점->레버지점->종료지점으로 가는 최소 이동 횟수 반환

[발상]
- S->L,L->E로 각각 BFS하고 합산하기
*/

import { describe, it, assert } from "vitest";

describe("미로 탈출 (Lv.2)", () => {
    it.each([
        [["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"], 16],
        [["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"], -1],
    ])("%j => %i", (maps, expected) => {
        const result = solution(maps);
        assert.equal(result, expected);
    });
});

function solution(maps) {
    let moves = 0;

    const map = [];
    let startX, startY, endX, endY, leverX, leverY;
    for (let y = 0; y < maps.length; y++) {
        map.push([]);
        for (let x = 0; x < maps[0].length; x++) {
            map[y].push(maps[y].charAt(x));
            if (map[y][x] === "S") {
                startX = x;
                startY = y;
            } else if (map[y][x] === "E") {
                endX = x;
                endY = y;
            } else if (map[y][x] === "L") {
                leverX = x;
                leverY = y;
            }
        }
    }

    const fromStartToLever = bfs(map, startX, startY, leverX, leverY);
    if (fromStartToLever <= 0) {
        return -1;
    }
    moves += fromStartToLever;
    const fromLeverToEnd = bfs(map, leverX, leverY, endX, endY);
    if (fromLeverToEnd <= 0) {
        return -1;
    }
    moves += fromLeverToEnd;

    return moves;
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(map, fromX, fromY, toX, toY) {
    const ROWS = map.length;
    const COLS = map[0].length;

    const Q = [[fromY, fromX, 0]];
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    while (Q.length > 0) {
        const [y, x, moves] = Q.shift();
        if (visited[y][x]) {
            continue;
        }
        console.log(`visiting: ${y},${x} (${map[y][x]})`);
        visited[y][x] = true;
        if (y === toY && x === toX) {
            return moves;
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (
                nx >= 0 &&
                nx < COLS &&
                ny >= 0 &&
                ny < ROWS &&
                !visited[ny][nx] &&
                map[ny][nx] !== "X"
            ) {
                Q.push([ny, nx, moves + 1]);
            }
        }
    }

    return -1;
}
