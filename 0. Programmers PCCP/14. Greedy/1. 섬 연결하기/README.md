# 섬 연결하기

## 문제 개요

-   문제 유형: 그리디, MST
-   문제 난도: 프로그래머스 Lv3, 48% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42861

### 문제 핵심 요약

-   n개의 섬 간 다리 건설 비용이 주어질 때, 전체 섬 간 통행이 가능하도록 최소 비용으로 다리를 건설했을 때 총 비용을 반환

### 문제 입출력

-   입력 값: 섬 개수 (<= 100), costs 배열 (`[섬1,섬2,비용]` 형식)
-   출력 값: 최소 연결 비용

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] MST 만들기

-   지문을 보면서 Minimum Spanning Tree 개념이 곧장 떠올랐다.
-   아마 이 문제 자체가 MST를 구성하시오였던 것 같다.
    -   MST라는 게
        -   (1) 트리이므로 사이클이 없고,
        -   (2) Minimum이므로 최소한으로,
        -   (3) Spanning(reach, cover)이므로 모든 노드가 연결되는 걸로 대충 기억이 난다..
-   MST는 어떻게 만드는지는 잘 모르겠다. 근데 그리디하게 만들 수 있는 듯하다.
    -   작은 비용 순으로 선택하기만 해도 성립할지는 모르겠다. (아마 추가 조건이 필요할 듯하다.)
    -   Try 1
        -   최소 비용의 간선을 하나 선택한다. 이 간선은 임의의 두 노드를 잇는다.
            -   여기까지는 greedy가 동작하는 게,
                -   이 간선은 이 두 노드를 잇는 최소 비용일 수밖에 없기 때문이다.
        -   이제 선택할 수 있는 간선의 개수가 늘었다.
            -   두 노드에서 출발하는 모든 간선을 확인하고, 가장 저렴한 간선을 선택한다.
            -   선택한 간선을 연결한 후 사이클이 발생하면 취소한다.
                -   사이클이 발생하면 취소하는 이유는, 이미 방문할 수 있는 곳에 추가로 돈을 들였기 때문이다.
                -   Q. 만약 일단 연결한 후, 해당 노드에서 더 싼 값에 연결할 수 있었다면?
                    -   흠... 그럼 처음부터 거기서 출발했어야 됐긴 했을 듯
                        -   이건 처음에 선택한 간선의 비용보다는 비싼 간선일 것이므로, 괜찮을 수도
        -   왜 간선의 전체에서 최소가 아닌, 이미 연결된 노드에서 출발하는 간선으로만 한정?
            -   기존 연결 구성이 최소이기 때문, 최소인 상태에서 최소한으로 증가해야 함.
                -   (기존 연결 구성이 최소라는 증명이 필요할 듯)
        -   그럼 MST 알고리즘을 짠다면:
            -   전체 간선 중 minimum을 우선 선택
            -   "도달한 노드 목록"을 관리
            -   간선 중 "도달한 노드 목록"과 걸친 것만 필터링
            -   "주어진 간선 목록"들로 사이클 여부를 파악
                -   how? visited 배열 만들고, 간선을 각각 실행하면서 이미 visited인 곳을 visit하면 발생
                    -   이거 구현하려면 map 하나 구축하고 DFS/BFS로 짜야 될 듯
            -   "도달한 노드 목록"이 전체 노드 목록과 일치하면, "선택된 간선 목록"의 비용 합계를 반환하면 될 듯.

### 2. 사용 단위 알고리즘 종류

-   MST

### 3. 사용 단위 알고리즘 구현 / 시도 1 / 완성

-   MST 구현 자체가 문제 지문이어서 단위 구현이 문제 해결 코드가 됨
-   한 번에 해결!

```js
// vertex = 꼭짓점
// edge = 변
const solution = (vertices, edges) => {
    edges.sort(([, , aCost], [, , bCost]) => aCost - bCost);

    let totalCost = 0;
    let totalReached = 0;
    const reachedVertices = (() => {
        const map = {};
        for (let i = 0; i < vertices; i++) {
            map[i] = false;
        }
        return map;
    })();

    // 첫 노드는 일단 선택해야 함
    const [from, to, cost] = edges.shift();
    totalCost += cost;
    totalReached++;
    reachedVertices[from] = true;
    reachedVertices[to] = true;

    while (totalReached < vertices - 1) {
        // reachedVertices도 있으면 그냥 그걸로 체크할 수 있지 않을까?
        // 응. 그냥 reachedVertices에 edge의 from, to가 다 있는지 보면 될 듯.
        const availableEdges = edges.filter(([from, to]) => {
            // 이미 모두 방문 (사이클)
            if (reachedVertices[from] && reachedVertices[to]) {
                return false;
            }
            // 둘 다 미방문 (기존 노드에서 출발해야 하므로 무시해야 함)
            if (!reachedVertices[from] && !reachedVertices[to]) {
                return false;
            }
            return true;
        });

        // cheapestEdge는 항상 있어야 한다.
        const cheapestEdge = availableEdges[0];
        const [from, to, cost] = cheapestEdge;
        totalCost += cost;
        totalReached++;
        reachedVertices[from] = true;
        reachedVertices[to] = true;
    }

    return totalCost;
};
```

### 4. 배운 점

-   MST에 대한 추측만으로 구현했고 풀었는데, MST 개념을 확인해야겠다.
-   개념을 좀 유도해가는 건 되게 좋은 방식 같다. 답을 보면 이런 능력을 기를 기회가 없어지는 것 같다.
-   Nice!
