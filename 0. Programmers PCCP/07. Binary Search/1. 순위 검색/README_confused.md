# 순위 검색

## 문제 개요

-   문제 유형: 이진 탐색
-   문제 난도: 프로그래머스 Lv2, 34% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/72412

## 문제 내용 설명

-   지원자들의 지원 조건을 선택하면 해당 조건에 맞는 지원자가 몇 명인지 반환
-   지원 조건: (코딩테스트 참여 개발언어 3종, 지원 직군 2종, 지원 경력구분 2종, 선호하는 소울푸드 2종), 코딩 테스트 점수
-   지원 조건은 and 이며, 일부 조건은 요구 값이 없을 수 있다.
-   코딩 테스트 언어: cpp, java, python
-   지원 직군: backend, frontend
-   지원 경력 구분: junior, senior
-   선호하는 소울푸드: chicken, pizza
-   1 <= 코딩 테스트 점수 <= 100,000

### 문제 핵심 내용 요약

-   입력 값: `"java and backend and junior and pizza 100"`와 같은 지원 조건을 표현하는 문자열의 배열 (1 <= 길이 <= 100,000)
-   출력 값: 각 지원 조건을 만족하는 지원자 수의 배열

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   정답으로 꼽을 만한 풀이가 떠오르지는 않는다.
-   각 쿼리에 대해 전체 지원자를 순회하면 단순 반복으로 질의를 해결할 수 있다.
-   이 경우의 시간 복잡도는 O(N\*M) 이다. N=질의수=10만, M=지원자수=5만이므로 50억 정도.

-   일반적인 문제는 1억을 초과하지 않으므로 단순 반복보다 나은 방법이 필요하다.
    -   우선 질의 개수, 지원자 수가 10만, 5만이나 되는 만큼 숫자가 클 때도 효율이 유지되는 알고리즘이 필요할 것 같다.
        -   O(N \* M)보다는 작아야 한다. O(N \* log N)만 되어도 매우 효율적일 것이다.
        -   log2(10만) = 17 정도이다. (2^10=1,024 \* 2^7=128), log2(5만)= 16 정도
        -   O(N \* log N) = 10만 \* 17 = 170만 정도이다.

#### 1-1 [접근 1]

-   내가 알고 있는 빠른 알고리즘은 정렬+이진 탐색, DP 정도이다.
-   이진탐색을 사용한다면 정렬이 필요하다.
    -   지원자 배열을 정렬한다.
    -   단순히 코테 점수로만 정렬한다면
        -   특정 점수의 최초 원소를 찾는다.
        -   해당 원소 이후의 원소에 대해 (언어, 직군, 경력, 소울푸드) 조건을 만족하는 지원자를 필터링한다.
        -   이렇게 했을 때의 시간 복잡도 = ?
        -   만약 코테 점수가 0점 이상이라면 O(M)이 된다. 흠...
            -   전체를 다 정렬한다면 더 빠르게 찾을 수 있을까?
            -   각 항목별로 점수를 매겨서 탐색할 수도 있겠다는 생각이 든다.
    -   (코테 점수, 코테언어, 직군, 경력, 소울푸드) 순으로 정렬해둔다면
        -   이를 만족하는 최초의 요소로 이동한다.
        -   이후 (코테 언어, 직군, 경력, 소울푸드)를 만족하지 않을 때까지 개수를 센다?
        -   코테 점수로 정렬한다면, 코테언어, 직군, 경력, 소울푸드 순으로는 불가능함..
    -   이렇게 멀티 컬럼으로는 정렬이 의미가 없다.
        -   (Wow), 결국 정렬은 코테 점수 순으로밖에 할 수 없기 때문에,
        -   (코테 언어, 직군, 경력, 소울푸드)의 모든 경우의 수에 대해 배열을 분리한다.
            -   전체 조합의 수 = 3*2*2\*2=24
            -   시간 복잡도 = O(쿼리 개수 10만 \* 지원자 조합의 개수 24 \* 코테점수순 이진탐색 16) = 3,840만 정도로 해결할 수 있다.

### 2. 수도 코드

1. 지원자 배열을 순회하면서 파싱하고, 각 조건(언어, 포지션, 경력, 소울 푸드) 별 배열로 분리한다 - O(M) = 5만
2. 각 지원자 배열을 정렬한다 - O(M log M \* 조건 조합 가짓수) = 5만 \* 16 \* 24 = 192만
3. 각 질의 배열에 대해 이진 탐색을 수행한다. 만약 특정 조건이 빈 경우, 포함된 모든 조건을 검색한다. - O(N _ log M _ 조건 조합 가짓수) = 10만 \* 16 \* 24 = O(3,840만)
4. (3)에서 코테 점수를 만족하는 첫 원소로 이동한 후, 전체 길이에서 해당 원소의 index를 빼면 해당 조건을 만족하는 지원자 수가 된다. 이를 모두 더하고 반환한다.

### 3. 사용 단위 알고리즘 종류

-   정렬, 이진 탐색

### 4. 사용 단위 알고리즘 구현

-   정렬: 언어 내장 정렬 함수 사용

-   이진 탐색:
    -   어떻게 작성해야 할까?
    -   우선 일치하는 경우를 이진 탐색하는 함수를 작성한다.

예시 TC 1

```text
applicants [1,2,2,3,3,4,5,6,7,8] 일 때, 질의 점수가 3이라면?
- 길이=10, start=0, end=9, mid=4
- mid=4, applicants[4]=3, 값을 찾았고, mid를 포함해 더 작은 값을 탐색하게 한다.
- (0,4) -> mid=2, applicants[2]=2, 타겟보다 작으므로, mid를 포함하지 않고 더 큰 구간으로 이동한다.
- (3,4) -> mid=3, applicants[3]=3, 값을 찾았고, mid를 포함해 더 작은 값을 탐색하게 한다.
- (3,3) -> mid=3, applicants[3]=3 값을 찾았고, 3중 제일 앞일 수밖에 없다.
```

-   전개해보니, 작은/큰 구간 여부가 중요한 게 아니라, 타겟 조우 여부가 중요한 것 같다.
-   타겟의 중복 원소의 맨 앞으로 가려면 작은 구간으로 갈 때도 mid를 포함시키고,
-   타겟보다 큰 값 중 최솟값의 맨 앞을 구할 때는, 해당 값이 바로 그 값일지도 모르기 때문에 mid를 포함해야 한다.
    -   즉 타겟보다 큰 곳을 이동할 때는 mid를 포함해야 한다? 맞음. 이 때는 end는 mid-1을 해줘야 함.

예시 TC 2

```text
applicants [0,1,2,6,8,11,31,34,62,77] 일 때, 질의 점수 = 30
- 길이=10, start=0, end=9
- mid=4, applicants[4]=8, 값이 더 작으므로 큰 쪽으로 탐색한다. 이 때는 mid를 포함하지 않는다.
- (5,9) -> mid=7, applicants[7]=34, 값이 더 크므로 작은 쪽으로 탐색한다. 34가 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,7) -> mid=6, applicants[6]=31, 값이 더 크므로 작은 쪽으로 탐색한다. 31이 30보다 큰 최솟값일 수도 있으므로 mid를 포함한다.
- (5,6) -> mid=5, applicants[5]=11, 11은 30보다 작으므로, mid를 포함시키지 않고 위로 탐색한다.
- (6,6) -> mid=6, applicants[6]=31, 정상적으로 찾았다.
```

예시 TC 3

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

### 5. 단위 알고리즘 활용 코드

1. 지원자 배열을 순회하면서 파싱하고, 각 조건 별 배열로 분리한다 - O(M) = 5만
2. 각 지원자 배열을 정렬한다 - O(M log M \* 조건 조합 가짓수) = 5만 \* 16 \* 24 = 192만
3. 각 질의 배열에 대해 이진 탐색을 수행한다. 만약 특정 조건이 빈 경우, 포함된 모든 조건을 검색한다. - O(N _ log M _ 조건 조합 가짓수) = 10만 \* 16 \* 24 = O(3,840만)
4. (3)에서 코테 점수를 만족하는 첫 원소로 이동한 후, 전체 길이에서 해당 원소의 index를 빼면 해당 조건을 만족하는 지원자 수가 된다. 이를 모두 더하고 반환한다.

(이후 리뷰에서 변경)

1. 지원자 배열을 순회하면서 각 조건(언어, 포지션, 경력, 소울푸드)에 해당하는 버킷 별로 점수를 넣는다.
    - (ex)
        ```js
        // input: `java backend junior pizza 150`
        lang["java"].push(150);
        position["backend"].push(150);
        experience["junior"].push(150);
        food["pizza"].push(150);
        ```
2. (1)이 끝난 경우, 각 배열을 오름차순 정렬한다.
3. 각 질의에 대한 답은 아래의 코드로 구할 수 있다.
    - `-` 값이 아닌 경우
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
    - `-` 값인 있는 경우
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
    - 항상 filter를 하되, `-` 값인 경우에는 filter에서 항상 true를 반환케 하면 로직을 단일화할 수 있을 듯하다.
    - 특정 값으로 식별하면 확장성이 떨어지므로, 해당 값을 직접 사용하지 않도록 하면 좋겠다.

#### 5-1. (1) 수행

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

#### 5-2. (2) 수행

```js
const initializeApplicants = () => {
    applicants.forEach((applicant) => {
        const { languageType, positionType, experienceType, score } =
            parseApplicant(applicant);

        if (!language[languageType]) {
            language[languageType] = [];
        }
        if (!position[positionType]) {
            position[positionType] = [];
        }
        if (!experience[experienceType]) {
            experience[experienceType] = [];
        }

        language[languageType].push(score);
        position[positionType].push(score);
        experience[experienceType].push(score);
    });

    Object.keys(language).forEach((languageType) => {
        language[languageType].sort();
    });
    Object.keys(position).forEach((positionType) => {
        position[positionType].sort();
    });
    Object.keys(experience).forEach((experienceType) => {
        experience[experienceType].sort();
    });
};
```

#### 5-2. (3), (4) 수행

```js
const getAnswers = () => {
    return queries.map((query) => {
        const { languageType, positionType, experienceType, score } =
            parseQuery(query);

        const languageMax = Object.keys(language)
            .filter((lang) =>
                languageType === "-" ? true : lang === languageType
            )
            .reduce(
                (prevMax, languageType) =>
                    Math.max(
                        prevMax,
                        findFirstGte(
                            lang[languageType],
                            150,
                            0,
                            lang[languageType].length - 1
                        )
                    ),
                0
            );

        const positionMax = Object.keys(position)
            .filter((lang) =>
                positionType === "-" ? true : position === positionType
            )
            .reduce(
                (prevMax, positionType) =>
                    Math.max(
                        prevMax,
                        findFirstGte(
                            position[positionType],
                            150,
                            0,
                            position[positionType].length - 1
                        )
                    ),
                0
            );

        const experienceMax = Object.keys(experience)
            .filter((experience) =>
                experienceType === "-" ? true : experience === experienceType
            )
            .reduce(
                (prevMax, experienceType) =>
                    Math.max(
                        prevMax,
                        findFirstGte(
                            experience[experienceType],
                            150,
                            0,
                            experience[experienceType].length - 1
                        )
                    ),
                0
            );

        // TODO: global object에 langauge, position, experience도 담아서 조회하면 될 듯?
        // field와 fieldType? type과 filterValue?
        return Math.min(languageMax, positionMax, experienceMax);
    });
};
```

#### 5-2. (4) 수행

```js
const solution = (applicants, queries) => {
    initializeApplicants();
    return getAnswers();
};
```

#### 5-3. 완성 코드

```js
const solution = (applicants, queries) => {
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

    // TODO: 복수형으로 네이밍하기
    const languages = {};
    const positions = {};
    const experiences = {};
    const foods = {};

    const initializeApplicants = () => {
        applicants.forEach((applicant) => {
            const {
                languageType,
                positionType,
                experienceType,
                foodType,
                score,
            } = parseApplicant(applicant);

            if (!languages[languageType]) {
                languages[languageType] = [];
            }
            if (!positions[positionType]) {
                positions[positionType] = [];
            }
            if (!experiences[experienceType]) {
                experiences[experienceType] = [];
            }
            if (!foods[foodType]) {
                foods[foodType] = [];
            }

            languages[languageType].push(score);
            positions[positionType].push(score);
            experiences[experienceType].push(score);
            foods[foodType].push(score);
        });

        Object.keys(languages).forEach((languageType) => {
            languages[languageType].sort((a, b) => a - b);
        });
        Object.keys(positions).forEach((positionType) => {
            positions[positionType].sort((a, b) => a - b);
        });
        Object.keys(experiences).forEach((experienceType) => {
            experiences[experienceType].sort((a, b) => a - b);
        });
        Object.keys(foods).forEach((foodType) => {
            foods[foodType].sort((a, b) => a - b);
        });

        console.log(languages, positions, experiences, foods);
        console.log("---SORTED---");
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

            const languageMax = Object.keys(languages)
                .filter((lang) =>
                    languageType === "-" ? true : lang === languageType
                )
                .reduce(
                    (prevMax, languageType) =>
                        Math.max(
                            prevMax,
                            findFirstGte(
                                languages[languageType],
                                150,
                                0,
                                languages[languageType].length - 1
                            )
                        ),
                    0
                );

            const positionMax = Object.keys(positions)
                .filter((position) =>
                    positionType === "-" ? true : position === positionType
                )
                .reduce(
                    (prevMax, positionType) =>
                        Math.max(
                            prevMax,
                            findFirstGte(
                                positions[positionType],
                                150,
                                0,
                                positions[positionType].length - 1
                            )
                        ),
                    0
                );

            const experienceMax = Object.keys(experiences)
                .filter((experience) =>
                    experienceType === "-"
                        ? true
                        : experience === experienceType
                )
                .reduce(
                    (prevMax, experienceType) =>
                        Math.max(
                            prevMax,
                            findFirstGte(
                                experiences[experienceType],
                                150,
                                0,
                                experiences[experienceType].length - 1
                            )
                        ),
                    0
                );

            const foodMax = Object.keys(foods)
                .filter((food) => (foodType === "-" ? true : food === foodType))
                .reduce(
                    (prevMax, foodType) =>
                        Math.max(
                            prevMax,
                            findFirstGte(
                                foods[foodType],
                                150,
                                0,
                                foods[foodType].length - 1
                            )
                        ),
                    0
                );

            console.log(
                query,
                languageMax,
                positionMax,
                experienceMax,
                foodMax
            );

            // TODO: global object에 langauge, position, experience도 담아서 조회하면 될 듯?
            // field와 fieldType? type과 filterValue?
            return Math.min(languageMax, positionMax, experienceMax, foodMax);
        });
    };

    initializeApplicants();

    console.log(languages, positions, experiences, foods);
    return getAnswers();
};
```

이거 각 필드 간에는 max가 아니라 sum으로 진행해야 할 것 같다.

-   근거: `-`로 150점 이상을 찾을 때는, 모든 타입 - java, python, cpp - 등을 더해야 함
-   어차피 특정 type하나로 축소되기 때문에 더해도 된다.
-   이것이 `-`가 없는 때의 오답은 설명하지 못한다.

`java and backend and junior and pizza 100`가 실패하는 이유를 모르겠다.

-   java = 80, 150
-   backend = 50, 80, 150, 260
-   junior = 80, 150
-   pizza = 150, 260

-> 1, 2, 1, 0 이 나왔다.
-> 비정상, 정상, 정상, 비정상
-> 흠...?
-> 우선 findFirstGte에서 오류가 있음을 의심할 수밖에 없다.

-   우선 파라미터 호출 시 score=150으로 상수로 호출하는 실수가 있었다...
-

```js
const getAnswers = () => {
    return queries.map((query) => {
        const { languageType, positionType, experienceType, foodType, score } =
            parseQuery(query);

        const languageSum = Object.keys(languages)
            .filter((lang) =>
                languageType === "-" ? true : lang === languageType
            )
            .reduce(
                (prevSum, languageType) =>
                    prevSum +
                    findFirstGte(
                        languages[languageType],
                        score,
                        0,
                        languages[languageType].length - 1
                    ),
                0
            );

        // 중략

        console.log(query, languageSum, positionSum, experienceSum, foodSum);

        // TODO: global object에 langauge, position, experience도 담아서 조회하면 될 듯?
        // field와 fieldType? type과 filterValue?
        return Math.min(languageSum, positionSum, experienceSum, foodSum);
    });
};
```

우선 이진 탐색 로직에 오류가 있었다.

CASE:

```
array: [ 260 ], searchTerm: 300, start=0, end=0
return: 0...?
- 로직 상 요소가 하나이면 start = end가 즉시 발생하고, 곧장 mid = 0을 반환하게 된다.
- 요소가 2개일 때부터는 잘 동작하는 것 같은데... start=0,end=1, mid=0
- (0,0), (1,1)을 각각 방문하게 된다.
```

-   아무 값도 없다면 -1이어야 하는데~ how to 처리? 흠....
-   애초에 이 idx는 개수가 아니었음;;
-   첫 idx이기 때문에, length - idx 하면 된다.

```js
const findFirstGte = (array, searchTerm, start, end) => {
    if (array.length <= 0) {
        return array[0] >= searchTerm ? 0 : array.length;
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

```js
const getAnswers = () => {
    return queries.map((query) => {
        const { languageType, positionType, experienceType, foodType, score } =
            parseQuery(query);

        const languageSum = Object.keys(languages)
            .filter((lang) =>
                languageType === "-" ? true : lang === languageType
            )
            .reduce(
                (prevSum, languageType) => {
                    return prevSum + (languages[languageType].length - findFirstGte(
                        languages[languageType],
                        150,
                        0,
                        languages[languageType].length - 1
                    )),
                },
                0
            );

        // 생략

        console.log(query, languageSum, positionSum, experienceSum, foodSum);

        // TODO: global object에 langauge, position, experience도 담아서 조회하면 될 듯?
        // field와 fieldType? type과 filterValue?
        return Math.min(languageSum, positionSum, experienceSum, foodSum);
    });
};
```

이렇게까지 하니깐 `실행한 결괏값 [1,1,1,2,2,4]이 기댓값 [1,1,1,1,2,4]과 다릅니다.`까지 왔다.

-   TC 4번의 답은 2, 내 코드의 결과는 1이다.
-   내 코드의 계산 값: `- and backend and senior and - 150 4 2 3 4`
-   backend, 150이라는 게 문제인가? No. [ 50, 80, 150, 260 ] 이므로 2가 맞음.
-   senior: [ 50, 150, 210, 260 ] 이므로 3 맞음
-   그럼 `-`이면 4는 당연한 거 같은데.. 아닌가?

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

-   버킷을 나누어 버리면 backend && senior 조건을 만족하는 값을 찾을 수가 있나?

    -   backend 입장에선 junior,senior 구분이 없음
    -   서로의 버킷에선 남의 버킷 조건과 무관함
    -   이것의 최솟값을 찾는다는 발상은 비약이 있었나보다. 찾아보자.
        -   틀렸고, 답을 모르겠다는 기분에 불안하다.. 심호흡하고, 긍정적으로 나를 믿고 해보자 :)
        -

-   흠... 버킷 나누기로는 안 되나?

-   아니면 제일 확실한 것은 모든 종류의 버킷에 넣는 것이다.
-   `- and backend and senior and - 150`이면,
    -   `-,-,-,-`에 넣고
    -   `-,backend,-,-`에 넣고
    -   `-,-,senior,-`에 넣고
    -   로 넣을 수 있다.
-   `java and backend and junior and pizza`이면
    -   `-,-,-,-`
    -   `java,-,-,-`
    -   `-,backend,-,-`
    -   `-,-,junior,-`
    -   `-,-,-,pizza`
    -   으로 넣을 수 있다.
    -   이후 찾을 때는 그대로 해당 버킷 하나만 조회하면 된다.
-   이 방법을 그대로 시도해볼까, 다른 방법을 찾아볼까?
    -   이 방법의 시간 복잡도
        -   버킷 입력 시간이 기존 대비 4배 줄어듬. (기존에는 -인 경우 모든 버킷에 넣었으므로, 최대 24개)
        -   버킷 조회 시간은 기존 대비 24배 줄어듬. (모든 조합 -> 단일 버킷)
    -   안 할 이유가 없다!
-   파싱 후 대상 버킷 결정 알고리즘:
    -   그냥 리니어하게 가도 될 거 같은데
    -   쉬운 방법 고민 즁
    -   문자열 그대로 하기에는 어려움
    -   어차피 파싱은 필요
    -   args1,2,3,4로 하는 게?
    -   key가 4개가 되나?
    -   그냥 join하면 될 듯?
    -   key가 4개인 건 맞음..
    -   global 객체 만들려고 했던 것처럼, (키 배열) => 값 저장 배열 함수가 있어야 할 듯?

```js
const vaultMap: Map<string, number[]> = new Map();

const getVault = (keys: string[]) => {
    const key = keys.join(" ");

    if (!vaultMap.has(key)) {
        vaultMap.set(key, []);
    }

    return vaultMap.get(key, []);
};
```

-   이걸로 충분할 것으로 보임
-   이제 `-`를 파싱하는 게 필요함
-   항상 `-,-,-,-`으로 시작하되, 값이 있는 경우는 해당 필드를 해당 값, - 으로 만들 수 있어야 함
-   어려운데, 재밌음
-   `java,-,-,-`일 때 어떻게 처리해야 할까? (이거 TDD로 해보면 좋을 듯..? 빡구현 문제일수록 분할 정복이 중요할텐데!)
-   결국 배열이 입력이므로, 특정 idx의 값이 `-`가 아니라면 둘 다 만들면 될 듯?
-   그냥 keys를 순회하면서, key를 생성하는데, 특정 idx가 `-`가 아니라면 해당 칸이 특정 값인 경우와 `-`인 경우 둘 다 만들면 될 듯.

```js
// info를 파싱한 결과를 입력 받는다.
// (ex) 입력 ["java", "backend", "-", "-"]
// (ex) 출력 ["- - - -", "java backend - -", "- backend - -", "java - - -"]
const generateBucketKeys = (keys) => {
    const generated = [];

    // 기본 CASE
    generated.push(keys.join(" "));
    generated.push(["-", "-", "-", "-"].join(" "));

    // 각 필드 별 CASE
    // 최대 5개의 key를 생성
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== "-") {
            const toGenerate = ["-", "-", "-", "-"];
            toGenerate.splice(i, 1, keys[i]);
            generated.push(toGenerate.join(" "));
        }
    }

    return generated;
};
```

-   해보니깐, 모든 조합을 만들어야 함...
-   과연 할 수 있을지 모르겠다.
-   이거 이진 탐색 문제 맞음?ㅋㅋㅋ 아놔
-   그냥 분기 엄청 만들면 깔끔하진 않아도 풀 수는 있을 듯? 코드가 전체적으로 엄청 길어지긴 하겠지만...
-   근데 그게 맞는 접근일 듯

```js
const solution = (applicants, queries) => {
    const findFirstGte = (array, searchTerm, start, end) => {
        if (array.length <= 0) {
            return array[0] >= searchTerm ? 0 : array.length;
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

    const valutMap = new Map();

    const getVault = (key) => {
        if (!vaultMap.has(key)) {
            vaultMap.set(key, []);
        }
        return valutMap.get(key);
    };

    /*
    INPUT: ["java","backend","junior","-"]
    OUTPUT: 최대 2^4개 생성 (ON/OFF * 4)
    [
        "- - - -", 
        "java - - -", 
        "- backend - -", 
        "- - junior -", 

        // 3P2가 아니라 3C2인가보네
        // 얘는 순열이 아니다.
        // 각자의 자리에서 on/off만 있기 때문임
        // 참 신기함.
        "java backend - -",
        "- backend junior - ",
        "java - junior -",
        
        "java backend junior -",      
    ]

    [조합 공식 생각해보기]
    - 조합인 이유: 자리를 이동시키지 않기 때문 (이건 문제에서 이미 결정되어 있고, 내 관찰이 중요)
    - 조합 공식: 3C2 = 3P2 / 2! - 즉 기존 자리에서 순서 경우의 수도 제거해야 함 5C5 = 1이겠네? 얍.

    [순열 공식 유도]

    1,2,3,4,5

    5 4 3 2 1
    _ _ _ 

    5P5 = 5!

    5P4 = 5!

    5P3 = 5!/2

    5개를 3칸에 넣어야 되는데, 5개를 5칸에 넣는 것과 좀 다름
    - 뒤의 2칸은 결국 a, b 등이 오는 자리이고, a,b와 b,a만큼 배치될 것이므로, 그만큼 경우의 수가 줄어듬
    - 1칸만 있을 땐 있든 없든 배치는 동일함. 끝자리에 올 경우의 수는 하나 뿐임
    - 2칸이 빈 경우는 2개끼리 서로 위치를 바꿀 수 있음. 경우의 수 = 2
    - 3칸이 빈 경우는 3개끼리~ = 3*2*1 = 6
    - 즉, 순열에서 nPr의 경우, (n-r)개만큼 빈 자리가 생기고, 그 빈 자리에서 위치 바꾸며 경우의 수 생겼을 것들이 사라진 셈이므로 그만큼 전체 경우의 수에서 나눠줘야 함.
    */
    // 키야 이걸 짰다~~!
    // 백트래킹에서 방문할 때 '-' 여부도 결정할 수 있구나?
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

                console.log(`pushing: [${score}] into [${entryKey}]`);
            });
        });

        // 프로그래머스 NodeJS 16 버전의 한계로 entries().forEach 하면 없는 필드라고 나옴
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

            console.log(query, key, vault, peopleCount);

            return peopleCount;
        });
    };

    initializeApplicants();
    return getAnswers();
};
```

-   제출했더니, 정확성 TC를 대부분 틀렸다. 효율성 TC는 타임아웃이 나지 않는 것으로 보아 다행이지만...
-   정확성 TC를 틀린 이유가 뭔지는 모르겠다... :(
-   에궁 다시 문제 읽어봐야지
-   문제 자체는 매우 간단해서, 파싱, key 생성, 이진 탐색에서 문제가 발생했을 거라고 봤고, 이진 탐색부터 확인했다.

```
const array = [1,2,3,4,5,6,7,8,9,10]
findFirstGte(array, 9999, 0, array.length - 1) // 9
```

-   9999의 경우 array에서 이보다 같거나 큰 값이 없기 때문에 9가 나오면 안 되고, 10이 나와야 한다.
-   재귀적으로 쉽게 해결하기는 어렵다고 보여서 단순 분기문으로 해소했다.
-   이것 하나만으로 전체 TC가 통과할 것으로는 생각하지 못했는데, 통과가 됐다.

### 6. 배운 점

-   내가 이진 탐색을 잘못 이해하고 있었던 것 같다.
-   비교를 통해서 그 구간을 정해두는 것이다.
-   즉 그 이하의 구간은 애초에 탐색할 필요가 없다.
-   그만큼 조건이 중요하다. 애초에 방문할 수 없도록 진행되고 있을 수도 있기 때문이다.
-   이거 근데 되게 DB 스럽다 ㅋ 인덱싱하는 거 같음
