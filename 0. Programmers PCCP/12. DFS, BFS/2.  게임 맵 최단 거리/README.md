# 게임 맵 최단 거리

## 문제 개요

-   문제 유형: BFS
-   문제 난도: 프로그래머스 Lv2, 62% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/1844

### 문제 핵심 요약

-   길, 벽으로 구성된 n \* m 격자에서 좌상단에서 우하단으로 진행할 때의 최단 거리(이동한 칸의 수)를 반환.
-   도달할 수 없는 경우 -1 반환

### 문제 입출력

-   입력 값: 격자 (0 = 벽, 1 = 길)
-   출력 값: 최단 경로의 길이

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] BFS로 모든 경로를 동시에 진행하고, 가장 먼저 도달한 경우 반환

-   모든 방향으로 이동한다.
-   이미 이동한 곳은 visited로 방문하지 않아야 한다.
-   각 시도마다 visited가 별도로 유지되어야 한다?
    -   visited가 공유되어도 상관이 없나?
        -   최단 거리 구할 때는 중복 방문 시 이미 해당 경로가 최단 경로가 아니므로 의미가 없음.

### 2. 수도 코드

1. BFS를 진행한다.
    - while 루프로 진행한다.
        - 방문할 대상을 Queue에 보관한다.
        - 방문하면 visited = true로 설정한다.
        - (인접 칸, 현재 이동 횟수)를 모두 Queue에 넣는다.
        - 만약 우하단에 도착한 경우 "현재 이동 횟수"를 반환한다.
    - while 루프가 종료된 경우 -1을 반환한다.

### 3. 사용 단위 알고리즘 종류

-   BFS

### 4. 사용 단위 알고리즘 구현 / 완성 코드

```js
const solution = (maps) => {
    const WALL = 0;
    const MAX_Y = maps.length;
    const MAX_X = maps[0].length;

    const isSafeBound = (y, x) => {
        if (y >= MAX_Y || y < 0) {
            return false;
        }
        if (x >= MAX_X || x < 0) {
            return false;
        }
        if (maps[y][x] === WALL) {
            return false;
        }
        return true;
    };

    const visited = [...Array(maps.length)].map(() =>
        Array(maps[0].length).fill(false)
    );

    const queue = [];

    // y,x,moves
    queue.push([0, 0, 1]);

    while (queue.length > 0) {
        const [y, x, moves] = queue.shift();

        if (visited[y][x]) {
            continue;
        }
        visited[y][x] = true;

        if (y === MAX_Y - 1 && x === MAX_X - 1) {
            return moves;
        }

        const nextMoves = [
            [y, x - 1],
            [y - 1, x],
            [y, x + 1],
            [y + 1, x],
        ].filter(([ny, nx]) => isSafeBound(ny, nx) && !visited[ny][nx]);

        nextMoves.forEach(([ny, nx]) => {
            queue.push([ny, nx, moves + 1]);
        });
    }

    return -1;
};
```

### 6. 배운 점

-   예시 코드로 직접 실행을 해보지 않았는데,
    -   코드 실행하고 나서야 실수로 visited 처리를 안 했고, WALL 처리도 안 했음을 알게 되었다.
    -   예시 데이터가 크다보니 직접 검증하기가 좀 오래 걸릴 것 같긴 하다.
-   이 문제가 BFS 구현만 하면 끝나서, visited 처리, WALL 처리를 단위 테스트하는 방법을 고민해봐야겠다.
    -   더 작은 함수로 분리하는 방법 필요
