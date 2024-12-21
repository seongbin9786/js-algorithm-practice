# 이진 변환 반복하기

## 문제 개요

-   문제 유형: 문자열
-   문제 난도: 프로그래머스 Lv2, 77% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/70129

## 문제 내용 설명

-   문자열에서 모든 0을 제거한 후, 그 길이를 2진수 값으로 변환한다. 그 결과가 "1"이 될 때까지 반복한 횟수와 제거된 0의 총 개수를 반환한다.

### 문제 핵심 내용 요약

-   입력 값: 1,0으로 구성된 임의의 문자열 (1 <= s <= 150,000, s는 1을 최소 하나 포함한다.)
-   출력 값: 이진 변환이 끝났을 때 전체 변환 횟수와 제거된 0의 개수

예시

```
01110 -> 111 (0 제거) -> 11 (길이3)
11 -> 11 (0 제거) -> 10 (길이2)
10 -> 1 (0 제거) -> 1 (길이1)
제거된 0의 개수 = 2 + 1 = 3
```

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   문제에서 시키는대로 진행하면 된다.

#### 1-1 [접근 1]

-   현재 문자열을 변수로 선언하고, 이 문자열이 "1"이 되기 전까지 for문으로 반복한다.
-   반복 횟수는 for문의 index 변수로 계산한다.
-   제거된 0의 개수는 length 간의 차이로 합산한다.

#### 1-2. [접근 1에 대한 추가 확인]

### 2. 수도 코드

1. 현재 문자열 curr를 입력 문자열로 초기화한다.
2. for문으로 loopCount를 0으로 초기화하고, for문의 조건은 curr != '1'로 놓는다.
3. curr를 순회하면서 복사하되, 0일 때는 집계만 하고(removedZeros++), 복사하지 않는다.
4. curr의 길이를 2진수로 표현한 값을 curr로 대입한다.
5. 반복 후 종료되면 [loopCount, removedZeros]를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

#### 5-1. (4)를 제외한 코드

-   for문을 쓰면 종료 시 loopCount를 참조할 수 없어서, while문으로 변경한다.
-   길이만 필요한 거여서, 1일 때의 문자열 복사는 필요가 없다.
-   removedZeros는 2개가 필요하다. loop 별, 전체 합산.

```js
const base10to2 = (base10) => {
    // TODO: implement this
};

const solution = (input) => {
    let curr = input;
    let loopCount = 0,
        removedZerosTotal = 0;
    while (curr !== "1") {
        let removedZeros = 0;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === "0") {
                removedZeros++;
            }
        }
        curr = base10to2(curr.length - removedZeros); // 1만 남은 문자열의 길이 = 기존 길이 - 0의 개수
        removedZerosTotal += removedZeros;
        loopCount++;
    }

    return [loopCount, removedZerosTotal];
};
```

#### 5-1. (4) 코드

-   10진수를 2진수로 변환해야 한다.
-   10을 2진수로 표현한다면?
-   10 = 8*1 + 4*0 + 2*1 + 1*0 = 1010(2)
-   10%2=몫5,나머지0 -> 5%2=몫2,나머지1 -> 2%2 =몫1,나머지0 -> 1%2=몫0,나머지1
-   나머지를 정렬하면 2진수로 변환한 값인 1010이 나온다.

```js
const base10to2 = (base10) => {
    let share = base10;
    const remainders = [];

    while (share > 0) {
        remainders.push(share % 2);
        share = Number.parseInt(share / 2);
    }

    return remainders.reverse().join("");
};
```

-   한 번에 정확히 작성 못해서, 테스트하면서 작성했다.

#### 5-2. 최종 코드

```js
const base10to2 = (base10) => {
    let share = base10;
    const remainders = [];

    while (share > 0) {
        remainders.push(share % 2);
        share = Number.parseInt(share / 2);
    }

    return remainders.reverse().join("");
};

const solution = (input) => {
    let curr = input;
    let loopCount = 0,
        removedZerosTotal = 0;
    while (curr !== "1") {
        let removedZeros = 0;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === "0") {
                removedZeros++;
            }
        }
        curr = base10to2(curr.length - removedZeros); // 1만 남은 문자열의 길이 = 기존 길이 - 0의 개수
        removedZerosTotal += removedZeros;
        loopCount++;
    }

    return [loopCount, removedZerosTotal];
};
```
