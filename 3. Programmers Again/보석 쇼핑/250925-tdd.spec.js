import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 매장 진열대의 특정 범위의 물건들을 모두 싹쓸이 구매
2. 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간
3. 보석들의 이름이 저장된 배열 gems를 받아 모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아 반환

[제한 조건]
1. 1 <= gems.length <= 100,000
2. (암시적) 보석 종류 역시 10만개(실제 가능한 조합은 훨씬 큼)까지 가능하므로, 매 순회마다 전체를 확인하면 O(n^2) -> 100억이 되므로, O(n) 필요

[사용한 힌트 (원래 발상을 재확인한 수준 )]
1. 투포인터로 해결해야 한다는 점
2. 보석 종류를 매번 확인하면 안 된다는 점

[발상]
1. 정렬이 불가능해서, O(n log n)은 아니고, O(n)이라고 생각
2. 최근 투포인터 문제들을 풀었고, O(n)으로 가능한 게 투포인터밖에 없다고 생각
3. 실제로 '연속 구간'이고, 방향이 항상 우측임을 확인
4. 어려웠던 부분: Map으로 카운팅하는 게 최적 아닐까? 그래도 O(n^2) 인데...
5. 떠오른 아이디어: 카운팅을 할 수밖에 없고, 보석 종류도 미리 세어놓아야만 한다.
6. 전체 아이디어:
- Map으로는 보석의 종류 별로 '현재 구간에서 보유 중인 보석 개수'를 보관한다.
- 효율을 위해, 처음에 보석 종류를 세고, '현재 구간에서 유효한 보석'의 개수를 보관한다.
- 전체 보석 목록에 대해 순회하며, right++을 통해 신규 구간을 확인한다.
- left++을 할 수 있다면 해야 한다(올바른 신규 구간을 발견하기 위해서 필수). 유효한 구간 내에서만 left++가 의미 있으므로, 그에 맞게 증가시킨다.
- right를 이동하며 잔여 보석 개수를 증가시키고, left를 이동하며 잔여 보석 개수를 감소시킨다. 증가/감소 후에도 '유효한 보석 구간'인 경우, '최소 구간'을 갱신한다.
- '최소 구간'은 구간의 길이가 더 짧아질 때만 갱신하게 함으로써 (구간 길이, 앞선 구간) 정렬 기준을 만족시킨다. (처음에는 배열로 다 저장했다가, 이후 개선했다.)
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
        // 28.9점 받고 생각하기 시작한 반례들
        // 정렬이 문제인 것 같다는 생각:
        // [1] 앞에서 비효율, 뒤에서 효율적인 경우
        [
            ["a", "c", "c", "b", "b", "a", "b", "c"],
            [6, 8],
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

    // 가장 짧고, 가장 앞의 구간
    let minGemRange = [100_000, 200_000];
    let left = 0;
    let right = 0;

    // 구간이 더 짧을 때만 갱신. 뒷 구간의 길이가 같으면 갱신하지 않으므로, 동일 길이인 경우 앞의 구간이 할당됨.
    function updateMinRange() {
        if (
            ownGemKinds === allGemKinds &&
            minGemRange[1] - minGemRange[0] > right - left
        ) {
            console.log("updateMinRange:", [left + 1, right + 1]);
            minGemRange = [left + 1, right + 1]; // 1-indexed
        }
    }

    function increase(gem) {
        const prev = gemCounter.get(gem);
        if (prev === 0) {
            ownGemKinds++;
        }
        gemCounter.set(gem, prev + 1);
        updateMinRange();
    }

    function decrease(gem) {
        const curr = gemCounter.get(gem);
        if (curr === 1) {
            ownGemKinds--;
        }
        gemCounter.set(gem, Math.max(curr - 1, 0));
        updateMinRange();
    }

    console.log("allGemKinds:", allGemKinds);

    while (right < gems.length) {
        // 1. 루프를 돌 때마다, right의 gem을 등록하고 이동
        // increase했을 때 온전한 구간이면 최소 구간 갱신
        const currGem = gems[right];
        increase(currGem);

        console.log(gemCounter);

        // 3. 완전한 구간일 동안 left를 앞으로 이동 - 완전한 구간에 머물러봤자 손해
        while (left <= right && gemCounter.get(gems[left]) > 1) {
            // 4. decrease했을 때 온전한 구간이면 최소 구간 갱신
            decrease(gems[left++]);
        }

        right++;
    }

    return minGemRange;
}
