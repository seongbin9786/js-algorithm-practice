var lowestCommonAncestor = function (root, p, q) {
    if (!root) return; // 미존재 리프 노드 처리

    // p, q를 부모로 전달
    if (root === p || root === q) return root;

    // 무의미 노드는 p, q와 만나면 무시
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root; // 정답 발견

    return left ?? right; // 기본 Case
};
