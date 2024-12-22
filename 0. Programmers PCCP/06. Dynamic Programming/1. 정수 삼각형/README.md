# 정수 삼각형

## 문제 개요

-   문제 유형: DP
-   문제 난도: 프로그래머스 Lv3, 62% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/43105

## 문제 내용 설명

-   정삼각형 형태로 배열된 숫자들에 대해 가장 위에서 가장 아래로 이어지는 경로들 중 거쳐간 숫자의 합이 가장 큰 경로의 숫자의 합을 반환

![](https://grepp-programmers.s3.amazonaws.com/files/production/97ec02cc39/296a0863-a418-431d-9e8c-e57f7a9722ac.png)

### 문제 핵심 내용 요약

-   입력 값: 각 층에 위치한 숫자들의 배열을 트리의 레벨 오름차순으로 정렬한 배열 (1 <= 레벨 <= 500, 0 <= 숫자 <= 9,999)
-   출력 값: 경로들 중 거쳐간 숫자의 합이 가장 큰 경로의 숫자의 합

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   모든 경우를 다 해봐야 할 것 같다.
-   당장의 최선의 선택이 전체의 최선이라는 보장이 없다.
-   한 경우만을 실행해볼 수는 없다.
-   마지막 노드에서 매우 큰 수가 등장할 수 있다.

#### 1-1 [접근 1]

-   내려갈 때는 왼쪽, 오른쪽만 선택이 가능하다.
-   첫 숫자는 루트 노드의 숫자가 된다. (레벨1에는 노드가 하나 뿐)

-   모든 경우를 실행해본다면 시간 복잡도가 2^499 이다.
-   마지막 레벨을 제외하면 모든 노드에서 2가지 경우의 수가 존재한다.
-   각 2가지 선택은 직전 경로를 2배씩 늘린다.
-   각 끝 점까지 도달하는 경로의 수가 있다. 그 다음 레벨로의 경로는 2가지가 있으며, 따라서 직전 경로의 수 \* 2씩 된다.
-   (ex) 예제의 3레벨까지 확인해보면 경로의 수 = 4, 4레벨까지 확인해보면 경로의 수 = 8

-   2의 500승은 얼마일까?

    -   2^10 = 1,000 이니까,
    -   2^20 = 100만,
    -   2^40 = 1조,
    -   2^500은 절대 계산할 수 없을 것이다.

-   DP로 해결한다면 이 계산량을 해소할 수 있을까?

    -   memoization이므로 가능할 것이다.

-   memoization을 한다면 시간 복잡도는 얼마나 나올까?

    -   노드 개수 = 대략 12,500개 정도이다.
        -   500층이니까 맨 아래의 숫자가 500개, 즉 500+499+498+...+1 개 만큼 있으므로,
        -   (500 + 1) \* 500 / 2 = 대략 12,500 정도이다.
    -   경로 생성을 위한 이동 횟수 = 각 레벨의 노드 개수 \* 2
        -   (전체 노드 개수 - 마지막 레벨 노드 개수) \* 2 = 24,000 정도이다.
    -   즉 이동할 때만 계산한다면, 총 24,000번 정도 계산하면 끝이다.

-   어떻게 이미 했던 계산을 재활용할 수 있을까?

    -   경로의 합계를 구할 때 반복되는 부분을 memoization으로 풀면 될 것 같다.
    -   문제가 되는 부분
        -   모든 경로를 전부 다 구할 수는 없다. 개수가 너무 많기 때문이다.
        -   경로 단위로 관리하지 않고 합계로 관리할 수는 있을 것 같은데, 방법이 있을까?
            -   (마음이 꺾여버림!)
    -   모든 경로를 구하는 게 아니다.
        -   각 레벨의 끝 노드 입장에서의 max 값만 갖고 있으면 된다.
            -   그리고 그 다음 레벨의 노드로 이동하면서 계산하고, 그 max 값들을 갖고 있으면 된다.

-   풀이를 한다면:
    -   각 노드까지의 합계의 최댓값을 저장하는 배열을 각 노드를 0으로 초기화해서 삼각형 형태로 생성한다.
    -   삼각형에서 탐색을 하면서, 그 합계를 합계 배열에 저장한다.
    -   첫 노드는 이미 방문 상태이고, 합계 배열에도 첫 노드의 값을 그대로 저장한다.
    -   레벨 1에서 레벨2를 방문한다. 첫 노드만이 존재하며, 레벨 2에 방문할 때 본인 + 레벨2의 노드의 값을 합산하여 합계 노드에 저장한다. 이 때 값은 max를 활용해 갱신한다.
    -   이를 반복한 후, 끝 노드를 순회하며 max를 반환하면 된다.

##### 예시 TC 1

시작할 때 아래와 같이 초기화된다.

```text
height = 5
val: [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
sum: [[7], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]]
```

레벨 2를 탐색한다. index 설정은 (본인의 index, 본인의 index+1)이다.

-   레벨2의 타겟 index = 0, 1

```text
height = 5
val: [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
sum: [[7], [10, 15], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]]
```

레벨 3을 탐색한다.

-   3 -> 8, 1
-   8 -> 1, 0
-   3->1 과 8->1이 겹치므로, 그 합계는 max로 갱신하게 된다. (10+1 vs 15+1 이므로 16으로 갱신된다.)

```text
height = 5
val: [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
sum: [[7], [10, 15], [18, 16, 15], [0, 0, 0, 0], [0, 0, 0, 0, 0]]
```

레벨 4를 탐색한다.

-   8 -> 2, 7
-   1 -> 7, 4
-   0 -> 4, 4

```text
height = 5
val: [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
sum: [[7], [10, 15], [18, 16, 15], [20, 25, 20, 19], [0, 0, 0, 0, 0]]
```

레벨 5를 탐색한다.

-   2 -> 4, 5
-   7 -> 5, 2
-   4 -> 2, 6
-   4 -> 6, 5

```text
height = 5
val: [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
sum: [[7], [10, 15], [18, 16, 15], [20, 25, 20, 19], [24, 30, 27, 26, 24]]
```

모든 레벨을 탐색했으므로, height = 5이므로 sum[4]를 탐색하며 max를 반환하면 된다. 30.

##### 예시 TC 2

```text
height = 1
val: [[1]]
sum: [[0]]
```

레벨 1일 때도 잘 동작할까?

-   레벨 2가 없으므로 순회가 없다.
-   height = 1 이므로, sum[0]을 순회하며 max를 반환한다. 1.

### 2. 수도 코드

1. sum 배열을 생성한다.
2. sum[0][0]은 triangle[0][0]의 값으로 초기화한다.
3. [레벨 1, 레벨 끝 - 1]을 순회하면서 그 다음 레벨의 sum 배열에, 직전 sum 배열의 값에 현재 노드의 값을 더해 sum 배열에 max로 갱신한다.
4. 최종 레벨의 배열을 순회하면서 max를 구해 반환한다.

### 3. 사용 단위 알고리즘 종류

-   DP

### 4. 사용 단위 알고리즘 구현

```js
// sum은 이미 초기화되어있다고 가정한다.
const calculateMaxSumOfAllPaths = (triangle, sum) => {
    // 레벨 1 ~ 끝-1 까지 순회
    for (let level = 1; level < triangle.length; level++) {
        const currLevelNodes = triangle[level - 1];
        const nextLevelNodes = triangle[level];

        const currLevelSums = sum[level - 1];
        const nextLevelSums = sum[level];

        // 현재 레벨을 순회하며 다음 레벨의 합계를 계산
        for (let i = 0; i < currLevelNodes.length; i++) {
            const currSum = currLevelSums[i];
            // 왼쪽
            const sum1 = currSum + nextLevelNodes[i];
            nextLevelSums[i] = Math.max(nextLevelSums[i], sum1);

            // 오른쪽
            const sum2 = currSum + nextLevelNodes[i + 1];
            nextLevelSums[i + 1] = Math.max(nextLevelSums[i + 1], sum2);
        }
    }

    return Math.max(...sum[sum.length - 1]);
};
```

### 5. 단위 알고리즘 활용 코드

#### 5-1. 첫 시도 - 효율성 TC 2개 실패

```js
const createSumArray = (length, rootLevelValue) => {
    // fill([])는 동일한 참조의 배열로 채워진다.
    const sum = [...Array(length)].map(() => []);
    for (let level = 1; level <= length; level++) {
        for (let i = 0; i < level; i++) {
            sum[level - 1].push(0);
        }
    }

    sum[0][0] = rootLevelValue;

    return sum;
};

const calculateMaxSumOfAllPaths = (triangle, sum) => {
    // 레벨 1 ~ 끝-1 까지 순회
    for (let level = 1; level < triangle.length; level++) {
        const currLevelNodes = triangle[level - 1];
        const nextLevelNodes = triangle[level];

        const currLevelSums = sum[level - 1];
        const nextLevelSums = sum[level];

        // 현재 레벨을 순회하며 다음 레벨의 합계를 계산
        for (let i = 0; i < currLevelNodes.length; i++) {
            const currSum = currLevelSums[i];
            // 왼쪽
            const sum1 = currSum + nextLevelNodes[i];
            nextLevelSums[i] = Math.max(nextLevelSums[i], sum1);

            // 오른쪽
            const sum2 = currSum + nextLevelNodes[i + 1];
            nextLevelSums[i + 1] = Math.max(nextLevelSums[i + 1], sum2);
        }
    }

    return Math.max(...sum[sum.length - 1]);
};

const solution = (triangle) => {
    const sum = createSumArray(triangle.length);
    const max = calculateMaxSumOfAllPaths(triangle, sum);
    return max;
};
```

> 실패

-   효율성 TC 중 2건이 시간 초과되었다.

#### 5-2. 두 번째 시도 - max 집계 개선

-   왜 효율성 TC를 실패했을까?

    -   0으로 채우는 시간이 오래 걸릴 수도 있다.

        -   안 채우는 방법도 있을까?

            -   triangle 값 자체를 덮어씌울 수는 없다. 겹치는 타 노드에서 필요로 하기 때문이다.

        -   마지막 level 순회 코드를 제외할 수 있다.

            -   별도의 순회 없이 마지막 순회 시 max를 계산하도록 변경했다.
            -   TC 1은 성공했지만 TC 2는 그대로이고, 추가로 TC 4가 실패했다.

```js
const calculateMaxSumOfAllPaths = (triangle, sum) => {
    let lastLevelMax = sum[0][0];

    // 레벨 1 ~ 끝-1 까지 순회
    for (let level = 1; level < triangle.length; level++) {
        const currLevelNodes = triangle[level - 1];
        const nextLevelNodes = triangle[level];

        const currLevelSums = sum[level - 1];
        const nextLevelSums = sum[level];

        // 현재 레벨을 순회하며 다음 레벨의 합계를 계산
        for (let i = 0; i < currLevelNodes.length; i++) {
            const currSum = currLevelSums[i];
            // 왼쪽
            const sum1 = currSum + nextLevelNodes[i];
            nextLevelSums[i] = Math.max(nextLevelSums[i], sum1);

            // 오른쪽
            const sum2 = currSum + nextLevelNodes[i + 1];
            nextLevelSums[i + 1] = Math.max(nextLevelSums[i + 1], sum2);

            if (level === triangle.length - 1) {
                lastLevelMax = Math.max(lastLevelMax, sum1, sum2);
            }
        }
    }

    return lastLevelMax;
};
```

#### 5-3. 세 번째 시도 - sum array 생성 코드 개선

-   0으로 채우지 않고, 배열도 2차원 배열이 아니라 1차원으로 선언할 수 있다.

    -   index를 계산해두면 될 것 같다.
    -   (레벨 - 1) + (인덱스)
    -   visited 수로 할 수도 있을 것 같다.
    -   본인 입장에서 다음 줄의 노드의 index = ?

-   index를 계산하는 방법

    -   생각해내기 어려운 듯하다..!

-   sum array는 그대로 두고, sum array 생성의 순회 횟수를 줄여보기로 했다.
    -   map과 push 대신 fill을 사용하기 때문에 더 성능이 개선될 것으로 기대가 된다 (얼마만큼일지는 모르겠다.)

```js
const createSumArray = (length, rootLevelValue) => {
    // fill([])는 동일한 참조의 배열로 채워진다.
    const sum = [...Array(length)];
    for (let level = 1; level <= length; level++) {
        sum[level - 1] = Array(level).fill(0);
    }

    sum[0][0] = rootLevelValue;

    return sum;
};
```

#### 5-1. 완성 코드

```js
const createSumArray = (length, rootLevelValue) => {
    // fill([])는 동일한 참조의 배열로 채워진다.
    const sum = [...Array(length)];
    for (let level = 1; level <= length; level++) {
        sum[level - 1] = Array(level).fill(0);
    }

    sum[0][0] = rootLevelValue;

    return sum;
};

// sum은 이미 초기화되어있다고 가정한다.
const calculateMaxSumOfAllPaths = (triangle, sum) => {
    let lastLevelMax = sum[0][0];

    // 레벨 1 ~ 끝-1 까지 순회
    for (let level = 1; level < triangle.length; level++) {
        const currLevelNodes = triangle[level - 1];
        const nextLevelNodes = triangle[level];

        const currLevelSums = sum[level - 1];
        const nextLevelSums = sum[level];

        // 현재 레벨을 순회하며 다음 레벨의 합계를 계산
        for (let i = 0; i < currLevelNodes.length; i++) {
            const currSum = currLevelSums[i];
            // 왼쪽
            const sum1 = currSum + nextLevelNodes[i];
            nextLevelSums[i] = Math.max(nextLevelSums[i], sum1);

            // 오른쪽
            const sum2 = currSum + nextLevelNodes[i + 1];
            nextLevelSums[i + 1] = Math.max(nextLevelSums[i + 1], sum2);

            if (level === triangle.length - 1) {
                lastLevelMax = Math.max(lastLevelMax, sum1, sum2);
            }
        }
    }

    return lastLevelMax;
};

const solution = (triangle) => {
    const sum = createSumArray(triangle.length, triangle[0][0]);
    const max = calculateMaxSumOfAllPaths(triangle, sum);
    return max;
};
```

### 6. 배운 점

-   경우의 수가 명확히 계산되지 않으면 case를 직접 세보면 더 잘 이해하게 되고 계산할 수 있게 된다. 용기를 내서 시간을 더 들여야 한다.
-   DP는 최대한 답을 안 보고 직접 생각해내야 하는 것 같다. 그 외에 제대로 습득하는 방법이 있을지 의문이 든다.
-   array.fill이 array.push보다 2배 이상 빠르다. (참고: https://www.measurethat.net/Benchmarks/Show/20869/0/arrayfill-vs-arraypush)

### 7. 궁금한 점

-   이렇게 계산량이 많은 경우는 항상 DP로 풀어야 하는 것일까?

### 8. 참고 자료의 논리 전개로 배운 점

-   시간 복잡도를 고려하지 않고 풀 수 있는 방법으로 우선 풀어보면 좋을 것 같다.
-   이후 시간 복잡도를 고려해 이를 해소할 수 있는 방법을 도입하면 좋을 것 같다.
-   for문도 좋지만 재귀적인 구조를 발견하려는 노력을 해보고, 재귀로 풀면 코드가 더 깔끔하고, memoization 도입이 수월해지는 것 같다.
