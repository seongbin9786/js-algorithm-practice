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

describe.only("프렌즈 4블록 (카카오 Lv2)", () => {
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
    ])("[%i*%i]%j => %i", (m, n, board, expected) => {
        const result = solution(m, n, board);
        assert.equal(result, expected);
    });
});

function solution(m, n, board) {
    board = [...board].map((row) => [...row]);
    let totalRemoved = 0;
    const currRemoved = new Set();

    function get(orgR, c) {
        let r = orgR;
        while (r > 0 && board[r][c] === "-") {
            r--;
        }

        return [[orgR, c], board[r][c]];
    }

    function remove([r, c]) {
        currRemoved.add(r * 100 + c);
    }

    function markRemoved(pos) {
        const r = Math.floor(pos / 100);
        const c = pos % 100;
        board[r][c] = "-";
    }

    let minR = 0;
    let loops = 0;
    while (loops < 10) {
        // check 단계
        for (let r = minR; r < m - 1; r++) {
            for (let c = 0; c < n - 1; c++) {
                const ltPos = [r, c];
                const lt = board[r][c]; // minR을 뒀는데, 이 r을 그보다 위에서 찾으면 중복 제거가 불가능함
                const [rtPos, rt] = get(r + 1, c);
                const [lbPos, lb] = get(r, c + 1);
                const [rbPos, rb] = get(r + 1, c + 1);

                if (lt !== "-" && lt === rt && lt === lb && lt === rb) {
                    minR = r;
                    // 왜 이게 중복이 되는 거지?
                    // 여기서 한참 또 걸리네...
                    // 뭔가 기준이 있어야 함. 같은 턴에서 중복 체크가 발생함.
                    // 이해함. while을 여러 번 돌 게 아님. 그림 좀 그려보니깐, 한 번 지나간 곳을 다시 체크 안 해도 됨. 그럼 현재의 중복 case는 제거 가능함.
                    console.log(
                        `minR: ${minR}, lt: ${lt}(${ltPos}), rt: ${rt}(${rtPos}), lb: ${lb}(${lbPos}), rb: ${rb}(${rbPos})`
                    );
                    console.log(board);
                    remove(ltPos);
                    remove(rtPos);
                    remove(lbPos);
                    remove(rbPos);
                }
            }
        }

        currRemoved.forEach(markRemoved);
        console.log("currRemoved.size:", currRemoved.size);
        totalRemoved += currRemoved.size;
        if (currRemoved.size === 0) {
            break;
        }
        currRemoved.clear();
        loops++;
    }

    return totalRemoved;
}
