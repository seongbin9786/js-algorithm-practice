/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
/*
[문제]
- BST validation
- 이거 꽤 어려운가봄?

[해결 방법]
- BFS로 가봐도 될 듯? DFS도 되고
- DFS로 가보죠
- 단순히 left < root < right 로 할 게 아니네
- 아래로 갈수록 정상 범위를 좁혀야 함
- right로 갈 때는 min=root, left로 갈 때는 max=root가 되는 거임
- 이걸 계속 자식에서 흡수해야 함

왜 중복 원소가 들어가도 인식을 못하지?
*/
var isValidBST = function (root) {
    let valid = true;
    const checkRange = (node, min, max) => {
        if (!node) return true;
        if (!valid) return false;
        if (node.val <= min || node.val >= max) return (valid = false);
        checkRange(node.left, min, node.val);
        checkRange(node.right, node.val, max);
    };

    checkRange(root, -Infinity, Infinity);

    return valid;
};
