import { describe, it, assert } from "vitest";

/*
[문제 해석]
- 10진수를 1,2,4 숫자만 있는 진법으로 바꿔야 함
- 3진법인데 0이 없음

[발상]
- 0이 없어서 일반적인 진법 변환 불가
- 백트래킹으로 마지막 자릿수부터 숫자 채우기로 시도해야 함
- 각 자릿수마다 3가지 후보를 시도해야 하며 입력값 최대치인 최대 5천만번 순회가 발생함 (자릿수는 최대 17자리)

*/
describe("124 나라의 숫자 (Lv.2)", () => {
    it.each([
        [1, "1"],
        [2, "2"],
        [3, "4"],
        [4, "11"],
    ])("%j => %i", (n, expected) => {
        const result = solution(n);
        assert.equal(result, expected);
    });
});

// 1,2,3으로 생각하고 나중에 3->4로 변환하기
function solution(n) {
    const digits = [];
    let remainder = n;

    // const maxDigits = Math.ceil(Math.log(n) / Math.log(3)); // log_3_N, 근데 잔여 sum으로 계산하면 돼서 불필요할 듯

    function backtrack(digit) {
        if (remainder === 0) {
            console.log("digits:", digits);
            // loop로 바꾸기가 귀찮아서 throw
            throw digits
                .reverse()
                .map((digit) => (digit === 3 ? 4 : digit))
                .join("");
        }
        if (remainder < 0) {
            return;
        }
        for (let currDigitNum = 1; currDigitNum <= 3; currDigitNum++) {
            const currDigitValue = currDigitNum * Math.pow(3, digit - 1);
            remainder -= currDigitValue;
            digits.push(currDigitNum);
            backtrack(digit + 1);
            remainder += currDigitValue;
            digits.pop();
        }
    }

    try {
        backtrack(1);
    } catch (answer) {
        return answer;
    }

    // 별도 조건이 없으므로 항상 변환이 가능한 입력값만 존재하는 듯.
}
