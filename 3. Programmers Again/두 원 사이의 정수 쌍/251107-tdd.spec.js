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
    - 1축 기준 + 1사분면만 계산해서 4배
- 이 계산이 되게 어려운데, 그냥 다음에 다시 풀 때 어떻게 풀지 또 고민하면서 배우면 좋을 듯

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
    for (let y = 1; y <= r2; y++) {
        const maxX = getAbsXForLargeCircle(y);
        const minX = r1 >= y ? getAbsXForSmallCircle(y) : 0; // 굳이?
        console.log(`y: ${y} => maxX:${maxX}, minX: ${minX}`);

        count += (maxX - minX + 1) * 4;
    }
    return count;

    function getAbsXForLargeCircle(y) {
        return Math.floor(Math.sqrt(r2 * r2 - y * y));
    }

    function getAbsXForSmallCircle(y) {
        return Math.ceil(Math.sqrt(r1 * r1 - y * y));
    }
}
