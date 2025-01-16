# 기능 개발

## 문제 개요

-   문제 유형: 스택, 큐
-   문제 난도: 프로그래머스 Lv2, 65% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42586

## 문제 내용 설명

-   기능마다 일일 진행 속도가 정해져 있음
-   여러 개의 기능이 병렬로 개발됨
-   기능은 미리 정해진 순서대로 배포됨
-   후순위 기능이 선순위 기능보다 먼저 개발된 경우, 선순위 기능이 배포될 때 함께 배포됨
-   각 기능이 배포되는 날짜 = ?

### 문제 핵심 내용 요약

-   입력 값: 각 기능들의 현재 진행률(%)과 진행 속도 배열 (길이 <= 100)
-   출력 값: 각 기능들의 출시일 배열

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 하루 단위로 시뮬레이션

-   하루 단위로 시뮬레이션
    -   전체 progress += speeds
    -   현재 배포 개수 = 0
    -   가장 앞 progress >= 100 일 때 현재 배포 개수에 추가
        -   뒷 작업도 100이상인 동안은 계속 반복
    -   progress를 모두 순회한 경우 종료하고, 배포 날짜 별 배포 개수 배열 반환

### 2. 수도 코드

(생략)

### 3. 사용 단위 알고리즘 종류

-   큐

### 4. 사용 단위 알고리즘 구현

(JS 내장 배열 사용)

### 5. 단위 알고리즘 활용 코드

(없음)

#### 5-1. 완성 코드

```js
const solution = (progresses, speeds) => {
    const featuresPerDeploy = [];

    let firstTaskIdx = 0;

    while (firstTaskIdx < progresses.length) {
        // 출시
        let numberOfDeployedFeatures = 0;
        while (
            firstTaskIdx < progresses.length &&
            progresses[firstTaskIdx] >= 100
        ) {
            numberOfDeployedFeatures++;
            firstTaskIdx++;
        }

        if (numberOfDeployedFeatures > 0) {
            featuresPerDeploy.push(numberOfDeployedFeatures);
        }

        // 하루 만큼 개발 진행
        for (let idx = firstTaskIdx; idx < progresses.length; idx++) {
            progresses[idx] += speeds[idx];
        }
    }

    return featuresPerDeploy;
};
```

#### 5-2. 코드 검수

예제 데이터

-   progresses = [ 93, 30, 55 ]
-   speeds = [ 1, 30, 5 ]

실행

-   순회 0
    -   firstTaskIdx 0
    -   while X
    -   if X
    -   for 0,1,2 ---> progresses: [ 94, 60, 56 ]
-   순회 6
    -   firstTaskIdx 0
    -   while O ---> progresses: [ 100, 240, 90 ], numberOfDeployedFeatures = 2, firstTask = 2
    -   if O ---> featuresPerDeploy = [ 2 ]
    -   for 2 ---> progresses: [ 100, 240, 95 ]
-   순회 7
    -   (유사 예상)

### 6. 배운 점

-   간단한 실수들을 제출하고 알게 됐는데, 귀찮더라도 머리로 실행해보는 게 중요하다고 생각이 든다.
