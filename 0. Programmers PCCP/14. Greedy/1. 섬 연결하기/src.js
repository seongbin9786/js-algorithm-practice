let MAP;

// O(N)
// 도달 가능한 모든 노드를 서로 공유함
const connect = (islandA, islandB) => {
    // 간접 연결을 추가해야 함.
    for (let neighbor = 0; neighbor < MAP.length; neighbor++) {
        if (MAP[islandA][neighbor]) {
            MAP[islandB][neighbor] = true;
            MAP[neighbor][islandB] = true;
        }
        if (MAP[islandB][neighbor]) {
            MAP[islandA][neighbor] = true;
            MAP[neighbor][islandA] = true;
        }
    }

    // 직접 연결
    MAP[islandA][islandB] = true;
    MAP[islandB][islandA] = true;
};

/**
 * @param {number} n 섬의 개수
 * @param {number[][]} costs [islandA, islandB, cost]의 배열
 */
const solution = (n, costs) => {
    // 1. 방문 가능 맵 생성
    MAP = Array.from(Array(n), (_) => Array(n).fill(false));

    // 2. 비용 오름차순으로 정렬
    costs.sort(
        ([aOrg, aDst, aCost], [bOrg, bDst, bCost]) =>
            aCost - bCost || aOrg - bOrg || aDst - bDst,
    );

    // 3. 최소 가격의 첫 다리는 무조건 구매
    const [[islandA, islandB, firstCost], ...otherCosts] = costs;
    let totalCost = firstCost;
    let connectedIslands = 2;
    connect(islandA, islandB);

    // 4. 다리를 순회하며 미연결 노드인 경우 연결
    while (connectedIslands < n) {
        // 순서를 유지하면서 확인해서 문제였음. 매번 순서를 초기화해야 함.
        for (const [islandA, islandB, cost] of otherCosts) {
            // 5. XOR - 둘 중 하나만 방문이어야 함
            const visitedA = MAP[islandA].filter((v) => !!v).length > 0;
            const visitedB = MAP[islandB].filter((v) => !!v).length > 0;
            if (!(visitedA ^ visitedB)) {
                continue;
            }

            // 6. 결제
            totalCost += cost;

            // 7. 미연결인 만큼 방문한 섬 추가
            if (!visitedA) connectedIslands++;
            if (!visitedB) connectedIslands++;

            // 8. 연결해서 map 갱신
            connect(islandA, islandB);
            break;
        }
    }
    return totalCost;
};
