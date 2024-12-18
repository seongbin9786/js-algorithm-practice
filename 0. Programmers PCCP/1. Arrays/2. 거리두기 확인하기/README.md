# 거리두기 확인하기

## 문제 개요

-   문제 유형: 배열
-   문제 난도: 프로그래머스 Lv2, 47% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/81302

## 문제 내용 설명

-   (응시자, 테이블, 파티션)로 구성된 2차원 배열에서 맨해튼 거리가 2 초과인지 확인해 반환
-   단, 맨해튼 거리가 2 이하여도 파티션으로 막혀있다면 허용

### 문제 핵심 내용 요약

-   입력 값: (응시자, 테이블, 파티션)로 구성된 문자열의 배열(5\*5격자)의 배열(길이 = 5), 응시자=P,테이블=O,파티션=X
-   출력 값: 5개의 각 대기실에 대한 거리두기 준수여부(지키는 경우 1, 아닌 경우 0)를 반환

예시 입력

```text
[["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]
```

예시 출력

```text
[1, 0, 1, 1, 1]
```

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1]

-   모르겠다. 일단 예시를 보고 어떻게 확인할지 손으로 진행한다.
-   아래는 거리두기 성공 예시 입력이다.

```text
P O O O P
O X X O X
O P X P X
O O X O X
P O X X P
```

-   완전탐색으로 가능할 것 같다. 각 P에서 다른 P로 접근이 가능했을 때, 거리를 측정하면 된다.
-   이 방법은 조금 모호하고 효율적이지도 않을 것 같다.
-   각 P의 근방을 확인해보는 것으로 충분해보인다.
-   P에서 한 칸 떨어진 칸들에 P가 있을 때, 상대 P와 내 P 사이의 두 칸이 모두 X가 아니라면 거리두기 실패, 아니면 성공으로 보면 된다.
-   각 P는 2차원 배열을 순회하면 중복 없이 방문하게 된다.
-   아니다. 각 P의 주변 칸들을 모두 visited로 설정해두어야 중복 확인하는 것을 방지할 수 있다.

#### 1-2. [접근 1에 대한 추가 확인]

-   P에서 한 칸 떨어진 칸들을 조회할 때 배열에서 유효한 범위만 탐색해야 한다.
-   P좌표를 기준으로 (py+/-0,1, px+/-0,1)인 좌표가 0~4의 범위에 있는지 확인하면 된다.
-   만약 대각선이 아닌 칸이라면 무조건 실패이다.
-   대각선에 해당하는 칸이라면 칸막이를 확인해야 한다.

-   대각선 상의 칸막이 두 칸의 좌표를 확인할 수 있어야 한다.
-   P1과 P2 사이 좌표 케이스는 4가지이다.

```text
P1 00 P2
00 PP 00
P3 00 P4
```

-   코드가 길겠지만, 좌표에 대한 공식을 굳이 찾기보단 각 대각선에 대해 단순히 각 좌표를 체크하면 될 것 같다.
-   P <-> P1 간의 2칸의 좌표 = (Py-1,Px), (Py, Px-1)
-   P <-> P2 간의 2칸의 좌표 = (Py-1,Px), (Py, Px+1)
-   P <-> P3 간의 2칸의 좌표 = (Py+1,Px), (Py, Px-1)
-   P <-> P4 간의 2칸의 좌표 = (Py+1,Px), (Py, Px+1)

### 2. 수도 코드

1. 편의를 위해 문자열의 1차원 배열을 단위 문자의 2차원 배열로 변환한다.
2. visited 2차원 배열을 생성하고 false로 초기화한다.
3. 각 칸에 대해 순회하면서, P인 경우 주변 한 칸을 확인한다. 동서남북 중 P가 있다면 즉시 실패, 없다면 대각선 4칸을 확인한다.
4. 각 칸을 확인할 때는 범위 필터링을 거친다.
5. 대각선 4칸에 대해 체크를 하고, 만약 P이 ㄴ경우 사이 좌표 둘 다가 X가 아니라면 즉시 실패, 없다면 넘어간다.
6. 방문한 모든 칸에 대해 visited=true를 할당하고, 다음 칸으로 이동한다.
7. 다음 칸으로 이동하는 행위는 2차원 배열 for(i) for(j)로 하고, visited=true인 경우 생략한다.
8. (1~7)을 전체 대기실 배열에 대해 수행한 후 결과를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

#### 5-1. (1), (2) 수행

```js
const SIZE = 5;

const solution = (rawPlaces) => {
    const places = rawPlaces.map((place) => place.map((row) => [...row]));
    const visited = [...Array(SIZE)].map(() => Array(SIZE).fill(false));
};
```

#### 5-2. (3), (4), (5), (6), (7), (8) 추가 수행

```js
const SIZE = 5;

const dy = [0, 0, -1, 1];
const dx = [1, -1, 0, 0];

/*
P1 00 P2
00 PP 00
P3 00 P4
*/
const ddy = [-1, -1, 1, 1];
const ddx = [-1, 1, -1, 1];

// 값이 8개 존재 (2개씩 있어서)
const ddxy = [-1, 0, -1, 0, 1, 0, 1, 0];
const ddxx = [0, -1, 0, 1, 0, -1, 0, 1];

const isSafe = (x) => x >= 0 && x < SIZE;

const isSafePos = (y, x) => isSafe(y) && isSafe(x);

const checkPlace = (place) => {
    const visited = [...Array(SIZE)].map(() => Array(SIZE).fill(false));

    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            if (visited[y][x]) {
                continue;
            }

            // 1. 동서남북 확인
            for (let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                if (!isSafePos(ny, nx)) {
                    continue;
                }
                if (place[ny][nx] === "P") {
                    return false;
                }
            }

            // 2. 대각선 확인
            for (let i = 0; i < 4; i++) {
                const ny = y + ddy[i];
                const nx = x + ddx[i];
                if (!isSafePos(ny, nx)) {
                    continue;
                }

                if (place[ny][nx] !== "P") {
                    continue;
                }

                // 각 대각선의 X 체크는 굳이 반복문 사용하지 않음
                const inter1y = y + ddxy[i * 2];
                const inter1x = x + ddxx[i * 2];
                if (place[inter1y][inter1x] !== "X") {
                    return false;
                }
                const inter2y = y + ddxy[i * 2 + 1];
                const inter2x = x + ddxx[i * 2 + 1];
                if (place[inter2y][inter2x] !== "X") {
                    return false;
                }
            }
        }
    }

    return true;
};

const solution = (rawPlaces) => {
    const places = rawPlaces.map((place) => place.map((row) => [...row]));

    return places.map(checkPlace).map((result) => (result ? 1 : 0));
};
```

이렇게 짰더니 틀렸다. `실행한 결괏값 [0,0,0,1,0]이 기댓값 [1,0,1,1,1]과 다릅니다.`라는 오류가 발생했다.

#### 5-3. 디버깅

확인을 위해 로그를 찍어보았다.

```js
console.log("---------");
console.log(`(y, x) = (${y}, ${x})`);
console.log(`동서남북 (ny, nx) = (${ny}, ${nx})`);
console.log(`동서남북 P 발견`);
console.log(`대각선 (ny, nx) = (${ny}, ${nx})`);
console.log(`대각선에서 P 발견 (ny, nx) = (${ny}, ${nx})`);
console.log(
    `사이 좌표에서 X가 아닌 값 발견 (inter1y, inter1x) = (${inter1y}, ${inter1x})`
);
console.log(
    `사이 좌표에서 X가 아닌 값 발견 (inter2y, inter2x) = (${inter2y}, ${inter2x})`
);
```

-   로그만 봐서는 헷갈려서 실제 좌표랑 같이 체크하면서 본다.
-   visited 처리가 되지 않았음을 확인했다. 반영하고 다시 확인한다.

```js
if (visited[y][x]) {
    continue;
}
if (visited[ny][nx]) {
    continue;
}
visited[ny][nx] = true;

if (visited[ny][nx]) {
    continue;
}
visited[ny][nx] = true;
if (visited[inter1y][inter1x]) {
    continue;
}
visited[inter1y][inter1x] = true;
if (visited[inter2y][inter2x]) {
    continue;
}
visited[inter2y][inter2x] = true;
```

```text
- - O O P
- - X O X
O P X P X
O O X O X
P O X X P
```

-   로그를 보다가, P만 체크하는 로직이 없음을 확인해서 P만 체크하는 로직을 빼먹었음을 확인했다.
-   P일 때만 탐색하는 로직을 추가했더니, 예시는 통과했고, 정확성 59.7을 받았다.
-   더 이상 로그의 출력을 받을 수 없기 때문에, 직접 반례를 생각해내야 했다.

-   무슨 반례가 있을지 생각나지 않았다.
-   우선 `visited`를 제거했고, 89.2를 받았다.
-   visited는 무슨 문제가 있었을까?
-   visited로 체크를 해버리면, 이미 방문한 P에 대해서 반대쪽의 범위를 체크할 수 없게 한다.

```text
P1 XX
XX P2
```

-   위처럼 되어 있으면, P2는 visited=true가 되므로, P2의 우측을 체크할 수 없게 된다.

-   그럼 나머지 10.8에 해당하는 case들은 뭐가 있을까?
-   일단 일부 Case를 빼먹는 단순한 실수가 있을지 확인해보았다.
-   일단 좌표는 모두 맞다. SIZE=5도 맞다.
-   대각선 사이 2좌표에 대한 safe 체크는 대각선이 safe하면 된다고 생각했는데, 아닐 수도 있을까? 그럴 수는 없다.
-   뭘 빠트린 걸까? 아무 생각이 나지 않아서, 예전에 내가 쓴 답을 확인했다.
-   답을 확인해도 잘 모르겠다! 어떤 부분을 실수한 것 같은데, 다음에 다시 확인하고자 한다.

#### 5-4. 최종 수도 코드

(TBD)

#### 5-5. 완성 코드

```js
const solution = () => {
    // TBD
};
```
