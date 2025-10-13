import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 파티션=X, 빈테이블=O, 자리=P 으로 구성된 5x5 격자에서, 모든 P 간 맨해튼 거리 2 초과면 1, 아니면 0 (단, 파티션으로 막혀있을 때 제외)

[해결 방법]
1. 주변 12칸에 대해 체크해야 함. 대각선 4칸 + 동서남북 2칸씩 - 파티션이 있는 경우 해당 방향은 체크하지 않게 됨
2. 만약 대각선 방향으로 둘 다 파티션이 있으면 체크하지 않음
3. 그냥 파티션으로 필터링해서 체크했는데 다른 P를 방문하면 실패로 간주하면 될 것 같음

[탐색 구현]
1. 좌상단부터 우하단까지 P만나면 12칸 체크
2. DFS로 구현

[TC]
- 딱히 반례가 없을 것 같은 복잡성이어서 우선 작성 후 체크 예정
*/
describe("거리두기 확인하기", () => {
    it.each([
        // 프로그래머스 TC
        [
            [
                ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
                ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
                ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
                ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
                ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
            ],
            [1, 0, 1, 1, 1],
        ],
    ])("%j => %j", (places, expected) => {
        const result = solution(places);
        assert.deepEqual(result, expected);
    });
});

function solution(places) {
    return places.map((placeStringArrs) => {
        const map = placeStringArrs.map((row) => [...row]);
        return checkAnswer(map);
    });
}

const BAD = 0;
const OK = 1;

function checkAnswer(map) {
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (map[y][x] === "P" && findAnotherP(map, y, x)) {
                return BAD;
            }
        }
    }
    return OK;
}

const N = 5;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

// 이거 기반으로 현재와 해당 대각 좌표 사이의 좌표를 구할 수 있을까?
// --> dgy, dgx 중 하나만 더하면, 양쪽 좌표가 됨
const dgy = [-1, 1, -1, 1];
const dgx = [-1, -1, 1, 1];

function findAnotherP(map, y, x) {
    // 동서남북 8칸
    for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];
        const nny = y + dy[i] * 2;
        const nnx = x + dx[i] * 2;

        // 그 다음으로 넘어갈 필요 없음
        if (!isSafeRange(ny, nx) || map[ny][nx] === "X") {
            continue;
        }
        if (
            map[ny][nx] === "P" ||
            (isSafeRange(nny, nnx) && map[nny][nnx] === "P")
        ) {
            return true;
        }
    }

    // 대각선 4칸
    for (let i = 0; i < 4; i++) {
        // 대각선 좌표만 체크해도 전체 범위 안전
        const ny = y + dgy[i];
        const nx = x + dgx[i];
        if (!isSafeRange(ny, nx)) {
            continue;
        }
        // 대각선으로 가는 좌표 둘 다 막혀 있으면 안전
        const a = map[y + dgy[i]][x];
        const b = map[y][x + dgx[i]];
        if (a === "X" && b === "X") {
            continue;
        }
        if (map[ny][nx] === "P") {
            return true;
        }
    }

    return false;
}

function isSafeRange(y, x) {
    return y >= 0 && y < N && x >= 0 && x < N;
}
