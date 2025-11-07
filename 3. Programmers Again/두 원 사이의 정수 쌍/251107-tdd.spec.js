/*
[문제 해석]
- 중점이 원점인 두 원이 주어진다(반지름)
- 두 원 사이에 포함되는 정수 쌍의 개수 반환

[발상]
- 큰 원 안에 있고 작은 원 밖에 있으면 됨
- 원점 기준으로 (-r2,-r2),(r2,r2) 에 속하는 정수 순서쌍들을 테스트
- 큰 원에 속하는 정수 순서쌍들을 우선 필터링
- 작은 원에 안 속하는 정수 순서쌍들을 필터링 (단, 둘레에 걸쳐 있으면 필터링에서 제외)

[발상2]
- r2 <= 100만이라, 2중 포문을 사용할 수 없음
- 

*/
import { describe, it, assert } from "vitest";

describe("두 원 사이의 정수 쌍 (Lv.2)", () => {
    it.each([[2, 3, 20]])("r1:%i,r2:%i => %i", (r1, r2, expected) => {
        const result = solution(r1, r2);
        assert.equal(result, expected);
    });
});

function solution(r1, r2) {
    let count = 0;
    for (let y = -r2; y <= r2; y++) {
        for (let x = -r2; x <= r2; x++) {
            if (isInLargerCircle(y, x) && !isInSmallerCircle(y, x)) {
                count++;
            }
        }
    }
    return count;

    function isInLargerCircle(y, x) {
        return Math.pow(y, 2) + Math.pow(x, 2) <= Math.pow(r2, 2);
    }

    // 둘레에 걸친 것 제외
    function isInSmallerCircle(y, x) {
        return Math.pow(y, 2) + Math.pow(x, 2) < Math.pow(r1, 2);
    }
}
