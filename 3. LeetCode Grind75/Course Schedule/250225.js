/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
/*
[문제]
- numCourses = 정수 -> 개 만큼 수업 들어야 함 (<= 2,000)
- prerequisites는 정수 (a,b) 배열의 배열로, a의 선수과목이 b라는 의미 (길이 <= 5,000)
- 모든 과목을 수강할 수 있는지 여부를 반환

[해결 방법]
- 명확히 떠오르지는 않음.
- 열심히 추론해보니 "사이클이 없어야 된다"까지는 알겠는데, 그걸 어떻게 하는지는 모르곘어서 20분만에 gg
*/
var canFinish = function (numCourses, prerequisites) {
    // 인접 리스트로 해본다-!
    const vertices = Array.from({ length: numCourses }, () => []);
    const inDegrees = Array(numCourses).fill(0);
    for (const [course, prerequisite] of prerequisites) {
        vertices[prerequisite].push(course);
        inDegrees[course]++;
    }

    let numOfSourceNodes = 0;
    const sourceNodesToVisit = [];

    for (let course = 0; course < numCourses; course++) {
        if (inDegrees[course] === 0) {
            sourceNodesToVisit.push(course);
        }
    }

    while (sourceNodesToVisit.length > 0) {
        const currSourceNode = sourceNodesToVisit.shift();
        numOfSourceNodes++;
        const nextCourses = vertices[currSourceNode];
        nextCourses.forEach((nextCourse) => {
            inDegrees[nextCourse]--;
            if (inDegrees[nextCourse] === 0) {
                sourceNodesToVisit.push(nextCourse);
            }
        });
    }

    return numOfSourceNodes === numCourses;
};
