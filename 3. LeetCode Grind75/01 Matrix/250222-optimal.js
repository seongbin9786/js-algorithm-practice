/*
[문제]
- m * n 이진 행렬 (m,n <= 1만) (y,x)
- 1억 칸
- 각 셀에서 가장 가까운 0까지의 거리를 반환

[해결 방법]
- 0은 그냥 0이다
- 1은 이제 0을 찾아 나서야 하는데..
- O(m^2 * n^2)로 풀어버리면 좀 그럴 것 같지 않나요? 네...
- 일종의 캐시가 있어야 할 것 같은데
- 근데 이거 순회 순서가 중요할 듯?

- 좌상단에서 이렇게 풀면 좀 이상할 것 같음
(ex) 
1 1 1
1 1 1
1 1 0

---
[시도 2]
- 1인 칸을 만나면 시작한다.
- 동서남북에 0이 있으면 1, 1이 있으면 걔의 거리 + 1 이것 중 min을 스스로 할당한다.
- 위의 case에 적용할 수 있을까?
    - 훔... 아예 진도가 안 나가는데 훔

[시도 3]
- 값이 바뀔때마다 전파해주는 건 어떨까?
- 연결된 1끼리만 전파해주면 될 것 같은데
- 반영은 Math.min으로 계속 갱신해보면 됨

(ex)
거리 배열
-1 -1 -1
-1 -1 [-1] <-- 얘가 처음으로 거리=1 됨
-1 -1 -1

(ex)
반영 후
4 3 2
3 2 [1]
4 3 -1

(ex)
거리 배열
4 3 2
3 2 1
2 [1] -1

최종
4 3 2
3 2 1
2 1 0

전파를 어떻게 함?
- BFS를 써야 할텐데 visited를 어떻게 또 유지할 수 있을까-?

다음과 같은 때는 전파가 꼭 필요하다.
대신 순회 방향과 반대를 향하게만 전파하면 루프 안 빠질 거 같은데? 좌상단으로만 이동하게?
--> 이렇게 하면 커버가 안 됨
--> 커버 되긴 함 -> 안댐
전파라는 게 사실상 전범위 순회인데... 흠..


1 1 1 1
1 1 1 1
1 1 1 1
0 1 1 1

15:18 답안 보기 시작함. 이거 못 푸는 문제임

[BFS]
와 BFS로 이게 풀리네
- visited M*N으로 준비
- 0인 위치들에서 시작한다는 게 핵심
- BFS로 방문하면서 1씩 늘려나감. 동서남북으로.
- 이미 방문한 위치는 방문하지 않음. 이미 최단거리의 0으로부터 전파받았을 것임

[DP]
- 좌상단에서 내려오면서 전파
- 우하단에서 올라가면서 전파
- math.min 사용
- DP 치고는 ... 이걸 DP라고 할 수 있는지 모르겠음. 구현?

*/
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const WIDTH = mat[0].length;
    const HEIGHT = mat.length;
    const distances = Array.from({ length: HEIGHT }, () =>
        Array(WIDTH).fill(-1)
    );

    const queue = [];
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (mat[y][x] === 0) {
                queue.push([y, x]);
                distances[y][x] = 0;
            }
        }
    }

    const dy = [1, -1, 0, 0];
    const dx = [0, 0, 1, -1];

    while (queue.length > 0) {
        const [y, x] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (
                nx < 0 ||
                nx >= WIDTH ||
                ny < 0 ||
                ny >= HEIGHT ||
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
