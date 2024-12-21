# 삼각달팽이

## 문제 개요

-   문제 유형: 배열
-   문제 난도: 프로그래머스 Lv2, 53% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/68645

## 문제 내용 설명

### 문제 핵심 내용 요약

-   입력 값: 정수 n (1 <= n <= 1,000)
-   출력 값: 1차원 배열 (밑변과 높이의 길이가 n인 삼각형으로 시각화했을 때, 대각선으로 숫자가 오름차순 배열되는 형태)

![출처: 프로그래머스 문제 본문](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/e1e53b93-dcdf-446f-b47f-e8ec1292a5e0/examples.png)

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1]

상태: 잘 모르겠다. 일단 해본다.

-   index 패턴이 있을 듯해서 찾아보기
-   [1,2,9,3,10,8,4,5,6,7]
-   ```text
      1
      2 9
      3 10 8
      4 5 6 7
    ```

-   뭔가 1,2,3,4 - 5,6,7 - 9,8 - 10 순으로 이어지는 느낌을 받는다.
-   바로 생각나지 않는다.
-   어떻게 배치할지 간단한 아이디어가 생겼다.
-   2차원 배열에 채워넣고, 1차원 배열로 옮기는 방법이다.
    -   ```text
          1 0 0 0
          2 9 0 0
          3 10 8 0
          4 5 6 7
        ```
    -   n\*n 배열로 만들고, 모두 0으로 채워넣는다.
    -   n개의 숫자를 `c=0`에 채워넣는다. (1 2 3 4)
    -   n-1개의 숫자를 `c=1~n-1, r=n-1`에 채워넣는다. (5 6 7)
    -   n-1개의 숫자를 `c=n-2~1, r=n-2~1`에 채워넣는다. (8 9)

n=5일 때 한 번 해본다면?

```text
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
```

```text
1 0 0 0 0
2 0 0 0 0
3 0 0 0 0
4 0 0 0 0
5 0 0 0 0
```

```text
1 0 0 0 0
2 0 0 0 0
3 0 0 0 0
4 0 0 0 0
5 6 7 8 9
```

```text
01 00 00 00 00
02 12 00 00 00
03 00 11 00 00
04 00 00 10 00
05 06 07 08 09
```

-   한 바퀴를 돌았고, 나머지 바퀴를 시작하는 코드를 작성해야 한다.
-   그냥 index를 감소시켜도 되고, "숫자가 나오기 전까지"로 제한해도 되겠지만, 전자가 반복문 하나로 될 것 같아서 시도해보고자 한다.

```text
01 00 00 00 00
02 12 00 00 00
03 13 11 00 00
04 14 00 10 00
05 06 07 08 09
```

```text
01 00 00 00 00
02 12 00 00 00
03 13 11 00 00
04 14 15 10 00
05 06 07 08 09
```

-   위 배열은 [1,2,12,3,13,11,4,14,15,10,5,6,7,8,9] 가 된다.
-   실제 값이 [1,2,12,3,13,11,4,14,15,10,5,6,7,8,9] 이므로, 일치했다.

#### 1-2. [접근 1에 대한 추가 확인]

```text
01 00 00 00 00
02 12 00 00 00
03 13 11 00 00
04 14 15 10 00
05 06 07 08 09
```

12에 도달한 후

-   13, 14를 채워넣는 조건: `(아래 방향, c=1, r=2~n-2) (c += 1, r1 -= 2, r2 -= 1)`
-   15를 채워넣는 조건: `(우측 방향, c=3, r=n-2~n-2) (c += 2, r -= 1)`
-   아직 정확히 모르겠다.

n=6일 때를 추가로 확인해보면,

```text
01 00 00 00 00 00
02 15 00 00 00 00
03 16 14 00 00 00
04 17 21 13 00 00
05 18 19 20 12 00
06 07 08 09 10 11
```

종료 조건은 어떻게? 개수가 다 채워졌을 때?

-   n=6일 때는 딱 두 바퀴되고 끝났다.
-   잘 모르겠다.
-   혹은 밑으로 가는 길이를 체크할 수도 있겠다.
    -   (1) 6
    -   (2) 3
    -   (3) 0

(발견!)

-   n=6일 때는 6,5,4,3,2,1 이고,
-   n=5일 때는 5,4,3,2,1
-   n=4일 때는 그럼 4,3,2,1 인가? 맞다.

### 2. 수도 코드

1. n \* n 배열을 선언해 모든 원소를 0으로 초기화한다.
2. 거리 변수를 선언해 n으로 초기화한다.
3. 현재값 변수를 선언해 1로 초기화한다.
4. 방향은 아래, 오른쪽, 위쪽대각선을 반복한다.
5. 거리 변수 값이 0이 되기 전까지 각 방향에 대해 거리 변수 값만큼 현재값 변수를 1씩 증가시키며 2차원 배열에 숫자를 채운다.
6. 2차원 배열을 순회하며, 전체 배열을 1차원 배열로 합치되 0은 제외하고, 출력한다.

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

-   활용한 알고리즘이 없어서 전체 구현 코드를 첨부한다.

#### 5-1. (1), (2), (3) 수행

```js
const solution = (n) => {
    const array = [...Array(n)].map(() => Array(n).fill(0));
    let distance = n;
    let currentValue = 1;
};
```

#### 5-2. (4), (5) 추가 수행

```js
const solution = (n) => {
    const array = [...Array(n)].map(() => Array(n).fill(0));
    let distance = n;
    let currentValue = 1;

    let currY = 0;
    let currX = 0;
    while (distance > 0) {
        // 1. 아래
        for (let i = 0; i < distance; i++) {
            array[currY++][currX] = currentValue++;
        }
        distance--;
        currY--; // for문 보정

        currX++; // 우측으로 이동 필요

        // 2. 우측
        for (let i = 0; i < distance; i++) {
            array[currY][currX++] = currentValue++;
        }
        distance--;
        currX--; // for문 보정

        // 위쪽으로 이동 필요
        currX--;
        currY--;

        // 3. 대각선
        for (let i = 0; i < distance; i++) {
            array[currY--][currX--] = currentValue++;
        }
        distance--;
        // for문 보정
        currY++;
        currX++;

        // 아래쪽으로 이동 필요
        currY++;
    }

    return array.flat().filter((v) => v > 0);
};
```

이렇게 작성하니, 오류가 발생했다:

```
/solution.js:17
        array[currY][currX++] = currentValue++;

TypeError: Cannot set properties of undefined (setting '0')
```

원인을 잘 이해할 수 없어서, 로그를 찍어봤다.

```js
if (currY < 0 || currY >= n) {
    console.log("currY Error");
    return;
}
if (currX < 0 || currX >= n) {
    console.log("currX Error");
    return;
}
```

봤더니, ++를 한 마지막에 문제가 발생한 것이다.

범위 관련 문제가 있어서, 해결했다.

#### 5-3. 완성 코드

```js
const solution = (n) => {
    const array = [...Array(n)].map(() => Array(n).fill(0));
    let distance = n;
    let currentValue = 1;

    let currY = 0;
    let currX = 0;
    while (distance > 0) {
        // 1. 아래
        for (let i = 0; i < distance; i++) {
            array[currY++][currX] = currentValue++;
        }
        distance--;
        currY--; // for문 보정

        currX++; // 우측으로 이동 필요

        // 2. 우측
        for (let i = 0; i < distance; i++) {
            array[currY][currX++] = currentValue++;
        }
        distance--;
        currX--; // for문 보정

        // 위쪽으로 이동 필요
        currX--;
        currY--;

        // 3. 대각선
        for (let i = 0; i < distance; i++) {
            array[currY--][currX--] = currentValue++;
        }
        distance--;
        // for문 보정
        currY++;
        currX++;

        // 아래쪽으로 이동 필요
        currY++;
    }

    return array.flat().filter((v) => v > 0);
};
```
