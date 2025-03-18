/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
/*
[문제]
- m * n 행렬에서 각 셀 기준으로 0과의 최소 거리를 반환
- 대각선 거리 개념 없음. 두 번의 이동이 필요하므로, 2임.

[해결 방법]
- 브루트포스로 3중 포문으로 해결 가능
    - 각 셀에 대해 2중 포문으로 가까운 위치 발견
- 성능 개선
    - (막힘)
    - 모든 0에서 1로 이동하면 될 거 같은데?
    - BFS로 이동 횟수만큼 거리 지정
    - 이미 방문한 셀은 무시
    - 모든 0에서 출발
    - 같은 0으로는 이동X (어차피 그쪽 0에서 더 빠르게 도달)
    - 시간 복잡도: O(N*M)일 거 같은데?
        - 방문 횟수가 그거라서. 응.
*/
var updateMatrix = function (mat) {
    const d = [0, -1, 0, 1, 0]; // dx, dy 공용
    // dx 0, -1, 0, 1
    // dy -1, 0, 1, 0

    const HEIGHT = mat.length;
    const WIDTH = mat[0].length;

    const distances = Array.from({ length: HEIGHT }, () =>
        Array(WIDTH).fill(-1)
    );

    const queue = [];

    // 모든 0에서 시작
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (mat[y][x] === 0) {
                queue.push([y, x]); // 시작할 때 0이 됨
                distances[y][x] = 0;
            }
        }
    }

    while (queue.length > 0) {
        const [y, x] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const ny = y + d[i];
            const nx = x + d[i + 1];
            // 0이면 거리 할당과 전파는 여기서 중단
            if (
                ny < 0 ||
                ny >= HEIGHT ||
                nx < 0 ||
                nx >= WIDTH ||
                distances[ny][nx] >= 0
            ) {
                continue;
            }
            distances[ny][nx] = distances[y][x] + 1;
            queue.push([ny, nx]);
        }
    }

    return distances;
};
