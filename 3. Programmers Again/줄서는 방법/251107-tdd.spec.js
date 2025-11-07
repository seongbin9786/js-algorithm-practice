/*
[문제 해석]/[발상]
- 그냥 n명에 대한 permutation 구현 후 k번째 순열을 반환

*/
import { describe, it, assert } from "vitest";

describe("줄서는 방법 (Lv.2)", () => {
    it.each([[3, 5, [3, 1, 2]]])("n:%i,k:%i => %j", (n, k, expected) => {
        const result = solution(n, k);
        assert.deepEqual(result, expected);
    });
});

function solution(n, k) {
    // 순열 구현 방법:
    // 1. 항상 모든 원소가 있어야 함
    // 2. 재사용 불가능함
    // 3. 순서가 다를 수 있음
    // 그럼 how?
    // visited 가 문제인가
    //
    let count = 0;
    const selected = [];
    const visited = Array(n + 1).fill(false);
    function backtrack(digit) {
        if (digit === n) {
            count++;
            if (count === k) {
                throw selected;
            }
            return;
        }
        for (let currDigit = 1; currDigit <= n; currDigit++) {
            if (visited[currDigit]) {
                continue;
            }
            selected.push(currDigit);
            visited[currDigit] = true;
            backtrack(digit + 1);
            selected.pop();
            visited[currDigit] = false;
        }
    }

    try {
        backtrack(0);
    } catch (answer) {
        return answer;
    }
}
