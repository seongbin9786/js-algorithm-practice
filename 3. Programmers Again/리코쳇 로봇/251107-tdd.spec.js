/*
[문제 해석]
- 직사각형 격자에서 R -> G 칸으로 최소한의 움직임으로 이동해야 함
- 빈 칸, 벽으로 구성되어 있음
- 각 움직임은 벽을 만날 때까지 직진
- 방문 불가능할 시 -1

[발상]
- 직진 구현 필요
- visited 기준은 '칸' 일 수 없음. (칸, 방향)으로 해야 함. (오... '경주로 건설'의 아이디어가 도움이 된다. 이런 아이디어를 잘 모아두면 좋을텐데)
- visited가 없으면 무한 루프 가능함
- BFS로 moves로 보관하며 탐색
- board 크기 <= 100x100

[헤맨 부분]
- while로 갈 수 있을 때까지 가야 했는데 처리가 모호했음 -> invalid할 때까지 간 후, 한 번 돌아가면 됨

*/
import { describe, it, assert } from "vitest";

describe("리코쳇 로봇 (Lv.2)", () => {
    it.each([
        [["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."], 7],
        [[".D.R", "....", ".G..", "...D"], -1],
    ])("%j => %i", (board, expected) => {
        const result = solution(board);
        assert.equal(result, expected);
    });
});

function solution(board) {
    board = board.map((row) => [...row]);
    const ROWS = board.length;
    const COLS = board[0].length;

    console.log(`ROWS: ${ROWS}, COLS: ${COLS}`);

    let startY, startX;

    for (let y = 0; y < ROWS; y++) {
        let x;
        for (x = 0; x < COLS; x++) {
            if (board[y][x] === "R") {
                startY = y;
                startX = x;
                break;
            }
        }
        if (startY === y && startX === x) {
            break;
        }
    }

    // visited 3중 배열 선언도 귀찮고 해서 그냥 set으로 하기
    // y*10_000 + x*10 + dir(0~3)
    const visited = new Set();

    // BFS
    const dy = [0, 0, -1, 1];
    const dx = [-1, 1, 0, 0];
    const Q = [[startY, startX, 0]];

    while (Q.length > 0) {
        const [y, x, moves] = Q.shift();
        console.log(`visiting: ${y},${x} (moves: ${moves})`);

        if (board[y][x] === "G") {
            return moves;
        }

        for (let dir = 0; dir < 4; dir++) {
            if (visited.has(y * 10_000 + x * 10 + dir)) {
                continue;
            }

            let ny = y;
            let nx = x;

            // 한 번에 하는 방법이 없을까?
            while (
                ny >= 0 &&
                ny < ROWS &&
                nx >= 0 &&
                nx < COLS &&
                board[ny][nx] !== "D"
            ) {
                ny += dy[dir];
                nx += dx[dir];
            }

            // 항상 실패할 때까지 이동
            ny -= dy[dir];
            nx -= dx[dir];

            visited.add(y * 10_000 + x * 10 + dir);
            Q.push([ny, nx, moves + 1]);
        }
    }

    return -1;
}
