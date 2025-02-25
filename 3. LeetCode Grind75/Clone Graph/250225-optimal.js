var cloneGraph = function (rootNode) {
    if (!rootNode) return rootNode;

    const nodeMap = new Array(101).fill(null);
    const copyAll = (node) => {
        if (nodeMap[node.val]) {
            return;
        }
        const cloned = (nodeMap[node.val] = new _Node(node.val));
        node.neighbors.forEach((neighbor) => {
            if (!nodeMap[neighbor.val]) {
                copyAll(neighbor);
            }
            cloned.neighbors.push(nodeMap[neighbor.val]);
        });
    };
    copyAll(rootNode);
    return nodeMap[rootNode.val];
};
