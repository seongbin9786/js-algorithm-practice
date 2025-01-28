# 의상

## 문제 개요

-   문제 유형: Hash
-   문제 난도: 프로그래머스 Lv2, 66% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42578

### 문제 핵심 요약

-   종류 별 의상들이 주어졌을 때, 가능한 전체 의상 조합의 개수를 반환
-   조건: 종류 별로 최대 하나의 의상만 착용 가능하며, 최소 하나의 의상을 착용한 경우만

### 문제 입출력

-   입력 값: 종류 별 의상들의 배열
-   출력 값: 가능한 전체 의상 조합의 개수

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 경우의 수 단순 계산

-   전체 조합 개수 반환
    -   (각 종류 별 개수 + 1)를 모든 종류에 대해 곱한 후, 모든 걸 안 선택하는 경우 1를 빼면 됨
    -   2개, 1개 가 있는 종류가 2개 있으면, 3\*2 - 1 = 5

### 2. 수도 코드

-   (생략)

### 3. 사용 단위 알고리즘 종류

-   (Hash)

### 4. 사용 단위 알고리즘 구현

-   JS 기본 Object 사용

### 5. 코드

#### 5-1. 시도 1 / 완성 코드

```js
const solution = (clothes) => {
    const clothesPerCategory = {};

    clothes.forEach(([cloth, category]) => {
        if (clothesPerCategory[category] === undefined) {
            clothesPerCategory[category] = 1;
        } else {
            clothesPerCategory[category]++;
        }
    });

    let sum = 1;
    Object.values(clothesPerCategory).forEach((categoryLength) => {
        sum *= categoryLength + 1;
    });

    return sum - 1;
};
```

### 6. 배운 점

-   TODO: 간단한 문제여도 검산하는 습관 들이기...
-   예전 코드를 봤는데, `Object.values`보다 Map을 `for-of`로 iterator로 순회하는 게 더 간결하다.
