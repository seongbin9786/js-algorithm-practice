# H-Index

## 문제 개요

-   문제 유형: 정렬
-   문제 난도: 프로그래머스 Lv2, 66% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42747

## 문제 내용 설명

-   논문 n편 중 인용 횟수가 h번 이상인 것이 h개 이상 있을 때, h의 최댓값을 H-Index라고 한다. H-Index를 구하시오.

### 문제 핵심 내용 요약

-   입력 값: 논문 별 인용 횟수의 배열, (0 <= 인용 횟수 <= 10,000) (1 <= 논문 수 <= 1,000)
-   출력 값: H-Index

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   명확한 방법이 떠오르지는 않는다.

#### 1-1 [접근 1]

-   내림차순 정렬 후, 논문을 순회하면서, 현재 논문의 인용 횟수보다 hIndex가 작은 경우, hIndex를 1씩 증가시킨다.
-   만약 hIndex보다 현재의 논문 인용 횟수가 작거나 같다면, hIndex가 최대점이므로 반환한다.

##### 예시 1

```text
value:  10, 9, 8, 7, 6, 4, 3, 2, 1
h-index: 1, 2, 3, 4, 5, -, -, -, -
```

-   (value=6, h-index=5)까지만 보고 H-index = 5라고 단정지을 수 없다.
-   이후 6이 나오면, h-index=6이 된다.
-   만약 다음 값의 value가 5이하이면 종료하면 된다.

##### 예시 2

```text
value:  10, 9, 8, 7, 6, 6, ?
h-index: 1, 2, 3, 4, 5, 6, -
```

##### 예시 3

```text
value:  10, 9, 8, 7, 7, 7, 7, 7
h-index: 1, 2, 3, 4, 5, 6, 7, -
```

##### 예시 4

```text
value:  10, 6, 5, 2, 1
h-index: 1, 2, 3, -, -
```

##### 예시 5

```text
value:  10, 1
h-index: 1, -
```

#### 1-2. [접근 1에 대한 추가 확인]

-   없음

### 2. 수도 코드

1. 배열을 내림차순 정렬한다.
2. 배열을 순회하면서 현재 값이 hIndex보다 크거나 같은 경우 hIndex를 증가시키고, 만약 이전 hIndex가 현재 값보다 크거나 같은 경우 반환한다.

### 3. 사용 단위 알고리즘 종류

-   정렬

### 4. 사용 단위 알고리즘 구현

-   언어 내장 함수 사용

### 5. 단위 알고리즘 활용 코드

```js
const solution = (rawCitations) => {
    const citations = rawCitations.sort((a, b) => b - a);
};
```

#### 5-3. 완성 코드

```js
const solution = (rawCitations) => {
    const citations = rawCitations.sort((a, b) => b - a);
    let hIndex = 0; // 기본 값 0
    for (let index = 0; index < citations.length; index++) {
        if (hIndex >= value) {
            break;
        }
        hIndex++;
    }

    return hIndex;
};
```

### 6. 배운 점

-   해결보다는 예시 TC를 만족하는 코드를 작성하려고 했다.
    -   반례를 찾는 노력이 필요했다.
    -   예시 TC가 하나 뿐이었고 허술했기 때문에, 커스텀 TC를 추가해야 했다.
