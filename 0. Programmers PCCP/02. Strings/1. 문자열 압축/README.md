# [문제 제목]

## 문제 개요

-   문제 유형: 문자열
-   문제 난도: 프로그래머스 Lv2, 43% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/60057

## 문제 내용 설명

-   주어진 문자열을 n개 단위로 자른다. 만약 반복되는 문자열이 있다면 그 개수를 표기해 중복 분량을 생략한다. 압축했을 때의 길이의 최솟값을 반환한다.
-   이렇게 압축했을 때 복구 가능한지의 여부는 문제와 무관하다.
-   (ex) abcabcabc 를 n=3으로 압축하면 3abc
-   (ex) abcabcdede는 n=2로 압축하면 `ab ca bc de de = abcabc2de`이고, n=3으로 압축하면 `abc abc ded e = 2abcdede`이므로 최소 길이는 8
-   압축이 되는 경우만 중복된 개수를 쓸 수 있다.

### 문제 핵심 내용 요약

-   입력 값: 임의의 문자열
-   출력 값: 입력된 문자열을 최대한 압축한 문자열의 길이

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1]

-   지문대로 풀면 되는, 풀이가 매우 명확한 문제이다.
-   `n=1~length`까지 압축을 시도해보고 그 결과 중 최소값을 반환하면 된다.
-   압축은 단순히 길이별로 자르는 것이므로, 각 단위 문자열 길이에 대해 압축 결과는 유일하다.

#### 1-2. [접근 1에 대한 추가 확인]

-   잘라진 문자열에 대해 중첩된 개수를 세야 한다.
-   문자열을 아예 자르지 않을 수도 있다. (2번 순회 vs 1번 순회의 차이)
    -   자르면 문제가 쉽고, 안 자른다면 index를 하나 더 써야 한다. (currIndex)

### 2. 수도 코드

1. 단위 길이 `length=2~input.length-1`에 대해 순회한다. (length=1,length일 때는 원본보다 더 커진다.)
2. currIndex = 0으로 초기화한다.
3. currDuplicate = 0으로 초기화한다.
4. 문자열 globalMin, currSum, prev, curr 값을 null로 초기화한다.
5. input.slice(currIndex _ length, currIndex _ (length + 1))로 curr 값을 초기화한다.
6. prev와 비교해 동일하다면 currDuplicate++ 하고 currIndex++ 한다. 다르다면, currDuplicate > 1 이면 sum += `${currDuplicate}${curr}`, <= 1 이면 +=curr 한다.
7. globalMin = min(globalMin, currSum) 하고, currSum = null로 초기화하고 넘어간다. globalMin은 input.length로 초기화한다.

### 3. 사용 단위 알고리즘 종류

-   없음

### 4. 사용 단위 알고리즘 구현

-   없음

### 5. 단위 알고리즘 활용 코드

#### 5-1. 초벌 코드, 추가 단계 식별

```js
const solution = (input) => {
    let globalMin = input.length;

    for (let length = 2; length < input.length; length++) {
        let currDuplicate = 0;
        let currSum = "",
            prev = null,
            curr = null;

        for (
            let currIndex = 0;
            currIndex * length < input.length;
            currIndex++
        ) {
            curr = input.length.slice(
                currIndex * length,
                Math.min(currIndex * (length + 1), input.length)
            );
            if (prev === curr) {
                currDuplicate++;
            } else {
                currSum += `${currDuplicate > 1 ? currDuplicate : ""}${prev}`;
                currDuplicate = 1;
            }
            prev = curr;
        }
    }
};
```

-   여기까지 작성하였고, 추가 단계를 식별했다.
    -   for문이 끝났을 때 prev === cur이라면? 처리를 해줘야 한다.

#### 5-2. 추가 단계 작성

-   제출하였고, 오류가 발생했다. `실행한 결괏값 null이 기댓값 7과 다릅니다.`
-   globalMin이 null일 수가 없다고 생각해 로그를 찍어보았다.

```js
console.log(
    `input: ${input}, length: ${length}, currDuplicate: ${currDuplicate}, currSum: ${currSum}, prev: ${prev}, curr: ${curr} (range: ${
        currIndex * length
    }, ${Math.min((currIndex + 1) * length, input.length)})`
);
```

-   prev = null로 놓으니, prev가 문자열이 되어 들어가버렸다. prev를 빈 문자열로 초기화해야 한다.
-   slice 길이가 잘못되었다. `Math.min(currIndex * (length + 1), input.length)`에 문제가 있는 듯하다.
-   계속 globalMin = null이라고 출력됐다. 앗, `globalMin = Math.min(globalMin, currSum);`에서 `currSum.length`여야 하는데, `currSum`을 그대로 넣어버렸다.

-   오류를 찾아보면서 추가로 깨달은 점들:
    -   생각해보니, 1개 문자 단위로도 압축했을 때 더 짧아질 수 있다.
    -   실제로 위 오류를 고치니, 예제 케이스 6개 중 5개만 맞았었고, 1개까지 범위를 늘리니, 모두 맞았다.

#### 5-4. 완성 코드

```js
const solution = (input) => {
    let globalMin = input.length;

    for (let length = 1; length < input.length; length++) {
        let currDuplicate = 0;
        let currSum = "",
            prev = "",
            curr = "";

        for (
            let currIndex = 0;
            currIndex * length < input.length;
            currIndex++
        ) {
            curr = input.slice(
                currIndex * length,
                Math.min((currIndex + 1) * length, input.length)
            );

            if (prev === curr) {
                currDuplicate++;
            } else {
                currSum += `${currDuplicate > 1 ? currDuplicate : ""}${prev}`;
                currDuplicate = 1;
            }
            prev = curr;
        }

        if (prev === curr) {
            currSum += `${currDuplicate > 1 ? currDuplicate : ""}${prev}`;
        }

        globalMin = Math.min(globalMin, currSum.length);
    }

    return globalMin;
};
```
