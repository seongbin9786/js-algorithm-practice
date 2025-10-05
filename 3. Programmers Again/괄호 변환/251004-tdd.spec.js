import { describe, it, assert } from "vitest";

/*
괄호가 개수는 맞지만 짝이 맞지 않은 형태로 작성되어 오류가 나는 것
괄호를 뽑아서 올바른 순서대로 배치된 괄호 문자열을 알려주는 프로그램
균형잡힌 괄호 문자열 = '(' 의 개수와 ')' 의 개수가 같은 경우
올바른 괄호 문자열 = (,) 짝이 맞는 경우

[문제 해석]
그냥 하라고 하는 대로 하면 됨. 

1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다. 
2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다. 
3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다. 
  3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다. 
4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다. 
  4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다. 
  4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다. 
  4-3. ')'를 다시 붙입니다. 
  4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다. 
  4-5. 생성된 문자열을 반환합니다.

*/
describe("괄호 변환", () => {
    it.each([
        // 기본 TC
        ["", ""],

        // 프로그래머스 TC
        ["(()())()", "(()())()"],
        [")(", "()"],
        ["()))((()", "()(())()"],
    ])("%j => %j", (p, expected) => {
        const result = solution(p);
        assert.equal(result, expected);
    });
});

function solution(p) {
    // 1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다.
    if (!p) {
        return p;
    }

    // 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
    const splitIdx = getEndIdxOfMinimumBalancedBrackets(p);
    const u = p.slice(0, splitIdx + 1); // NOTE: slice의 2번째 인자는 idx가 아닌 length이므로... +1해줘야 함
    const v = p.slice(splitIdx + 1);

    console.log(`p: [${p}], splitIdx: ${splitIdx}, u: [${u}], v: [${v}]`);

    // 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다.
    const isUCorrect = isCorrectBracketString(u);
    const correctV = solution(v);

    console.log(
        `p: [${p}] --> isUCorrect:${isUCorrect}, correctV: [${correctV}]`
    );

    if (isUCorrect) {
        // 3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다.
        return u + correctV;
    } else {
        // 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다.
        // 4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다.
        // 4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다.
        // 4-3. ')'를 다시 붙입니다.
        // 4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다.
        // 4-5. 생성된 문자열을 반환합니다.
        const slicedAndRevseredU = [...u.slice(1, u.length - 1)]
            .map((bracket) => (bracket === ")" ? "(" : ")"))
            .join("");

        return `(${correctV})${slicedAndRevseredU}`;
    }
}

// 더 이상 분리할 수 없다는 조건이 중요
function getEndIdxOfMinimumBalancedBrackets(bracketString) {
    let opening = 0;
    let closing = 0;

    let lastEndIdx = 0;

    for (let i = 0; i < bracketString.length; i++) {
        const curr = bracketString[i];
        if (curr === "(") {
            opening++;
        } else {
            closing++;
        }

        if (opening === closing) {
            lastEndIdx = i;
        }
        if (isMinimumBracketString(bracketString.slice(0, i + 1))) {
            return i;
        }
    }

    return lastEndIdx;
}

/*
    아래 같은 경우도 '분리할 수 없는' 경우이므로 처리해줘야 함.
    ))((
    )(
*/
function isMinimumBracketString(bracketString) {
    const stack = [bracketString[0]];
    for (let i = 1; i < bracketString.length; i++) {
        const last = stack[stack.length - 1];
        const curr = bracketString[i];

        if ((last === "(" && curr === ")") || (last === ")" && curr === "(")) {
            stack.pop();
        } else {
            stack.push(curr);
        }
    }

    return stack.length === 0;
}

function isCorrectBracketString(bracketString) {
    const stack = [bracketString[0]];
    for (let i = 1; i < bracketString.length; i++) {
        const last = stack[stack.length - 1];
        const curr = bracketString[i];

        if (last === "(" && curr === ")") {
            stack.pop();
        } else {
            stack.push(curr);
        }
    }

    return stack.length === 0;
}
