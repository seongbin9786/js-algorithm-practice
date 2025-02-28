/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/*
- 정렬이 안 돼있어서 완전 탐색밖에 없음.
- subtree 구간에 대한 visited가 있어야 함
--> backtrack이긴 한가?
- 갔다 와야 되니깐-흠...
- 갔다 오면서 트리를 반환하면 되긴 하겠다
- 근데 계속 서브트리 전체를 반환하게 될 거 같은데?
*/
var lowestCommonAncestor = function (root, p, q) {
    const pqMap = {};
    let found = false;
    let LCA;

    // 부모에 전파하기 위해 p를 찾으면 1, q를 찾으면 2를 반환
    // 둘 다 찾았으면? 흠... 그럼 너가 LCA 인가?
    const dfs = (node) => {
        if (!node || found) return;
        if (!pqMap[node.val]) pqMap[node.val] = 0;
        if (node === p || node === q) pqMap[node.val]++;
        if (dfs(node.left)) pqMap[node.val]++;
        if (dfs(node.right)) pqMap[node.val]++;
        if (pqMap[node.val] === 2) {
            LCA = node;
            found = true;
            return false;
        }

        return pqMap[node.val] > 0 || node === p || node === q;
    };

    dfs(root);

    return LCA;
};
