/*
[문제]
- n개 노드 그래프 (2 <= n <= 20,000)
- 번호 = 1 ~ n
- 가장 멀리 떨어진 노드의 수 = 최단 경로로 이동 시 간선의 개수가 가장 많은 노드
- 양방향 간선 (1 <= <= 50,000)
- 1번 노드로부터 가장 멀리 떨어진 노드 몇 개?

[해결 방법]
- 1번 노드 것만 구하면 됨
- 1번에서 시작해서 BFS로 탐색하고 = 최단 경로, 
- 더 이상 탐색할 곳 없는 노드이면, 그 거리에 대한 카운터++ 해주면 될 듯. (Map으로 sparse하게 관리)

- Map, Set으로 구현하되, 라인 수가 길어짐.
*/
const solution = (n, vertex) => {
    let maxDistance = 0;
    const distanceMap = new Map();
    const addDistance = (distance) => {
        distanceMap.set(distance, (distanceMap.get(distance) ?? 0) + 1);
        maxDistance = Math.max(maxDistance, distance);
    };

    // 20000 * 20000은 이런식으론 에바임 (4억은 좀...)
    // const adj = Array.from({ length: n+1 }, () => Array(n+1).fill(false));
    const adj = new Map();

    vertex.forEach(([a, b]) => {
        if (!adj.get(a)) adj.set(a, []);
        if (!adj.get(b)) adj.set(b, []);

        const aNeighbors = adj.get(a);
        const bNeighbors = adj.get(b);

        aNeighbors.push(b);
        bNeighbors.push(a);
    });

    const visited = new Set();

    const Q = [];

    visited.add(1);
    adj.get(1).forEach((neigbor) => Q.push([neigbor, 1]));

    while (Q.length > 0) {
        const [next, distance] = Q.shift();
        if (visited.has(next)) {
            continue;
        }
        visited.add(next);
        addDistance(distance);

        adj.get(next).forEach((neighbor) => {
            if (visited.has(neighbor)) {
                return;
            }
            Q.push([neighbor, distance + 1]);
        });
    }

    return distanceMap.get(maxDistance);
};
