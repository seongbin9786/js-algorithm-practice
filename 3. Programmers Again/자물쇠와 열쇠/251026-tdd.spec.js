/*
[문제 해석]
- 자물쇠는 N x N 크기의 정사각
- 열쇠는 M x M 크기인 정사각
- 자물쇠에는 홈이 파여 있고 열쇠 또한 홈과 돌기 부분이 있습니다. 
- 열쇠는 회전과 이동이 가능
- 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열림

제한사항
- key는 M x M(3 ≤ M ≤ 20, M은 자연수)크기 2차원 배열입니다.
- lock은 N x N(3 ≤ N ≤ 20, N은 자연수)크기 2차원 배열입니다.
- M은 항상 N 이하입니다.
- key와 lock의 원소는 0 또는 1로 이루어져 있습니다.
- 0은 홈 부분, 1은 돌기 부분을 나타냅니다.

[발상]
1. 4방향 회전을 시키고, 회전한 것을 다 이동시켜보면 될 듯
2. 90도 회전은 쉬움

[풀이 생각 1]
1. 어떻게 이동시킬지가 어려움
    - 움직이는 경우의 수를 모르겠음
    - 위로: M-1번
    - 아래로: M-1번
    - 왼쪽으로: M-1번
    - 오른쪽으로: M-1번
    - (위로 + 아래로) * (왼쪽으로 + 오른쪽으로) = (2M-2)^2 = 4M^2 정도
2. 어떻게 잘라야?
    - 위로: 올라간 칸수만큼 위에서 자르고, 밑에 빈 줄을 채워야 함
    - 아래로: 내려간 칸수만큼 밑에서 자르고, 위에 빈 줄을 채워야 함
    - 왼쪽으로: 왼쪽으로간 칸수만큼 왼쪽에서 자르고, 오른쪽에 빈 줄을 채워야 함
    - 오른쪽으로: 오른쪽으로간 칸수만큼 오른쪽에서 자르고, 왼쪽에 빈 줄을 채워야 함

[풀이 생각 2]
1. 자물쇠에서 빈 부분을 최소 구간으로 잡음 (예시의 경우 2x2)
2. 열쇠를 4방향으로 돌린 것들에 대해 순회함
    - 자물쇠를 열쇠 내부 범위에 대해 모두 이동해보면서 일치하는 경우를 찾음
        - 일치 여부: '빠진 영역'이 다 채워지고, '안빠진 영역'끼리 만나는 경우가 없을 때
*/

import { describe, it, assert } from "vitest";

describe("자물쇠와 열쇠 (Lv.3)", () => {
    it.each([
        // 기본 TC
        [
            [
                [0, 0, 0],
                [1, 0, 0],
                [0, 1, 1],
            ],
            [
                [1, 1, 1],
                [1, 1, 0],
                [1, 0, 1],
            ],
            true,
        ],
    ])("%j,%j => %i", (key, lock, expected) => {
        const result = solution(key, lock);
        assert.equal(result, expected);
    });
});

function solution(key, lock) {
    const [emptyCells, lockSlice] = getLockSlice(lock);

    let rotateCount = 0;

    do {
        const fit = tarverseFit(key, lockSlice, emptyCells);
        if (fit) {
            return true;
        }
        key = rotate90(key);
    } while (rotateCount < 4);

    return false;
}

// 짜는데 오래 걸렸음..
function rotate90(board) {
    const N = board.length;
    const result = Array.from({ length: N }, () => Array(N).fill(0));

    // 세로줄을 가로 줄로: 1열이 1행이 되어야 함
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            // 원본 1열: 0,0 - 1,0 - 2,0 - 3,0 - 4,0 순서로 방문하면
            // 결과 1행: 0,0 - 0,1 - 0,2 - ... 순서로 방문
            result[x][y] = board[N - y - 1][x];
        }
    }

    return result;
}

function getLockSlice(lock) {
    const N = lock.length;
    let top = N;
    let bottom = -1;
    let left = N;
    let right = -1;

    let emptyCells = 0;

    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (lock[y][x] === 0) {
                emptyCells++;
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
                left = Math.min(left, x);
                right = Math.max(right, x);
            }
        }
    }

    const lockSlice = lock
        .slice(top, bottom + 1)
        .map((row) => row.slice(left, right + 1));

    return [emptyCells, lockSlice];
}

function tarverseFit(key, lockSlice, emptyCells) {
    const M = key.length;
    for (let y = 0; y <= M - lockSlice.length; y++) {
        for (let x = 0; x <= M - lockSlice[0].length; x++) {
            if (checkFit(key, lockSlice, emptyCells)) {
                return true;
            }
        }
    }
    return false;
}

function checkFit(key, lockSlice, emptyCells) {
    for (let y = 0; y < lockSlice.length; y++) {
        for (let x = 0; x < lockSlice[0].length; x++) {
            if (key[y][x] === 1 && lockSlice[y][x] === 1) {
                return false;
            }
            if (key[y][x] === 1 && lockSlice[y][x] === 0) {
                emptyCells--;

                if (emptyCells === 0) {
                    return true;
                }
            }
        }
    }

    return false;
}

// // Q. 꼭 NxN 형태를 맞춰야 할까?
// //
// function move(board, dir) {
//     const N = board.length;
//     const emptyRow = Array(N).fill(0);
//     switch (dir) {
//         case "UP":
//             return board.slice(1).concat([emptyRow]);
//         case "DOWN":
//             return [emptyRow].concat(board.slice(0, board.length - 1));
//     }
// }
