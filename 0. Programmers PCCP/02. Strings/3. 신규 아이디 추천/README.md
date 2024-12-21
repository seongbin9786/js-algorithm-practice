# 신규 아이디 추천

## 문제 개요

-   문제 유형: 문자열
-   문제 난도: 프로그래머스 Lv1, 51% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/72410

## 문제 내용 설명

-   아이디 규칙에 맞지 않는 경우, 규칙을 준수하는 유사 아이디를 반환한다.
-   길이=[3,15], 허용문자=(알파벳소문자,숫자,-,\_,.), 마침표는 처음과 끝에 사용 불가, 연속으로 사용 불가
-   일곱 단계에 걸쳐 유사 아이디를 생성

```
1. 모든 대문자를 소문자로 치환
2. 비허용 문자 제거
3. 연속 마침표를 하나로 치환
4. 처음이나 끝의 마침표 제거
5. 빈 문자열이면 a를 할당
6. 길이 15로 문자열 자르고, 끝에 .이 있는 경우 . 제거
7. 길이가 2이하이면 길이가 3이 될 때까지 마지막 문자를 끝에 반복해서 붙임
```

### 문제 핵심 내용 요약

-   입력 값: 문자열, 1 <= length <= 1,000, 알파벳 대문자, 알파벳 소문자, 숫자, 특수문자(`-_.~!@#$%^&*()=+[{]}:?,<>/`)로 구성
-   출력 값: 1~7단계를 거친 결과

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   지문의 명령을 그대로 실행하면 되는 문제

#### 1-1 [접근 1]

-   각 단계를 단순히 구현한다.

### 2. 수도 코드

1. 1~7단계를 그대로 구현한다.

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

-   없음

#### 5-1. 완성 코드

-   아이디 규칙에 맞지 않는 경우, 규칙을 준수하는 유사 아이디를 반환한다.
-   길이=[3,15], 허용문자=(알파벳소문자,숫자,-,\_,.), 마침표는 처음과 끝에 사용 불가, 연속으로 사용 불가
-   일곱 단계에 걸쳐 유사 아이디를 생성

1. 모든 대문자를 소문자로 치환
2. 비허용 문자 제거
3. 연속 마침표를 하나로 치환
4. 처음이나 끝의 마침표 제거
5. 빈 문자열이면 a를 할당
6. 길이 15로 문자열 자르고, 끝에 .이 있는 경우 . 제거
7. 길이가 2이하이면 길이가 3이 될 때까지 마지막 문자를 끝에 반복해서 붙임

-   작성하면서 겪었던 문제
    -   연속된 . 지우는 코드 구현 시 replaceAll을 미지원해서 반복문을 사용한 점
    -   끝 . 지우기 코드가 동작하지 않은 것 (slice 활용 미숙...)

```js
const bannedWords = [..."~!@#$%^&*()=+[{]}:?,<>/"];

const removeConsecutiveDots = (input) => {
    while (input.includes("..")) input = input.replace("..", ".");
    return input;
};

const removeFirstLetterIfItIsDot = (input) => {
    if (input.length > 0 && input[0] === ".") {
        return input.slice(1);
    }
    return input;
};

const removeLastLetterIfItIsDot = (input) => {
    if (input.length > 0 && input[input.length - 1] === ".") {
        return input.slice(0, input.length);
    }
    return input;
};

const paddToLength3 = (input) => {
    let padded = input;

    while (padded.length < 3) {
        padded += padded[padded.length - 1];
    }

    return padded;
};

const solution = (input) => {
    const lowered = input.toLowerCase();
    const bannedWordsFiltered = [...lowered]
        .filter((word) => !bannedWords.includes(word))
        .join("");

    // 고비였는데, replaceAll로 해결
    // FIXME: replaceAll 미지원
    const consecutiveDotsFiltered = removeConsecutiveDots(bannedWordsFiltered);

    // IDEA: replace(/$\.(.+)\.$^/, "$0") 이런 거 안되나보네
    const firstDotRemoved = removeFirstLetterIfItIsDot(consecutiveDotsFiltered);
    const lastDotRemoved = removeLastLetterIfItIsDot(firstDotRemoved);

    const aPadded = lastDotRemoved === "" ? "a" : lastDotRemoved;

    const slicedTo15 = aPadded.slice(0, 15);
    const lastDotRemovedAgain = removeLastLetterIfItIsDot(slicedTo15);

    const paddedToLength3 = paddToLength3(lastDotRemovedAgain);

    return paddedToLength3;
};
```

## 찾아본 점

### 정규표현식

우선, `/g`를 활용해 `replaceAll`의 한계를 해소할 수 있다.

#### 맨 앞과 끝의 .이 있는 경우 제거

-   `|`의 입장에선 `^\.`OR `\.$`로 평가한다. 즉, 첫 문자가 .이거나 끝 문자가 .인 경우면 일치한다.

```js
function removeDots(str) {
    return str.replace(/^\.|\.$/g, "");
}
```

#### 연속된 .을 하나의 .으로 대치

`{2,}`:

-   `{m,n}`은 반복 수량자
-   `{2,}`은 최소 2번 이상 점(.)이 반복되는 경우를 의미

```js
function replaceMultipleDots(str) {
    return str.replace(/\.{2,}/g, ".");
}
```
