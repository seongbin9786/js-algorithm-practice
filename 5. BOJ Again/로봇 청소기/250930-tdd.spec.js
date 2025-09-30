import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 벽(1)과 빈 칸(0)으로 구성된 NxM 영역이 주어졌을 때, 청소하는 영역의 개수를 반환
2. 시작 위치 (r,c) 와 방향(d)가 주어지면 다음과 같이 동작한다. (d=0 북, d=1 동, d=2 남, d=3 서)
    - 현재 칸 청소
    - 주변 4칸 중 청소할 곳이 없다면
        - 후진이 불가능하다면 멈춤 <종료>
        - 후진이 가능하다면 방향을 유지하고 후진
    - 있다면
        - 반시계방향으로 회전
        - 만약 앞 칸이 청소 가능하다면 전진
        - 1번으로 이동

[제한 조건]
1. 3 <= N,M <= 50
2. N x M 에 M개씩 입력

[발상]
1. 그냥 구현하면 될 거 같은데...?
2. 일단 구현하고 생각하기로


*/
describe("로봇 청소기", () => {
    it.each([
        // 기본 TC
        // (생각 안 함..)
        // 백준 TC
        [
            3,
            3,
            1,
            1,
            0,
            [
                [1, 1, 0],
                [1, 0, 1],
                [1, 1, 1],
            ],
            1,
        ],
        [
            11,
            10,
            7,
            4,
            0,
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
            57,
        ],
    ])("%i,%i,%i,%i,%i,%j => %j", (MAX_R, MAX_C, r, c, dir, room, expected) => {
        const result = robotCleaner(MAX_R, MAX_C, r, c, dir, room);
        assert.deepEqual(result, expected);
    });
});

// N=r, M=c
function robotCleaner(MAX_R, MAX_C, r, c, dir, room) {
    // d=0 북, d=1 동, d=2 남, d=3 서
    function getFrontCell(r, c, dir) {
        switch (dir) {
            case 0:
                return [r - 1, c];
            case 1:
                return [r, c + 1];
            case 2:
                return [r + 1, c];
            case 3:
                return [r, c - 1];
        }
    }

    // d=0 북, d=1 동, d=2 남, d=3 서
    function getBackCell(r, c, dir) {
        switch (dir) {
            case 0:
                return [r + 1, c];
            case 1:
                return [r, c - 1];
            case 2:
                return [r - 1, c];
            case 3:
                return [r, c + 1];
        }
    }

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    let cleaned = 0;
    while (true) {
        if (room[r][c] === 0) {
            cleaned++;
            room[r][c] = 2; // 벽으로 설정하면 안 됨, visited 개념 대신 사용
        }

        let available = false;
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (
                nr >= 0 &&
                nr < MAX_R &&
                room[nr][nc] === 0 &&
                nc >= 0 &&
                nc < MAX_C &&
                room[nr][nc] === 0
            ) {
                available = true;
                break;
            }
        }

        if (available) {
            // 반시계 방향으로 회전
            dir = dir === 0 ? 3 : dir - 1;

            // 바로 앞 칸이 빈 경우 이동
            const [nr, nc] = getFrontCell(r, c, dir);
            if (room[nr][nc] === 0) {
                r = nr;
                c = nc;
            }
        } else {
            // 현재 방향을 고려한 뒷칸 계산 필요
            const [nr, nc] = getBackCell(r, c, dir);
            if (room[nr][nc] === 1) {
                break;
            } else {
                r = nr;
                c = nc;
            }
        }
    }

    return cleaned;
}

function bojRun() {
    const input = require("fs")
        .readFileSync("/dev/stdin")
        .toString()
        .split("\n");

    const [N, M] = input[0].split(" ").map(Number);
    const [r, c, dir] = input[1].split(" ").map(Number);
    const MAP = [];
    for (let i = 2; i < N + 2; i++) {
        MAP.push(input[i].split(" ").map(Number));
    }

    const result = robotCleaner(N, M, r, c, dir, MAP);
    console.log(result);
}
