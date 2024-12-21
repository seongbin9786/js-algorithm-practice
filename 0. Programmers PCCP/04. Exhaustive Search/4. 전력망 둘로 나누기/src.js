const ROOT_NODE_ID = 1;

const UNRECHABLE_MAX_DIFF = 100;

const createMap = (n) => {
    const map = new Map();

    for (let i = 1; i <= n; i++) {
        map.set(i, []);
    }
    return map;
};

const connectWires = (map, wires) => {
    for (const [from, to] of wires) {
        map.get(from).push(to);
        map.get(to).push(from);
    }
};

const childrenOf = (map, visited, intercept, curNode) => {
    const children = map.get(curNode);
    visited[curNode] = true;

    let numberOfChildren = 0;
    for (const childNode of children) {
        if (visited[childNode]) {
            continue; // 부모는 제외
        }
        // 자식 본인 + 자식의 children
        numberOfChildren += 1 + childrenOf(map, visited, intercept, childNode);
    }
    intercept(numberOfChildren);
    return numberOfChildren;
};

const solution = (n, wires) => {
    const numberOfTotalChildren = wires.length;
    let minDiff = UNRECHABLE_MAX_DIFF;

    // 1. Map 만들기 ? Yes.
    const map = createMap(n);
    connectWires(map, wires);
    const visited = Array(n).fill(false);

    // 2. 탐색하면서 children 가져오기
    const handleSum = (numberOfChildren) => {
        // 전체 - 일부 = 나머지 일부
        // 일부 - 나머지 일부
        const half = numberOfTotalChildren - numberOfChildren;
        const anotherHalf = numberOfTotalChildren + 1 - half;
        const nextDiff = Math.abs(half - anotherHalf);
        minDiff = Math.min(minDiff, nextDiff);
    };
    childrenOf(map, visited, handleSum, ROOT_NODE_ID);

    return minDiff;
};
