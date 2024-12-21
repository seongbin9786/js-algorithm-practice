# 피로도 (백트래킹)

## 문제 개요

-   문제 유형: 백트래킹
-   문제 난도: 프로그래머스 Lv2, 65% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/87946

## 문제 내용 설명

-   사용자의 현재 피로도와 각 던전 별로 (요구 피로도, 소모 피로도)가 존재할 때 주어진 던전 목록에 대해 한 번에 탐험할 수 있는 최대 개수를 반환한다.

### 문제 핵심 내용 요약

-   입력 값: 현재 피로도, 던전([요구 피로도, 소모 피로도]) 배열, 던전 개수 <= 8, 요구 피로도 >= 소모 피로도, 1 <= 피로도 <= 1,000, 던전 간 피로도는 동일할 수 있다.
-   출력 값: 탐험할 수 있는 던전 개의 최대값

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   모든 던전의 방문 경로를 생성하고 방문한다.
-   각 방문 시마다 총 방문 개수로 최대값을 갱신한다.

#### 1-1 [접근 1]

-   (위와 동일)

#### 1-2. [접근 1에 대한 추가 확인]

-   없음

### 2. 수도 코드

1. 현재 피로도를 할당한다.
2. 모든 가능한 던전 순열을 만든다.
3. 각 순열을 순회하면서 탐사 가능 횟수를 계산한다.
4. 탐사 가능 횟수의 최댓값을 갱신한다.
5. 탐사 가능 횟수의 최댓값을 반환한다.

### 3. 사용 단위 알고리즘 종류

-   백트래킹

### 4. 사용 단위 알고리즘 구현

```js
const createDungeonPaths = (dungeons) => {
    const allPaths = [];
    const currPath = [];
    const visited = Array(dungeons.length).fill(false);
    const backtrack = (index) => {
        if (index === dungeons.length) {
            allPaths.push([...currPath]);
            return;
        }
        for (let i = 0; i < dungeons.length; i++) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            currPath.push(dungeons[i]);
            backtrack(index + 1);
            currPath.pop();
            visited[i] = false;
        }
    };

    backtrack(0);

    return allPaths;
};
```

### 5. 단위 알고리즘 활용 코드

#### 5-1. 완성 코드

-   첫 시도에 성공했다.

```js
const createDungeonPaths = (dungeons) => {
    const allPaths = [];
    const currPath = [];
    const visited = Array(dungeons.length).fill(false);
    const backtrack = (index) => {
        if (index === dungeons.length) {
            allPaths.push([...currPath]);
            return;
        }
        // forEach로 변경
        dungeons.forEach((dungeon, i) => {
            if (visited[i]) {
                return;
            }
            visited[i] = true;
            currPath.push(dungeon);
            backtrack(index + 1);
            currPath.pop();
            visited[i] = false;
        });
    };

    backtrack(0);

    return allPaths;
};

const solution = (k, dungeons) => {
    const allPaths = createDungeonPaths(dungeons);
    let maxVisits = 0;

    allPaths.forEach((path) => {
        let hp = k;
        let visits = 0;

        // 탈출이 필요하므로 forEach 사용 불가
        for (const [required, price] of path) {
            if (hp < required || hp < price) {
                break;
            }
            hp -= price;
            visits++;
        }

        maxVisits = Math.max(maxVisits, visits);
    });

    return maxVisits;
};
```
