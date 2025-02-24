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
const getHeight = (node) => {
    if (!node) {
        return 0;
    }

    if (!node.left && !node.right) {
        return 1;
    }

    if (!node.left) {
        const rightHeight = getHeight(node.right);
        if (rightHeight >= 2) {
            throw false;
        }
        return 1 + rightHeight;
    }

    if (!node.right) {
        const leftHeight = getHeight(node.left);
        if (leftHeight >= 2) {
            throw false;
        }
        return 1 + leftHeight;
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
        throw false;
    }

    return 1 + Math.max(leftHeight, rightHeight);
};

var isBalanced = function (root) {
    try {
        getHeight(root);
        return true;
    } catch {
        return false;
    }
};
