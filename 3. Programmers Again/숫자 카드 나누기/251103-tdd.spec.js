/*
[문제 해석]
- 두 배열을 받아 한 쪽에선 최대공약수, 한 쪽에선 아예 나눠지지 않는 숫자 중 최대를 반환

[발상]
- 단순한 약수 구하기, 체크 문제인데, 시간 제한이 빡센 문제 (근데 다른 풀이들 보니, 막상 채점은 헐렁하게 하는 것 같음)

[개선점]
- min 값 구하기 O(N)에 하려고 직접 구현헀는데, 어차피 한 값에 대해서만 하는 거라 O(N log N)으로 해도 괜찮음
- 약수 구하기 역시 한 숫자에 대해서만 하는 것이므로 굳이 최적화 필요 없음

*/
import { describe, it, assert } from "vitest";

describe("숫자 카드 나누기 (Lv.2)", () => {
    it.each([
        [[10, 17], [5, 20], 0],
        [[10, 20], [5, 17], 10],
        [[14, 35, 119], [18, 30, 102], 7],
    ])("%j, %j => %i", (arrayA, arrayB, expected) => {
        const result = solution(arrayA, arrayB);
        assert.equal(result, expected);
    });
});

function solution(arrayA, arrayB) {
    return Math.max(findAnswer(arrayA, arrayB), findAnswer(arrayB, arrayA));
}

function findAnswer(arrayA, arrayB) {
    const minA = arrayA.sort((a, b) => a - b)[0];
    const divisors = findDivisors(minA);

    return (
        divisors.find(
            (divisor) =>
                arrayA.every((target) => target % divisor === 0) &&
                arrayB.every((target) => target % divisor > 0)
        ) || 0
    );
}

// 내림차순이면 통과되자마자 리턴하면 되니 더 효율적일 듯
function findDivisors(num) {
    const divisors = [];
    const sq = Math.floor(Math.sqrt(num));
    for (let x = 2; x <= sq; x++) {
        if (num % x === 0) {
            divisors.push(x);
            divisors.push(num / x);
        }
    }

    // 1은 의도적으로 제외함. 1은 문제 조건에 위배
    divisors.push(num);

    // 숫자 개수가 적어서 sort 사용 (1억일 때 81개)
    return divisors.sort((a, b) => b - a);
}
