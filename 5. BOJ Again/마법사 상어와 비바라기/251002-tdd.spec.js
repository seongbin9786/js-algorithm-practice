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
            8, // 처음 왼쪽 이동해서 +1씩 해서 +4, 각 칸에서 유효한 대각선이 1개씩 있어서 +4
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
            4, // 처음 왼쪽 이동해서 +1씩 해서 +4, 각 칸에서 유효한 대각선이 없어서 +0
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
                [1, 1],
                [1, 1], // 물양=4에서 시작하고, 구름이 없이 시작함 -> 해당 라운드 자체는 물 추가가 없음
            ],
            4,
        ],
        [
            3,
            4,
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            [
                [1, 1], // 물양=4
                [1, 1], // 2를 넘는 칸이 없어 구름이 없이 시작하고, 물 추가가 없음
                [1, 1], // 2를 넘는 칸이 없어 구름이 영원히 생기지 않음
                [1, 1], // 2를 넘는 칸이 없어 구름이 영원히 생기지 않음
            ],
            4,
        ],
        [
            3,
            1,
            [
                [2, 2, 2],
                [2, 2, 2],
                [2, 2, 2],
            ],
            [
                [1, 1], // 물추가+1씩하고, 대각선으로+6, 이후 구름 없었던 2이상 칸에서 -2씩 해서, 18
            ],
            18,
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
                [1, 1], // 18
                [6, 1], // 좀 복잡한데.. 구름 이동해서 비내리고 대각선 추가해주면 22, 구름 없던 곳에서 2씩 제거하면 20.
            ],
            26,
        ],
        // 백준 TC
        [
            5,
            4,
            [
                [0, 0, 1, 0, 2],
                [2, 3, 2, 1, 0],
                [4, 3, 2, 9, 0],
                [1, 0, 2, 9, 0],
                [8, 8, 2, 1, 0],
            ],
            [
                [1, 3],
                [3, 4],
                [8, 1],
                [4, 8],
            ],
            77,
        ],
        [
            5,
            8,
            [
                [0, 0, 1, 0, 2],
                [2, 3, 2, 1, 0],
                [0, 0, 2, 0, 0],
                [1, 0, 2, 0, 0],
                [0, 0, 2, 1, 0],
            ],
            [
                [1, 9],
                [2, 8],
                [3, 7],
                [4, 6],
                [5, 5],
                [6, 4],
                [7, 3],
                [8, 2],
            ],
            41,
        ],
        [
            5,
            8,
            [
                [100, 100, 100, 100, 100],
                [100, 100, 100, 100, 100],
                [100, 100, 100, 100, 100],
                [100, 100, 100, 100, 100],
                [100, 100, 100, 100, 100],
            ],
            [
                [8, 1],
                [7, 1],
                [6, 1],
                [5, 1],
                [4, 1],
                [3, 1],
                [2, 1],
                [1, 1],
            ],
            2657,
        ],
    ])("%i,%i,%j,%j => %i", (N, M, baskets, commands, expected) => {
        const result = magicSharkRain(N, M, baskets, commands);
        assert.equal(result, expected);
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
    const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
    const dy = [0, -1, -1, -1, 0, 1, 1, 1];
    // 좌상단, 우상단, 우하단, 좌하단
    const dgx = [-1, 1, 1, -1];
    const dgy = [-1, -1, 1, 1];

    // 좌하단 2x2 정사각형에서 시작
    let clouds = [
        [N - 1, 0],
        [N - 1, 1],
        [N - 2, 0],
        [N - 2, 1],
    ];

    let prevClouds = new Set();

    console.log(`initial baskets:${JSON.stringify(baskets)}`);

    for (const [dir, shfitDist] of commands) {
        console.log(
            `d:${dir}, s:${shfitDist}, baskets:${JSON.stringify(
                baskets
            )}, clouds:${JSON.stringify(clouds)}`
        );
        // 모든 구름이 di 방향으로 si칸 이동한다.
        clouds = clouds.map(([r, c]) => {
            // N*s는 무조건 양수가 되게 만들기 위함이다-
            const nr = (r + dy[dir - 1] * shfitDist + N * shfitDist) % N;
            const nc = (c + dx[dir - 1] * shfitDist + N * shfitDist) % N;
            const nextPos = [nr, nc];
            console.log(`nextPos: ${nextPos}`);
            return nextPos;
        });
        console.log(`clouds:${JSON.stringify(clouds)}`);

        // 각 구름에서 비가 내려 구름이 있는 칸의 바구니에 저장된 물의 양이 1 증가한다.
        clouds.forEach(([r, c]) => {
            baskets[r][c]++;
        });

        // 구름이 모두 사라진다.
        // NOTE: 추후 '구름 체크'를 O(n^2)가 되게 하기 위해 체크 로직을 O(1)으로 수행하고자 Set 사용
        prevClouds = new Set(clouds.map(([r, c]) => `${r},${c}`));
        clouds = [];

        // 2에서 물이 증가한 칸 (r, c)에 물복사버그 마법을 시전한다.
        // 물복사버그 마법을 사용하면, 대각선 방향으로 거리가 1인 칸에 물이 있는 바구니의 수만큼 (r, c)에 있는 바구니의 물이 양이 증가한다.
        // 이때는 이동과 다르게 경계를 넘어가는 칸은 대각선 방향으로 거리가 1인 칸이 아니다.
        prevClouds.forEach((rAndC) => {
            const [r, c] = rAndC.split(",").map(Number);
            for (let i = 0; i < 4; i++) {
                const dgr = r + dgy[i];
                const dgc = c + dgx[i];
                if (
                    dgr >= 0 &&
                    dgr < N &&
                    dgc >= 0 &&
                    dgc < N &&
                    baskets[dgr][dgc] > 0
                ) {
                    baskets[r][c]++;
                }
            }
        });

        // 바구니에 저장된 물의 양이 2 이상인 모든 칸에 구름이 생기고, 물의 양이 2 줄어든다. 이때 구름이 생기는 칸은 3에서 구름이 사라진 칸이 아니어야 한다.
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (baskets[r][c] >= 2 && !prevClouds.has(`${r},${c}`)) {
                    clouds.push([r, c]);
                    baskets[r][c] -= 2;
                }
            }
        }
        console.log(`[ROUND FIN] baskets:${JSON.stringify(baskets)}`);
    }

    const totalWater = baskets.reduce(
        (sum, row) => sum + row.reduce((sum, curr) => sum + curr, 0),
        0
    );

    return totalWater;
}

function bojRun() {
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim().split("\n");

    const [N, M] = input[0].split(" ").map(Number);
    const baskets = [];
    for (let i = 1; i < N + 1; i++) {
        baskets.push(input[i].split(" ").map(Number));
    }

    const commands = [];
    for (let i = N + 1; i < N + M + 1; i++) {
        commands.push(input[i].split(" ").map(Number));
    }

    const result = magicSharkRain(N, M, baskets, commands);
    console.log(result);
}
