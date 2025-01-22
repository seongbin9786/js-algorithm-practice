# 길 찾기 게임

## 문제 개요

-   문제 유형: 그래프 (?)
-   문제 난도: 프로그래머스 Lv3, 38% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42892

### 문제 핵심 요약

-   (x,y) 좌표로 표현된 노드를 이진 트리로 변환하되, 서브 트리 x 좌표 구간 제한을 만족해야 한다.
-   이진 트리를 전위, 후위 순회한다.

### 문제 입출력

-   입력 값: 이진 트리, (x,y) 좌표로 표현된 순서가 있는 노드 배열
    -   1 <= 길이 <= 10,000, 0 <= 좌표 <= 100,000, 트리의 깊이 <= 1,000
    -   x 좌표가 겹치는 경우는 없음
-   출력 값: 이진 트리를 전위, 후위 순회로 방문하는 노드들의 순서 배열

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] x축으로 노드 정렬하기

-   이후 x 오름차순으로 정렬한다. (필수)
-   y 정렬은 필요가 없다. x 중에서 겹치는 값이 없기 때문이다.

#### 1-2. [접근 2] 탐색 순서 - 가장 위에서부터 아래로 탐색하기

-   y 내림차순으로 정렬하면 루트 노드를 찾을 수 있다. (무조건 유일한 최상단 노드)
-   정렬은 동일한 y에 대해 x 오름차순으로 정렬한다.
-   현재 노드보다 작은 y 중 (즉, 항상 배열의 다음만 조회하면 된다.)
    -   현재 노드의 x보다 작으면서, 가장 가까운 노드 = 내 노드의 left
        -   y 내림차순 + x 오름차순 정렬이기 때문에, 항상 배열의 다음 걸 조회하고, prevDiff, curDiff로 비교해서 diff가 가장 작은 노드를 선택할 수 있다.
    -   현재 노드의 x보다 크면서, 가장 가까운 노드 = 내 노드의 right
        -   left와 같은 방법으로 선택하면 된다.
-   위 과정을 반복하면서 각 노드들의 left, right를 지정해줄 수 있다.
    -   left, right가 항상 존재하지는 않을 것이다. 만약 x가 지나가버리면 없는 것으로 처리한다.

(잠시 직접 그려보면서 Case를 정의할 필요가 있을 것 같다.)

##### 1-2-1. 헷갈리는 부분: 자식 노드 선정 기준 (y 좌표와 레벨)

-   현재 풀이는 노드를 정렬시켜 그 순서대로 부모-자식 노드를 연결시켜 이진 트리를 구성하는 방식이다.

    -   부모 입장에서 자식 노드를 선정하는 기준이 다소 모호해서 고민을 하고 있다.

-   처음에는 "같은 레벨" 문구를 보고, y축 정렬 순서로 child 가능 여부가 결정된다고 해석했었는데, 이것이 기준이 되지는 않고, 불충분하다.
-   오히려, 서브트리 x 좌표 구간 제한을 만족하면 해결될 것으로 해석했다.
-   일단 가장 가까운 레벨에 노드가 하나만 존재할 것이며, 그 노드가 left, right가 될 수밖에 없다.

#### 1-3. [접근 3] x 좌표 기준으로 Top-down 재귀

-   배열의 원소에 index+1 값으로 순서를 부여한다.
-   최초 배열을 x축 기준으로 오름차순 정렬한다.
-   배열에서 루트 노드를 기준으로 반을 가른다.
    -   전체에서 y축 max 값으로 루트 노드의 index를 구한다.
    -   slice를 사용해서 반을 가른다.
-   이를 재귀적으로 반복해서 구간을 우선 가른다.
-   구간 분할이 끝나는 것은 리프 노드 시점일 때이다.
-   본인이 리프 노드인 경우, 부모의 x와 본인의 x를 비교해 left, right로 할당한다.
-   이를 반복해서, 루트 노드에 도달할 때까지 (부모가 null인 시점) 반복하고, 종료한다.

##### 예시 TC 1

```text
입력: [[5,3],[11,5],[13,3],[3,5],[6,1],[1,3],[8,6],[7,2],[2,2]]
정렬: [[1,3],[2,2],[3,5],[5,3],[6,1],[7,2],[8,6],[11,5],[13,3]]

- 반복은 BFS 순서로 했는데 DFS여도 무관하다.

[반복 1]
부모: 없음
중간: [8,6]
분할:
- root: [8,6]
- left: [1,3],[2,2],[3,5],[5,3],[6,1],[7,2]
- right: [11,5],[13,3]

[반복 2] (left)
부모: [8,6]
- root: [3,5]
- left: [1,3],[2,2]
- right: [5,3],[6,1],[7,2]

[반복 3] (right)
부모: [8,6]
- root: [11,5]
- left:
- right: [13,3]

[반복 4] (right)
- 부모: [11,5]
- root: [13,3]
- left:
- right:
- 부모.right=[13,3]
- (추가 재귀 없음)

[반복 5] (left)
- 부모: [3,5]
- root: [1,3]
- left:
- right: [2,2]

[반복 6] (right)
- 부모: [3,5]
- root: [5,3]
- left:
- right: [6,1],[7,2]

[반복 7] (right)
- 부모: [1,3]
- root: [2,2]
- left:
- right
- 부모.right=[2,2]
- (추가 재귀 없음)

[반복 8] (right)
- 부모: [5,3]
- root: [7,2]
- left: [6,1]
- right:

[반복 9] (right)
- 부모: [7,2]
- root: [6,1]
- left:
- right:
- 부모.left = [6,1]
- (추가 재귀 없음)


[반복 10] ()
( ... 생략 ... )

(매번 맥락을 글로 쓰는 것보다는, 맥락이 유지되는 그림이 생산 시간 면에서 훨씬 나은 것 같다.)

```

### 2. 사용 단위 알고리즘 종류

-   (재귀)

### 3. 사용 단위 알고리즘 구현

#### 3-1. 트리 생성

```js
class Node {
    x;
    y;
    id;
    left;
    right;
    parent;

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    // parent = Node | undefined
    // nodes = Node[]
    generateSubtree(parent, descendents) {
        if (nodes.length === 0) {
            return undefined;
        }
        if (nodes.length === 1) {
            return this;
        }

        let maxY = 0;
        let rootNodeIndex = 0;
        nodes.forEach((node, idx) => {
            if (node.y > maxY) {
                maxY = node.y;
                rootNodeIndex = idx;
            }
        });

        const rootNode = nodes[rootNodeIndex];
        const leftDescendents = nodes.slice(0, rootNodeIndex);
        const rightDescendents = nodes.slice(rootNodeIndex + 1);
        console.log(rootNode, leftDescendents, rightDescendents);

        rootNode.parent = this; // 필요할지는 모르겠음.
        this.left = rootNode.generateSubtree(leftDescendents);
        this.right = rootNode.generateSubtree(rightDescendents);
    }
}

const nodes = nodeinfo
    .map(([x, y], idx) => new Node(x, y, idx + 1))
    .sort((a, b) => a.x - b.x);

const createRoot = () => {
    let maxY = 0;
    let rootNodeIndex = 0;
    nodes.forEach((node, idx) => {
        if (node.y > maxY) {
            maxY = node.y;
            rootNodeIndex = idx;
        }
    });

    const rootNode = nodes[rootNodeIndex];
    const leftDescendents = nodes.slice(0, rootNodeIndex);
    const rightDescendents = nodes.slice(rootNodeIndex + 1);
    rootNode.left = rootNode.generateSubtree(undefined, leftDescendents);
    rootNode.right = rootNode.generateSubtree(undefined, rightDescendents);

    return rootNode;
};
```

#### 3-2. 트리 순회

```js
function preOrder(node, visitQueue) {
    visitQueue.push(node.id);
    if (node.left) {
        preOrder(node.left);
    }
    if (node.right) {
        preOrder(node.right);
    }
}

function postOrder(node, visitQueue) {
    if (node.left) {
        postOrder(node.left);
    }
    if (node.right) {
        postOrder(node.right);
    }
    visitQueue.push(node.id);
}

const preOrderVisitQueue = [];
preOrder(rootNode, preOrderVisitQueue);

const postOrderVisitQueue = [];
postOrder(rootNode, postOrderVisitQueue);
```

### 4. 단위 알고리즘 활용 코드

#### 4-1. 시도 1

-   generateSubtree에서 무한 루프 발생

    -   원인: 변수명 오류

-   generateSubtree가 제대로 연결을 구축하지 못하는 문제 발생

```js
const solution = (nodeinfo) => {
    class Node {
        x;
        y;
        id;
        left;
        right;
        parent;

        constructor(x, y, id) {
            this.x = x;
            this.y = y;
            this.id = id;
        }

        // parent = Node | undefined
        // nodes = Node[]
        generateSubtree(parent, descendents) {
            if (descendents.length === 0) {
                return undefined;
            }
            if (descendents.length === 1) {
                return this;
            }

            let maxY = 0;
            let rootNodeIndex = 0;
            descendents.forEach((node, idx) => {
                if (node.y > maxY) {
                    maxY = node.y;
                    rootNodeIndex = idx;
                }
            });

            const rootNode = descendents[rootNodeIndex];
            const leftDescendents = descendents.slice(0, rootNodeIndex);
            const rightDescendents = descendents.slice(rootNodeIndex + 1);

            rootNode.parent = this; // 필요할지는 모르겠음.
            this.left = rootNode.generateSubtree(this, leftDescendents);
            this.right = rootNode.generateSubtree(this, rightDescendents);

            return this;
        }
    }

    const preOrder = (node, visitQueue) => {
        visitQueue.push(node.id);
        if (node.left) {
            preOrder(node.left);
        }
        if (node.right) {
            preOrder(node.right);
        }
    };

    const postOrder = (node, visitQueue) => {
        if (node.left) {
            postOrder(node.left);
        }
        if (node.right) {
            postOrder(node.right);
        }
        visitQueue.push(node.id);
    };

    const nodes = nodeinfo
        .map(([x, y], idx) => new Node(x, y, idx + 1))
        .sort((a, b) => a.x - b.x);

    const createRoot = () => {
        let maxY = 0;
        let rootNodeIndex = 0;
        nodes.forEach((node, idx) => {
            if (node.y > maxY) {
                maxY = node.y;
                rootNodeIndex = idx;
            }
        });

        const rootNode = nodes[rootNodeIndex];
        const leftDescendents = nodes.slice(0, rootNodeIndex);
        const rightDescendents = nodes.slice(rootNodeIndex + 1);
        rootNode.left = rootNode.generateSubtree(rootNode, leftDescendents);
        rootNode.right = rootNode.generateSubtree(rootNode, rightDescendents);

        return rootNode;
    };

    const rootNode = createRoot();

    const preOrderVisitQueue = [];
    preOrder(rootNode, preOrderVisitQueue);

    const postOrderVisitQueue = [];
    postOrder(rootNode, postOrderVisitQueue);

    return [preOrderVisitQueue, postOrderVisitQueue];
};
```

#### 4-2. 시도 2

-   요약

    -   결국 메소드가 아닌 일반 함수로 생성. 이미 Node가 존재하는 상태로 연결만 하는 구조였어서 instance 기반으로 생각하지 다소 어려웠음.

-   과정
    -   쉬운 로그 출력을 위해 parent 제거 (쓸모 x)
    -   visitQueue 안 넘겨서 추가
    -   left, right가 연결이 되지 않는 문제 해결 필요
    -   generateSubtree가 트리를 반환해야 하므로 `return this`를 놓았으나, 정작 여기서 인스턴스를 생성하지 않는다는 한계가 있음...
        -   descendent에서 Node를 추출하는 만큼, generateSubtree를 메소드로 만들 수 있는지 의문이 듬
            -   얘는 `return this`가 가능해야 함. 리프 노드에서 스스로를 반환해야 함.
        -   딱 descendents만 받을 수가 없다. 본인을 포함한 리스트를 조회할 수밖에 없음.

```js
class Node {
    x;
    y;
    id;
    left;
    right;
    parent;

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
}

const generateSubtree = (nodes) => {
    if (nodes.length === 0) {
        return undefined;
    }
    if (nodes.length === 1) {
        return nodes[0];
    }

    let maxY = 0;
    let rootNodeIndex = 0;
    nodes.forEach((node, idx) => {
        if (node.y > maxY) {
            maxY = node.y;
            rootNodeIndex = idx;
        }
    });

    const rootNode = nodes[rootNodeIndex];
    const leftDescendents = nodes.slice(0, rootNodeIndex);
    const rightDescendents = nodes.slice(rootNodeIndex + 1);

    rootNode.left = generateSubtree(leftDescendents);
    rootNode.right = generateSubtree(rightDescendents);

    return rootNode;
};
```

#### 4-2. 완성 코드

```js
const solution = (nodeinfo) => {
    class Node {
        x;
        y;
        id;
        left;
        right;

        constructor(x, y, id) {
            this.x = x;
            this.y = y;
            this.id = id;
        }
    }

    const generateSubtree = (nodes) => {
        if (nodes.length === 0) {
            return undefined;
        }
        if (nodes.length === 1) {
            return nodes[0];
        }

        let maxY = 0;
        let rootNodeIndex = 0;
        nodes.forEach((node, idx) => {
            if (node.y > maxY) {
                maxY = node.y;
                rootNodeIndex = idx;
            }
        });

        const rootNode = nodes[rootNodeIndex];
        const leftDescendents = nodes.slice(0, rootNodeIndex);
        const rightDescendents = nodes.slice(rootNodeIndex + 1);

        rootNode.left = generateSubtree(leftDescendents);
        rootNode.right = generateSubtree(rightDescendents);

        return rootNode;
    };

    const preOrder = (node, visitQueue) => {
        visitQueue.push(node.id);
        if (node.left) {
            preOrder(node.left, visitQueue);
        }
        if (node.right) {
            preOrder(node.right, visitQueue);
        }
    };

    const postOrder = (node, visitQueue) => {
        if (node.left) {
            postOrder(node.left, visitQueue);
        }
        if (node.right) {
            postOrder(node.right, visitQueue);
        }
        visitQueue.push(node.id);
    };

    const nodes = nodeinfo
        .map(([x, y], idx) => new Node(x, y, idx + 1))
        .sort((a, b) => a.x - b.x);

    const rootNode = generateSubtree(nodes);

    const preOrderVisitQueue = [];
    preOrder(rootNode, preOrderVisitQueue);

    const postOrderVisitQueue = [];
    postOrder(rootNode, postOrderVisitQueue);

    return [preOrderVisitQueue, postOrderVisitQueue];
};
```

### 6. 배운 점

-   매번 맥락을 글로 쓰는 것보다는, 맥락이 유지되는 그림이 생산 시간 면에서 훨씬 나은 것 같다.
-   이번 문제는 모델링이 되게 어렵게 느껴졌는데, 그 원인을 고민해보았다.

    -   메소드로 해결하려는 게 문제가 됐다. 재귀 자체는 되게 쉬운 구조였는데, 이걸 instance 수준에서 해결하려니 접근이 어려워졌다.
        -   generateSubtree는 인스턴스 생성과 관계가 없다. 단지 rootNode를 선정하고, left, right 자손을 구분지어 재귀 호출할 뿐이다.
        -   이 때 rootNode 대신 this를 사용하려니 이상해졌다.
            -   generateSubtree가 호출된 인스턴스에서 left, right를 할당하면 좋겠다고 생각했는데, 코드 상 `this`가 아닌 별도로 선정한 `rootNode`만 필요했다.
            -   애초에 메소드로 적절하지 않은 호출 구조에서 this 인스턴스로 풀어내려니 풀리지 않는 것이었다.

-   this로 풀어낼 수는 없고, `rootNode`로 풀어내면 아래와 같다. 그리고 이 형식은 `this` 참조가 없으므로 메소드보단 일반 함수가 낫다.

```js
generateSubtree(nodes) {
    if (nodes.length === 0) {
        return undefined;
    }
    if (nodes.length === 1) {
        return nodes[0];
    }

    let maxY = 0;
    let rootNodeIndex = 0;
    nodes.forEach((node, idx) => {
        if (node.y > maxY) {
            maxY = node.y;
            rootNodeIndex = idx;
        }
    });

    const rootNode = nodes[rootNodeIndex];
    const leftDescendents = nodes.slice(0, rootNodeIndex);
    const rightDescendents = nodes.slice(rootNodeIndex + 1);

    rootNode.left = rootNode.generateSubtree(leftDescendents);
    rootNode.right = rootNode.generateSubtree(rightDescendents);

    return rootNode;
}
```
