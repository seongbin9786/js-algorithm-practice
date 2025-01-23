# 여행 경로

## 문제 개요

-   문제 유형: DFS
-   문제 난도: 프로그래머스 Lv3, 47% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/43164

### 문제 핵심 요약

-   항공권의 배열을 입력 받아 ICN에서 출발해 모든 항공권을 소모하는 경로를 반환
-   경로가 여러 개인 경우 알파벳 순서가 앞서는 경로를 반환

### 문제 입출력

-   입력 값: 항공권의 배열
-   출력 값: 모든 항공권을 소모하는 경로 (경로가 여러 개일 때는 알파벳 순서가 앞서는 경로를 반환)

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 최단이 아니고, 경로도 여러 개 나올 수 있으므로, DFS 활용

-   어떻게 순회해야 할지 혼란스러움
    -   무한 루프 없이 모든 경로 탐색하는 방법?
        -   무조건 앞으로만 가되 막히면 되돌아온다. 각 순회마다 별도의 visited를 들고가면 된다.
            -   아.. 잘 모르겠다.
            -   일단 그냥 그리면서 해보죠?

#### 1-2 [접근 2] 알파벳 순서로 앞서는 경로를 DFS로 탐색하고 최초의 경로를 반환

-   어떻게 순회할지 고민해봤는데, 그냥 BFS,DFS로는 안 그려지고, 일종의 백트래킹으로는 순회할 수 있을 것으로 보임
-   백트래킹으로 모든 경로 탐색보단 DFS로 하나의 경로만 찾으면 됨

#### 1-3 [접근 3] 막다른 경로가 있을 수 있음

-   (ex)

    ```
    A 출발
    (A,B)
    (A,C)
    (C,A)
    이면 A -> C -> A -> B 만 가능. A -> B 이면 막다른 길
    ```

-   전부 방문하지 않았는데 방문할 곳이 없으면 막다른 길로 보고 이동을 취소해야 할 듯.
    -   다녀간 모든 칸을 모두 이동을 취소해야 할까?
        -   그렇지 않다면 어떤 기준으로 취소를 중단?
            -   백트래킹만 가능할 듯..? Yes

### 2. 수도 코드

-   (생략)

### 3. 사용 단위 알고리즘 종류

-   DFS

### 4. 사용 단위 알고리즘 구현 / 완성 코드

-   예제 TC 모두 실패 (뭔가 좀 이상함)
    -   nextAirport 체크 조건 누락으로 인한 문제...

```js
const solution = (tickets) => {
    const visited = new Map();
    tickets.forEach((ticket) => {
        visited.set(ticket, false);
    });

    const path = [];
    const backtrack = (nextAirport) => {
        // 완료 조건
        // 최초로 완료 시 최적 경로를 반환하게 된다.
        // 탈출하는 방법...? throw 해버릴까요
        if (path.length === tickets.length) {
            throw path;
        }

        const availableTickets = tickets
            .filter(
                (ticket) => !visited.get(ticket) && ticket[0] === nextAirport
            )
            .sort((a, b) => a[1].localeCompare(b[1])); // 문자열 오름차순 정렬

        availableTickets.forEach((ticket) => {
            path.push(ticket[1]);
            visited.set(ticket, true);

            backtrack(ticket[1]);

            path.pop();
            visited.set(ticket, false);
        });
    };

    try {
        backtrack("ICN");
    } catch (path) {
        return ["ICN", ...path];
    }
};
```

### 5. 배운 점

-   backtrack 방식으로 짰는데, 첫 경우만 필요해서 탈출하기 위해 throw를 사용했다.
    -   더 좋은 방법이 있는지 궁금하다.
-   문자열 정렬에 `stringA.localeCompare(stringB)`를 많이 사용하게 되는데 기억이 안나면 문제가 될 것 같다..! 잘 알아두자 :)
-   DFS 자체에 대해서 좀 헷갈려서 공부가 필요할 것 같다.
