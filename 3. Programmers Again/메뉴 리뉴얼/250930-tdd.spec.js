import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성
    - 최소 2가지 이상의 단품메뉴로 구성
    - 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합
2. 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course
    - 코스요리에 포함되는 메뉴 개수의 종류
3. 정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 오름차순 정렬

[제한 조건]
1. 2 <= orders.length <= 20
2. 2 <= orders[i].length <= 10 (중복 없음)
3. 1 <= course.length <= 10 (중복 없고, 오름차순 정렬됨)

[발상]
1. 각 주문내역에 대해 조합을 구해야 함
2. courses.length 별로 각 주문내역에서 조합을 구함 (백트래킹)
3. 1번 발생하면 counter 객체에 넣고, 2개 이상인 경우 답안지 배열에 넣음.
4. 답안지 배열을 문자열 정렬하고 반환

[구현]
1. 백트래킹 - nCr 어떻게 구현하지? -> 앞에서 선택한 idx 다음만 고르면 됨. 자릿수 도달하면 combo에 넣으면 됨.

[이상함]
1. 왜 "BC"가 조합에서 제외되지? -> 같은 개수라면 그 중 가장 주문수가 많은 것만..

*/
describe("메뉴 리뉴얼", () => {
    it.each([
        // 기본 TC
        [["AB", "AB"], [2], ["AB"]],
        [["ABC", "ABC"], [2], ["AB", "AC", "BC"]],
        [
            ["ABC", "ABC"],
            [2, 3],
            ["AB", "ABC", "AC", "BC"],
        ],
        [
            ["ABCD", "ABCD"],
            [2, 3, 4],
            [
                "AB",
                "ABC",
                "ABCD",
                "ABD",
                "AC",
                "ACD",
                "AD",
                "BC",
                "BCD",
                "BD",
                "CD",
            ],
        ],
        // 프로그래머스 TC
        [
            ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],
            [2, 3, 4],
            ["AC", "ACDE", "BCFG", "CDE"],
        ],
        // 코스 요리가 항상 정렬되어서 오지 않음. 정렬 필요한 듯
        [
            ["XYZ", "XWY", "WXA"],
            [2, 3, 4],
            ["WX", "XY"],
        ],
    ])("%j => %j", (orders, course, expected) => {
        const result = solution(orders, course);
        assert.deepEqual(result, expected);
    });
});

function solution(orders, courses) {
    orders = orders.map((order) => [...order].sort().join(""));

    const result = [];

    const combosByCourseSize = new Map();
    let maxCount = 0;
    const currCombo = [];

    // startIdx부터 하나씩 뽑고, 그 다음으로 이동.
    function backtrack(startIdx, source, targetSize) {
        if (currCombo.length === targetSize) {
            const comboKey = currCombo.join("");
            const comboCount = combosByCourseSize.get(comboKey);
            if (comboCount) {
                combosByCourseSize.set(comboKey, comboCount + 1);
                maxCount = Math.max(maxCount, comboCount + 1);
            } else {
                combosByCourseSize.set(comboKey, 1);
                maxCount = Math.max(maxCount, 1);
            }
            return;
        }
        // 각 order = orders[i]에 대해
        for (let i = startIdx; i < source.length; i++) {
            currCombo.push(source.charAt(i));
            backtrack(i + 1, source, targetSize);
            currCombo.pop();
        }
    }

    for (const courseSize of courses) {
        for (const order of orders) {
            backtrack(0, order, courseSize);
        }

        // 여기서 combo의 max를 고르고, 비운다.
        if (maxCount >= 2) {
            for (const [combo, count] of combosByCourseSize.entries()) {
                if (count === maxCount) {
                    result.push(combo);
                }
            }
        }
        maxCount = 0;
        combosByCourseSize.clear();
    }

    return result.sort();
}
