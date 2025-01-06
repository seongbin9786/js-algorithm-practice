# 순위 검색

## 문제 개요

-   문제 유형: 이진 탐색
-   문제 난도: 프로그래머스 Lv2, 34% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/72412

## 문제 내용 설명

-   지원자들의 스펙을 입력으로 받아, 특정 스펙 조합에 맞는 지원자가 몇 명인지 반환
-   지원 조건은 and 이며, 일부 조건은 특정 값을 요구하지 않을 수 있다.
-   지원 조건: (코딩테스트 참여 개발언어 3종, 지원 직군 2종, 지원 경력구분 2종, 선호하는 소울푸드 2종), 코딩 테스트 점수
    -   코딩 테스트 언어: cpp, java, python
    -   지원 직군: backend, frontend
    -   지원 경력 구분: junior, senior
    -   선호하는 소울푸드: chicken, pizza
-   1 <= 지원자 수 <= 50,000
-   1 <= 코딩 테스트 점수 <= 100,000

### 문제 핵심 내용 요약

-   입력 값: `"java and backend and junior and pizza 100"`와 같은 지원 조건을 표현하는 문자열의 배열 (1 <= 길이 <= 100,000)
-   출력 값: 특정 지원 조건의 조합을 만족하는 지원자 수의 배열

## 문제 해설

-   문제 풀이 방법 도출
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 풀이 방법 도출

-   정답으로 꼽을 만한 풀이가 떠오르지는 않는다.

#### 1-1. [접근 1] 각 질의에 대해 전체 지원자 반복

-   각 쿼리에 대해 전체 지원자를 순회하면 단순 반복으로 질의를 해결할 수 있다.
-   이 경우의 시간 복잡도는 O(N\*M) 이다.
-   N\*M = 질의수\*지원자수 = 10만\*5만 = 50억

##### 단순 반복으로는 해결 불가

-   일반적인 문제는 1억을 초과하지 않으므로 단순 반복보다 나은 방법이 필요하다.

##### 적정 시간복잡도 계산

-   숫자가 10만, 5만일 때도 효율이 유지되는 알고리즘이 필요할 것 같다.
    -   O(N \* M)보다는 작아야 한다. O(N \* log N)만 되어도 매우 효율적일 것이다.
        -   log2(10만) <= 17 (2^10=1,024 \* 2^7=128)
        -   log2(5만) <= 16
    -   O(N \* log N) = 10만 \* 17 = 170만 (적절)

#### 1-2. [접근 2] 이진 탐색

-   내가 알고 있는 빠른 알고리즘은 정렬+이진 탐색, DP 정도이다.
-   DP로 풀 방법이 떠오르지 않고, 문제 분류가 이진 탐색이니 이진 탐색으로 먼저 풀이를 시도한다.

##### 이진 탐색의 적용 방안 - 코테 점수만으로 정렬 (불가)

-   이진탐색을 사용하려면 우선 대상 배열을 정렬해야 한다.
-   이 문제의 경우 지원자 배열을 정렬한다.
-   단순히 코테 점수로만 정렬한다면

    -   특정 점수의 최초 원소를 찾는다.
    -   해당 원소 이후의 원소에 대해 (언어, 직군, 경력, 소울푸드) 조건을 만족하는 지원자를 필터링한다.
    -   이렇게 했을 때의 시간 복잡도 = ?

-   만약 코테 점수가 0점 이상이라면 O(M)이 된다. 흠...
    -   전체를 다 정렬한다면 더 빠르게 찾을 수 있을까?
    -   각 항목별로 점수를 매겨서 탐색할 수도 있겠다는 생각이 든다.

##### 이진 탐색의 적용 방안 - 멀티 컬럼 정렬 (불가)

-   (코테 점수, 코테언어, 직군, 경력, 소울푸드) 순으로 정렬해둔다면

    -   이를 만족하는 최초의 요소로 이동한다.
    -   이후 (코테 언어, 직군, 경력, 소울푸드)를 만족하지 않을 때까지 개수를 센다?
    -   코테 점수로 정렬한다면, 코테언어, 직군, 경력, 소울푸드 순으로는 불가능함..

-   이렇게 멀티 컬럼으로는 정렬이 의미가 없다.

##### 이진 탐색의 적용 방안 - 단위 조건 별 배열 분리 (불가)

-   (Wow), 결국 정렬은 코테 점수 순으로밖에 할 수 없기 때문에,
-   (코테 언어, 직군, 경력, 소울푸드)의 각 단위 조건 별 배열을 만들고, 해당하는 조건에 점수를 삽입한다.
-   이후 질의 처리 시에 각 단위 조건 별 배열을 전부 순회하여 집계한다.

-   전체 조합의 수 = 3\*2\*2\*2=24
-   시간 복잡도 = 질의 수 \* 스펙 조합 개수 \* 코테점수 이진 탐색 = 16 = 10만 \* 24 \* 16 = 3,840만

-   각 조합에 부합하면 모든 점수를 추가한다.
-   `-`의 경우, 해당 필드의 모든 단위 조건 배열(ex: `'java', 'python', 'javascript'`)에 추가한다.
    ```js
    // input: `java backend junior pizza 150`
    lang["java"].push(150);
    position["backend"].push(150);
    experience["junior"].push(150);
    food["pizza"].push(150);
    ```
-   각 조건에 해당하는 점수 개수의 최솟값을 반환한다.
    -   `-` 값이 아닌 경우
        ```js
        // 모두를 만족하는 경우 = 이 중 최솟값
        return Math.min(
            findFirstGte(lang["java"], 150, 0, lang["java"].length - 1),
            findFirstGte(
                position["backend"],
                150,
                0,
                position["backend"].length - 1
            )
            // ...
        );
        ```
    -   `-` 값인 있는 경우
        ```js
        //
        return Math.min(
            Math.max(
                // lang 종류 전체의 max (아무거나이기 때문)
                Object.keys(lang).reduce(
                    (prevValue, fieldName) =>
                        Math.max(
                            prevValue,
                            findFirstGte(
                                lang[fieldName],
                                150,
                                0,
                                lang[fieldName].length - 1
                            )
                        ),
                    0
                )
            )
            // 다른 필드들
        );
        ```
-   문제점: 단위 조건 별로만 필터링하다보니, 최솟값을 반환하는 것으로는 정답을 보장할 수가 없다.
    -   반례: `- and backend and senior and - 150`
    -   이 방식으로 계산하는 경우:
        -   `language: 4, position: 2, experience: 3, food: 4`이므로, 답은 2가 나오지만, 실제로는 1이다.
        -   해당 코드의 분류 결과:
        ```json
        [
            {
                "java": [80, 150],
                "python": [50, 150, 210],
                "cpp": [260]
            },
            {
                "backend": [50, 80, 150, 260],
                "frontend": [150, 210]
            },
            { "junior": [80, 150], "senior": [50, 150, 210, 260] },
            { "pizza": [150, 260], "chicken": [50, 80, 150, 210] }
        ]
        ```
        -   위 값을 확인하면 backend senior = 150, 260일 것으로 보이지만,
        -   실제로는 backend senior = 260이고, 150은 junior의 것이다.
        -   이 사례로, 개별 조건들의 조합으로는 적절한 답을 낼 수 없음을 알 수 있다.

##### 이진 탐색의 적용 방안 - 대상이 되는 모든 질의에 대해 중복 삽입 (가능)

> 문제 풀이 도중 `-` 처리가 없음을 알게 되어 추가했다.

-   문제를 해결할 수 있으려면 단위 조건이 아닌, 모든 조건의 조합 별로 점수를 반환해야 한다.
-   즉 지원자 `["java","backend","junior","-"]`는 다음과 같은 질의에 해당한다.
-   `-`가 있으면 전체 조합의 수가 증가하게 된다. (3+1)\*(2+1)\*(2+1)\*(2+1) = 4\*3\*3\*3 = 108
-   `-`를 사용하는 질의도 고려해서 조합을 생성해야 한다.
-   조합을 생성하기 위해 백트래킹을 활용한다.

    ```
    "- - - -",
    "java - - -",
    "- backend - -",
    "- - junior -",
    "java backend - -",
    "- backend junior - ",
    "java - junior -",
    "java backend junior -",
    ```

-   각 조건에 `-`일 수도 있고, 아닐 수도 있어서, 최대 2^4개의 질의 조합에 부합하게 된다.
-   지원자 문자열을 잘 파싱해서 위와 같이 응답 대상 질의를 만들어야 한다.

#### 1-3. 이진 탐색으로 특정 값 이상의 요소 개수 구하기

-   이진 탐색으로 특정 요소를 찾는 것은 어렵지 않다.
-   찾는 요소와 같거나 큰 요소를 반환해야 한다.
-   동일 요소가 있다면 그 중 제일 앞의 값을 반환해야 한다.

-   이진 탐색 함수는 적절한 첫 원소의 index를 반환해서, 배열의 길이에서 index를 빼면 대상 원소의 개수를 구할 수 있어야 한다.

#### 1-4. 이진 탐색으로 특정 값 이상의 요소 개수 구하기 (경계값 예외 처리 추가)

-   만약 배열의 길이가 하나인 경우?
-   만약 찾는 값이 배열의 모든 요소보다 크다면?
-   기존 접근은 이 때 각각 0, 마지막 원소의 index라는 오답을 반환했다.
-   두 경우 모두 요소의 개수가 없도록 처리해야 한다.

### 2. 수도 코드

1. 지원자 배열을 순회하면서 파싱하고, 각 조건(언어, 포지션, 경력, 소울 푸드) 별 배열로 분리한다 - O(M) = 5만
2. 각 지원자 배열을 정렬한다 - O(M log M \* 조건 조합 가짓수) = 5만 \* 16 \* 24 = 192만
3. 각 질의 배열에 대해 이진 탐색을 수행한다. 만약 특정 조건이 빈 경우, 포함된 모든 조건을 검색한다. - O(N _ log M _ 조건 조합 가짓수) = 10만 \* 16 \* 24 = O(3,840만)
4. (3)에서 코테 점수를 만족하는 첫 원소로 이동한 후, 전체 길이에서 해당 원소의 index를 빼면 해당 조건을 만족하는 지원자 수가 된다. 이를 모두 더하고 반환한다.

### 3. 사용 단위 알고리즘 종류

-   정렬, 이진 탐색

### 4. 사용 단위 알고리즘 구현 (이진 탐색 코드 유도)

#### 예시 TC 1

```text
applicants [1,2,2,3,3,4,5,6,7,8] 일 때, 질의 점수가 3이라면?
- 길이=10, start=0, end=9, mid=4
- mid=4, applicants[4]=3, 값을 찾았고, mid를 포함해 더 작은 값을 탐색하게 한다.
- (0,4) -> mid=2, applicants[2]=2, 타겟보다 작으므로, mid를 포함하지 않고 더 큰 구간으로 이동한다.
- (3,4) -> mid=3, applicants[3]=3, 값을 찾았고, mid를 포함해 더 작은 값을 탐색하게 한다.
- (3,3) -> mid=3, applicants[3]=3 값을 찾았고, 3 중 제일 앞일 수밖에 없다.
```

-   전개해보니, 작은/큰 구간 여부가 중요한 게 아니라, 타겟 조우 여부가 중요한 것 같다.
-   타겟의 중복 원소의 맨 앞으로 가려면 작은 구간으로 갈 때도 mid를 포함시키고,
-   타겟보다 큰 값 중 최솟값의 맨 앞을 구할 때는, 해당 값이 바로 그 값일지도 모르기 때문에 mid를 포함해야 한다.
    -   즉 타겟보다 큰 곳을 이동할 때는 mid를 포함해야 한다? 맞음. 이 때는 end는 mid-1을 해줘야 함.

#### 예시 TC 2

```text
applicants [0,1,2,6,8,11,31,34,62,77] 일 때, 질의 점수 = 30
- 길이=10, start=0, end=9
- mid=4, applicants[4]=8, 값이 더 작으므로 큰 쪽으로 탐색한다. 이 때는 mid를 포함하지 않는다.
- (5,9) -> mid=7, applicants[7]=34, 값이 더 크므로 작은 쪽으로 탐색한다. 34가 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,7) -> mid=6, applicants[6]=31, 값이 더 크므로 작은 쪽으로 탐색한다. 31이 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,6) -> mid=5, applicants[5]=11, 11은 30보다 작으므로, mid를 포함시키지 않고 위로 탐색한다.
- (6,6) -> mid=6, applicants[6]=31, 정상적으로 찾았다.
```

#### 예시 TC 3

```text
applicants [0,1,2,6,8,31,31,31,31,31] 일 때, 질의 점수 = 30
- 길이=10, start=0, end=9
- mid=4, applicants[4]=8, 값이 더 작으므로 큰 쪽으로 탐색한다. 이 때는 mid를 포함하지 않는다.
- (5,9) -> mid=7, applicants[7]=31, 값이 더 크므로 작은 쪽으로 탐색한다. 31이 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,7) -> mid=6, applicants[6]=31, 값이 더 크므로 작은 쪽으로 탐색한다. 31이 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,6) -> mid=5, applicants[5]=31, 값이 더 크므로 작은 쪽으로 탐색한다. 31이 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,5) -> mid=5, applicants[5]=31, 정상적으로 찾았다.
```

위를 반영해서 짜면 아래와 같다.

```js
const findFirstGte = (array, searchTerm, start, end) => {
    const mid = Math.floor((start + end) / 2);
    const currValue = array[mid];
    if (start === end) {
        return mid;
    }
    if (currValue >= searchTerm) {
        return findFirstGte(array, searchTerm, start, mid);
    } else {
        return findFirstGte(array, searchTerm, mid + 1, end);
    }
};
```

### 4-1. 이진 탐색 코드 오류 제거 (예외 케이스 해소)

위의 이진 탐색 코드에는 반례가 있다.

```
const array = [1,2,3,4,5,6,7,8,9,10]
findFirstGte(array, 9999, 0, array.length - 1) // 9
```

-   9999의 경우 array에서 이보다 같거나 큰 값이 없기 때문에 9가 나오면 안 되고, 10이 나와야 한다.
-   재귀적으로 쉽게 해결하기는 어렵다고 보여서 단순 분기문으로 해소했다.

```js
const findFirstGte = (array, searchTerm, start, end) => {
    if (array.length <= 0) {
        // 배열의 크기가 0
        return array[0] >= searchTerm ? 0 : array.length;
    }
    if (searchTerm > array[end]) {
        // 배열 전체보다 큰 원소인 경우
        return array.length;
    }
    const mid = Math.floor((start + end) / 2);
    const currValue = array[mid];
    if (start === end) {
        return mid;
    }
    if (currValue >= searchTerm) {
        return findFirstGte(array, searchTerm, start, mid);
    } else {
        return findFirstGte(array, searchTerm, mid + 1, end);
    }
};
```

### 5. 단위 알고리즘 활용 코드

1. 지원자 배열을 순회하면서 파싱한다.
2. 지원자가 포함될 수 있는 모든 질의 조합을 생성한다.
3. 각 질의 조합에 대해 지원자의 점수를 삽입한다.
4. 각 질의 조합에 대응되는 배열을 오름차순 정렬한다.
5. 각 질의를 파싱한다.
6. 각 질의에 대응되는 배열에서 이진 탐색을 수행한다.

#### 5-1. (1) 지원자 배열을 순회하고 파싱

```js
// 단순 공백으로 구분
const parseApplicant = (applicant) => {
    const [languageType, positionType, experienceType, rawScore] =
        applicant.split(" ");
    const score = Number(rawScore);

    return {
        languageType,
        positionType,
        experienceType,
        score,
    };
};
```

#### 5-2. (2) 모든 질의 조합을 생성

-   예시 입력: ["java","backend","junior","-"]
-   예시 출력: 최대 2^4개 생성 (ON/OFF \* 4)

```
[
    "- - - -",
    "java - - -",
    "- backend - -",
    "- - junior -",
    "java backend - -",
    "- backend junior - ",
    "java - junior -",
    "java backend junior -",
]
```

```js
const generateKeys = (types) => {
    // -가 아닌 값은 on/off 토글이 필요함
    // -인 값은 토글이 필요 없음

    const toggleArray = ["-", "-", "-", "-"];
    const result = [];

    const backtrack = (idx) => {
        if (idx >= 4) {
            return result.push([...toggleArray].join(" "));
        }

        if (types[idx] !== "-") {
            toggleArray[idx] = types[idx];
            backtrack(idx + 1);
            toggleArray[idx] = "-";
        }
        toggleArray[idx] = "-";
        backtrack(idx + 1);
    };

    backtrack(0);
    return result;
};
```

#### 5-2. (3) 각 질의 조합에 대해 지원자의 점수를 삽입

-   질의 조합을 `{조건1} {조건2} {조건3} {조건4}` 같이 공백으로 구분된 문자열 key로 변환한다.
-   각 key에 대한 number 배열을 제공해야 한다.

```js
// 각 질의 조합 별 배열 보관
const vaultMap = new Map();

const getVault = (keys) => {
    const key = keys.join(" ");

    if (!vaultMap.has(key)) {
        vaultMap.set(key, []);
    }

    return vaultMap.get(key, []);
};

// 질의 조합 생성
applicants.forEach((applicant) => {
    const { languageType, positionType, experienceType, foodType, score } =
        parseApplicant(applicant);

    // 각 질의 조합의 key 생성
    const entryKeys = generateKeys([
        languageType,
        positionType,
        experienceType,
        foodType,
    ]);

    // 각 key에 대해 점수를 삽입
    entryKeys.forEach((entryKey) => {
        const vault = getVault(entryKey);
        vault.push(score);

        console.log(`pushing: [${score}] into [${entryKey}]`);
    });
});
```

#### 5-3. (4) 각 질의 조합에 대응되는 배열을 오름차순 정렬

```js
// 전체 조건 조합 별 배열 오름차순 정렬
for (const [key, value] of vaultMap.entries()) {
    value.sort((a, b) => a - b);
}
```

#### 5-4. (5) 질의 파싱 수행

```js
// 질의는 공백과 and로 구분
const parseQuery = (query) => {
    const [languageType, positionType, experienceType, rawScore] = query
        .split(" ")
        .filter((unit) => unit !== "and"); // -, -, -, 150
    const score = Number(rawScore);

    return {
        languageType,
        positionType,
        experienceType,
        score,
    };
};
```

#### 5-5. (6) 각 질의에 대응되는 배열에서 이진 탐색을 수행

```js
return queries.map((query) => {
    const { languageType, positionType, experienceType, foodType, score } =
        parseQuery(query);

    const key = [languageType, positionType, experienceType, foodType].join(
        " "
    );

    const vault = getVault(key);

    const peopleCount =
        vault.length - findFirstGte(vault, score, 0, vault.length - 1);

    return peopleCount;
});
```

#### 5-6. 완성 코드

```js
const solution = (applicants, queries) => {
    const findFirstGte = (array, searchTerm, start, end) => {
        if (array.length <= 0) {
            return array[0] >= searchTerm ? 0 : array.length;
        }
        if (searchTerm > array[end]) {
            return array.length;
        }
        const mid = Math.floor((start + end) / 2);
        const currValue = array[mid];
        if (start === end) {
            return mid;
        }
        if (currValue >= searchTerm) {
            return findFirstGte(array, searchTerm, start, mid);
        } else {
            return findFirstGte(array, searchTerm, mid + 1, end);
        }
    };

    const parseQuery = (query) => {
        const [languageType, positionType, experienceType, foodType, rawScore] =
            query.split(" ").filter((unit) => unit !== "and");
        const score = Number(rawScore);

        return {
            languageType,
            positionType,
            experienceType,
            foodType,
            score,
        };
    };

    const parseApplicant = (applicant) => {
        const [languageType, positionType, experienceType, foodType, rawScore] =
            applicant.split(" ");
        const score = Number(rawScore);

        return {
            languageType,
            positionType,
            experienceType,
            foodType,
            score,
        };
    };

    const vaultMap = new Map();

    const getVault = (key) => {
        if (!vaultMap.has(key)) {
            vaultMap.set(key, []);
        }
        return vaultMap.get(key);
    };

    const generateKeys = (types) => {
        // -가 아닌 값은 on/off 토글이 필요함
        // -인 값은 토글이 필요 없음
        // 그냥 모든 값에 on/off 만들고 중복 제거하는 게 쉬울 듯?

        const toggleArray = ["-", "-", "-", "-"];
        const result = [];

        const backtrack = (idx) => {
            if (idx >= 4) {
                return result.push([...toggleArray].join(" "));
            }

            if (types[idx] !== "-") {
                toggleArray[idx] = types[idx];
                backtrack(idx + 1);
                toggleArray[idx] = "-";
            }
            toggleArray[idx] = "-";
            backtrack(idx + 1);
        };

        backtrack(0);
        return result;
    };

    const initializeApplicants = () => {
        applicants.forEach((applicant) => {
            const {
                languageType,
                positionType,
                experienceType,
                foodType,
                score,
            } = parseApplicant(applicant);

            const entryKeys = generateKeys([
                languageType,
                positionType,
                experienceType,
                foodType,
            ]);

            entryKeys.forEach((entryKey) => {
                const vault = getVault(entryKey);
                vault.push(score);

                // console.log(`pushing: [${score}] into [${entryKey}]`);
            });
        });

        for (const [key, value] of vaultMap.entries()) {
            value.sort((a, b) => a - b);
        }
    };

    const getAnswers = () => {
        return queries.map((query) => {
            const {
                languageType,
                positionType,
                experienceType,
                foodType,
                score,
            } = parseQuery(query);

            const key = [
                languageType,
                positionType,
                experienceType,
                foodType,
            ].join(" ");

            const vault = getVault(key);

            const peopleCount =
                vault.length - findFirstGte(vault, score, 0, vault.length - 1);

            // console.log(query, key, vault, peopleCount);

            return peopleCount;
        });
    };

    initializeApplicants();
    return getAnswers();
};
```

### 6. 배운 점

-   내가 이진 탐색을 잘못 이해하고 있었던 것 같다.
    -   비교를 통해서 그 구간을 정해두는 것이다.
    -   즉 그 이하의 구간은 애초에 탐색할 필요가 없다.
    -   그만큼 조건이 중요하다. 애초에 방문할 수 없도록 진행되고 있을 수도 있기 때문이다.
-   문제가 뭔가 DB스럽다. 미리 인덱스를 걸어둔 조건에서만 빠르게 탐색이 가능한 것처럼 말이다.
-   '-' 여부를 결정하는 코드를 짜면서 백트래킹을 조금 더 응용할 수 있게 되었다.
