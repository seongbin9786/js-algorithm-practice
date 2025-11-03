/*
[문제 해석]
- 최소한의 객실로 예약 내역을 처리하려고 함
- 퇴실 후 10분 간 청소 시간 있음
- 최소한의 객실 개수를 반환

[발상]
- 1분 단위로 1440회(24시간을 1분 단위로) 루프하며 예약 내역을 순회
- [startTime, endTime]에 대해 매번 순회 vs 모든 분에 대해 채우기 (둘 다 똑같은 수준)
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
    const minA = findMin(arrayA);
    const divisors = findDivisors(minA);

    for (const divisor of divisors) {
        let i;
        for (i = 0; i < arrayA.length; i++) {
            const target = arrayA[i];
            if (target % divisor > 0) {
                break;
            }
        }

        if (i < arrayA.length) {
            continue;
        }

        for (i = 0; i < arrayB.length; i++) {
            const target = arrayB[i];
            if (target % divisor === 0) {
                break;
            }
        }

        if (i < arrayA.length) {
            continue;
        }

        return divisor;
    }

    return 0;
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

function findMin(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        min = Math.min(min, arr[i]);
    }

    return min;
}
