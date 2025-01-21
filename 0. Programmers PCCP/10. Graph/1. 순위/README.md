# 순위

## 문제 개요

-   문제 유형: 그래프 (플로이드-와샬 ?)
-   문제 난도: 프로그래머스 Lv3, 42% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/49191

### 문제 핵심 요약

-   n명 간의 1:1 매치로 순위를 결정
-   선수의 실력은 이미 절대값으로 평가되어 있는 상황
-   일부 경기 결과 없이도 순위 결정 필요

### 문제 입출력

-   입력 값: 선수 명수 n (1 <= n <= 100), 경기 결과 ([a,b]의 배열, a가 b를 이겼다는 기록)
-   출력 값: 순위를 결정할 수 있는 선수들의 명수

## 문제 해설

-   간략한 접근법
-   접근법 선정 및 해결책
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 간략한 접근법

#### 1-1 [접근 1] 상대적인 순위 파악이 가능해야 한다는 점을 활용

-   순위를 결정하는 가장 간단한 방법은 관계의 유무를 나머지 모든 선수에 대해 확인하는 것이다.
    -   선수가 100명이니, 100\*100으로 10,000칸의 격자를 만들고, 승/패 여부를 저장하면 된다.
-   관계만 전부 존재한다면 순위를 결정할 수 있다.
    -   내가 이긴 사람 명수 순으로 내림차순 정렬하면 된다.
-   관건:
    -   (a,b) 승패를 어떻게 전체 선수들에게 전파할 수 있을까?
    -   이를 어떻게 빠르게 갱신, 조회할 수 있을까?

#### 1-2 [접근 2] 더 쉬운 방법이 있을까?

-   (막연한 생각)일종의 전체에 연결됨 여부만으로도 판정할 수도 있을까?
    -   간단히 시도해봤는데, 승패를 전파하는 방법 밖에 없다.

##### 예시 TC 1

```text
n=5
(4,3), (4,2), (3,2), (1,2), (2,5) 일 때,

1: 2승 0패
2: 1승 3패 (4등)
3: 2승 1패
4: 3승 0패
5: 0승 4패 (5등)
```

-   간접적인 순위가 전파되어야 계산할 수 있다.

##### 예시 TC 2

-   승패의 관계는 즉시 계산될 수 없을 수도 있다.

```
n=4
(1,2), (3,4), (2,3)  일 때,
```

-   (1,2), (3,4)는 별도로 존재하고, (2,3)을 처리할 때 기존 연결을 처리해주어야 한다.

#### 1-3 [해결책 1] 승패 전파하기

-   (a,b)를 처리할 때, a가 패배했던 모든 상대들, b가 승리했던 모든 상대들을 조회한다. (각 100개, 총 200개)
-   이를 승패 배열인 4,500개에 대해 수행한다. (4,500 \* 200 = 200,000)

### 2. 수도 코드

1. n\*n 배열을 준비한다.
    - `arr[a][b] = boolean | undefined`
    - a가 b를 이겼는지의 여부를 표현한다.
2. 승패 배열을 순회한다.
    - a가 패배했던 모든 상대들을 순회하며, 그들이 b도 이겼음을 전파한다.
        - (a,b)에 대해 arr[x][a]를 순회하면서 arr[x][b] = true, arr[b][x] = false를 저장
    - b가 승리했던 모든 상대들을 순회하며, 그들이 a에게도 졌음을 전파한다.
        - (a,b)에 대해 arr[b][x]를 순회하면서 arr[a][x] = true, arr[x][a] = false를 저장
3. 승패 배열 순회가 끝나면, arr를 순회하며, 모든 값이 undefined가 아닌 요소의 개수를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   (없음)

### 4. 사용 단위 알고리즘 구현

-   (없음)

### 5. 단위 알고리즘 활용 코드

-   (없음)

#### 5-1. 시도 1

```js
const solution = (n, results) => {
    const win = [...Array(n)].map(() => Array(n).fill(undefined));

    results.forEach(([rawA, rawB]) => {
        // 1-indexed -> 0-indexed
        const a = rawA - 1;
        const b = rawB - 1;

        win[a][b] = true;
        win[b][a] = false;

        for (let x = 0; x < n; x++) {
            // a가 패배했던 상대들을 순회
            if (win[x][a]) {
                // a를 이긴 x에 대해, x도 b를 이긴 것으로 전파
                win[x][b] = true;
                win[b][x] = false;
            }
        }

        // b가 승리했던 상대들을 순회
        for (let x = 0; x < n; x++) {
            // b가 승리했던 상대들을 순회
            if (win[b][x]) {
                // b가 이긴 x에 대해, a도 x를 이긴 것으로 전파
                win[x][a] = false;
                win[a][x] = true;
            }
        }
    });

    // 오직 arr[x][x]만 undefined인 칸이면 순위가 결정된 상태
    return win.filter(
        (row) => row.filter((cell) => cell === undefined).length === 1
    ).length;
};
```

##### 5-1-1. 검산 1

```
n=5
results=[[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]

win=[
    [undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined],
    [undefined,undefined,undefined,undefined,undefined],
]

results.forEach
    [4,3]
        for(x=0,1,2,3,4)
            if (win[x][3]) {
                // 없음
            }
        for(x=0,1,2,3,4)
            if (win[2][x]) {
                // 없음
            }
        win[3][2] = true
        win[2][3] = false

    [4,2]
        for(x=0,1,2,3,4)
            if (win[x][3]) {
                // 없음
            }
        for(x=0,1,2,3,4)
            if (win[1][x]) {
                // 없음
            }

    [3,2]
        for(x=0,1,2,3,4)
            if (win[x][2]) {
                win[3][2] = true이므로,
                win[3][1] = true
                win[1][3] = false
            }
        for(x=0,1,2,3,4)
            if (win[1][x]) {
                // 없음
            }
```

-   이후의 검산은 생략했다.

##### 5-1-2. 실행 결과

-   기본 체점 TC는 모두 통과
-   정확성 TC 10개 중 6개 통과, 4개 실패

##### 5-1-3. 오류 파악

-   이유를 파악해봐야 하는데, 바로 떠오르는 것은 없다.
-   예외 Case 시도
    -   n=1,2일 때
    -   n=5,results=[]일 때
-   문제 해결 로직에 문제가 있는 듯하다.
    -   단순 전파로는 해결할 수 없을 수도 있겠다.

#### 5-2. 시도 2 승/패 전파 누락 개선

-   부족한 논리 확인
    -   여러 번의 고민 끝에, winner, loser의 전파가 충분하지 않음을 발견하게 됨
    -   AS-IS:
        -   for all 승자에게 이긴 자 x: (x, 패자) 추가
        -   for all 패자에게 진 자 x: (승자, x) 추가
    -   TO-BE
        -   for all 승자에게 이긴 자 x:
            -   for all 패자에게 진 자 y:
                -   (x, y) 추가

```js
const solution = (n, results) => {
    const win = [...Array(n)].map(() => Array(n).fill(undefined));

    results.forEach(([rawA, rawB]) => {
        // 1-indexed -> 0-indexed
        const a = rawA - 1;
        const b = rawB - 1;

        const nestedWinners = [a];
        const nestedLosers = [b];

        // 먼저 수집을 해야 한 번에 순회가 가능함
        for (let x = 0; x < n; x++) {
            // 승자에게 이긴 자들을 모집
            if (win[x][a]) {
                nestedWinners.push(x);
            }
            // 패자에게 진 자들을 모집
            if (win[b][x]) {
                nestedLosers.push(x);
            }
        }

        nestedWinners.forEach((winner) => {
            nestedLosers.forEach((loser) => {
                win[loser][winner] = false;
                win[winner][loser] = true;
            });
        });
    });

    // 오직 arr[x][x]만 undefined인 칸이면 순위가 결정된 상태
    return win.filter(
        (row) => row.filter((cell) => cell === undefined).length === 1
    ).length;
};
```

### 6. 배운 점

-   검산 과정이 매우 도움이 되었다.
    -   `win[a][b] = true; win[b][a] = false;`를 빼먹은 걸 알게 되었다.
    -   win 대신 results를 갱신하고 있다는 것도 알게 되었다.
-   경우의 수를 다 처리했다고 생각했는데, 이것이 아니라는 걸 깨닫는 시간이 길었다.
    -   그래도 풀이하다가 한 번 경우의 수를 나열했었던 기억으로 다시 돌아올 수 있었고 해결할 수 있었다.
-   정상 Case 중 기본 Case보다 아주 조금 더 복잡한 Case를 만들고 실행해보면 틀릴 수 있는 경우를 발견할 수 있다.
    -   물론 이런 Case를 만드는 시간이 오래 걸리겠지만 꼭 해봐야 하는 과정이라는 생각이 든다.
