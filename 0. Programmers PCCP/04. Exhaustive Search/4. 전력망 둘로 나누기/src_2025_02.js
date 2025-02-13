/*
    [문제]
    - 트리에서 간선을 하나 제거해 2개로 분할
    - 나뉜 두 트리의 정점의 수를 최대한 비슷하게 해야.
    - 두 트리의 정점의 개수 차이를 반환

    [해결 방법]
    - 완전 탐색으로 해결
    - 끊을 wire 선정을 위해 wires 순회
    - wire의 [a, b]를 제외하고 두 개의 트리 구축
    - 두 트리는 [a], [b]를 시작점으로 탐색
    - 두 트리의 정점의 개수의 차이의 min을 계산해 반환

    [잘 모르겠는 부분 / 해소됨]
    - 트리를 어떻게 구축할지? BFS로 함
    - 트리 자체는 하나로 구축하고, 각각 탐색하면 끝날 듯? YES
    - 인접 리스트(?)로 구현 YES

    [추가 전제]
    - 중복되는 간선은 없다고 가정
*/
const getAllTowers = (tree, startTower) => {
    const queue = [];
    const visited = Array(tree.length).fill(false);

    let towers = 0;

    queue.push(startTower);

    while (queue.length > 0) {
        const currTower = queue.shift();
        if (visited[currTower]) {
            continue;
        }

        visited[currTower] = true;
        towers++;

        for (let neighbor = 0; neighbor < tree.length; neighbor++) {
            if (tree[currTower][neighbor] && !visited[neighbor]) {
                queue.push(neighbor);
            }
        }
    }

    return towers;
};

const solution = (towers, wires) => {
    const tree = Array.from({ length: towers }).map(() =>
        Array(towers).fill(false)
    );

    wires.forEach(([a, b]) => {
        tree[a - 1][b - 1] = true;
        tree[b - 1][a - 1] = true;
    });

    let minTowersDiff = Infinity;

    wires.forEach(([a, b]) => {
        tree[a - 1][b - 1] = false;
        tree[b - 1][a - 1] = false;

        const towersWithA = getAllTowers(tree, a - 1);
        const towersWithB = getAllTowers(tree, b - 1);
        const currTowerDiff = Math.abs(towersWithA - towersWithB);

        tree[a - 1][b - 1] = true;
        tree[b - 1][a - 1] = true;

        minTowersDiff = Math.min(minTowersDiff, currTowerDiff);
    });

    return minTowersDiff;
};
