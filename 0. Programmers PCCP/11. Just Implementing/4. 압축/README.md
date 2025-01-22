# 압축

## 문제 개요

-   문제 유형: 구현
-   문제 난도: 프로그래머스 Lv2, 61% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/17684

### 문제 핵심 요약

-   알파벳 대문자로 구성된 문자열을 압축하는데, 아래의 규칙을 따라야 한다.
    -   A~Z로 사전을 초기화한다. 각 문자는 알파벳 순서로 index가 부여된 상태이다.
    -   압축 대상 문자열을 순회하되, 사전에서 쓸 수 있는 가장 긴 알파벳을 가져온다.
    -   사전의 문자열만큼 압축 대상 문자열에서 제거한 후 index로 치환한다.
    -   동시에, {해당 사전 문자열 + 압축 대상 문자열의 그 다음 문자}를 사전에 추가한다.
    -   이를 반복한 후, 사전의 index로 구성된 배열을 반환한다.

### 문제 입출력

-   입력 값: 압축 대상 문자열
-   출력 값: 사전의 index 배열

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] includes하고 필터하기

-   사전을 A~Z로 초기화한다.
-   압축 대상 문자열을 순회하며, 사전에서 최장 길이 문자열을 가져온다.
    -   사전의 글자를 찾는 방법:
        -   (압축 대상 문자열).includes(사전 문자열) = true인 사전 문자열 중 가장 긴 문자열을 반환
    -   압축 대상 문자열 중 치환된 부분을 제거해서 갱신한다.
    -   신규 사전 문자열을 사전에 넣는다.
-   반복 후, 압축 대상 문자열을 치환한 사전 index 배열을 반환한다.

#### 2-1. 시도 1 코드

-   사전 초기화 코드

```js
let dictionaryNextIndex = 1;

const createDictionary = () => {
    const dictionary = new Map();
    for (
        let charCode = "A".charCodeAt(0);
        charCode <= "Z".charCodeAt(0);
        charCode++
    ) {
        const char = String.fromCharCode(charCode);
        dictionary.set(char, dictionaryNextIndex++);
    }
    return dictionary;
};
```

-   압축 대상 문자열 순회
    -   `includes`가 아니라 `startsWith`를 사용해야 한다. 수도 코드 작성 시 인지 못 했다.

```js
const findLongestWordEntry = (toCompress, dictionary) => {
    let maxLengthEntry = undefined;
    for (const currEntry of dictionary.entries()) {
        if (!toCompress.startsWith(currEntry[0])) {
            continue;
        }

        if (!maxLengthEntry) {
            maxLengthEntry = currEntry;
            continue;
        }

        if (currEntry[0].length > maxLengthEntry[0].length) {
            maxLengthEntry = currEntry;
        }
    }

    return maxLengthEntry;
};

const compressIndices = [];
let toCompress = compressTargetInput;
while (toCompress.length > 0) {
    const longestEntry = findLongestWordEntry(toCompress, dictionary);
    const [compressWord, index] = longestEntry;
    compressIndices.push(index);
    toCompress = toCompress.slice(compressWord.length);
    dictionary.set(
        `${compressWord}${toCompress.slice(0, 1)}`,
        dictionaryNextIndex++
    );
}
```

```js
const solution = (toCompress) => {
    const createDictionary = () => {
        const dictionary = new Map();
        let index = 1;
        for (
            let charCode = "A".charCodeAt(0);
            charCode <= "Z".charCodeAt(0);
            charCode++
        ) {
            const char = String.fromCharCode(charCode);
            dictionary.set(char, index++);
        }
        return dictionary;
    };

    const dictionary = createDictionary();
};
```

#### 2-2. 전체 코드

-   실수 없이 한 번에 통과했다.

```js
const solution = (compressTargetInput) => {
    let dictionaryNextIndex = 1;

    const createDictionary = () => {
        const dictionary = new Map();
        for (
            let charCode = "A".charCodeAt(0);
            charCode <= "Z".charCodeAt(0);
            charCode++
        ) {
            const char = String.fromCharCode(charCode);
            dictionary.set(char, dictionaryNextIndex++);
        }
        return dictionary;
    };

    const findLongestWordEntry = (toCompress, dictionary) => {
        let maxLengthEntry = undefined;
        for (const currEntry of dictionary.entries()) {
            if (!toCompress.startsWith(currEntry[0])) {
                continue;
            }

            if (!maxLengthEntry) {
                maxLengthEntry = currEntry;
                continue;
            }

            if (currEntry[0].length > maxLengthEntry[0].length) {
                maxLengthEntry = currEntry;
            }
        }

        return maxLengthEntry;
    };

    const compressIndices = [];
    const dictionary = createDictionary();
    let toCompress = compressTargetInput;
    while (toCompress.length > 0) {
        const longestEntry = findLongestWordEntry(toCompress, dictionary);
        const [compressWord, index] = longestEntry;
        compressIndices.push(index);
        toCompress = toCompress.slice(compressWord.length);
        dictionary.set(
            `${compressWord}${toCompress.slice(0, 1)}`,
            dictionaryNextIndex++
        );
    }

    return compressIndices;
};
```

### 6. 배운 점

-   어려운 문제는 아니었지만, 수도 코드를 세심하게 세워서 큰 오차 없이 잘 진행했다.
-   `includes`가 아니라 `startsWith`를 사용해야 한다. 수도 코드 작성 시 인지 못 했다.
-   수도 코드, 단위 테스트 잘 하면서 진행하고 있어서 만족스럽다.
