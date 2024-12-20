# 전력망 둘로 나누기

## 문제 개요

-   문제 유형: 완전 탐색
-   문제 난도: 프로그래머스 Lv2, 52% (2024/12)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/

## 문제 내용 설명

-   주어진 트리에 대해 edge 하나를 제거했을 때 생기는 두 트리의 vertex 개수의 차이의 최솟값을 반환

### 문제 핵심 내용 요약

-   입력 값: 트리의 vertex 개수(2 <= n <= 100), edge([vertex1, vertex2] 형식) 배열
-   출력 값: 생성된 두 트리의 vertex 개수 차이의 최솟값

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

-   방법 1: 주어진 edge 배열의 원소를 하나씩 제거하면서 순회한다. 각 순회마다 두 트리를 생성하고, 트리의 vertex 개수의 차이 계산한다.
-   방법 2: 이외의 방법이 있을지 모르겠다.

#### 1-1 [접근 1]

-   edge 배열의 길이만큼 순회하면서 그 순번의 edge를 제외한다.
-   edge 배열을 순회하면서 트리를 구성한다. edge의 v1, v2를 생성하고, 둘을 연결한다.
    -   두 개의 트리인지 알 수 있는 방법이 없어 보인다.

#### 1-2 [접근 2]

-   edge 배열을 순회하면서 트리를 생성한다.
-   트리에서 특정 edge를 제거하고, 해당 edge의 v1, v2에서 시작해 두 트리를 탐색한다.
-   두 트리의 노드 개수를 구하고, 개수의 차이로 최솟값을 갱신한다.
-   최솟값을 반환한다.

### 2. 수도 코드

1. edge 배열을 순회하며 트리를 생성
2. edge 배열을 순회하며 해당 edge 하나를 제거
3. v1, v2를 시작점으로 두 트리를 순회
4. 두 트리의 vertex 개수 차이로 최솟값을 갱신
5. 트리를 복원하고, (2) ~ (4)를 반복

### 3. 사용 단위 알고리즘 종류

-   트리 순회 - DFS

### 4. 사용 단위 알고리즘 구현

-   tree를 어떻게 만들까 고민하다가, Map으로 만드는 게 좋겠다고 판단해 객체로 구현했다.

```js
const tree = {};

const countNodesOfTree = (tree, startNode) => {
    const visited = Object.keys(tree).reduce((visited, key) => {
        visited[key] = false;
        return visited;
    }, {});

    let count = 0;

    const dfs = (node) => {
        if (visited[node]) {
            return;
        }

        visited[node] = true;
        count++;
        tree[node].forEach((neighbor) => {
            dfs(neighbor);
        });
    };

    dfs(startNode);

    return count;
};
```

### 5. 단위 알고리즘 활용 코드

#### 5-1. 완성 코드

```js
const tree = {};

const countNodesOfTree = (tree, startNode) => {
    const visited = Object.keys(tree).reduce((visited, key) => {
        visited[key] = false;
        return visited;
    }, {});

    let count = 0;

    const dfs = (node) => {
        if (visited[node]) {
            return;
        }

        visited[node] = true;
        count++;

        tree[node].forEach((neighbor) => {
            dfs(neighbor);
        });
    };

    dfs(startNode);

    return count;
};

const createTree = (wires) =>
    wires.reduce((tree, [v1, v2]) => {
        if (!tree[v1]) {
            tree[v1] = [];
        }
        if (!tree[v2]) {
            tree[v2] = [];
        }
        tree[v1].push(v2);
        tree[v2].push(v1);

        return tree;
    }, {});

const solution = (numberOfVertices, wires) => {
    const tree = createTree(wires);
    let minDiff = numberOfVertices;

    wires.forEach(([v1, v2]) => {
        // 서로 연결에서 제거
        tree[v1] = tree[v1].filter((neighbor) => neighbor !== v2);
        tree[v2] = tree[v2].filter((neighbor) => neighbor !== v1);

        const tree1Nodes = countNodesOfTree(tree, v1);
        const tree2Nodes = countNodesOfTree(tree, v2);
        const diff = Math.abs(tree1Nodes - tree2Nodes);
        minDiff = Math.min(minDiff, diff);

        // 서로 연결에서 복구
        tree[v1].push(v2);
        tree[v2].push(v1);
    });

    return minDiff;
};
```

-   한 번에 성공하지는 못했다.
-   count를 반환하지 않아 `undefined`를 반환했다.
-   연결 복구 코드를 작성하지 않는 실수를 했다.
-   잘못된 대입 코드가 있는 실수를 했다. (`tree[v1] = tree[v1].push(v2)`)
