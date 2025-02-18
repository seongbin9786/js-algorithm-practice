/*
[문제]
- 이진트리를 구성한 후 후위 순회한 결과를 2차원 배열에 담아 반환
- 입력 값: (x, y) 좌표 배열이 주어진다. 각 노드의 id는 index+1이다.
- 노드 개수 <= 10,000
- 트리의 깊이 <= 1,000
- 트리 구성 조건
    - 모든 노드는 서로 다른 x값
    - 같은 레벨의 노드는 같은 y값
    - 자식 노드의 y값은 부모보다 작음
    - 서브트리 조건: left subtree는 부모보다 x값이 작음 (right는 큼)

[해결 방법]
- rootNode에서 시작해서 y를 내려가면서 자식들을 찾아야 한다.
    - 항상 y축 오름차순으로 자식이 나타나게 된다.
- left, right 노드 기준은 본인의 x좌표를 기준으로 판단하면 된다.
    - 그래서 부모 x 좌표 기준으로 다음 레벨의 자식들을 탐색해야 한다.
    - 부모는 단순 본인의 x 좌표만 갖고 있지 않는다.
        - 본인의 전체 조상의 x 좌표 구간을 가져야 한다.
            - 자식들을 순회하면서, 해당 좌표 구간에 들어오면, 부모의 x에 따라 left, right를 결정하면 된다.
- 예시
    - 루트 노드는 x좌표 제한이 없다.
    - 본인보다 x 좌표 상 앞선 노드를 left, 뒤의 노드를 right로 지정한다.
    - left로 선정된 노드는 다음 레벨을 탐색하면서, (0, 루트노드x) 사이의 노드를 탐색한다.
        - 본인 x보다 작은 노드는 left, 큰 노드는 right로 할당한다.
            - 이 때 절대 다른 부모와 자식이 겹칠 수 없다. 강제로 구간이 분할되며, x가 겹치는 경우가 없기 때문이다.
    - left의 right로 선정된 노드의 x 좌표 제한은 (left노드x, 루트노드x)가 된다.
        - 이렇게 쭉 반복해가면 연결이 완료된다.
- 어떻게 다음 레벨을 탐색하면 될까?
    - 다음 레벨은 미리 y축 기준으로 정렬해두고 그룹핑해둔다.
    - 그 전 그룹을 순회(부모 레벨)하면서, 부모 범위에 들어오는 자식을 부모에 할당한다.
        - 최초로 발견된 부모에 할당하면 된다.
- 이진트리 구축이 끝나면 후위순회 후 종료하면 된다.

[19:18 실패]
- 기본 TC 통과
- 31점
- 틀린 이유: x 범위를 모든 조상으로부터 물려받아야 함
    - 어떻게 중첩시킬 수 있을까?
    - 잘 생각이 나지 않는다...
    - 알고리즘이 아닌데 연상이 안 되네
    - parent만 참조하면 안 됨. 뭔가 누적이 되는 형상이어야 함.


*/
class Node {
    id;
    x;
    y;
    parent = undefined;
    left = undefined;
    right = undefined;
    minX = -Infinity;
    maxX = Infinity;

    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    setLeft(child) {
        this.left = child;
        child.parent = this;

        child.maxX = this.x;
        child.minX = this.minX;
    }

    setRight(child) {
        this.right = child;
        child.parent = this;

        child.minX = this.x;
        // child.maxX = this.parent.x; 로 불충분함
        // 할아버지의 x를 쓸 게 아니라, 어차피 그건 내 maxX 이므로, 내 걸 써야 함.
        child.maxX = this.maxX;
    }
}

const solution = (coordinates) => {
    const nodes = coordinates.map(([x, y], index) => new Node(index + 1, x, y));

    // 레벨 별 정렬
    // y축 내림차순 정렬 (y가 밑에서부터 올라와서...)
    nodes.sort((a, b) => b.y - a.y);

    const rootNode = nodes.shift();

    const nodesByLevel = nodes.reduce(
        (sum, currNode) => {
            const currLevel = sum[sum.length - 1];

            if (currLevel.length > 0 && currLevel[0].y > currNode.y) {
                sum.push([currNode]);
            } else {
                currLevel.push(currNode);
            }
            return sum;
        },
        [[rootNode]]
    );

    // 트리 형성
    for (let level = 1; level < nodesByLevel.length; level++) {
        const parentNodes = nodesByLevel[level - 1];
        const childNodes = nodesByLevel[level];

        for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            const childX = childNode.x;
            const appropriateParent = parentNodes.find(
                (node) => node.minX < childX && node.maxX > childX
            );
            const isLeft = appropriateParent.x > childX;
            if (isLeft) {
                appropriateParent.setLeft(childNode);
            } else {
                appropriateParent.setRight(childNode);
            }
        }
    }

    // 전위, 후위 순회
    const preOrderVisits = [];
    const postOrderVisits = [];
    const visitPreOrder = (node) => {
        preOrderVisits.push(node.id);
        if (node.left) {
            visitPreOrder(node.left);
        }
        if (node.right) {
            visitPreOrder(node.right);
        }
    };
    const visitPostOrder = (node) => {
        if (node.left) {
            visitPostOrder(node.left);
        }
        if (node.right) {
            visitPostOrder(node.right);
        }
        postOrderVisits.push(node.id);
    };

    visitPreOrder(rootNode);
    visitPostOrder(rootNode);

    return [preOrderVisits, postOrderVisits];
};
