import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. N x N 크기의 정사각형 격자(0 = 빈 공간, 1 = 벽)에 대해 좌상단에서 우하단으로의 경주로를 만드는 필요한 최소 비용 = ?
    - 비용 = 직선 간 연결: 100, 회전 발생 시 100+500

[제한 조건]
1. 3 <= N <= 25
2. 최소 1개 이상의 경로가 가능

[발상]
1. DFS, BFS로 모든 '경로'를 생성
    - 경로를 어떻게 만드는 걸까?
        - BFS, DFS든 경로를 보관한 채로 이동하면 되긴 함
            - 모든 경로를 만들 수 있을까?
                - 이거는 당연히 될 듯?
        - 직전 방향을 보관해야 직진/회전 여부 구분이 가능함
        - 가격 합계를 미리 보관해두어 쉽게 계산하도록 구성
        - 보관하지 않고 이동하는 방법? DFS는 그건데?
            - visited로 가능하잖아?
            - 갔다 오면, 무한 루프 도는 거 아님? 언제 종료됨?
            - DFS라서 무한 루프는 아닐 듯? BFS는 무한 루프 될 수도

2. 아.. 무한 루프가 발생하는데, 이유를 모르겠음
    - visited를 초기화하더라도 dfs 상 4번의 루프 이후로 방문하지 않을 거라고 생각했는데- 아닌듯?
    - 무한 루프가 아니라, 순회가 엄청나게 긴 것.

[GPT]
- N=3, 추정 호출 횟수 620
- N=4, 수백
- N=5, 수만
- N=6, 수백만~수억
- N=8, 사실상 무한

[개념 학습]
1. DFS, BFS 기반 단순 모든 경로 조회는 경우의 수가 너무 많아 불가
2. BFS를 사용하면 최단 경로를 구할 수 있지만 이 문제는 가중치가 존재해 불가
3. 결국 모든 경로를 조회는 하되, 불필요한 조회를 줄이는 가지치기가 필요함 (!!)
4. 가지치기를 위해서는 캐싱이 필요하며, greedy, DP 기반의 다익스트라가 존재함
    - 다익스트라는 greedy, dp 기반의 알고리즘으로 PQ를 활용하면 시간복잡도가 O(E log V)이다.
    - 256 * 6 = 1,536
    --> 

*/
describe("경주로 건설 (Lv.3)", () => {
    it.each([
        // 기본 TC
        // [
        //     [
        //         [0, 0, 0],
        //         [0, 1, 0],
        //         [0, 0, 0],
        //     ],
        //     900,
        // ],
        // [
        //     [
        //         [0, 0, 1, 0, 0],
        //         [0, 0, 0, 0, 0],
        //         [0, 1, 0, 1, 0],
        //         [1, 0, 0, 0, 0],
        //         [1, 0, 0, 0, 0],
        //     ],
        //     0,
        // ],
        // [
        //     [
        //         [0, 0, 0, 0, 0, 0, 0, 0],
        //         [0, 0, 0, 0, 0, 0, 0, 0],
        //         [0, 0, 0, 0, 0, 0, 0, 0],
        //         [1, 1, 1, 1, 1, 1, 1, 0],
        //         [1, 1, 1, 1, 1, 1, 1, 0],
        //         [0, 0, 0, 0, 0, 0, 0, 0],
        //         [1, 1, 1, 1, 1, 1, 1, 0],
        //         [1, 1, 1, 1, 1, 1, 1, 0],
        //     ],
        //     1900,
        // ],
        // 프로그래머스 TC
        // [
        //     [
        //         [0, 0, 0],
        //         [0, 0, 0],
        //         [0, 0, 0],
        //     ],
        //     900,
        // ],
        // [
        //     [
        //         [0, 0, 0, 0, 0, 0, 0, 1],
        //         [0, 0, 0, 0, 0, 0, 0, 0],
        //         [0, 0, 0, 0, 0, 1, 0, 0],
        //         [0, 0, 0, 0, 1, 0, 0, 0],
        //         [0, 0, 0, 1, 0, 0, 0, 1],
        //         [0, 0, 1, 0, 0, 0, 1, 0],
        //         [0, 1, 0, 0, 0, 1, 0, 0],
        //         [1, 0, 0, 0, 0, 0, 0, 0],
        //     ],
        //     3800,
        // ],
        // [
        //     [
        //         [0, 0, 1, 0],
        //         [0, 0, 0, 0],
        //         [0, 1, 0, 1],
        //         [1, 0, 0, 0],
        //     ],
        //     2100,
        // ],
        // [
        //     [
        //         [0, 0, 0, 0, 0, 0, 0],
        //         [0, 1, 1, 1, 1, 0, 0],
        //         [0, 0, 1, 0, 0, 0, 0],
        //         [1, 0, 0, 1, 0, 1, 0],
        //         [0, 1, 0, 0, 0, 1, 0],
        //         [0, 0, 0, 0, 0, 0, 0],
        //         [0, 0, 0, 0, 0, 0, 0],
        //     ],
        //     1700,
        // ],
    ])("%j => %j", (board, expected) => {
        const result = solution(board);
        assert.deepEqual(result, expected);
    });
});

function solution(board) {
    let minCost = Infinity;

    const dy = [0, 0, -1, 1];
    const dx = [1, -1, 0, 0]; // 남,북,좌,우
    const N = board.length;
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let currCost = 0;
    const prevDirections = [];

    console.log(`N:${N}`);

    function dfs(y, x) {
        if (visited[y][x]) {
            return;
        }

        if (y === N - 1 && x === N - 1) {
            minCost = Math.min(minCost, currCost);
            console.log(`minCost update:`, minCost);
            return;
        }

        console.log(`visiting:${y},${x}`);

        visited[y][x] = true;

        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (
                nx >= 0 &&
                nx < N &&
                ny >= 0 &&
                ny < N &&
                !visited[ny][nx] &&
                board[ny][nx] === 0
            ) {
                const prevDir = prevDirections[prevDirections.length - 1];
                const nextCost =
                    prevDirections.length === 0
                        ? 100
                        : prevDir === dir
                        ? 100
                        : 600;

                currCost += nextCost;
                prevDirections.push(dir);
                dfs(ny, nx);
                prevDirections.pop();
                currCost -= nextCost;
            }
        }

        visited[y][x] = false;
    }

    dfs(0, 0);

    return minCost;
}
