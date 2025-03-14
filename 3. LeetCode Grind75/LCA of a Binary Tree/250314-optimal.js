// root, p, q 모두 노드 - 반환값도 노드
// LCA = 두 노드 간의 가장 낮은 공통 조상 (두 노드 중 하나일 수 있다.)
// 2 <= 노드 개수 <= 10만, p != q 이고, p, q는 항상 존재
// 풀이 방법: 재귀적으로 탐색 - dfs vs bfs -> dfs
// p, q 중 하나를 찾아서 올라오고, 나머지 p,q를 처음 발견한 순간의 노드가 정답
// p, q를 발견하면 true, 없으면 false 반환

// 흠 - 왜 틀렸지? - p, q를 전달 안 했음.
var lowestCommonAncestor = function (root, p, q) {
    if (!root) {
        return null;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // 둘 다 undefind이면 그냥 반환
    // 자식 둘 다 p, q 이면 본인 반환
    if (left && right) {
        return root;
    } else if (root === p || root === q) {
        // 본인이 p, q에 해당하면 - 자식의 자식의 p, q 유무가 중요하지 않음. 두 값을 동시에 올려보낼 수도, 필요도 없음.
        // 쭉 올라갔는데 left && right인 경우가 아니라면 본인이 root
        return root;
    } else {
        // 아래에서 올라온 값은 계속 전달해야 함.
        return left ?? right;
    }
};
