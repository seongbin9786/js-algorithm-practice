// Map, Set에 비해 인접리스트 구현이 훨씬 간결하다.
// 노드 수가 2만이라서 괜찮다.
const solution = (n, vertex) => {
    let maxDistance = 0;
    let distanceCount = 0;

    const distances = Array(n + 1).fill(0);
    const adj = Array.from({ length: n + 1 }, () => []);

    vertex.forEach(([a, b]) => {
        adj[a].push(b);
        adj[b].push(a);
    });

    const visited = Array(n + 1).fill(false);
    const Q = [1];

    while (Q.length > 0) {
        const next = Q.shift();
        visited[next] = true;

        // max 값 관리를 조금 더 낫게
        if (maxDistance < distances[next]) {
            maxDistance = distances[next];
            distanceCount = 0;
        }
        if (maxDistance === distances[next]) {
            distanceCount++;
        }

        adj[next].forEach((neighbor) => {
            if (visited[neighbor]) return;
            distances[neighbor] = distances[next] + 1;
            visited[neighbor] = true;
            Q.push(neighbor);
        });
    }

    return distanceCount;
};
