import { assert, describe, it } from "vitest";

describe.only("Invert Binary Tree", () => {
    it("null -> null", () => {
        const expected = null;
        const result = invertBinaryTree(null);

        assert.equal(result, expected);
    });

    it("[1] -> [1]", () => {
        const input = createTree("1");
        const expected = createTree("1");
        const result = invertBinaryTree(input);
        assert.equal(stringifyTree(result), stringifyTree(expected));
    });
});

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

function createTree(input) {
    // [4,2,7,1,3,6,9]
    // level order로 left/right 순서로 트리를 구성
    const nodes = input.split(",").map((val) => new TreeNode(Number(val)));
    nodes.unshift(undefined); // 1-indxed 여야 인덱스 계산이 쉬움
    nodes.forEach((_, idx) => {
        if (idx === 0) {
            return;
        }
        nodes[idx].left = nodes[idx * 2] ?? null;
        nodes[idx].right = nodes[idx * 2 + 1] ?? null;
    });
    return nodes[1];
}

function stringifyTree(tree) {
    const queue = [tree];
    let result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.val);

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return result.join(",");
}

function compareTree(a, b) {}

function invertBinaryTree(tree) {
    return null;
}
