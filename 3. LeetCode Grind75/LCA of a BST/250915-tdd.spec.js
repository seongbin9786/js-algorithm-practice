/*
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: 

“The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants 
(where we allow a node to be a descendant of itself).”

*/

import { describe, it, assert } from "vitest";

describe.only("LCA of BST", () => {
    it.each([
        // 흠... TC가 리트랑 좀 다르긴 한데 어쩔 수 없음
        // 리트 방식으로 어떻게 null 처리를 할지 모르겠음..
        [[0], 0, 0, 0],
        [[1, 0, 2], 1, 2, 1],
        [[0, null, 1, null, null, null, 2], 1, 2, 1],
        // [[2, 1, null, 0], 1, 0, 1],
    ])("max sum of %j => %i", (root, p, q, expected) => {
        const tree = createBST(root);
        const result = lowestCommonAncestor(
            tree,
            findNodeFromBST(tree, p),
            findNodeFromBST(tree, q)
        );
        assert.equal(result.val, expected);
    });
});

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    console.log("root:", JSON.stringify(root));
    // 실제로 구현을 해야 되는데...
    /*
        0
      1
    2

    일 떄 1을 반환해야 함.
    */
    // 우리 트리는 동일 인스턴스를 지원하지 않아서 val로 체크 (어차피 val에 대해 독립)
    if (root.right?.val === p.val && p.right?.val === q.val) {
        return p;
    }
    console.log("returning root", root.right, p.right);
    return root;
};

function findNodeFromBST(tree, value) {
    if (tree.val > value) {
        return findNodeFromBST(tree.left, value);
    } else if (tree.val < value) {
        return findNodeFromBST(tree.right, value);
    }
    return tree;
}

// input: any[]
function createBST(input) {
    // level order로 left/right 순서로 트리를 구성
    // 흐음... null을 고려해야 함.. 이건 TC 만들기가 어렵겠는데?
    const nodes = input.map((val) => (val != null ? new TreeNode(val) : null));
    nodes.unshift(undefined); // 1-indxed 여야 인덱스 계산이 쉬움
    nodes.forEach((node, idx) => {
        if (idx === 0 || !node) {
            return;
        }
        const leftCandidate = nodes[idx * 2] ?? null;
        const rightCandidate = nodes[idx * 2 + 1] ?? null;
        if (
            (leftCandidate && node.val < leftCandidate.val) ||
            (rightCandidate && node.val > rightCandidate.val)
        ) {
            throw new Error("invalid BST: [${}] < [] < []");
        }
        nodes[idx].left = leftCandidate;
        nodes[idx].right = rightCandidate;
    });
    return nodes[1];
}
