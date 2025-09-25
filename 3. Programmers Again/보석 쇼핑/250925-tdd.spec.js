import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 매장 진열대의 특정 범위의 물건들을 모두 싹쓸이 구매
2. 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간
3. 보석들의 이름이 저장된 배열 gems를 받아 모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아 반환

[제한 조건]
1. 1 <= gems.length <= 100,000
2. 

[이해 시도, 실패 지점]
1. pop하는 곳의 순서를 섞을 수 있다고 생각해, pop 조합에 대한 완전 탐색으로 생각
2. 연결리스트로 보고, 2번 자르는 곳을 생각 -> nC2, n=30만, 450억... 흠... 아니라고 생각
3. 합계/2가 불가능 여부 판정은 알 수 없었음

[사용한 힌트]
1. 투포인터로 해결해야 한다는 점

[코드 작성 도중 막힌 점]
1. 투포인터로 어떻게 이동하지? -> 무조건 이동이 한쪽으로 강제되는 걸 깨닫지 못 함 (머리로 안 되면.. 그림을 그려보는 게 맞을 것 같음..)

[배운 점]
1. O(n^2)으로 안 되면 투포인터를 생각해보자

*/
describe("보석 쇼핑 (Lv.3)", () => {
    it.each([
        [["a"], [1, 1]],
        [
            ["a", "b"],
            [1, 2],
        ],
        [
            ["b", "b", "b", "a"],
            [3, 4],
        ],
        [
            ["a", "b", "c"],
            [1, 3],
        ],
        [
            ["a", "b", "a", "b"],
            [1, 2],
        ],
        [
            ["a", "a", "b"],
            [2, 3],
        ],
        // 프로그래머스 TC
        [
            ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
            [3, 7],
        ],
        [
            ["AA", "AB", "AC", "AA", "AC"],
            [1, 3],
        ],
        [
            ["XYZ", "XYZ", "XYZ"],
            [1, 1],
        ],
        [
            ["ZZZ", "YYY", "NNNN", "YYY", "BBB"],
            [1, 5],
        ],
    ])("%j => %j", (gems, expected) => {
        const result = solution(gems);
        assert.deepEqual(result, expected);
    });
});

// 1 <= gems.length <= 100,000
function solution(gems) {
    const gemCounter = new Map();

    // 보석 개수 등록
    // 보석 종류의 개수 확인
    for (let i = 0; i < gems.length; i++) {
        gemCounter.set(gems[i], 0);
    }

    // 매번 모든 모든 gemCategories의 길이를 파악할 수 없음...
    // 개수 기반으로 세어야 함.
    const allGemKinds = gemCounter.size;

    // 현재 구간에 포함된 보석 종류의 수.
    // 개수가 0이고, 새로 발견되었을 때 ++됨.
    // gemsIncluded === gemCategories이면 해당 구간은 조건에 들어맞으므로, 추가
    let ownGemKinds = 0;

    function increase(gem) {
        const prev = gemCounter.get(gem);
        if (prev === 0) {
            ownGemKinds++;
        }
        gemCounter.set(gem, prev + 1);
    }

    function decrease(gem) {
        const curr = gemCounter.get(gem);
        if (curr === 1) {
            ownGemKinds--;
        }
        gemCounter.set(gem, Math.max(curr - 1, 0));
    }

    console.log("allGemKinds:", allGemKinds);

    let fullGemRanges = [];
    let left = 0;
    let right = 0;
    while (right < gems.length) {
        // 1. 루프를 돌 때마다, right의 gem을 등록하고 이동
        const currGem = gems[right];
        increase(currGem);

        console.log(gemCounter);

        // 2. 완전한 구간이 된 경우 후보에 추가
        if (ownGemKinds === allGemKinds) {
            console.log("adding:", [left + 1, right + 1]);
            fullGemRanges.push([left + 1, right + 1]); // 1-indexed
        }

        right++;

        // 3. 완전하지 않을 때까지 left를 앞으로 이동 - 이미 완전한 구간에 있어봤자 손해임.
        // left를 우측으로 이동시키면서, 이동 후에도 완전한 구간인 동안 left를 우측으로 이동시킴
        while (left < right && gemCounter.get(gems[left]) > 1) {
            decrease(gems[left++]);
        }
    }

    return fullGemRanges // 짧은 순, 앞에 있는 순으로 정렬해서 처음 것 반환
        .sort((a, b) => {
            if (a[1] - a[0] === b[1] - b[0]) {
                if (a[0] === b[0]) {
                    return a[1] - b[1];
                }
                return a[1] - b[1];
            } else {
                return a[1] - a[0] - (b[1] - b[0]);
            }
        })[0];
}
