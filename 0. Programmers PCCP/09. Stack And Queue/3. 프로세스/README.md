# 프로세스

## 문제 개요

-   문제 유형: 큐
-   문제 난도: 프로그래머스 Lv2, 64% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42587

### 문제 핵심 요약

-   큐의 요소 중 가장 우선 순위가 높은 요소가 dequeue될 때까지 큐를 순회 (순환 큐)
-   우선 순위 배열이 주어졌을 때 특정 순번의 요소가 몇 번째로 dequeue되는지 반환

### 문제 입출력

-   입력 값: 우선 순위의 배열, 특정 순번
-   출력 값: 특정 순번의 dequeue 순서

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 단순 시뮬레이션

-   큐의 동작을 시뮬레이션하면 충분
-   enqueue, dequeue를 실제로 하지 않는 것으로 성능 개선 (0을 flag로 사용)

### 2. 수도 코드

1. priorities 배열을 순회하며 조회
2. 값이 0인 경우 생략
3. 0이 아닌 경우, 배열의 전체 중 max 값인지 확인
4. max 값이라면 0으로 덮어쓰고 order++
5. location번째였던 경우, order 반환

### 3. 사용 단위 알고리즘 종류

-   큐

### 4. 사용 단위 알고리즘 구현

-   (JS 내장 배열 사용)

### 5. 단위 알고리즘 활용 코드

#### 5-1. 완성 코드

```js
const solution = (priorities, location) => {
    let order = 0;
    let nextIdx = 0;
    while (true) {
        const idx = nextIdx % priorities.length;
        const currentValue = priorities[idx];
        nextIdx++;
        if (priorities[idx] === 0) {
            continue;
        }
        const maxValue = priorities.reduce((a, b) => Math.max(a, b), 0);
        if (currentValue === maxValue) {
            priorities[idx] = 0;
            order++;

            if (idx === location) {
                return order;
            }
        }
    }
};
```

##### [TC 1]

```
priorities = [2, 1, 3, 2]
location = 2
order = 1

iter    order   nextIdx currentValue    maxValue    array
0       0       0       2               3           [2,1,3,2]
1       0       1       1               3           [2,1,3,2]
2       1       2       3               3           [2,1,0,2]


priorities = [1, 1, 9, 1, 1, 1]
location = 0
order =

iter    order   nextIdx currentValue    maxValue    array
0       0       0       1               9           [1,1,9,1,1,1]
1       0       1       1               9           [1,1,9,1,1,1]
2       1       2       9               9           [1,1,0,1,1,1]
3       2       3       1               1           [1,1,0,0,1,1]
4       3       4       1               1           [1,1,0,0,0,1]
5       4       5       1               1           [1,1,0,0,0,0]
6       5       0       1               1           [0,1,0,0,0,0]


```

### 6. 배운 점

-   `nextIdx++` 조건을 하나 놓쳐서 무한루프가 발생했는데, 깨닫기까지 조금 오래 걸렸다.
    -   머리로 코드를 돌려볼 때 짐작하지 않고 코드 한 줄 한 줄을 다 직접 실행해봐야 할 것 같다.
    -   꼭 암산이 아니라 간단하게 표로 그려봐도 좋을 것 같다
