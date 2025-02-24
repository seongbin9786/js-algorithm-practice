/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/*
[문제]
- 두 노드의 최소 공통 조상을 반환
    - 조상 = 두 노드 중 하나가 공통 조상이어도 허용

[풀이 방법]
- BST이므로, node.left.val < node.val < node.right.val 이다.
- 이게 subtree까지 recursive하게 적용되는지는 모르겠음. 아 무조건 됨. ㅇㅇ

- p != q 라는 조건이 있으므로, p > q || p < q 임
- CASES
    - p < root < q 이면 maxParent = this
    - p, q < root 이면 maxParent = this.left
    - root < p, q 이면 maxParent = this.right
    - 이렇게 좁혀나가면 될 듯
    - maxParent에서 계속 좁혀나가면 됨
    - 그냥 maxParent = parent인 듯?
    - 만약 p = root || q = root 이면?
        - maxParent = root 하고 종료 (더 내려갈 수 없음)

(ex) p=2, q=5 이면?
- 6 ---> p,q < 6 이므로, maxParent=6.left = 2
- root = 2 이므로, p=2 이고 maxParent = 2 하고 종료

(ex) p =4, q = 9 이면?
- 4 < 6 < 9 이므로 maxParent = 6 으로 종료

(ex) p=3, q=5 이면?
- 3,5, < 6이므로 maxParent = 6.left = 2
- 2 < 3,5 이므로 maxParent = 2.right = 4
- 3 < 4 < 5 이므로, maxParent = 4 [끝]

*/
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    const minValue = Math.min(p.val, q.val);
    const maxValue = Math.max(p.val, q.val);
    const rootValue = root.val;

    if (root.val === minValue || root.val === maxValue) {
        return root;
    }
    if (minValue < rootValue && rootValue < maxValue) {
        return root;
    }
    if (maxValue < rootValue) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (rootValue < minValue) {
        return lowestCommonAncestor(root.right, p, q);
    }
};
