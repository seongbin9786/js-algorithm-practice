import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 연산 수식으로 만들 수 있는 가장 큰 금액을 반환
2. 수식은 숫자와 3가지의 연산(+, -, *)만으로 이루어짐
3. 수식에 포함된 연산자의 우선순위를 자유롭게 재정의하여 결과가 가장 큰 숫자를 제출 (단, 음수라면 절댓값으로 변환)
4. 모든 연산자는 우선 순위가 달라야 함. (같은 연산자 간에는 출현 순서로 우선)

[제한 조건]
1. 피연산자 음수 없음
2. 오류가 있는 수식 없음
3. 결괏값은 최대 2^63 - 1
4. 수식 길이 <= 100 ===> 연산자 개수 최대 49개

[발상]
1. js number는 2^53 까지만 정확히 표현 가능. bigint 써야 함 (`정수n` 표기)
2. 우선 순위 종류 자체는 쉽게 만들 수 있다. 순열로 만들면 됨 => n! = 3! = 6
3. 어떻게 이걸 우선 순위가 결정되게 해서 계산을 하지?
    - 문자열을 그대로 쓰는 게 나쁘진 않은데 양쪽 숫자 분리가 좀 어려워보임
    - 한 배열에 넣기 => 숫자, 연산자를 구분 없이 vs 있이 ==> 별도로 구분해서 각각을 배열로
        - (ex) 50 * 6 - 3 * 2 ===> [ 50 , 6 , 3 , 2 ] + [ * , - , * ]
        - i=1을 선택하면 i=1,i=2가 대상 연산자임 ===> 즉, 연산자 배열 순서 +0, +1 번째 숫자 선택하면 됨
        - 계산 후에는 배열에서 제거해야 함. (대상 찾는 게 idx 기반이라서 visited 같은 걸로 회피 불가)
        - 연산자 배열이 비면 종료하면 됨.
    - 우선 순위에 맞게 어떻게 계산하게?
        - 연산자 순서대로 연산자 배열을 순회? ===> 쉬움.
            - 순열로 연산자가 우선 순위대로 담긴 배열을 반환하면
            - 해당 배열을 순회하면서(최대 길이 3), 연산자 배열(최대 길이 49)을 순회하면 됨
            - 현재 우선 순위에 해당하는 연산자들은 우선 순위 배열을 한 번 순회할 때마다 모두 계산되어 사라짐
4. 항상 Math.abs를 하고 max 갱신하면 됨

4. 시간 복잡도
    - 순열(3! = 6) * 3 * 49 = 882 ? 되게 빠름.

*/
describe("수식 최대화", () => {
    it.each([
        // 프로그래머스 TC
        ["100-200*300-500+20", 60420],
        ["50*6-3*2", 300],
    ])("%j => %j", (expression, expected) => {
        const result = solution(expression);
        assert.equal(result, expected);
    });
});

function solution(expression) {
    function calc(a, b, operator) {
        switch (operator) {
            case "*":
                return a * b;
            case "+":
                return a + b;
            case "-":
                return a - b;
        }
    }

    const operators = ["*", "+", "-"];

    // 순열을 어떻게 만드는 거였지... visited가 필요한 건가?
    const priorities = [];
    const selected = [];
    const visited = Array(operators.length).fill(false);

    // 시간 복잡도 = (추후 다시 계산)
    function makePriority(stage) {
        if (stage === 3) {
            priorities.push([...selected]);
            return;
        }
        for (let i = 0; i < 3; i++) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            selected.push(operators[i]);
            makePriority(stage + 1);
            selected.pop();
            visited[i] = false;
        }
    }

    makePriority(0);

    let max = 0;

    // NOTE: -는 escape 필요
    for (const priority of priorities) {
        const nums = expression.split(/[*+\-]/).map(Number); // [] 안에 있는 걸로 or 처리
        const ops = expression.match(/[*+\-]/g); // [] 안에 있는 걸로 or 처리

        for (const operator of priority) {
            while (ops.length > 0) {
                // 해당 operator가 몇 개나 있을지 모르므로 일단 무한루프
                const opIdx = ops.findIndex((op) => op === operator);
                if (opIdx === -1) {
                    break; // 더 이상 해당 operator가 없으므로 다음 operator로 이동
                }
                const a = nums[opIdx];
                const b = nums[opIdx + 1];
                const result = calc(a, b, operator);
                nums.splice(opIdx, 2, result); // splice 쓰기 딱 좋음!
                ops.splice(opIdx, 1);
            }
        }

        max = Math.max(max, Math.abs(nums[0]));
    }

    return max;
}
