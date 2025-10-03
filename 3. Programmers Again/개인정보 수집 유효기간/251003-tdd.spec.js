import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 수집된 개인정보 목록(날짜, 약관)과 약관 목록이 주어졌을 때, 오늘 기준으로 각 약관의 '유효 기간'을 넘은 '개인정보'들을 파기 대상으로 보고 반환
2. '유효 기간'은 [1, 100]의 자연수이므로, 여러 해를 이동하는 것도 고려해야 함

[제한 조건]
1. 연도 = [2000, 2022], 일 = [1, 28]

[발상]
1. 모두 일 단위로 변환해서 체크하면 쉽지 않을까?
*/
describe("개인정보 수집 유효기간", () => {
    it.each([
        // 프로그래머스 TC
        [
            "2022.05.19",
            ["A 6", "B 12", "C 3"],
            ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"],
            [1, 3],
        ],
        [
            "2020.01.01",
            ["Z 3", "D 5"],
            [
                "2019.01.01 D",
                "2019.11.15 Z",
                "2019.08.02 D",
                "2019.07.01 D",
                "2018.12.28 Z",
            ],
            [1, 4, 5],
        ],
    ])("%j => %j", (today, terms, privacies, expected) => {
        const result = solution(today, terms, privacies);
        assert.deepEqual(result, expected);
    });
});

function solution(today, terms, privacies) {
    function convertToDays(dateString) {
        const [year, month, day] = dateString.split(".").map(Number);
        return year * 12 * 28 + month * 28 + day;
    }

    const termLength = new Map(
        terms.map((term) => {
            const [name, rawLength] = term.split(" ");
            return [name, Number(rawLength) * 28];
        })
    );

    const todayDays = convertToDays(today);

    const toRemove = privacies.reduce((sum, curr, idx) => {
        const [dateString, term] = curr.split(" ");
        console.log(`dateString: ${dateString}, term: ${term}`);
        const createdAt = convertToDays(dateString);
        const timeout = termLength.get(term);
        console.log(
            `today: ${todayDays} createdAt: ${createdAt}, timeout: ${timeout}`
        );
        if (todayDays - createdAt >= timeout) {
            sum.push(idx + 1);
        }
        return sum;
    }, []);

    return toRemove;
}
