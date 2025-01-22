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
