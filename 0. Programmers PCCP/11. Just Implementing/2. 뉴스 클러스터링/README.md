# 뉴스 클러스터링

## 문제 개요

-   문제 유형: 구현
-   문제 난도: 프로그래머스 Lv2, 63% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/17677

### 문제 핵심 요약

-   문자열 2개의 "자카드 유사도"를 구해 반환한다.
-   주어진 두 문자열을 영문자만 남기고 소문자 처리를 한 후, 2글자씩 끊는다.
-   두 문자열의 2글자씩 끊어진 배열의 (둘 모두에 있는 원소 개수 / 중복 없는 전체 원소 개수) 에 65536을 곱한 후 소수부를 제외하고 반환한다.

### 문제 입출력

-   입력 값: 문자열 2개 (길이 <= 1,000)
-   출력 값: 자카드 유사도에 65536을 곱하고 소수부를 제외한 값

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 주어진대로 그대로 구현

-   문자열을 소문자 처리하고, 영문자 제외 모두 제거해야 한다.
    -   toLowerCase 사용
    -   영문자만 남기는 일은 character 비교로 쉽게 가능 (charCode가 자동으로 비교되는듯? 원리는 모르겠음.)
-   두 문자열을 길이=2씩 끊어야 한다.
    -   이는 단순 배열 순회로 구현할 수 있다.
-   각 문자열에서 끊은 각 문자열 배열에서 중복을 제거한다.
    -   Set에 넣은 후 Set을 순회한다.
-   두 문자열 배열을 비교하면서 교집합과 합집합을 구한다.
    -   음... 이거 Set을 쓰면 될 것 같은데?
    -   add, get만 있으려나? (ES2025에 union, intersection 등 나옴..)
    -   그럼 직접 구한다.
    -   교집합: 하나를 먼저 순회하고, includes로 필터링
    -   합집합: 하나를 먼저 순회하고, 이미 있으면 스킵하고 없으면 추가
-   Math.floor((교집합 길이 / 합집합 길이) \* 65536) 하면 끝.

#### 1-2 [접근 2] 단위 함수로 분리하고, 단위 함수 별로 테스트 수행

-   단위 함수:
    -   문자열을 소문자 처리하고, 영문자만 남긴다.
    -   두 문자열을 길이=2씩 자르기
    -   두 문자열 배열의 교집합 구하기
    -   두 문자열 배열의 합집합 구하기

```js
// toLowerCase를 한 문자열로 호출해야 함.
const filterOnlyAlphabets = (inputString) =>
    [...inputString].filter((char) => char >= "a" && char <= "z").join("");
```

```js
const sliceIntoLengthOf2 = (inputString) => {
    const characters = [...inputString];

    const sliced = [];
    for (let i = 0; i < characters.length - 1; i++) {
        const slice = `${characters[i]}${characters[i + 1]}`;
        sliced.push(slice);
    }

    return sliced;
};
```

```js
const intersection = (setA, setB) => {
    const a = [...setA];
    const b = [...setB];

    const intersectingElements = [];
    for (const elementA of a) {
        if (b.includes(elementA)) {
            intersectingElements.push(elementA);
        }
    }

    return intersectingElements;
};
```

```js
const union = (setA, setB) => [...new Set([...setA, ...setB])];
```

### 2. 코드

#### 2-1. 시도 1

-   TC 4개 중 2개만 맞았다.
-   추측되는 원인으로는 중복 부분의 문제 조건을 잘못 이해한 것 때문이 아닐까 싶다.
    -   특수문자를 미리 제거하는 것은 괜찮다는 생각이 든다.

```js
const solution = (str1, str2) => {
    const filterOnlyAlphabets = (str) =>
        [...str].filter((char) => char >= "a" && char <= "z").join("");

    const sliceIntoLengthOf2 = (inputString) => {
        const characters = [...inputString];

        const sliced = [];
        for (let i = 0; i < characters.length - 1; i++) {
            const slice = `${characters[i]}${characters[i + 1]}`;
            sliced.push(slice);
        }

        return sliced;
    };

    const intersection = (setA, setB) => {
        const a = [...setA];
        const b = [...setB];

        const intersectingElements = [];
        for (const elementA of a) {
            if (b.includes(elementA)) {
                intersectingElements.push(elementA);
            }
        }

        return intersectingElements;
    };

    const union = (setA, setB) => [...new Set([...setA, ...setB])];

    const a = sliceIntoLengthOf2(filterOnlyAlphabets(str1.toLowerCase()));
    const b = sliceIntoLengthOf2(filterOnlyAlphabets(str2.toLowerCase()));

    const setA = new Set(a);
    const setB = new Set(b);

    // 공집합 간의 연산은 1로 처리
    if (setA.length === 0 && setB.length === 0) {
        return 65536;
    }

    const intersectionLength = intersection(setA, setB).length;
    const unionLength = union(setA, setB).length;

    return Math.floor((intersectionLength / unionLength) * 65536);
};
```

#### 2-2. 시도 2

-   문제 조건에 맞게 교집합, 합집합 로직을 수정
-   소문자 필터링을 먼저 하는 경우 답과 달라짐을 발견

```js
const solution = (str1, str2) => {
    const hasOnlyAlphabet = (str) =>
        [...str].findIndex((char) => char < "a" || char > "z") === -1;

    const sliceIntoLengthOf2 = (inputString) => {
        const characters = [...inputString];

        const sliced = [];
        for (let i = 0; i < characters.length - 1; i++) {
            const slice = `${characters[i]}${characters[i + 1]}`;
            sliced.push(slice);
        }

        return sliced;
    };

    const convertToDuplicateSizeMap = (inputStrings) => {
        const map = new Map();
        inputStrings.forEach((inputString) => {
            if (!map.has(inputString)) {
                map.set(inputString, 1);
            } else {
                map.set(inputString, map.get(inputString) + 1);
            }
        });

        return map;
    };

    const getIntersectionSize = (aMap, bMap) => {
        let size = 0;
        const unionKeys = [...new Set([...aMap.keys(), ...bMap.keys()])];
        for (const key of unionKeys) {
            const aMapSize = aMap.get(key) ?? 0;
            const bMapSize = bMap.get(key) ?? 0;

            size += Math.min(aMapSize, bMapSize);
        }
        return size;
    };

    const getUnionSize = (aMap, bMap) => {
        let size = 0;
        const unionKeys = [...new Set([...aMap.keys(), ...bMap.keys()])];
        for (const key of unionKeys) {
            const aMapSize = aMap.get(key) ?? 0;
            const bMapSize = bMap.get(key) ?? 0;

            size += Math.max(aMapSize, bMapSize);
        }
        return size;
    };

    const a = sliceIntoLengthOf2(str1.toLowerCase()).filter(hasOnlyAlphabet);
    const b = sliceIntoLengthOf2(str2.toLowerCase()).filter(hasOnlyAlphabet);

    if (a.length === 0 && b.length === 0) {
        return 65536;
    }

    const aMap = convertToDuplicateSizeMap(a);
    const bMap = convertToDuplicateSizeMap(b);

    const intersectionLength = getIntersectionSize(aMap, bMap);
    const unionLength = getUnionSize(aMap, bMap);

    return Math.floor((intersectionLength / unionLength) * 65536);
};
```

### 3. 배운 점

-   단위 함수로 나눈 것
    -   단위 함수로 나누고 테스트하면서 진행하니 매우 몰입이 잘 됐다.
    -   또한 코드에 대한 자신감도 많이 생겼다.
-   잘못된 조건 활용 (추측)
    -   중복 원소를 제거하면 된다고 생각했으나 전혀 다른 방법이었음.
    -   지문을 정확히 읽고, 지문의 모든 조건을 잘 활용했는지 최대한 일찍 생각해보는 게 좋아보임.
-   성급한 최적화
    -   소문자 필터링을 먼저 해도 답이 동일할 것으로 추측했으나 틀림.
        -   이런식의 추측은 동일한 값을 반환한다는 증명이 필요
            -   최소한 예제 데이터 모두가 통과하고, 예제보다 조금 더 긴 정상 Case도 통과하는 것은 확인 필요
        -   시간을 꽤 쓰고 나서야 실제 답과 달라짐을 발견
            -   (ex) `e=m*c^2`는 `emc`와 매우 다름. 실제 필터링 시에는 빈 값이 되는데, 특수문자 제거 시 `[em, mc]`가 되는 문제 있음.
-   위 둘을 잘 단련하면 실제 문제 풀이에 소요되는 불필요한 추가 시간을 크게 줄일 수 있을 것으로 생각함
