/*
[문제 해석]/[발상]
- 그냥 n명에 대한 permutation 구현 후 k번째 순열을 반환

[제한 요건]
- 20! = 2,432,902,008,176,640,000 (243경 ㅋㅋ)
- 10! = 3628800

[실패한 이유]
- 20!에 대한 감이 없었음
- k가 20!이면 그만큼 단순 순회를 해도 안 되는 거였는데, 그냥 다 생성으로 생각해버림 ===> 실패

[발상2]
- 모든 순열을 구하지 않고 특정 순열만 계산해야 함 (직접 구하려고 하면 10초 timeout에 걸리는듯)
- 순열 순서를 직접 나열해보고 패턴을 코딩해야 함 (자세한 내용은 주석 필요)
--> 직접 나열해보고 패턴을 찾는 게 중요함

*/
import { describe, it, assert } from "vitest";

describe("줄서는 방법 (Lv.2)", () => {
    it.each([[3, 5, [3, 1, 2]]])("n:%i,k:%i => %j", (n, k, expected) => {
        const result = solution(n, k);
        assert.deepEqual(result, expected);
    });
});

function solution(n, k) {
    // n-1! 까지 조회할 수 있어야 함
    const factorials = [1];
    for (let num = 1; num <= n; num++) {
        factorials.push(factorials[num - 1] * num);
    }

    k--; // 0-indexed

    const answer = [];
    const nums = Array.from({ length: n }).map((_, index) => index + 1); // 1~n
    console.log(`nums: ${nums}`);
    // 자릿수 별로 선택해야 함.
    for (let i = n; i > 0; i--) {
        // 자릿수 n, n-1, ..., 1번째 숫자 선택
        const targetNumIdx = Math.floor(k / factorials[i - 1]); // e.g. 15/6 = 2...3 --> 3번째 숫자 선택(idx 상 2)
        console.log(
            `k: ${k}, factorials[i-1]: ${
                factorials[i - 1]
            }, targetNumIdx: ${targetNumIdx}`
        );
        k = k % factorials[i - 1]; // 나머지로 그 다음 숫자 선택해야 함
        const targetNum = nums[targetNumIdx];
        answer.push(targetNum); // 현재 자릿수의 숫자 별 경우의 수로 숫자 선택
        nums.splice(targetNumIdx, 1); // 선택한 숫자는 다음 자릿수에서 후보가 아니므로 nums에서 제외해야 함
        console.log(`targetNum: ${targetNum}, after splice: ${nums}`);
    }

    return answer;
}

// function solution(n, k) {
//     // 순열 구현 방법:
//     // 1. 항상 모든 원소가 있어야 함
//     // 2. 재사용 불가능함
//     // 3. 순서가 다를 수 있음
//     // 그럼 how?
//     // visited 가 문제인가
//     //
//     let count = 0;
//     const selected = [];
//     const visited = Array(n + 1).fill(false);
//     function backtrack(digit) {
//         if (digit === n) {
//             count++;
//             if (count === k) {
//                 throw selected;
//             }
//             return;
//         }
//         for (let currDigit = 1; currDigit <= n; currDigit++) {
//             if (visited[currDigit]) {
//                 continue;
//             }
//             selected.push(currDigit);
//             visited[currDigit] = true;
//             backtrack(digit + 1);
//             selected.pop();
//             visited[currDigit] = false;
//         }
//     }

//     try {
//         backtrack(0);
//     } catch (answer) {
//         return answer;
//     }
// }
