## AS-IS

```js
function solution(board) {
    const dx = [0, 0, -1, 1];
    const dy = [1, -1, 0, 0]; // 남,북,좌,우
    const N = board.length;
    const heap = new MinHeapShort((a, b) => a[2] - b[2]); // distance
    const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));

    if (board[0][1] === 0) {
        dist[0][1] = 100;
        heap.push([0, 1, 100, 3]);
    }
    if (board[1][0] === 0) {
        dist[1][0] = 100;
        heap.push([1, 0, 100, 0]);
    }

    let minCost = Infinity;

    while (!heap.isEmpty()) {
        const [y, x, distance, prevDir] = heap.pop();
        if (distance > dist[y][x]) continue;
        console.log(
            `[pop] (${y},${x}), distance: ${distance}, prevDir: ${prevDir}`
        );
        if (y === N - 1 && x === N - 1) {
            minCost = Math.min(minCost, distance);
        }

        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && board[ny][nx] === 0) {
                // 직전의 방향을 알아야 함.
                const ndist = distance + (dir === prevDir ? 100 : 600);
                console.log(
                    `[push] (${y},${x} => ${ny},${nx}), prevDir:${prevDir} -> dir:${dir}, ndist: ${ndist}`
                );
                // 다른 방향으로 들어왔을 때 같은 값일 수 있음
                if (ndist > dist[ny][nx]) continue;
                dist[ny][nx] = ndist;
                heap.push([ny, nx, ndist, dir]);
            }
        }
    }

    return minCost;
}
```

## TO-BE

`[y][x]`에 대한 dist만 구분하면 아래와 같은 문제가 있음
[반례] (3,3) -> (4,4)로 이동할 때 [아래->오른] 경로만 사용 가능한 경우,
(3,3)에 (오른)으로 도착했더라도 이후 비용이 700 vs 1200 으로,
(3,3) 도달 당시 500원 이상 더 저렴하게 오지 않았다면 최단 경로가 아니게 됨
때문에 모든 edge의 개수를 4배로 증가시키더라도(dir) 모두 체크해야 함
이를 위해서는 `dist[y][x]`를 dir 단위로 구분해야 하며, 이는 1차원 늘리는 것으로 쉽게 해결 가능
다익스트라 알고리즘에 영향을 주는 문제는 아니고, edge를 늘리는 문제임.
따라서 방문 자체는 dir와 무관하게 distance 순서로 방문하며, 최종 단계에서는 `dist[y][x]`만 봐도 무관함

```js
function solution(board) {
    const dx = [0, 0, -1, 1];
    const dy = [1, -1, 0, 0]; // 남,북,좌,우
    const N = board.length;
    const heap = new MinHeapShort((a, b) => a[2] - b[2]); // distance

    const dist = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Array(N).fill(Infinity))
    );

    if (board[0][1] === 0) {
        dist[0][1][3] = 100;
        heap.push([0, 1, 100, 3]);
    }
    if (board[1][0] === 0) {
        dist[1][0][0] = 100;
        heap.push([1, 0, 100, 0]);
    }

    while (!heap.isEmpty()) {
        const [y, x, distance, prevDir] = heap.pop();
        if (distance > dist[y][x]) continue;
        // 무슨 방향으로 오든 처음 도달하면 최단 비용 경로
        if (y === N - 1 && x === N - 1) {
            return distance;
        }

        for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && board[ny][nx] === 0) {
                const ndist = distance + (dir === prevDir ? 100 : 600);
                if (ndist >= dist[ny][nx][dir]) continue;
                console.log(`pushing ${ny},${nx},${dir} (dist=${ndist})`);
                dist[ny][nx][dir] = ndist;
                heap.push([ny, nx, ndist, dir]);
            }
        }
    }
}
```
