# 단어 변환

## 문제 개요

-   문제 유형: BFS
-   문제 난도: 프로그래머스 Lv3, 60% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/43163

### 문제 핵심 요약

-   단어A -> 단어B로 한 글자씩 변환할 때 "가장 짧은 변환 과정"의 길이를 반환
-   임의의 문자열로 변환하는 게 아닌, 주어진 문자열들 간의 변환만 가능

### 문제 입출력

-   입력 값: 시작 문자열, 완료 문자열, 중간 문자열 배열
-   출력 값: 최단 변환 과정의 길이

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 최단이니까 BFS

-   변환할 수 없는 경우 존재
-   BFS를 하되, visited 관리를 어떻게?
    -   visited를 별도로 쓰는 BFS가 필요할지가 궁금
        -   이것의 필요성을 어떻게 증명할 수 있을까? 최단 경로인데..?
            -   "완료 문자열"에서 "시작 문자열"로의 구간은 1차원 경로일 것임
            -   즉, 방문 예정인 중간 문자열이 이미 visited 상태라면 현재 경로는 최단이 아니게 됨
-   그럼 그냥 단순한 최단 거리 BFS + 동서남북 대신 words 탐색

### 2. 수도 코드

1. BFS로 탐색
    - while (queue.length > 0)
        - nextWord = shift()
        - if (visited[nextWord]) continue
        - if (nextWord === 완료문자열) return transformCount
        - words.filter(!visited[nextWord] && one_letter_diff).forEach(queue.push(word, transformCount+1))
2. 변환할 수 없는 경우 0 반환
    - words 안에 완료 문자열이 없으면 순회 없이도 종료 가능

### 3. 사용 단위 알고리즘 종류

-   BFS

### 4. 코드

#### 4-1. 시도 1

-   80점을 받았다...?

```js
const solution = (begin, target, words) => {
    if (!words.find((word) => word === target)) {
        return 0;
    }

    const isOneLetterDiff = (a, b) => {
        return new Set([...a, ...b]).size === a.length + 1;
    };

    const visited = words.reduce((visitMap, word) => {
        visitMap[word] = false;
        return visitMap;
    }, {});

    const queue = [];

    queue.push([begin, 0]);

    while (queue.length > 0) {
        const [currWord, transformCount] = queue.shift();
        if (visited[currWord]) {
            continue;
        }
        visited[currWord] = true;

        if (currWord === target) {
            return transformCount;
        }

        const toVisit = words.filter(
            (word) => !visited[word] && isOneLetterDiff(currWord, word)
        );

        toVisit.forEach((nextWord) => {
            queue.push([nextWord, transformCount + 1]);
        });
    }

    return 0;
};
```

#### 4-2. 분석 1

-   visited 처리 누락때문이 아니었다..?

    -   뭐지???

-   제한사항 확인

    -   각 단어는 알파벳 소문자로만 이루어져 있습니다.
    -   각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
    -   words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
    -   begin과 target은 같지 않습니다.
    -   변환할 수 없는 경우에는 0를 return 합니다.

-   문제 없어 보임

    -   코드가 너무 간단해서, 기존 코드에서 문제는 없어 보인다.
        -   그럼 처리하지 않은 조건이 있을 수 있겠다.

-   한 글자만 다르다는 함수에 논리적 오류가 있었다.
    -   만약 문자열에 중복되는 알파벳이 있으면, 문자열의 길이 + 1일 수가 없다. 즉, 항상 isOneLetterDiff = false가 된다.

#### 4-3. 문제점 파악 및 해결

-   문자열 내에 중복되는 알파벳이 있으면, 절대로 문자열 길이 + 1만큼 Set이 채워지지 않음
    -   (ex) `estate` = `{e,s,t,a}` 이므로 길이 4.

```js
const isOneLetterDiff = (a, b) => {
    let isDifferent = false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            if (isDifferent) {
                return false;
            }
            isDifferent = true;
        }
    }
    return true;
};
```

### 6. 배운 점

-   암묵적으로 세워놓은 전제를 파악하는 것이 어렵다...
    -   이번에는 동일한 알파벳이 문자열 내에 없을 것이라는 전제가 있었다.
        -   음... 전제라기보다는 예상하지 못한 예외라고 볼 수 있겠다.
        -   정상 case이되 조금 더 복잡한 경우를 테스트해보면 이런 경우를 쉽게 파악할 수 있겠다.
        -   단위 테스트를 더 꼼꼼히 하자.
