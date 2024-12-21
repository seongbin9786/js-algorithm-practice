# 소수 찾기

## 문제 개요

-   문제 유형: 완전 탐색
-   문제 난도: 프로그래머스 Lv2, 54% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42839

## 문제 내용 설명

-   주어진 숫자들을 조합해 만들 수 있는 소수의 개수를 반환한다.

### 문제 핵심 내용 요약

-   입력 값: 숫자로 구성된 문자열, ( 1 <= numbers <= 7, 0 <= numbers[i] <= 9) (ex) "013"
-   출력 값: 만들 수 있는 소수의 개수

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   백트래킹으로 순열을 만들고, 각 순열에 대해 소수인지 판단하여 집계한다.

#### 1-1 [접근 1]

-   동일

#### 1-2. [접근 1에 대한 추가 확인]

-   없음

### 2. 수도 코드

1. 백트래킹으로 순열을 만든다.
2. 생성된 각 순열을 합쳐 숫자로 만든다.
3. Number 생성자로 앞의 0을 제거한다.
4. 소수 여부를 확인하고 반환한다.
5. 소수 개수를 집계해 반환한다.

### 3. 사용 단위 알고리즘 종류

-   백트래킹

### 4. 사용 단위 알고리즘 구현

```js
const makeNumbers = (numbers) => {
    const numbersCreated = [];
    const selected = [];
    const used = Array(numbers.length).fill(false);

    const backtrack = (digit) => {
        if (digit === numbers.length) {
            numbersCreated.push(Number(selected.join("")));
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            used[i] = true;
            selected.push(numbers[i]);
            backtrack(digit + 1);
            selected.pop();
            used[i] = false;
        }
    };

    backtrack(0);

    return numbersCreated;
};
```

-   처음 짰더니 `used = true`일 때 분기가 없어서 추가했다.

```js
if (used[i]) {
    continue;
}
```

### 5. 단위 알고리즘 활용 코드

#### 5-1. 시도 1

```js
const makeNumbers = (numbers) => {
    const numbersCreated = [];
    const selected = [];
    const used = Array(numbers.length).fill(false);

    const backtrack = (digit) => {
        if (digit === numbers.length) {
            console.log("selected:", selected);
            numbersCreated.push(Number(selected.join("")));
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            selected.push(numbers[i]);
            backtrack(digit + 1);
            selected.pop();
            used[i] = false;
        }
    };

    backtrack(0);

    return numbersCreated;
};

const isPrime = (num) => {
    const max = Math.sqrt(num);
    for (let i = 2; i < max; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

const solution = (rawNumbers) => {
    const numbers = [...rawNumbers].map((str) => Number(str));
    const numbersCreated = makeNumbers(numbers);
    return [...new Set(numbersCreated)].filter(isPrime).length;
};
```

-   예제 하나가 틀렸다.
-   로그를 찍어보니, 중복이 발생했다. 동일 숫자가 있으니 어쩔 수가 없다.
-   Set을 활용하기로 했다.

```text
selected: [ 0, 1, 1 ]
selected: [ 0, 1, 1 ]
selected: [ 1, 0, 1 ]
selected: [ 1, 1, 0 ]
selected: [ 1, 0, 1 ]
selected: [ 1, 1, 0 ]
```

-   그 다음 예제도 틀렸다. `실행한 결괏값 2이 기댓값 3과 다릅니다.`

```text
selected: [ 1, 7 ]
selected: [ 7, 1 ]
numbersCreated: [ 17, 71 ]
```

-   반드시 모든 숫자를 쓸 필요가 없었다.
-   백트래킹이 wordLength = 1일 때 제대로 동작하지 않는다. (실수였다..)
-   `Math.sqrt(num)`까지만 소수 여부를 체크하니 오답이 나왔다. (< 가 아니라 <= 여야 했다.)

#### 5-2. 완성 코드

```js
const makeNumbers = (wordList, wordLength, numbers) => {
    const selected = [];
    const used = Array(wordLength).fill(false);

    const backtrack = (digit) => {
        if (digit === wordLength) {
            wordList.add(Number(selected.join("")));
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            selected.push(numbers[i]);
            backtrack(digit + 1);
            selected.pop();
            used[i] = false;
        }
    };

    backtrack(0);
};

const isPrime = (num) => {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

const solution = (rawNumbers) => {
    const numbers = [...rawNumbers].map((str) => Number(str));
    const wordList = new Set();
    for (let wordLength = 1; wordLength <= rawNumbers.length; wordLength++) {
        makeNumbers(wordList, wordLength, numbers);
    }
    return [...wordList].filter(isPrime).length;
};
```

### 6. 배운 점

-   소수 판별 시에는 대상 수의 제곱근 이하까지만 확인해보면 된다.
    -   소수 판별은 약수간의 곱, 즉 약수 쌍으로 판단한다.
    -   약수 쌍은 서로 반비례 관계이다.
    -   이 때, 대상 수의 제곱근은 약수 쌍의 중간점이다.
    -   제곱근 >= Math.max(...약수들) 이므로 제곱근까지만 확인하면 된다.
    -   증명
        -   sqrt(N) \* sqrt(N) = N
        -   약수 a \* b = N 일 때,
        -   a = sqrt(N) 이면 b = sqrt(N) 이어야 한다.
        -   a > sqrt(N) 이면 b > sqrt(N) 이어야 한다.
        -   a < sqrt(N) 이면 b < sqrt(N) 이어야 한다.
        -   즉, 약수 쌍인 (a,b) 중 적어도 하나는 sqrt(N)보다 작거나 같다.
