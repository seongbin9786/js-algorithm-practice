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

import { describe, it, assert } from "vitest";

describe("프렌즈 4블록 (카카오 Lv2)", () => {
    it.each([
        // 최소 칸에서 제거 case
        [2, 2, ["aa", "aa"], 4],
        // 최소 칸에서 미제거 case
        [2, 2, ["ba", "aa"], 0],
        // 3x2에서 모두 제거 case
        [3, 2, ["aa", "aa", "aa"], 6],
        [3, 2, ["bb", "bb", "bb"], 6],
        [3, 3, ["aab", "aab", "bbb"], 4],
    ])("%j + %j = %j", (m, n, board, expected) => {
        const result = solution(m, n, board);
        assert.equal(result, expected);
    });
});

function solution(m, n, board) {
    let numCount = 0;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === board[0][0]) {
                numCount++;
            }
        }
    }

    return numCount === m * n ? m * n : 0;
}
