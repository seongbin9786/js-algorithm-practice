# 프렌즈4블록

## 문제 개요

-   문제 유형: 구현
-   문제 난도: 프로그래머스 Lv2, 57% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/17679

### 문제 핵심 요약

-   애니팡 블록으로 채워진 m _ n 격자와 2 _ 2 파쇄 규칙이 주어졌을 때, 연쇄 파쇄가 끝난 후의 총 파쇄된 블록의 개수를 반환

### 문제 입출력

-   입력 값: m \* n 격자 (2 <= m,n <= 30)
-   출력 값: 파쇄된 블록의 전체 개수

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 한 칸씩 끌어내리기

-   각 열에서 각 행마다 위에서 끌어올 수 있으면 위에서 끌어오는 방식
    -   `arr[x][0] = find(1, m);` 과 같은 방식
    -   각 열의 행에서 그 위의 행을 모두 순회하므로, O(m^2)이고, 전체 열에서는 O(m^2 \* n) 이다.
    -   굉장히 느려보이지만 실제로 최악의 경우를 계산해보면,
        -   m,n=30이고, 2\*2블록만 제거됐을 때 최대 225번 일어나게 된다(900/4).
        -   총 횟수는 6,075,000회로 충분하다.

### 2. 수도 코드

1. 전체를 순회하며 2\*2이면 모두 제거한다.
2. 파쇄된 블록 위의 블록을 아래로 끌어내린다.
3. (1), (2)를 반복하며, 파쇄된 블록이 없을 때 종료한다.

### 3. 코드

#### 3-1. 시도 1

-   전체를 순회하며 2\*2이면 모두 제거
-   어딘가에서 무한 루프가 발생...
    -   빈 칸 네 개가 동일할 때에도 무한 루프가 발생

```js
/*
m=4,n=5
[
    "CCBDE",
    "AAADE",
    "AAABF",
    "CCBBF"
]
*/

const solution = (m, n, rawBoard) => {
    const board = rawBoard.map((boardRow) => [...boardRow]);

    let removedBlocks = 0;

    // (y,x)로 저장
    // 배열로 저장할까 하다가 중복 시 개수 세기가 불가능해서 중복을 제거하는 Set 사용
    const blocksToRemove = new Set();
    do {
        // 1. 제거 단계
        blocksToRemove.clear();

        // 보자마자 지우면 영역이 겹쳤을 때는 지울 수가 없게 된다.
        for (let x = 0; x < n - 1; x++) {
            for (let y = 0; y < m - 1; y++) {
                // 2x2 영역을 확인
                const a = board[y][x];
                const b = board[y + 1][x];
                const c = board[y][x + 1];
                const d = board[y + 1][x + 1];
                if (a === " ") {
                    continue;
                }
                if (a === b && b === c && c === d) {
                    blocksToRemove.add(`${y},${x}`);
                    blocksToRemove.add(`${y + 1},${x}`);
                    blocksToRemove.add(`${y},${x + 1}`);
                    blocksToRemove.add(`${y + 1},${x + 1}`);
                }
            }
        }

        for (const coord of blocksToRemove) {
            const [y, x] = coord.split(",").map(Number);
            board[y][x] = " ";
        }

        // 2. 제거된 블록 개수 정산
        removedBlocks += blocksToRemove.size;

        // 3. 밑으로 끌어내리기
        for (let x = 0; x < n; x++) {
            // y는 밑에서 위로 올라감
            for (let y = m - 1; y > 0; y--) {
                // 맨 윗칸은 밑에서 끌어내려지기만 함. 최상단에서 1칸 밑 칸이 안 비어있다면 최상단 칸은 안 봐도 됨.

                // 이미 채워진 칸인 경우 생략 후 그 윗칸으로 이동
                if (board[y][x] !== " ") {
                    continue;
                }

                // 빈 칸이 아닐 때까지 윗 칸으로 이동
                let ny = y - 1;
                while (ny >= 0 && board[ny][x] === " ") {
                    ny--;
                }

                // 최상단까지 빈 칸인 경우, 현재 열 반복을 중단
                if (ny === -1) {
                    break;
                }

                // 위에서 빈 칸이 아닌 칸을 발견한 경우, 해당 값을 현재 칸으로 끌어내리고, 해당 칸은 빈 값 처리
                board[y][x] = board[ny][x];
                board[ny][x] = " ";
            }
        }
    } while (blocksToRemove.size > 0);

    return removedBlocks;
};
```

#### 3-2. 검산 1 (하지 않음.)

```
[입력]
m=4 (y)
n=5 (x)

['C', 'C', 'B', 'D', 'E']
['A', 'A', 'A', 'D', 'E']
['A', 'A', 'A', 'B', 'F']
['C', 'C', 'B', 'B', 'F']

```

### 6. 배운 점

-   수도 코드 작성 시 예상하지 못한 부분
    -   중복이 발생하는 경우에 어떻게 처리할지 고민하지 않았는데, 이런 부분들을 미리 디테일하게 수도 코드에서 작성해두는 게 좋아보임
    -   인접 네 칸이 다 빈칸이어도 네 칸이 동일하다고 판정, 무한 루프가 발생
-   무한 루프 시에는 일단 첫 루프의 결과를 확인하는 것으로 충분해보임
-   이번 경우는 Test Case가 복잡해서 직접 검산하지 않았는데, 이런 경우는 분할 정복으로 각 단위를 테스트하는 것으로 갈음하는 건 필수로 생각됨.
