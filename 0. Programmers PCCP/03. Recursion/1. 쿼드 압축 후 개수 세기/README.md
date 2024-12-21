# 쿼드 압축 후 개수 세기

## 문제 개요

-   문제 유형: 재귀
-   문제 난도: 프로그래머스 Lv2, 55% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/68936

## 문제 내용 설명

-   2^n \* 2^n 크기의 2차원 배열에서 각 단위 영역의 숫자가 모두 동일한 경우 하나의 숫자로 표현할 수 있다.
-   이를 재귀적으로 표현했을 때, 남는 0과 1의 개수를 반환한다.

### 문제 핵심 내용 요약

-   입력 값: 1,0으로 구성된 2차원 배열 (1 <= length <= 1,024)
-   출력 값: [0의 개수, 1의 개수]

![](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d6900862-8be4-4610-aaef-bc8efd5650cf/ex1.png)

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   전체 영역을 2^n 칸 단위로 쪼개서 재귀적으로 확인한다.

#### 1-1 [접근 1]

-   재귀적인 합산 함수를 작성한다.
-   전체 영역에서 width, height 범위를 2로 나누면서 width=2가 될 때까지 쪼갠다.
-   각 호출은 쪼개진 영역의 합산을 반환한다.
-   영역은 항상 4개로 쪼개진다.
-   쪼개진 영역에서 1, 0을 집계하고, 만약 전체가 동일하다면 1, 0을 하나만 반환하고, 그게 아니라면 각각의 집계 개수를 반환한다.

#### 1-2. [접근 1에 대한 추가 확인]

### 2. 수도 코드

1. const sum = (x1, x2, y1, y2) => [zeros, ones]
2. currSum = sum(x1, (x1 + x2) / 2, y1, y2) + sum((x1 + x2) / 2, x2, y1, y2) + sum(x1, x2, y1, (y1 + y2)) + sum(x1, x2, (y1 + y2), y2)
3. (2)에서는 반환 값이 배열이므로 잘 더해야 한다.
4. x2-x1 === 1 이면 1칸만 남은 것이므로, return [zero, one] 반환
5. sum 반환

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

#### 5-1. 코드 작성

```js
function createCounter(arr) {
    return function count(x1, x2, y1, y2) {
        // 기본 Case
        if (x2 === x1) {
            const value = arr[y1][x1];
            if (value === 0) {
                return [1, 0];
            }
            return [0, 1];
        }

        // 반복 Case
        const midX = Math.floor((x1 + x2) / 2);
        const midY = Math.floor((y1 + y2) / 2);

        const [zerosA, onesA] = count(midX + 1, x2, y1, midY);
        const [zerosB, onesB] = count(x1, midX, y1, midY);
        const [zerosC, onesC] = count(x1, midX, midY + 1, y2);
        const [zerosD, onesD] = count(midX + 1, x2, midY + 1, y2);

        const zeros = zerosA + zerosB + zerosC + zerosD;
        const ones = onesA + onesB + onesC + onesD;

        if (zeros === 0) {
            return [0, 1];
        }
        if (ones === 0) {
            return [1, 0];
        }
        return [zeros, ones];
    };
}

const solution = (arr) => {
    const SIZE = arr.length;
    const count = createCounter(arr);
    return count(0, SIZE - 1, 0, SIZE - 1);
};
```

-   제출했더니, `RangeError: Maximum call stack size exceeded`가 발생했다.
-   좌표 계산을 잘못 했다. (mid 좌표와 끝 좌표)
    -   정확한 좌표 계산을 위해서 예시 케이스 몇 개는 직접 돌려보고 제출하는 게 좋겠다.

```
  0 1
0 b a
1 c d

(y, x) 기준이긴 함
a 0,0,1,1
b 0,0,0,0
c 1,1,0,0
d 1,1,1,1

```

#### 5-3. 완성 코드

```js
function createCounter(arr) {
    return function count(x1, x2, y1, y2) {
        // 기본 Case
        if (x2 === x1) {
            const value = arr[y1][x1];
            if (value === 0) {
                return [1, 0];
            }
            return [0, 1];
        }

        // 반복 Case
        const midX = Math.floor((x1 + x2) / 2);
        const midY = Math.floor((y1 + y2) / 2);

        const [zerosA, onesA] = count(midX + 1, x2, y1, midY);
        const [zerosB, onesB] = count(x1, midX, y1, midY);
        const [zerosC, onesC] = count(x1, midX, midY + 1, y2);
        const [zerosD, onesD] = count(midX + 1, x2, midY + 1, y2);

        const zeros = zerosA + zerosB + zerosC + zerosD;
        const ones = onesA + onesB + onesC + onesD;

        if (zeros === 0) {
            return [0, 1];
        }
        if (ones === 0) {
            return [1, 0];
        }
        return [zeros, ones];
    };
}

const solution = (arr) => {
    const SIZE = arr.length;
    const count = createCounter(arr);
    return count(0, SIZE - 1, 0, SIZE - 1);
};
```
