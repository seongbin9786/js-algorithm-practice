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

[접근]
1. cycle이 생기면 수강 불가임. 그럼 그냥 cycle을 찾기만 하면 되는 거네?
2. 이거 분명히 알고리즘 있을텐데... 일단 그냥 고
3. N*N 배열 만들어서 인접행렬 만들기, 일단 단방향으로 생각.
4. [a,b] 페어가 있으면, a->b 인 거임. 그리고, a에 의존하는 모든 놈들 c에 대해 c->b 넣어줘야 함.
5. 여기서 c를 어케 구함? 양방향이 아닌데? 일단 고.
6. 넣다가, 다시 돌아올 수 있으면? 끝
7. 일단 다 넣고, cycle이 있는지는 전체를 다 살펴봐야겠는데? 즉, 모든 노드에 대해 시작점으로 두고, visited한 애를 다시 만나면 사이클이 있는 거임.
8. (7)처럼 하면 (4)의 c->b 연결 없어도 될 거 같음. 어떻게 구현할지 아직도 모르겠고.

이걸로 동작이 될까??

*/
describe("Course Schedule", () => {
    it.each([
        // 기본
        [2, [[1, 0]], true],
    ])("%j => %j", (numCourses, prerequisites, expected) => {
        const result = canFinish(numCourses, prerequisites);
        assert.equal(result, expected);
    });
});

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    // 등록
    const courses = Array.from({ length: numCourses }, () =>
        Array(numCourses).fill(false)
    );
    prerequisites.forEach(([a, b]) => {
        courses[a][b] = true;
    });

    // 사이클 확인
    return true;
};
