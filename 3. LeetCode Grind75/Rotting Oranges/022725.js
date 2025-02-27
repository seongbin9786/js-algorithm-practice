/**
 * @param {number[][]} grid
 * @return {number}
 */
/*
[문제]
- 썩은 오렌지에 동서남북으로 인접한 오렌지는 1분 후에 썩음
- 0=빈칸, 1=정상오렌지, 2=썩은오렌지
- 전체오렌지가 썩는데 걸리는 최소 시간 반환
- 그게 불가능하면 -1 반환
- y,x칸수 <= 10

[해결 방법]
- 맨 처음 썩은 오렌지들의 위치를 파악해 배열에 넣는다.
- 1분 후 
- 흠...

- 이런 방식이 아닐 수도 있겠다?
- 썩은 애들로부터 제일 먼 놈을 찾는 게 답일 수도 있겠음
    - 이게 맞을텐데
    - 썩은 애들을 다 큐에 넣고 BFS 돌려서 distance ++ 해서 maxDistance를 하면 됨
- 이렇게 해놓고 남는 애들이 있는지는 알 수 없음.
- 도달 가능하냐 안하냐는 완전 별도로 한 바퀴를 더 돌려야 할 듯?
    - 맨 첨에 썩은 애들 찾을 때 확인해야 되나?
        - 섬 찾고 섬마다 썩은애 있는지 찾는 건 좀 그렇다...
    - 그냥 큐 다 돌았는데 프룻 다 못 만났으면 안 되는 걸로 합시다
*/
var orangesRotting = function (grid) {
    const MAX_Y = grid.length;
    const MAX_X = grid[0].length;
    const visited = Array.from({ length: MAX_Y }, () =>
        Array(MAX_X).fill(false)
    );

    let fruitsToVisit = 0;
    const queue = [];

    for (let y = 0; y < MAX_Y; y++) {
        for (let x = 0; x < MAX_X; x++) {
            if (grid[y][x] === 1) {
                fruitsToVisit++;
            }
            if (grid[y][x] === 2) {
                queue.push([y, x, 0]);
            }
        }
    }

    if (fruitsToVisit === 0) {
        return 0;
    }

    const d = [1, 0, -1, 0, 1];

    let maxDistance = 0;
    while (queue.length > 0) {
        const [y, x, distance] = queue.shift();
        if (visited[y][x]) continue;
        visited[y][x] = true;
        if (grid[y][x] === 1) {
            fruitsToVisit--;
            grid[y][x] = 2;
            maxDistance = Math.max(maxDistance, distance);
        }

        for (let i = 0; i < 4; i++) {
            const nx = x + d[i];
            const ny = y + d[i + 1];

            if (
                nx < 0 ||
                nx >= MAX_X ||
                ny < 0 ||
                ny >= MAX_Y ||
                visited[ny][nx]
            )
                continue;
            if (grid[ny][nx] > 0) {
                queue.push([ny, nx, distance + 1]);
            }
        }
    }

    return fruitsToVisit > 0 ? -1 : maxDistance;
};
