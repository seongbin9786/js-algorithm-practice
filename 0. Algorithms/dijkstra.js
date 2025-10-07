import { MinHeapShort } from "../0. Datastructures/min_heap_short";

// N개의 노드로 구성된 인접행렬이라고 할 때
export function dijkstra(graph, start) {
    const N = graph.length;
    const heap = new MinHeapShort((a, b) => a.distance - b.distance);
    const dist = Array(N).fill(Infinity);

    dist[start] = 0;
    heap.push({ node: start, distance: 0 });

    while (!heap.isEmpty()) {
        const { node: curr, distance } = heap.pop();
        if (dist[curr] < distance) continue;

        for (let next = 0; next < N; next++) {
            if (curr !== next && dist[curr] + graph[curr][next] < dist[next]) {
                // 최적화: pop에서 갱신해도 되지만, 최대한 일찍 갱신해서, pop 되기 전까지의 불필요한 push를 원천 차단
                dist[next] = dist[curr] + graph[curr][next];
                heap.push({
                    node: next,
                    distance: dist[next],
                });
            }
        }
    }

    return dist;
}
