# 타겟 넘버

## 문제 개요

-   문제 유형:
-   문제 난도: 프로그래머스 Lv2, 63% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/43165

### 문제 핵심 요약

-   임의의 숫자 배열과 합계가 주어졌을 때, 각 숫자의 부호를 지정한 후 모두 더해 주어진 합계가 나오는 (+,-) 순열의 개수 반환

### 문제 입출력

-   입력 값: 임의의 숫자 배열, 합계
-   출력 값: 합계를 만들 수 있는 (+,-) 순열의 개수

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 모든 (+,-) 경우를 생성하고, 합계가 맞는 개수를 집계한다.

-   `주어진 숫자 배열의 길이`만큼의 길이를 갖는 (+,-) 배열의 모든 경우를 생성한다.
    -   백트래킹으로 구한다.
-   모든 (+,-) 순열에 대해
    -   각 숫자에 순열의 동일 순번의 부호를 곱하고, 모든 숫자를 더한다.

### 2. 수도 코드

1. (+,-)를 생성한다.
    - 주어진 숫자 배열의 길이 n만큼 부호를 선택한다:
        - 완료: 길이 n만큼 재귀 호출을 한다.
            - n+1번째 재귀 호출에 대해 "탈출"하고, 해당 Case를 (+,-) 순열에 추가한다.
        - 진행: (+)를 선택하고 다음 순번 호출을 하고, 돌아오면 (-)를 선택하고 다음 순번 호출을 한다.
2. 각 (+,-) 순열에 대해 반복한다.
    - 주어진 숫자 배열을 순회한다.
        - index에 대해 부호가 (-)이면 -1을 곱해서 더하거나 그냥 더한다.
    - 전체 순회를 했을 때 합계가 동일하면 합계 일치 개수를 1 증가시킨다.
3. 합계 일치 개수를 반환한다.

### 3. 사용 단위 알고리즘 종류

-   백트래킹

### 4. 사용 단위 알고리즘 구현

```js
const makeSignPermutation = (length) => {
    const allPermutations = [];

    const currPermutation = [];
    const backtrack = (currIndex) => {
        if (currIndex >= length) {
            allPermutations.push([...currPermutation]);
            return;
        }
        // "+", "-"로 저장 후 분기하기보다는 1, -1로 매번 곱하는 게 코드가 더 간단하다.
        currPermutation.push(1);
        backtrack(currIndex + 1);
        currPermutation.pop();

        currPermutation.push(-1);
        backtrack(currIndex + 1);
        currPermutation.pop();
    };

    backtrack(0);

    return allPermutations;
};
```

### 5. 코드

#### 5-1. 시도 1, 완성 코드

-   조금 더 축약하면 백트래킹 코드 내에서 한 번의 반복으로 진행할 수 있겠지만, 코드를 단위로 나누었다.

```js
const solution = (numbers, target) => {
    const makeSignPermutation = (length) => {
        const allPermutations = [];

        const currPermutation = [];
        const backtrack = (currIndex) => {
            if (currIndex >= length) {
                allPermutations.push([...currPermutation]);
                return;
            }
            // "+", "-"로 저장 후 분기하기보다는 1, -1로 매번 곱하는 게 코드가 더 간단하다.
            currPermutation.push(1);
            backtrack(currIndex + 1);
            currPermutation.pop();

            currPermutation.push(-1);
            backtrack(currIndex + 1);
            currPermutation.pop();
        };

        backtrack(0);

        return allPermutations;
    };

    const sumUp = (numbers, signPermutation) => {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i] * signPermutation[i];
        }
        return sum;
    };

    const signPermutations = makeSignPermutation(numbers.length);

    return signPermutations.reduce((numberOfMatches, currSignPermutation) => {
        const currSum = sumUp(numbers, currSignPermutation);
        if (currSum === target) {
            return numberOfMatches + 1;
        }
        return numberOfMatches;
    }, 0);
};
```

### 6. 배운 점

-   백트래킹 코드도 수도 코드로 쓸 수 있을까? 했는데 쓰니까 괜찮았다.
-   백트래킹 코드만 단위 테스트했는데, 잘 습관이 되고 있어서 만족스럽다.
