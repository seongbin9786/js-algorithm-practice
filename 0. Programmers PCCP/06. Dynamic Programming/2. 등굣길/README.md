# 등굣길

## 문제 개요

-   문제 유형: DP
-   문제 난도: 프로그래머스 Lv3, 59% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42898

## 문제 내용 설명

-   MxN 격자에 물 웅덩이가 배치되어 있을 때, 물 웅덩이를 피해서 아래, 우측 방향으로만 이동했을 때 (1,1)에서 (y=N,x=M)로 가는 최단 경로의 개수를 1,000,000,007로 나눈 나머지를 반환한다.

### 문제 핵심 내용 요약

-   입력 값: 격자의 크기 m, n, 물웅덩이 좌표 (x, y)의 배열
-   출력 값: 물 웅덩이를 피해서 아래, 우측 방향으로만 이동했을 때의 최단 경로의 개수를 1,000,000,007로 나눈 나머지

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   경로의 개수를 웬지 직관적으로 파악할 수 있겠다는 생각이 들었다.
-   출발지 기준으로 왼쪽, 오른쪽하면서 세면 조금 어렵다는 생각이 들었다. (가능은 할 것 같다.)
-   종착지 기준으로 왼쪽에서 온 것 + 오른쪽에서 온 것을 더한다면 재귀의 형태로 풀리겠다는 생각이 들었다 (!)

#### 1-1 [접근 1]

-   웅덩이가 없을 때를 기준으로 한다면, `sum[y][x] = sum[y-1][x] + sum[y][x-1]`로 계산할 수 있다.
-   y>1, x>1 조건일 때만 각각 더해주면 되고, sum 배열이 아닌 함수 형태이면 재귀로 해결할 수 있다.

##### 예시 TC 1

```text
m=4,n=3
    0  1  2  3
0  00 01 02 03
1  10 11 12 13
2  20 21 22 23
```

손으로 해본다면 답은 다음과 같다.

```text
m=4,n=3
    0  1  2  3
0  00 01 01 01
1  01 02 03 04
2  01 03 06 10
```

계산 방법은 아래와 같다.

-   아래는 이해를 위해 BFS 순서로 기록했고, 중복 계산은 생략했다.

```text
23 = 22 + 13
    22 = 21 + 12
    13 = 12 + 03
        21 = 20 + 11
        12 = 11 + 02
        03 = 02 + (-)
            20 = (-) + 10
            11 = 10 + 01
            02 = 01 + (-)
                10 = (-) + 00
                01 = 00 + (-)
```

생략된 내역에 중복된 계산이 많지만, 일단 재귀로 구현한다.

기본 값을 주어야 한다. (0,1) = 1, (1,0) = 1이다.

-   종료 조건은 (0,0) 도달이 아니라, (0,1), (1,0) 도달이어야 한다.

```js
const calculateSumOfShortestPaths = (y, x) => {
    if (y === 1 && x === 0) {
        return 1;
    }
    if (y === 0 && x === 1) {
        return 1;
    }
    if (y === 0) {
        return calculateSumOfShortestPaths(y, x - 1);
    }
    if (x === 0) {
        return calculateSumOfShortestPaths(y - 1, x);
    }
    return (
        calculateSumOfShortestPaths(y - 1, x) +
        calculateSumOfShortestPaths(y, x - 1)
    );
};

function solution(m, n, puddles) {
    return calculateSumOfShortestPaths(n - 1, m - 1);
}
```

#### 1-2 [접근 1] + [memoization]

-   재귀로 호출하는 경우 매번 계산이 중복되게 된다.
-   이 경우 재귀 계산은 최초 방문 시 한 번만 하고, 이미 계산 값이 있는 경우 이를 그대로 사용하면 최적화가 가능하다.

```js
const calculateSumOfShortestPaths = (cache, y, x) => {
    if (y === 1 && x === 0) {
        return 1;
    }
    if (y === 0 && x === 1) {
        return 1;
    }
    if (cache[y][x] >= 0) {
        return cache[y][x];
    }
    if (y === 0) {
        return (cache[y][x] = calculateSumOfShortestPaths(cache, y, x - 1));
    }
    if (x === 0) {
        return (cache[y][x] = calculateSumOfShortestPaths(cache, y - 1, x));
    }
    return (cache[y][x] =
        calculateSumOfShortestPaths(cache, y - 1, x) +
        calculateSumOfShortestPaths(cache, y, x - 1));
};

function solution(m, n, puddles) {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    return calculateSumOfShortestPaths(cache, n - 1, m - 1);
}
```

#### 1-3 [접근 1] + 물 웅덩이 고려 추가

-   물 웅덩이가 있는 경우는, 다음과 같은 결과가 나온다. (XX = 물 웅덩이)

```text
m=4,n=3
    0  1  2  3
0  00 01 01 01
1  01 XX 01 02
2  01 01 02 04
```

-   물 웅덩이가 있는 칸은 값을 0으로 두면 된다.
-   물 웅덩이 배열을 순회하면서, cache 값을 미리 0으로 업데이트해두면 된다.

```js
function solution(m, n, puddles) {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    puddles.forEach(([x, y]) => {
        cache[y - 1][x - 1] = 0;
    });

    return calculateSumOfShortestPaths(cache, n - 1, m - 1);
}
```

### 2. 수도 코드

-   (생략)

### 3. 사용 단위 알고리즘 종류

-   DP

### 4. 사용 단위 알고리즘 구현

-   (생략)

### 5. 단위 알고리즘 활용 코드

#### 5-1. 첫 시도 - 정확성 TC 1개 실패

-   만약 물 웅덩이가 (1,0), (0,1)에 생기는 경우 조건문 순서에 의해 처리될 수 없어서 발생한 것으로 확인했다.

```js
const calculateSumOfShortestPaths = (cache, y, x) => {
    if (y === 1 && x === 0) {
        return 1;
    }
    if (y === 0 && x === 1) {
        return 1;
    }
    if (cache[y][x] >= 0) {
        return cache[y][x];
    }
    // ...
};
```

#### 5-2. 완성 코드

```js
const calculateSumOfShortestPaths = (cache, y, x) => {
    if (cache[y][x] >= 0) {
        return cache[y][x];
    }
    if (y === 1 && x === 0) {
        return 1;
    }
    if (y === 0 && x === 1) {
        return 1;
    }
    if (y === 0) {
        return (cache[y][x] =
            calculateSumOfShortestPaths(cache, y, x - 1) % 1_000_000_007);
    }
    if (x === 0) {
        return (cache[y][x] =
            calculateSumOfShortestPaths(cache, y - 1, x) % 1_000_000_007);
    }
    return (cache[y][x] =
        calculateSumOfShortestPaths(cache, y - 1, x) +
        (calculateSumOfShortestPaths(cache, y, x - 1) % 1_000_000_007));
};

const solution = (m, n, puddles) => {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    puddles.forEach(([x, y]) => {
        cache[y - 1][x - 1] = 0;
    });

    return calculateSumOfShortestPaths(cache, n - 1, m - 1) % 1_000_000_007;
};
```

### 6. 해결한 후 개선

#### 6-1. 조건문을 cache 데이터로 대체

```js
if (y === 1 && x === 0) {
    return 1;
}
if (y === 0 && x === 1) {
    return 1;
}
```

```js
cache[1][0] = 1;
cache[0][1] = 1;
```

#### 6-2. 처음 -> 끝 순서로 계산 (완성)

-   처음에 생각하지 못했지만, 재귀가 아니라 기본 case부터 푸는 것도 좋은 것 같아서 그렇게 풀어보고자 한다.
-   전체 호출 수에서 조금 개선이 있을 것 같다.

```js
const solution = (m, n, puddles) => {
    const cache = [...Array(n)].map(() => Array(m).fill(-1));

    cache[0][0] = 0;
    cache[1][0] = 1;
    cache[0][1] = 1;

    puddles.forEach(([x, y]) => {
        cache[y - 1][x - 1] = 0;
    });

    // 아래, 우측 방향으로만 이동
    // (y,x)에 대해 (y,x-1), (y-1,x)의 값은 항상 존재한다.
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
            if (cache[y][x] >= 0) {
                continue;
            } else if (y === 0) {
                cache[y][x] = cache[y][x - 1] % 1_000_000_007;
            } else if (x === 0) {
                cache[y][x] = cache[y - 1][x] % 1_000_000_007;
            } else {
                cache[y][x] =
                    (cache[y - 1][x] + cache[y][x - 1]) % 1_000_000_007;
            }
        }
    }

    return cache[n - 1][m - 1] % 1_000_000_007;
};
```

### 6. 배운 점

-   속도를 비교해보았다. 재귀 방식은 값은 memo되더라도 memo된 값에 도달하기까지의 호출 횟수가 존재한다.
-   반복문 방식의 반복 횟수가 더 적어서인지 꽤 효율 차이가 났다.

| 방식        | 평균 시간 (ms) | 평균 메모리 (MB) |
| ----------- | -------------- | ---------------- |
| 재귀 방식   | 2.20           | 36.06            |
| 반복문 방식 | 1.18           | 34.02            |

-   평균 시간 감소율: 46.04%
-   평균 메모리 감소율: 5.66%

-   재귀 방식을 Top-down, 반복문 방식을 Bottom-Up이라고 한다.

| 기준        | Top-Down (Memoization)             | Bottom-Up (Tabulation)       |
| ----------- | ---------------------------------- | ---------------------------- |
| 계산 순서   | 큰 문제에서 작은 문제로 해결       | 작은 문제에서 큰 문제로 해결 |
| 구현 방식   | 재귀 호출 사용                     | 반복문 사용                  |
| 메모리 사용 | 재귀 스택 + 메모이제이션 테이블    | 테이블만 사용                |
| 코드 가독성 | 간결하고 직관적                    | 다소 복잡할 수 있음          |
| 성능 (속도) | 재귀 호출로 인해 다소 느릴 수 있음 | 더 빠르고 안정적             |
