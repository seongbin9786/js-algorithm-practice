/*
1. 같은 모양의 카카오프렌즈 블록이 2x2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임이다.
2. 특정 판의 snapshot 기준으로 2x2이면, 2x2 끼리 겹치더라도, 모두 제거됨. 한 snapshot 상의 2x2는 모두 한꺼번에 제거됨
3. 블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채움.
4. 만약 빈 공간을 채운 후에 다시 2×2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지고를 반복하게 된다.

TTTANT
RRFACC
RRRFCC
TRRRAA
TTMMMF
TMMTTJ

각 문자는 라이언(R), 무지(M), 어피치(A), 프로도(F), 네오(N), 튜브(T), 제이지(J), 콘(C)을 의미한다
입력으로 블록의 첫 배치가 주어졌을 때, 지워지는 블록은 모두 몇 개인지 판단하는 프로그램을 제작하라.

입력 형식

입력으로 판의 높이 m, 폭 n과 판의 배치 정보 board가 들어온다.
2 ≦ n, m ≦ 30
board는 길이 n인 문자열 m개의 배열로 주어진다. 블록을 나타내는 문자는 대문자 A에서 Z가 사용된다.

출력 형식

입력으로 주어진 판 정보를 가지고 몇 개의 블록이 지워질지 출력하라.
*/

/*
(포기: 행<->열 전환 시도..)

    // 높이가 n, 너비가 m => 컬럼 개수 m
    const columns = Array.from({ length: m }, () => Array(n).fill(""));
    board.forEach((row, rowIndex) => {
        console.log("row:", row);
        for (let columnIdx = 0; columnIdx < row.length; columnIdx++) {
            columns[columnIdx][rowIndex] = row[columnIdx];
        }
    });

    row: TTTANT
    row: RRFACC
    row: RRRFCC
    row: TRRRAA
    row: TTMMMF
    row: TMMTTJ

    // 이렇게 보면 좀 어려운데...
    // [r][c]를 바꿔버리면 '선'대칭인가?

    // 천장 -> 바닥
    // 이 기준으로 4개씩 잘라도 되긴 할 듯? (좌측 상단 기준으로 보고.)
    columns: [
        [ 'T', 'R', 'R', 'T', 'T', 'T' ],
        [ 'T', 'R', 'R', 'R', 'T', 'M' ],
        [ 'T', 'F', 'R', 'R', 'M', 'M' ],
        [ 'A', 'A', 'F', 'R', 'M', 'T' ],
        [ 'N', 'C', 'C', 'A', 'M', 'T' ],
        [ 'T', 'C', 'C', 'A', 'F', 'J' ]
    ]

    이거 너무 어렵다 하지말자
    그냥 정상 배열로 갑시다.
*/

import { describe, it, assert } from "vitest";

describe("프렌즈 4블록 (카카오 Lv2) / 예외 풀이 실패 (TC 3개 실패)", () => {
    it.each([
        // 최소 칸에서 제거 case
        [2, 2, ["aa", "aa"], 4],
        // 최소 칸에서 미제거 case
        [2, 2, ["ba", "aa"], 0],
        // 3x2에서 모두 제거 case
        [3, 2, ["aa", "aa", "aa"], 6],
        [3, 2, ["bb", "bb", "bb"], 6],
        // 단순 개수 카운팅으로는 a만 2x2임을 처리할 수 없음!
        [3, 3, ["aab", "aab", "bbb"], 4],
        // 연쇄 제거 케이스 필요
        [4, 2, ["bb", "aa", "aa", "bb"], 8],
        // 프로그래머스 기본 TC들
        [4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"], 14],
        [
            6,
            6,
            ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"],
            15,
        ],
        // 흠.. TC 3개 실패... minR이 문제점일 거 같음
    ])("[%i*%i]%j => %i", (m, n, board, expected) => {
        const result = solution(m, n, board);
        assert.equal(result, expected);
    });
});

/*
[풀이]
1. '블록 내리기 단계'가 O(m*n*m) 이어서 느린데 (하단에서 상단까지 순회 시 평균 (n+1)/2) 이것말고는 방법이 없어 보임 (전체 시간 복잡도 = O(m*n*m*부수는최대횟수)
2. (y,x) <-> (x,y)로 대칭시켜 풀까했는데 대칭까지는 쉬운데 그 후 계속 행/열을 반대로 생각해야 돼서 포기. 예상보다 난도가 높았음.
3. '블록 내리기 단계'는 바닥부터 천장까지 순회하면서, '삭제된 블록'을 만나면 '정상 블록'을 같은 열에서 찾아서, '삭제된 블록' 위치에 '정상 블록'을 할당하고, 기존 '정상 블록'을 '삭제된 블록'으로 만들면 됨. 이건 최초로 찾은 블록에 대해서 실행하면 되고, 계속해서 행단위로 올라가기 때문에 무조건 전체 블록을 끌어내리게 됨

*/
function solution(m, n, board) {
    board = [...board].map((row) => [...row]);

    // console.log("board:", board);

    let totalRemoved = 0;
    const currRemoved = new Set();

    function remove(r, c) {
        currRemoved.add(r * 100 + c);
    }

    function markRemoved(pos) {
        const r = Math.floor(pos / 100);
        const c = pos % 100;
        board[r][c] = "-";
    }

    while (true) {
        // 2x2 체크 단계
        for (let r = 0; r < m - 1; r++) {
            for (let c = 0; c < n - 1; c++) {
                const lt = board[r][c];
                const rt = board[r + 1][c];
                const lb = board[r][c + 1];
                const rb = board[r + 1][c + 1];

                if (lt !== "-" && lt === rt && lt === lb && lt === rb) {
                    // console.log(`removing 2x2: [${r}][${c}](=${lt})`);
                    // console.log(board);

                    remove(r, c);
                    remove(r + 1, c);
                    remove(r, c + 1);
                    remove(r + 1, c + 1);
                }
            }
        }

        // 실제 삭제 단계
        currRemoved.forEach(markRemoved);
        // console.log("after remove:", board);

        // console.log("currRemoved.size:", currRemoved.size);
        totalRemoved += currRemoved.size;
        if (currRemoved.size === 0) {
            break;
        }
        currRemoved.clear();

        // 박스 내리기 단계
        // 바닥에서 천장 순서로 체크
        // O(m*n*n) - 느린데, 이것 말고 방법이 없음.
        for (let r = m - 1; r >= 0; r--) {
            for (let c = 0; c < n; c++) {
                if (board[r][c] === "-") {
                    let validR = r;
                    while (validR >= 0 && board[validR][c] === "-") {
                        validR--;
                    }
                    if (validR >= 0) {
                        board[r][c] = board[validR][c];
                        board[validR][c] = "-";
                    }
                }
            }
        }
        // console.log("after gravity:", board);
    }

    return totalRemoved;
}
