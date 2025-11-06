import { describe, it, assert } from "vitest";

/*
[문제 해석]
- 시소 중심축에서 2,3,4m 지점이 있음.
- 몸무게 목록이 주어질 때, 균형이 맞는 쌍의 개수 반환 

[발상]
- 토크 t=r*F -> 둘의 합이 0이어야 함
- 단순히 2중 포문으로 돌면 됨 (동일 인물 재사용은 불가) -> X
- 10만명이라서 2중 포문은 안 됨
    - 정렬해두고 투포인터를 써야 할까? (아닌 것 같음)
    - O(N), O(NlogN)으로 쓸 다른 방법이 존재함? 이진 탐색도 가능할 것 같긴 함
    - 투포인터, 이진탐색, 말고 또 있나?

[모르겠는데...]
- 투포인터 아니라는 결론은 내림 -> 범위를 좁히면 정답 일부를 놓치게 됨
- 이진탐색도 아닐 거 같은데..
- 아니면 투포인터로 하고, 동일 숫자가 2개 이상 있으면 그것들은 항상 페어로 설정하는 방법이 있을 듯
- 아, 2/3/4배 관계인 숫자를 찾기만 하면 될 거 같은데 (역시 눈으로 보는 예시가 중요하구만.. 시각화가 직관의 트리거임)

[발상2]
- 그냥 정렬하고, 작은 숫자 입장에서 1,1.5,2배수 숫자를 찾으면 됨
- a=b일 경우는 nC2 이고, a<b일 경우 (a개수 * b개수) 만큼 쌍 개수 더하면 됨

[배운 점]
- (x*1.5) != (x*3)/2 인데 이유는 모르겠음 (전자는 틀리고, 후자는 통과함)
    - GPT한테 물어봐도 명확하지 않아서 다음부터는 %로 먼저 확인해야 할 듯
- nC2 = n(n-1)/2로 단순화 가능하니 굳이 구현 필요 없음

*/
describe("시소 짝꿍 (Lv.2)", () => {
    it.each([
        [[100, 180, 360, 100, 270], 4],
        [[100, 100, 180, 360, 100, 270], 6],
    ])("%j => %i", (weights, expected) => {
        const result = solution(weights);
        assert.equal(result, expected);
    });
});

function solution(weights) {
    const weightCounter = new Map();
    weights.forEach((weight) => {
        const prevCount = weightCounter.get(weight) ?? 0;
        weightCounter.set(weight, prevCount + 1);
    });
    weights = [...new Set(weights)].sort((a, b) => a - b);

    let torquePairs = 0;
    weights.forEach((weight) => {
        const myWeightCount = weightCounter.get(weight);
        const my_3_2x = weightCounter.get((weight * 3) / 2) ?? 0;
        const my_4_3x = weightCounter.get((weight * 4) / 3) ?? 0;
        const my_2x = weightCounter.get(weight * 2) ?? 0;

        torquePairs += nC2(myWeightCount);
        torquePairs += myWeightCount * my_3_2x;
        torquePairs += myWeightCount * my_4_3x;
        torquePairs += myWeightCount * my_2x;
    });

    return torquePairs;
}

function nC2(n) {
    return (n * (n - 1)) / 2;
}
