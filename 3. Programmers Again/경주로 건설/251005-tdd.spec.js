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
    - 이번에는 인접 행렬(N^2), 4방향이므로 O(4N^2 log V)이다.
5. 단순 다익스트라와는 다르게, 방향 별로 구분해야 함
    - [y,x]로 식별되는 각 좌표를 정점(vertex)으로 보고 4방향에 대한 edge가 있다고 볼 수 있음
    - 길이는 어떤 edge(방향)에서 들어오든 상관이 없음.
    --> 이렇게 풀면 88점이고, 내 TC에서도 한 개 틀림
    --> 이렇게 하면 문제가 뭐냐면, '현재까지 비효율적인 경로'가 '이후' 효율적일 수 있다는 점임
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
        [
            [
                [0, 0, 1, 0, 0], // down +100
                [0, 0, 0, 0, 0], // right,right,down +600+100+600
                [0, 1, 0, 1, 0], // down +100
                [1, 0, 0, 0, 0], // down + 100
                [1, 0, 0, 0, 0], // right,right + 600,100
            ],
            2300,
        ],
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
        // // 프로그래머스 TC
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
        //         [0, 0, 1, 0], // down +100
        //         [0, 0, 0, 0], // right,right,down+600+100+600
        //         [0, 1, 0, 1], // down + 100
        //         [1, 0, 0, 0], // right + 600
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
    const dx = [0, 0, -1, 1];
    const dy = [1, -1, 0, 0]; // 남,북,좌,우
    const N = board.length;
    const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));
    const heap = new MinHeapShort((a, b) => a[2] - b[2]); // distance

    // dijkstra
    dist[0][0] = 0;
    if (board[0][1] === 0) {
        dist[0][1] = 100;
        heap.push([0, 1, 100, 3]);
    }

    if (board[1][0] === 0) {
        dist[1][0] = 100;
        heap.push([1, 0, 100, 0]);
    }
    while (!heap.isEmpty()) {
        const [y, x, distance, prevDir] = heap.pop();
        if (distance > dist[y][x]) continue;

        if (y === N - 1 && x === N - 1) {
            return distance;
        }

        console.log(
            `[pop] (${y},${x}), distance: ${distance}, prevDir: ${prevDir}`
        );

        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (
                // 되돌아가는 것 방지
                !(
                    (dir === 1 && prevDir === 0) ||
                    (dir === 0 && prevDir === 1) ||
                    (dir === 2 && prevDir === 3) ||
                    (dir === 3 && prevDir === 2)
                ) &&
                nx >= 0 &&
                nx < N &&
                ny >= 0 &&
                ny < N &&
                board[ny][nx] === 0
            ) {
                // 직전의 방향을 알아야 함.
                const ndist = distance + (dir === prevDir ? 100 : 600);
                console.log(
                    `[push] (${y},${x} => ${ny},${nx}), prevDir:${prevDir} -> dir:${dir}, ndist: ${ndist}`
                );
                console.log(`heap: ${JSON.stringify(heap.arr)}`);
                // 다른 방향으로 들어왔을 때 같은 값일 수 있음
                if (ndist > dist[ny][nx]) continue;
                dist[ny][nx] = ndist;
                heap.push([ny, nx, ndist, dir]);
            }
        }
    }
}

// 그대로 가져옴
export function MinHeapShort(_comp) {
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
        arr,
    };
}
