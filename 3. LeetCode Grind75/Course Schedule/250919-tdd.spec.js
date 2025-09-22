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

[접근 1 - 실패]
1. cycle이 생기면 수강 불가임. 그럼 그냥 cycle을 찾기만 하면 되는 거네?
2. 이거 분명히 알고리즘 있을텐데... 일단 그냥 고
3. N*N 배열 만들어서 인접행렬 만들기, 일단 단방향으로 생각.
4. [a,b] 페어가 있으면, a->b 인 거임. 그리고, a에 의존하는 모든 놈들 c에 대해 c->b 넣어줘야 함.
5. 여기서 c를 어케 구함? 양방향이 아닌데? 일단 고.
6. 넣다가, 다시 돌아올 수 있으면? 끝
7. 일단 다 넣고, cycle이 있는지는 전체를 다 살펴봐야겠는데? 즉, 모든 노드에 대해 시작점으로 두고, visited한 애를 다시 만나면 사이클이 있는 거임.
8. (7)처럼 하면 (4)의 c->b 연결 없어도 될 거 같음. 어떻게 구현할지 아직도 모르겠고.

[새로 접근]
1. '전이'는 나중에 완성될 수도 있음. 특정 경로 하나 추가가 많은 경로 갱신을 일으킬 수 있음. 때문에, 모든 영향을 즉시 전파하면 복잡하고, 비효율적일 듯함.
2. 모든 '전이'를 매번 갱신하지 않고, 길만 이어주고, 각 노드에서 출발해서, 다시 돌아올 수 있는지만 확인하며 간단할 듯함.
    - n = 2,000
    - 시간 복잡도 = 시작점 순회 (n) * 시작점으로부터 돌아올 수 있는지 확인 (모든 노드가 서로 연결되어 있으면: n^2) => O(n^3)
3. 더 빠른 방식을 알아내야 함.
4. 그냥 아무 곳에서나 출발해도, 기존에 출발한 곳에 도착하면 사이클 아님?
    - e.g. 2->1 이고 2->1, 1->2 인 게 있으면 사이클
        - 중간 과정에 대한 이해가 필요함
        - (From->to)를 반대로 저장하면 어떰?
        - [2,1] 이면, fromMap[1][2] = true;
        - 이렇게 하면, 2로 온 곳들을 파악할 수 있음. 이것들만 쭉 따라갔는데, 다시 2가 나오면 되는 거임.
        - 이렇게 그냥 아무 곳에서나 시작했는데 이미 방문한 곳에 다시 도달하면 그게 사이클임
            - pf) 사이클인 경우: 
                2->0->1->[2]!
                1->0->[1] !
            - pf) 사이클 아닌 경우:
                3->1->2
                   1->4
                      2->4
                3->2
                3->4
                이 경우를 어떻게 처리할 수 있을까?

                정렬을 해두면 해결이 되나?
                - 아닌 거 같음.
                
                - 이미 방문한 경로는 다시 방문할 의미가 없음. 맞네. 이거 맞네. 동일 경로를 발견하게 될 때가 문젠데? 그쵸?
                    - 노드는 거쳐가는 게 많을 수 있음. 그걸로 중복 체크는 어려움.
                    - 대신 DFS로 해야 하나?
                    - 정상일 때도, 동일 경로도 방문 가능함. 5->3 하나만 추가되어도 경로를 중복 방문하게 되는 것임.
                - 흠;; 그래프로 그려야 이해가 되려나
                    - 5->4->3->2->1 을 통과하는 방법?
                    - 1 체크
                    - 2 체크
                    - 3 체크
                    - 4 체크
                    - 5 체크
                    - 캐싱을 하긴 해야겠는데요
                        - 중복 경로 방문은 사이클일 수 있음.
                - 각 노드를 시작점으로 방문함
                    - 방문할 수 있는 모든 경로를 방문해서, 연결 노드도 다 방문함
                - 이후 시작점 노드가 이미 방문한 노드이고, 해당 노드에서 이미 방문한 경로가 존재하는 경우 (해당 경로가 이미 방문된 거라면 당연히 방문한 노드여야 함)
                    - 그럼 사이클이다
                        - 맞냐?
                            - 5->4->3->2->1
                            - 1->5
                            - 1: 방문한 놈, 5: 방문한 놈 --> 사이클
                            - 이거 경로 체크가 아니네?
                            - 오케이
                            - 아 그럼 쉬운데?
                            - 둘 다 방문한 노드인 경로는 사이클 생성기네
                            - 개쉬운데 그럼?

        - 모든 노드를 시작점으로 순회하며 시작해서 끝까지 다 살펴보되, 이미 해당 노드가 방문된 경우는 생략하면 -> O(n^2)로 방문 가능함.
            - 생략이 가능함? 생략은 노드 방문이 아니라 경로 방문이어야 할 듯
            - 노드 방문은 체크만 할 뿐
        - 흠...?
        - 

[그 다음의 접근]
되게 기본적인 TC인데 안 됨
기존 로직으로는 구현 불가능함
a를 듣기 위해선 b를 먼저 들어야 함
근데, b를 듣기 위해서 a를 들어야 함?
--> 하.. 이거 결국 모든 Case를 만들 수밖예 없겠네
--> 전이가 될 때마다 Case를 만들고, [a,a]를 만드는 경우에 실패하게 하면 됨.
*/
describe("Course Schedule", () => {
    it.each([
        [
            5,
            [
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 1],
            ],
            false,
        ],
        // // 기본
        // [1, [], true],
        // [2, [], true],
        // [2, [[1, 0]], true],
        // // 예외
        // [1, [[0, 0]], false],
        // // 전이가 없는 경우
        // [
        //     3,
        //     [
        //         [2, 0],
        //         [2, 1],
        //     ],
        //     true,
        // ],
        // // 전이가 있는 경우
        // [
        //     2,
        //     [
        //         [1, 0],
        //         [0, 1],
        //     ],
        //     false,
        // ],
        // // 유효하지 않은 전이가 있는 경우 (cycle)
        // [
        //     3,
        //     [
        //         [2, 1],
        //         [1, 0],
        //         [0, 2],
        //     ],
        //     false,
        // ],
        // [
        //     4,
        //     [
        //         [1, 2],
        //         [1, 3],
        //         [2, 3],
        //     ],
        //     true,
        // ],
        // // 리트코드 실패 TC
        // // 3->[1,2]->4
        // [
        //     5,
        //     [
        //         [1, 4],
        //         [2, 4],
        //         [3, 1],
        //         [3, 2],
        //     ],
        //     true,
        // ],
    ])("%j => %j", (numCourses, prerequisites, expected) => {
        const result = canFinish(numCourses, prerequisites);
        assert.equal(result, expected);
    });
});

/*
성능 개선 방법

1. 희소 배열로 구성하기 -> CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
    - 잘못 짠 거 같긴 함
    - 희소배열 해도, 존재성 확인을 해야 해서 O(n)이 또 들어가서 의미 없는 것 같음.
2. 메모이제이션, 캐싱
3. prerequisites를 순회하는 건 어떨까

-잘 모르겠다. 서렌이다-

[옛날 풀이에서 배운 것]
1. 희소 배열을 사용함
2. 각 시작점에 대해 '현재 노드에서 방문 가능한 그래프'(서브 그래프)를 탐색함.
3. 서브 그래프만 탐색하기 위해 VISITED를 구분

[내 풀이가 잘못 된 것]
1. 각 경로를 추가할 때마다 dfs 탐색 -> 최적화 여지가 없음?
2. 

[다른 풀이 - 위상 정렬]
1. 
*/
var canFinish = function (numCourses, prerequisites) {
    const preCourseMap = Array.from({ length: numCourses }, () => []);
    const visitStatus = Array(numCourses).fill(0);

    function transitiveMap(course, preCourse) {
        // transitive cycle adding...
        if (course === preCourse) {
            return false;
        }

        // 무한 루프 방지
        if (preCourseMap[preCourse].includes(course)) {
            return false;
        }

        preCourseMap[course].push(preCourse);
        console.log(`course[${course}] -> preCourse[${preCourse}]`);

        for (const prePreCourse of preCourseMap[preCourse]) {
            // preCourse 통해서 도달할 수 있는 cycle 확인
            // 누적되니까 추후 실제 cycle을 발생시키는 의존관계가 추가될 때 cycle이 발견됨
            console.log(
                `[trans] course[${course}] -> prePreCourse[${prePreCourse}]`
            );
            if (!transitiveMap(course, prePreCourse)) {
                return false;
            }
        }

        return true;
    }

    for (const [course, preCourse] of prerequisites) {
        if (visitStatus > 0) {
            continue;
        }
        if (!transitiveMap(course, preCourse)) {
            return false;
        }
    }

    return true;
};
