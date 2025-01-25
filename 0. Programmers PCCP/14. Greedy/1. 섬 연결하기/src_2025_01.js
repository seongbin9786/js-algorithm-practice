// 매일 헷갈려서 단어 뜻 정리함!
// vertex = 꼭짓점
// edge = 변
const solution = (vertices, edges) => {
    edges.sort(([, , aCost], [, , bCost]) => aCost - bCost);

    let totalCost = 0;
    let totalReached = 0;
    const reachedVertices = (() => {
        const map = {};
        for (let i = 0; i < vertices; i++) {
            map[i] = false;
        }
        return map;
    })();

    // 첫 노드는 일단 선택해야 함
    const [from, to, cost] = edges.shift();
    totalCost += cost;
    totalReached++;
    reachedVertices[from] = true;
    reachedVertices[to] = true;

    while (totalReached < vertices - 1) {
        // reachedVertices도 있으면 그냥 그걸로 체크할 수 있지 않을까?
        // 응. 그냥 reachedVertices에 edge의 from, to가 다 있는지 보면 될 듯.
        const availableEdges = edges.filter(([from, to]) => {
            // 이미 모두 방문 (사이클)
            if (reachedVertices[from] && reachedVertices[to]) {
                return false;
            }
            // 둘 다 미방문 (기존 노드에서 출발해야 하므로 무시해야 함)
            if (!reachedVertices[from] && !reachedVertices[to]) {
                return false;
            }
            return true;
        });

        // cheapestEdge는 항상 있어야 한다.
        const cheapestEdge = availableEdges[0];
        const [from, to, cost] = cheapestEdge;
        totalCost += cost;
        totalReached++;
        reachedVertices[from] = true;
        reachedVertices[to] = true;
    }

    return totalCost;
};
