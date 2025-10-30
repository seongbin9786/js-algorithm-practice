/*
[문제 해석]
- 합승으로 택시비 아끼기
- S에서 A,B까지의 최단 비용의 합 구하기
    - 단, '합승'을 통해 돈을 아낄 수 있음.
    - 합승은 필수가 아님

[문제 조건]
- 지점이 n개일 때, 지점 번호는 1부터 n까지 사용
- 3 <= n <= 200
- s != a != b

[발상]
- 다익스트라로 s 기준 각 정점까지의 거리 구하기
- s->a, s->b 경로가 겹치면 그만큼 빼기 (경로를 구하는 방법=?)
    - 잘 모르곘으면 BFS로 다시 탐색해도 됨 (에반 거 같은데)

[발상 2]
- 임의의 경유지 x를 두고, s->x, x->a, x->b를 구한다 ?
*/

import { describe, it, assert } from "vitest";

describe("합승 택시 요금 (Lv.3)", () => {
    it.each([
        [
            6,
            4,
            6,
            2,
            [
                [4, 1, 10],
                [3, 5, 24],
                [5, 6, 2],
                [3, 1, 41],
                [5, 1, 24],
                [4, 6, 50],
                [2, 4, 66],
                [2, 3, 22],
                [1, 6, 25],
            ],
            82,
        ],
        [
            7,
            3,
            4,
            1,
            [
                [5, 7, 9],
                [4, 6, 4],
                [3, 6, 1],
                [3, 2, 3],
                [2, 1, 6],
            ],
            14,
        ],
        [
            6,
            4,
            5,
            6,
            [
                [2, 6, 6],
                [6, 3, 7],
                [4, 6, 7],
                [6, 5, 11],
                [2, 5, 12],
                [5, 3, 20],
                [2, 4, 8],
                [4, 3, 9],
            ],
            18,
        ],
    ])("%i,%i,%i,%i,%j => %i", (n, s, a, b, fares, expected) => {
        const result = solution(n, s, a, b, fares);
        assert.equal(result, expected);
    });
});

function solution(n, s, a, b, fares) {
    const N = n + 1; // 1-indexed

    function getDistanceMap(startNode, fares) {
        const heap = new MinHeapShort((a, b) => a[1] - b[1]); // cost
        const graph = Array.from({ length: N }, () => Array(N).fill(Infinity));
        fares.forEach(([from, to, cost]) => {
            graph[from][to] = cost;
            graph[to][from] = cost;
        });

        // 다익스트라에서 dist는 visited 겸용
        const dist = Array(N).fill(Infinity);

        dist[startNode] = 0;

        heap.push([startNode, 0]); // 노드, 거리

        while (!heap.isEmpty()) {
            const [node, distance] = heap.pop();
            if (distance > dist[node]) {
                continue;
            }
            // 현재 가장 가까움
            // 1-indexed
            for (let nextNode = 1; nextNode < N; nextNode++) {
                const nextNodeDist = graph[node][nextNode];
                const nextMinDist = distance + nextNodeDist;
                if (nextMinDist < dist[nextNode]) {
                    dist[nextNode] = nextMinDist;
                    heap.push([nextNode, nextMinDist]);
                }
            }
        }

        return dist;
    }

    const fromS = getDistanceMap(s, fares);
    const fromA = getDistanceMap(a, fares);
    const fromB = getDistanceMap(b, fares);

    let answer = Infinity;
    for (let mid = 1; mid < N; mid++) {
        const currAnswer = fromS[mid] + fromA[mid] + fromB[mid];
        answer = Math.min(answer, currAnswer);
    }

    return answer;
}

// 그대로 가져옴
function MinHeapShort(_comp) {
    const f = Math.floor;
    const arr = [undefined];
    const comp = _comp ?? ((a, b) => a - b);

    const push = (item) => {
        arr.push(item);
        let c = arr.length - 1;
        while (c > 1) {
            const p = f(c / 2);
            if (comp(arr[c], arr[p]) >= 0) break;
            [arr[c], arr[p]] = [arr[p], arr[c]];
            c = p;
        }
    };

    const pop = () => {
        if (arr.length === 1) return;
        const minVal = arr[1];

        // NOTE: 주의<!> length=1일 때는 바로 반환해야 함.
        const last = arr.pop();
        if (arr.length === 1) return minVal;
        arr[1] = last;
        let i = 1;

        while (true) {
            const l = i * 2,
                r = i * 2 + 1;
            let min = i;
            if (l < arr.length && comp(arr[l], arr[min]) < 0) min = l;
            if (r < arr.length && comp(arr[r], arr[min]) < 0) min = r;
            if (min === i) break;
            [arr[min], arr[i]] = [arr[i], arr[min]];
            i = min;
        }
        return minVal;
    };

    const isEmpty = () => arr.length === 1;

    return {
        isEmpty,
        push,
        pop,
    };
}
