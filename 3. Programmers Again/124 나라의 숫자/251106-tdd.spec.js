import { describe, it, assert } from "vitest";

/*
[문제 해석]
- 10진수를 1,2,4 숫자만 있는 진법으로 바꿔야 함
- 3진법인데 0이 없음

[발상]
- 0이 없어서 일반적인 진법 변환 불가
- 백트래킹으로 마지막 자릿수부터 숫자 채우기로 시도해야 함
- 각 자릿수마다 3가지 후보를 시도해야 하며 입력값 최대치인 최대 5천만번 순회가 발생함 (자릿수는 최대 17자리)

[배운 점 / 시간초과 해결방법]
- AS-IS: 5천만일 때 1.3초 -> TO-BE: 0ms
- 방법: 기존 진법 변환을 유지하되, 나머지가 0이면 대신 현재 자릿수에서 3을 쓰고(=4), 잔여 몫에서 -3 해주면 됨
- 계산으로 못 풀었던 이유: 문제 패턴을 제대로 이해 못 했음.
    - 이해 못 한 원인: 진법 변환 코드 흐름이 머리에 있었으면 패턴이 보이고 쉽게 풀었을 듯함
*/
describe("124 나라의 숫자 (Lv.2)", () => {
    it.each([
        [1, "1"],
        [2, "2"],
        [3, "4"],
        [4, "11"],
        [50_000_000, "2444241414242212"],
    ])("%j => %i", (n, expected) => {
        const result = solution(n);
        assert.equal(result, expected);
    });
});

function solution(n) {
    const digits = [];
    let remainder = n;

    while (remainder > 0) {
        if (remainder % 3 === 0) {
            digits.push(4);
            remainder = Math.floor(remainder / 3) - 1;
        } else {
            digits.push(remainder % 3);
            remainder = Math.floor(remainder / 3);
        }
    }

    return digits.reverse().join("");
}
