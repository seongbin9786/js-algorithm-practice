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
