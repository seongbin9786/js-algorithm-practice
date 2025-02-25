var cloneGraph = function (rootNode) {
    const nodeMap = new Map();

    if (!rootNode) {
        return rootNode;
    }

    const visitedVertices = Array.from({ length: 102 }, () =>
        Array(102).fill(false)
    );

    const copyAll = (from, to, cloneFrom) => {
        if (visitedVertices[from.val][to.val]) {
            return;
        }

        const cloneTo = (() => {
            const existingNode = nodeMap.get(to.val);
            if (existingNode) {
                return existingNode;
            }
            const cloneTo = new _Node(to.val);
            nodeMap.set(to.val, cloneTo);
            return cloneTo;
        })();

        cloneFrom.neighbors.push(cloneTo);

        visitedVertices[from.val][to.val] = true;

        to.neighbors.forEach((neighborNode) => {
            copyAll(to, neighborNode, cloneTo);
        });

        // 최상위에서만 필요하긴 함
        return cloneTo;
    };

    const created = copyAll(new _Node(0), rootNode, new _Node(-1));

    return created;
};
