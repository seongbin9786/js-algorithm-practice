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
 * @return {number[][]}
 */
/*
[문제]
- 레벨 순회한 결과를 반환 (l->r, by level)
- 레벨 단위로 배열로 담아 반환

[해결 방법]
- BFS로 하면 엄청 쉬워보이는데 - CASE를 먼저 만들-지 않고 해본다.
- queue에 담을 때 level을 함께 담고(+1), 레벨 배열이 없으면 만들어서 넣고 있으면 그 배열에 append하면 될 듯.
*/
var levelOrder = function (root) {
    const allLevels = [];

    const queue = [];

    if (root) {
        queue.push([root, 0]);
    }

    while (queue.length > 0) {
        const [currNode, level] = queue.shift();
        if (!allLevels[level]) {
            allLevels[level] = [];
        }
        allLevels[level].push(currNode.val);
        if (currNode.left) {
            queue.push([currNode.left, level + 1]);
        }
        if (currNode.right) {
            queue.push([currNode.right, level + 1]);
        }
    }

    return allLevels;
};
