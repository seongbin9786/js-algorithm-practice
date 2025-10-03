import { describe, it, assert } from "vitest";

/*
이거 손으로 시뮬레이션해보고 하려면 시간이 엄-청 오래 걸리는 문제임

[문제 해석]
1. 이미 물이 채워져 있는 NxN 바구니 격자가 주어졌을 때, 주어진 '비바라기' 연산을 M번 한 후의 격자를 반환
2. 좌하단 4칸에서 시작
3. M번의 연산에 대해
    - 격자에 원형 탐색을 적용해서 구름을 이동시키고, 구름의 위치에 해당하는 바구니들에 물+1
    - 구름에 의해 물이 증가한 각 칸은 모든 대각선 방향을 확인해 물>=2인 칸의 개수만큼 물+ (이 때는 원형 탐색 x)
    - 아까 구름이 머물렀던 칸들을 제외한 모든 물>=2인 칸에 대해 구름을 생성하고, 해당 칸들에 물-2씩함
4. 물의 양을 반환

[제한 조건]
1. 2 <= N <= 50
2. 1 <= M <= 100
3. 이동 거리 최대 50 (한 번이 아니라 여러 번 순환할 수도-)

[발상]
1. 그냥 시키는대로 하면 되는 문제
2. 조금 고민되는 부분
    - 8가지 이동 방향에 대한 구현과 원형 탐색 처리
    - 원형 탐색은 음수가 될 때, 값이 넘어갈 때하면 되므로 쉬울 것 같고
    - 대각선 이동 역시 y,x를 동시에 움직여줄 뿐 2차원인 건 동일해서 쉬울 것 같다

[발상2]
1. 음수로 이동하면 어떻게 계산할 수 있을까? => N을 여러 번 더해주면 됨. (양수로 바꿔서 N으로 나눈 몫, 만약 나머지가 있다면 몫+1) 만큼 곱해서 원래 수에 더해주면 됨.
    e.g. N=2, 이동 후 -2이면, N+2 = 0 으로 이동한 것임 (2x2 격자에서 0에서 출발해 위로 2번 간 것)
    e.g. N=3, 이동 후 -2이면, N+2 = 1 로 이동한 것임.
*/

describe("마법사 상어와 비바라기", () => {
    it.each([
        // 기본 TC
        [
            2,
            1,
            [
                [0, 0],
                [0, 0],
            ],
            [[1, 1]],
            8,
        ],
        [
            3,
            1,
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [[1, 1]],
            8,
        ],
        [
            3,
            2,
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [1, 1], // 구름이 없이 시작함
                [1, 1],
            ],
            8,
        ],
        [
            3,
            3,
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [1, 1], // 구름이 없이 시작함
                [1, 1], // 다시 0으로 초기화됨
                [1, 1],
            ],
            8,
        ],
        [
            3,
            2,
            [
                [2, 2, 2],
                [2, 2, 2],
                [2, 2, 2],
            ],
            [
                [1, 1], // 31
                [6, 1],
            ],
            36,
        ],
        // 백준 TC
        // [
        //     5,
        //     4,
        //     [
        //         [0, 0, 1, 0, 2],
        //         [2, 3, 2, 1, 0],
        //         [4, 3, 2, 9, 0],
        //         [1, 0, 2, 9, 0],
        //         [8, 8, 2, 1, 0],
        //     ],
        //     [
        //         [1, 3],
        //         [3, 4],
        //         [8, 1],
        //         [4, 8],
        //     ],
        //     77,
        // ],
    ])("%i,%i,%j,%j => %i", (N, M, baskets, commands, expected) => {
        const result = magicSharkRain(N, M, baskets, commands);
        assert.deepEqual(result, expected);
    });
});

/*
[구현]
1. 구름 시뮬레이션
    - 4개에서 시작하지만 N개가 될 수도, 0개가 될 수도 있음
    - 그냥 배열로 보관하고 개별적으로 이동시켜야 함
2. 이동 시뮬레이션
    - 8가지 방향 이동 구현 (원형 탐색 적용)
    - 4가지 대각선 조회 구현 (원형 탐색 미적용)
*/
function magicSharkRain(N, M, baskets, commands) {
    // ←, ↖, ↑, ↗, →, ↘, ↓, ↙
    const DIR = {
        LEFT: 1,
        LEFT_TOP: 2,
        TOP: 3,
        RIGHT_TOP: 4,
        RIGHT: 5,
        RIGHT_BOTTOM: 6,
        BOTTOM: 7,
        LEFT_BOTTOM: 8,
    };

    function circularPos(pos) {
        if (pos >= N) {
            return pos % N;
        }
        if (pos < 0) {
            const multiplier = Math.ceil(N / (pos * -1));
            return N * multiplier - pos;
        }
    }

    function moveCloud(r, c, dir) {
        switch (dir) {
            case DIR.TOP:
                return [circularPos(r - 1), c];
            case DIR.RIGHT_TOP:
                return [circularPos(r - 1), circularPos(c + 1)];
            case DIR.RIGHT:
                return [circularPos(r + 1), c];
            case DIR.RIGHT_BOTTOM:
                return [circularPos(r + 1), circularPos(c + 1)];
            case DIR.BOTTOM:
                return [circularPos(r + 1), c];
            case DIR.LEFT_BOTTOM:
                return [circularPos(r + 1), circularPos(c - 1)];
            case DIR.LEFT:
                return [r, circularPos(c - 1)];
            case DIR.LEFT_TOP:
                return [circularPos(r - 1), circularPos(c - 1)];
        }
    }
}

function bojRun() {
    const input = require("fs")
        .readFileSync("/dev/stdin")
        .toString()
        .split("\n");

    const [N, M] = input[0].split(" ").map(Number);
    const baskets = [];
    for (let i = 1; i < N + 1; i++) {
        baskets.push(input[i].split(" ").map(Number));
    }

    const commands = [];
    for (let i = N + 1; i < N + M + 1; i++) {
        baskets.push(input[i].split(" ").map(Number));
    }

    const result = magicSharkRain(N, M, baskets, commands);
    console.log(result);
}
