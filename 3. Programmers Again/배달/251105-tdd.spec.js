import { describe, it, assert } from "vitest";

/*
[문제 해석]
- 1번 마을에서 K 거리 내의 다른 마을로 배달할 건데, 배달 가능한 마을 개수 반환 (1번 마을도 포함)

[발상]
- 다익스트라로 풀어야 함
- min heap 없이 풀고 싶음

*/
describe("배달 (Lv.2)", () => {
    it.each([
        [
            5,
            [
                [1, 2, 1],
                [2, 3, 3],
                [5, 2, 2],
                [1, 4, 2],
                [5, 3, 1],
                [5, 4, 2],
            ],
            3,
            4,
        ],
        [
            6,
            [
                [1, 2, 1],
                [1, 3, 2],
                [2, 3, 2],
                [3, 4, 3],
                [3, 5, 2],
                [3, 5, 3],
                [5, 6, 1],
            ],
            4,
            4,
        ],
    ])("%i,%j,%i => %i", (N, road, K, expected) => {
        const result = solution(N, road, K);
        assert.equal(result, expected);
    });
});

function solution(N, road, K) {
    const graph = Array.from({ length: N + 1 }, () =>
        Array(N + 1).fill(Infinity)
    );
    road.forEach(([from, to, cost]) => {
        // 양방향임
        // 여러 간선이 있을 수 있음 <- !!
        graph[from][to] = Math.min(graph[from][to], cost);
        graph[to][from] = Math.min(graph[to][from], cost);
    });

    // 다익스트라 시작
    const visited = Array(N + 1).fill(false);
    const dist = Array(N + 1).fill(Infinity);
    dist[1] = 0;

    // 모든 정점에 대해 방문 필요 (총 V번 방문하면 됨)
    for (let v = 1; v <= N; v++) {
        console.log(`loop#:${v}, dist: ${dist}`);
        let minDist = Infinity;
        let minDistV;
        for (let v = 1; v <= N; v++) {
            if (!visited[v] && dist[v] < minDist) {
                minDist = dist[v];
                minDistV = v;
                console.log(`minDist: ${minDist}, minDistV: ${minDistV}`);
            }
        }

        if (minDist === Infinity) {
            return;
        }

        console.log(`to visit: ${minDistV}\n\n`);

        visited[minDistV] = true;
        dist[minDistV] = minDist;

        for (let i = 1; i <= N; i++) {
            if (graph[minDistV][i] !== Infinity && !visited[i]) {
                dist[i] = Math.min(dist[i], minDist + graph[minDistV][i]);
            }
        }
    }

    console.log(`result: ${dist}`);

    return dist.filter((d) => d <= K).length;
}
