# 괄호 회전하기

## 문제 개요

-   문제 유형: 스택
-   문제 난도: 프로그래머스 Lv2, 68% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/76502

## 문제 내용 설명

-   올바른 괄호 문자열 = 단일 괄호, 중첩된 괄호, 연속된 괄호
-   괄호를 구성하는 문자들로 구성된 문자열이 주어졌을 때, 0 ~ 최대 괄호 문자열의 길이 - 1까지 한 칸씩 회전했을 때 올바른 괄호 문자열이 되는 경우의 개수를 반환
-   1 <= 길이 <= 1,000

### 문제 핵심 내용 요약

-   입력 값: 괄호 문자열
-   출력 값: 한 칸씩 회전했을 때 올바른 괄호 문자열이 되는 경우의 개수를 반환

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 단순 구현

-   주어진 괄호 문자열이 적절한지 확인하는 함수 구현 필요
-   문자열을 한 칸씩 돌리는 코드 구현 필요
-   (TC 생략)

### 2. 수도 코드

1. 문자열을 배열로 만든다.
2. 올바른 괄호 문자열 판정 코드
    - 전체 문자열을 순회한다.
        - 현재 문자의 괄호의 열기,닫기 여부를 판정한다.
        - 여는 괄호이면 스택에 넣고 진행한다.
        - 닫는 괄호이면 스택을 확인한 후 일치하면 스택에서 빼고 진행한다.
        - 순회 종료 시 스택이 비었으면 정상, 아니면 비정상이다.
        - 정상인 경우 합계++
3. 문자열 배열의 끝 요소를 가장 앞에 넣은 후 (1)을 반복한다.
4. 더한 합계를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   스택, 큐

### 4. 사용 단위 알고리즘 구현

-   (없음)

### 5. 단위 알고리즘 활용 코드

#### 5-1. 올바른 괄호 문자열 판정 코드

```js
const isCorrectParenthesisString = (parenthesisCharacters) => {
    const stack = [];

    // 비정상 문자열인 경우 true를 반환해 index를 반환
    const found = parenthesisCharacters.findIndex((char) => {
        if (char === "(" || char === "{" || char === "[") {
            stack.push(char);
            return false;
        }

        if (stack.length === 0) {
            return true;
        }

        const top = stack[stack.length - 1];
        if (
            (char === ")" && top === "(") ||
            (char === "}" && top === "{") ||
            (char === "]" && top === "[")
        ) {
            return false;
        }
        return true;
    });

    return found === -1 && stack.length === 0;
};
```

#### 5-2. 문자열 순회 및 합계 계산

```js
const solution = (toTest) => {
    // 홀수 길이인 경우 올바를 수 없음
    if (toTest.length % 2 === 1) {
        return 0;
    }

    let chars = [...toTest];
    let correctCaseCounter = 0;

    for (let i = 0; i < toTest.length; i++) {
        const isCorrect = isCorrectParenthesisString(chars);
        if (isCorrect) {
            correctCaseCounter++;
        }
        const lastChar = chars.pop();

        // LinkedList 미구현으로 매번 전체 순회 필요
        chars = [lastChar, ...chars];
    }

    return correctCaseCounter;
};
```

##### TC 1 - 길이 1 문자열

-   입력: `(`
-   출력: (홀수 차단으로) 0

##### TC 2 - 길이 1 문자열

-   입력: `()`
-   순회 횟수: 1
    -   i=0, `()`
    -   i=1, `)(`
-   출력: 1

#### 5-3. 완성 코드

-   결과: 예시 TC 4개 중 2개 성공, 2개 실패
-   실패 원인: 페어 일치 시 stack.pop()를 넣지 않음..!

```js
const isCorrectParenthesisString = (parenthesisCharacters) => {
    const stack = [];

    // 비정상 문자열인 경우 true를 반환해 index를 반환
    const found = parenthesisCharacters.findIndex((char) => {
        if (char === "(" || char === "{" || char === "[") {
            stack.push(char);
            return false;
        }

        if (stack.length === 0) {
            return true;
        }

        const top = stack[stack.length - 1];
        if (
            (char === ")" && top === "(") ||
            (char === "}" && top === "{") ||
            (char === "]" && top === "[")
        ) {
            return false;
        }
        return true;
    });

    return found === -1 && stack.length === 0;
};

const solution = (toTest) => {
    // 홀수 길이인 경우 올바를 수 없음
    if (toTest.length % 2 === 1) {
        return 0;
    }

    let chars = [...toTest];
    let correctCaseCounter = 0;

    for (let i = 0; i < toTest.length; i++) {
        const isCorrect = isCorrectParenthesisString(chars);
        if (isCorrect) {
            correctCaseCounter++;
        }
        const lastChar = chars.pop();

        // LinkedList 미구현으로 매번 전체 순회 필요
        chars = [lastChar, ...chars];
    }

    return correctCaseCounter;
};
```

### 6. 배운 점

-   예시 TC를 썼는데도 코드 실수가 있었기 때문에, 코드 검산을 한 번 하고 제출해야 할 것 같다.
