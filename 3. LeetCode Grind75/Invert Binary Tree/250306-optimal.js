/*
[문제]
- TreeNode 타입으로 루트 노드를 입력 받아 트리를 뒤집고 루트를 반환
- 재귀적으로 left, right를 뒤집으면 완료됨
- 노드 개수 <= 100

[해결 방법]
- left, right가 둘 다 있으면 뒤집으면 끝인 것 같다. (swap)
- dfs ? bfs ? 무관
- 단순한 문제인데 왜 리뷰 리스트에 있을까-?
- 일단 풀고 개선점 찾기.

*/
var invertTree = function (root) {
    if (!root) {
        // left, right가 하나라도 없으면 생략? 안 됨. 그 밑의 자손은 양쪽이 있을 수 있음..
        return root;
    }

    const temp = invertTree(root.left);
    root.left = invertTree(root.right);
    root.right = temp;

    return root;
};
