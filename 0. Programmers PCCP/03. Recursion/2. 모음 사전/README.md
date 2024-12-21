# 모음 사전

## 문제 개요

-   문제 유형: 재귀
-   문제 난도: 프로그래머스 Lv2, 62% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/84512

## 문제 내용 설명

-   A,E,I,O,U로 길이 1~5의 임의의 문자열들이 정렬되어 있다.
-   정렬 순서는 A>E>I>O>U. 즉, 순서는 A, AA, AAA, AAAAA, AAAAE, ..., UUUUU이다.
-   입력받은 A,E,I,O,U로 구성된 길이 1~5의 임의의 문자열의 순서를 반환해야 한다.

### 문제 핵심 내용 요약

-   입력 값: A,E,I,O,U로 구성된 길이 1~5의 임의의 문자열
-   출력 값: 해당 문자열의 정렬됐을 때의 순서

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   바로 떠오르는 아이디어는 없어 고민이 필요하다.

#### 1-1 [접근 1]

-   단순 계산으로 가능한가? 패턴이 있다고 해도 복잡할 것 같다.
-   반복으로 쉽게 해결하는 아이디어가 있을 것 같다.
-   모든 case를 생성하고 정렬하면 될 것 같다.
-   그냥 정렬하면 순서가 어떻게 되려나? 기본 sort 하면 된다!
-   sort한 후에 순회하면서 입력 받은 문자열의 순서를 찾으면 된다.
-   시간 복잡도는 O(n \* log n) 일 듯 (sort가 max)

#### 1-2. [접근 1에 대한 추가 확인]

-   모든 case를 어떻게 생성할 수 있을까?
-   중복 순열로 만들면 될 것 같다. 백트래킹.
    -   백트래킹으로 만들면 정렬도 필요 없지 않을까?
    -   백트래킹의 시간 복잡도 = ?
        -   지금은 잘 모르겠고, 만들고 나서 다시 확인 예정

### 2. 수도 코드

1. 백트래킹을 구현한다. 각 자리수에 대해 [A, I, E, O, U] 중 하나를 선택한다.
2. 백트래킹은 1자리 ~ 5자리에 대해 별도로 실행한다.
3. 백트래킹으로 생성한 문자열들을 합치고 정렬한다.
4. 생성된 문자열 배열에서 입력받은 문자열을 찾고, 그 위치를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   백트래킹

### 4. 사용 단위 알고리즘 구현

```js
const WORD_LENGTH = 5;

const candidates = ["A", "E", "I", "O", "U"];

const selected = [];

const backtrack = (digit) => {
    if (digit > WORD_LENGTH) {
        const selectedWord = selected.join("");
        return;
    }

    for (let i = 0; i < candidates.length; i++) {
        selected.push(candidates[i]);
        backtrack(digit + 1);
        selected.pop();
    }
};
```

### 5. 단위 알고리즘 활용 코드

#### 5-1. 완성 코드

-   한 번에 성공했다.
-   백트래킹 시간 복잡도 = 5^5 + 5^4 + 5^3 + 5^2 + 5^1 개의 문자열을 생산한다. = 5 + 25 + 125 + 600 + 3,000 + 15,000 정도 (대략 2만 이하)
-   중복 순열이므로 n^r개 생성
-   N=순열의 개수라면, 백트래킹 시간 복잡도 = O(N)
-   총 시간 복잡도 = O(N log N) (정렬) = 대략 15,000 \* 15 = 225,000 정도.

```js
const candidates = ["A", "E", "I", "O", "U"];

const createWord = (wordList, wordLength) => {
    const selected = [];

    const backtrack = (currDigit) => {
        if (currDigit === wordLength) {
            const selectedWord = selected.join("");
            wordList.push(selectedWord);
            return;
        }

        for (let i = 0; i < candidates.length; i++) {
            selected.push(candidates[i]);
            backtrack(currDigit + 1);
            selected.pop();
        }
    };

    backtrack(0);
};

const solution = (searchTerm) => {
    const wordList = [];

    for (let wordLength = 1; wordLength <= 5; wordLength++) {
        createWord(wordList, wordLength);
    }

    wordList.sort();

    return wordList.findIndex((word) => word === searchTerm) + 1;
};
```
