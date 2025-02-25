const NOT_VISITED = 0;
const VISITING = 1;
const VISITED = 2;

var canFinish = function (numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }).map(() => []);

    prerequisites.forEach(([course, preCourse]) => {
        adj[preCourse].push(course);
    });

    // 0 미방문, 1 방문 중, 2 방문 완료
    // 방문 상태가 2가지인 이유는 DFS 방식은 진입 차수 기준 필터링 없이 중간 노드들도 막 탐색하기 때문
    // 방문 중인 노드를 재방문할 때는 해당 <부분 그래프>에서 사이클이 있다는 것이고,
    // 방문 완료인 노드를 방문하는 건 이미 탐색 완료된 <부분 그래프>를 발견한 것으로, 더 나아가봤자 사이클은 없다는 뜻.
    const visited = Array(numCourses).fill(NOT_VISITED);

    const dfs = (course) => {
        if (visited[course] === VISITING) {
            // 사이클 발생. 전파 필요
            return false;
        }
        if (visited[course] === VISITED) {
            // 방문 무시
            return true;
        }

        visited[course] = VISITING;

        for (const nextCourse of adj[course]) {
            // 여기서는
            if (!dfs(nextCourse)) {
                return false; // 사이클 발생 전파
            }
        }

        // 본인 이후는 탐색 완료했으므로, 본인도 "방문 완료" 그래프에 속하게 됨
        // 이는 재귀적으로 호출되어서 <부분 그래프> 전체가 "방문 완료"됨
        visited[course] = VISITED;
        return true; // 꼭 해줘야 함. 아니면 undefined 때문에 falsy로 해석됨.
    };

    for (let course = 0; course < numCourses; course++) {
        if (visited[course] === NOT_VISITED && !dfs(course)) {
            return false;
        }
    }

    return true;
};
