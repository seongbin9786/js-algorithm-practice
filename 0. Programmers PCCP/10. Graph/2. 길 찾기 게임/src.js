const findAndConnectLeft = (parent, child, traverse) => {
    if (parent.left) {
        console.log(
            `[left] [traverse] parent(${parent.n}): [${parent.x}, ${parent.y}], child(${child.n}): [${child.x}, ${child.y}]`,
        );
        return traverse(parent.left, child);
    }
    console.log(
        `[left] parent(${parent.n}): [${parent.x}, ${parent.y}], child(${child.n}): [${child.x}, ${child.y}]`,
    );
    parent.left = child;
};

const findAndConnectRight = (parent, child, traverse) => {
    if (parent.right) {
        console.log(
            `[right] [traverse] parent(${parent.n}): [${parent.x}, ${parent.y}], child(${child.n}): [${child.x}, ${child.y}]`,
        );
        return traverse(parent.right, child);
    }
    console.log(
        `[right] parent(${parent.n}): [${parent.x}, ${parent.y}], child(${child.n}): [${child.x}, ${child.y}]`,
    );
    parent.right = child;
};

// O(N^2)
// O(N) for traverse, O(N) for filter children candidates
// 매번 root부터 찾아가는 게 맞을까?
// 직전 parent를 기억할 수도 있을까? 이건 그려봐야 알 듯
const buildTree = (parent, child) => {
    if (parent.x > child.x) {
        return findAndConnectLeft(parent, child, buildTree);
    }
    findAndConnectRight(parent, child, buildTree);
};

// 전위 순회
const firstTraverse = (node, visited) => {
    if (node === null) {
        return;
    }

    visited.push(node.n);
    firstTraverse(node.left, visited);
    firstTraverse(node.right, visited);
};

// 후위 순회
const lastTraverse = (node, visited) => {
    if (node === null) {
        return;
    }

    lastTraverse(node.left, visited);
    lastTraverse(node.right, visited);
    visited.push(node.n);
};

/**
 * @param {number[][]} nodeinfo 이진트리를 구성하는 각 노드의 좌표 배열의 배열
 * @returns {number[][]} 전위 순회, 후위 순회한 각 노드 번호의 배열의 배열
 */
const solution = (nodeinfo) => {
    const [rootNode, ...children] = nodeinfo
        .map(([x, y], i) => ({
            n: i + 1,
            y,
            x,
            left: null,
            right: null,
        }))
        .sort(
            // y 좌표가 컴퓨터 배열과 다름
            ({ x: ax, y: ay }, { x: bx, y: by }) =>
                by === ay ? ax - bx : by - ay,
        );

    for (const child of children) {
        buildTree(rootNode, child);
    }

    const firstTraversed = [];
    const lastTraversed = [];

    firstTraverse(rootNode, firstTraversed);
    lastTraverse(rootNode, lastTraversed);

    return [firstTraversed, lastTraversed];
};

const result = solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
]);
console.log(result);
