import { describe, it, assert } from "vitest";

/*
[조건 이해]
1. [0, numCourses - 1] 번 코스가 존재함
2. [후수과목,선수과목]쌍 배열이 주어짐.
3. 모든 과목을 들을 수 있는지 여부를 반환

[세부 조건]
1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/
describe("Course Schedule", () => {
    it.each([
        // 기본
        [1, [], true],
        [2, [], true],
        [2, [[1, 0]], true],
        // 예외
        [1, [[0, 0]], false],
        // 전이가 없는 경우
        [
            3,
            [
                [2, 0],
                [2, 1],
            ],
            true,
        ],
        // 전이가 있는 경우
        [
            2,
            [
                [1, 0],
                [0, 1],
            ],
            false,
        ],
        // 유효하지 않은 전이가 있는 경우 (cycle)
        [
            3,
            [
                [2, 1],
                [1, 0],
                [0, 2],
            ],
            false,
        ],
        [
            4,
            [
                [1, 2],
                [1, 3],
                [2, 3],
            ],
            true,
        ],
        // 리트코드 실패 TC
        // 3->[1,2]->4
        [
            5,
            [
                [1, 4],
                [2, 4],
                [3, 1],
                [3, 2],
            ],
            true,
        ],
        // 리트코드 TC
        [
            10,
            [
                [5, 8],
                [3, 5],
                [1, 9],
                [4, 5],
                [0, 2],
                [7, 8],
                [4, 9],
            ],
            true,
        ],
    ])("%j => %j", (numCourses, prerequisites, expected) => {
        const result = canFinish(numCourses, prerequisites);
        assert.equal(result, expected);
    });
});

/*
[해답 풀이에서 배운 것]
1. 희소 배열을 사용함
2. 각 시작점에 대해 '현재 노드에서 방문 가능한 그래프'(서브 그래프)를 탐색함.
3. 서브 그래프만 탐색하기 위해 VISITED를 구분

[내 풀이가 잘못 된 것]
1. Visited를 어떻게 사용할지 결론을 내리지 못 했음(중복 방문 vs 사이클 탐지). 그래프를 그려봤으면 좀 더 쉬웠을 것 같음.
2. 그래프를 완성하지 않고 경로만 순회해서 해결하고자 함. (접근이 잘못돼서 문제가 어려워짐)
3. 결국 어떻게든 구현하려 선택한 풀이는 시간 복잡도 = O(V^3)
    - 각 경로를 추가할 때마다 visited 없이 dfs 탐색
    - 시간복잡도 = O(시작노드 * 간선개수 * 재귀 깊이) (참고: 재귀의 최대 깊이는 1차원으로 쭉이어져 있을 때 V)
    - 이 풀이에서 더 나은 방법을 찾을 수 없었음.

[다른 풀이 - 위상 정렬]
- 시간 상 생략...
*/
var canFinish = function (numCourses, prerequisites) {
    const NOT_VISITED = 0;
    const VISITING = 1;
    const VISITED = 2;

    const nextCourses = Array.from({ length: numCourses }, () => []);
    const visitStatus = Array(numCourses).fill(NOT_VISITED);

    // 1. 단방향 그래프를 구성해둠
    // DFS로 풀 거라면 코스의 선/후수 순서는 무관함 (위상 정렬 시에는 의미 있을 듯)
    for (const [course, preCourse] of prerequisites) {
        nextCourses[preCourse].push(course);
    }

    // 2. 섬 방문하기로 보면 됨.
    // DFS/BFS를 활용해 섬(서브그래프)을 방문하면, 사이클은 무조건 나옴
    // 때문에 이미 방문한 서브그래프는 생략 가능하므로, 시작 노드에서 탐색 생략 가능하므로, visited로 체크해 생략.
    for (let startCourse = 0; startCourse < numCourses; startCourse++) {
        if (visitStatus[startCourse] !== NOT_VISITED) {
            // NOTE: VISITING 단계는 이 때 있을 수 없음.
            continue;
        }
        if (!dfs(startCourse)) {
            return false;
        }
    }

    // 3. DFS로 방문할 수 있는 그래프의 모든 노드를 방문함.
    // 방문 중에 또 방문하는 경우 사이클임.
    // 이미 방문한 노드는 방문하지 않음.
    // 이 때, '이미 방문' 과 '신규 방문'을 구분해야 함.
    // '이미 방문'된 노드는 이미 온전한 서브 그래프를 구성하고 있음. 신규 노드와의 사이클 발생이 불가능함 (이미 전부 방문)
    // 때문에 '이미 방문'된 노드는 방문이 낭비임
    function dfs(courseNotVisited) {
        visitStatus[courseNotVisited] = VISITING;

        for (const nextCourse of nextCourses[courseNotVisited]) {
            if (visitStatus[nextCourse] === VISITED) {
                continue;
            }
            if (visitStatus[nextCourse] === VISITING) {
                return false;
            }
            if (!dfs(nextCourse)) {
                return false;
            }
        }

        // 해당 course에서 도달 가능한 모든 노드를 도달한 후, '이미 방문' 상태로 바뀜
        visitStatus[courseNotVisited] = VISITED;
        return true;
    }

    return true;
};
