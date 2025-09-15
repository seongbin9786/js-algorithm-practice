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
        [[0, null, 1, null, null, null, 2], 1, 2, 1], // 5. root < p < q
        [[0, null, 1, null, null, null, 2], 2, 1, 1], // 6. root < q < p
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
    /*
        어떻게 구현하지?
        찾기
        - 현재 트리에서 p를 찾기
        - 현재 트리에서 q를 찾기

        흠.. 찾는 건 그냥 값 기준으로 이동을 먼저 하면 될 거 같음
        [CASE]
        1. p < root < q
        2. q < root < p
        3. p < q < root
        4. q < p < root
        5. root < p < q
        6. root < q < p

        우선 하나씩 고고
        1. root < p < q
    */
    /*
    구현 로직
    - p.right = q 인 경우: p가 나와야 함
    - q.right = p 인 경우: q가 나와야 함
   */
    if (p.right === q) {
        return p;
    }
    if (q.right === p) {
        return q;
    }

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
