import { describe, test, expect } from "vitest";
import { dijkstra } from "./dijkstra";

const INF = Infinity;

describe("Dijkstra 알고리즘", () => {
    test.each([
        // [테스트명, 그래프, 시작노드, 기대결과]
        [
            "기본 그래프 - 선형 경로",
            [
                [INF, 1, INF, INF],
                [INF, INF, 2, INF],
                [INF, INF, INF, 3],
                [INF, INF, INF, INF],
            ],
            0,
            [0, 1, 3, 6],
        ],
        ["단일 노드", [[INF]], 0, [0]],
        [
            "두 노드 양방향 연결",
            [
                [INF, 5],
                [5, INF],
            ],
            0,
            [0, 5],
        ],
        [
            "삼각형 그래프 - 최단 경로 선택",
            [
                [INF, 4, 2],
                [4, INF, 5],
                [2, 5, INF],
            ],
            0,
            [0, 4, 2],
        ],
        [
            "복잡한 그래프 - 여러 경로 중 최단 경로",
            [
                [INF, 7, 9, INF, INF, 14],
                [7, INF, 10, 15, INF, INF],
                [9, 10, INF, 11, INF, 2],
                [INF, 15, 11, INF, 6, INF],
                [INF, INF, INF, 6, INF, 9],
                [14, INF, 2, INF, 9, INF],
            ],
            0,
            [0, 7, 9, 20, 20, 11],
        ],
        [
            "연결되지 않은 노드 포함",
            [
                [INF, 1, INF, INF],
                [1, INF, 2, INF],
                [INF, 2, INF, INF],
                [INF, INF, INF, INF],
            ],
            0,
            [0, 1, 3, INF],
        ],
        [
            "시작 노드가 중간인 경우",
            [
                [INF, 4, INF, INF],
                [4, INF, 8, INF],
                [INF, 8, INF, 7],
                [INF, INF, 7, INF],
            ],
            1,
            [4, 0, 8, 15],
        ],
        [
            "완전 그래프 (모든 노드가 연결)",
            [
                [INF, 1, 2, 3],
                [1, INF, 1, 4],
                [2, 1, INF, 1],
                [3, 4, 1, INF],
            ],
            0,
            [0, 1, 2, 3],
        ],
        [
            "별 모양 그래프 (중심 노드에서 출발)",
            [
                [INF, 3, 5, 7, 9],
                [3, INF, INF, INF, INF],
                [5, INF, INF, INF, INF],
                [7, INF, INF, INF, INF],
                [9, INF, INF, INF, INF],
            ],
            0,
            [0, 3, 5, 7, 9],
        ],
        [
            "다양한 가중치를 가진 복잡한 그래프",
            [
                [INF, 2, 4, INF, INF],
                [INF, INF, 1, 7, INF],
                [INF, INF, INF, INF, 3],
                [INF, INF, INF, INF, 1],
                [INF, INF, INF, INF, INF],
            ],
            0,
            [0, 2, 3, 9, 6],
        ],
        [
            "동일 가중치 그래프",
            [
                [INF, 1, 1, INF],
                [1, INF, 1, 1],
                [1, 1, INF, 1],
                [INF, 1, 1, INF],
            ],
            0,
            [0, 1, 1, 2],
        ],
        [
            "긴 경로 그래프",
            [
                [INF, 1, INF, INF, INF, INF],
                [INF, INF, 1, INF, INF, INF],
                [INF, INF, INF, 1, INF, INF],
                [INF, INF, INF, INF, 1, INF],
                [INF, INF, INF, INF, INF, 1],
                [INF, INF, INF, INF, INF, INF],
            ],
            0,
            [0, 1, 2, 3, 4, 5],
        ],
        [
            "모든 노드가 연결되지 않은 경우",
            [
                [INF, INF, INF],
                [INF, INF, INF],
                [INF, INF, INF],
            ],
            0,
            [0, INF, INF],
        ],
        [
            "큰 가중치 그래프",
            [
                [INF, 1000000, INF],
                [1000000, INF, 1000000],
                [INF, 1000000, INF],
            ],
            0,
            [0, 1000000, 2000000],
        ],
        [
            "마지막 노드에서 시작",
            [
                [INF, 1, INF],
                [1, INF, 2],
                [INF, 2, INF],
            ],
            2,
            [3, 2, 0],
        ],
    ])("%s", (name, graph, start, expected) => {
        const result = dijkstra(graph, start);
        expect(result).toEqual(expected);
    });
});
