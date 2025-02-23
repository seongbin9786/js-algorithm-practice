/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
/*
[문제]
- 뭔 소리지? 왤케 복잡
- 그냥 interval 넣고 머지하라는 거였음. 근데 머지가 재귀적으로 일어날 수도 있어보임?
- 겹치는 구간은 하나로 병합
- 겹치는 구간이 2개 이상일 수도 있음
- 구간을 표시하는 원소는 1만개. 배열로 제공됨.

[해결 방법]
- O(N)으로 해결
    - 스캔 먼저해서 범위에 해당되는 인터벌을 찾음.
    - 신규 인터벌은 하나만 추가됨.
    - 나머지 인터벌들은 복붙하고, 병합된 인터벌만 중간에 삽입하면 될 거 같음. 그냥 구현 문제인데 왜 medium일까?

[실패]
- 실패한 이유
    - 기본 제약 조건도 안 봤음
    - 여러가지 CASE를 미리 구상하지 않았음
    - 간단한 예시 TC만 보고 그것만 해결하러 들었음
    - 쉽다고 생각해서 코드 실수를 간과하고 있었음

[재시도]
- 복잡함을 인정
- 모든 CASE를 먼저 나열하기

[CASES]
new=[3,4]
1. 단순 삽입 [] -> [v]
2. 끝에 삽입 [[1,2]]
3. 앞에 삽입 [[5,6]]
4. 대치 [[1,2],[3,4],[5,6]]
5. 병합 
- [[0,1],[2,3],[4,5]]
- [[1,2],[3,5],[6,7],[8,10],[12,16]], new=[4,8]

위 케이스들을 모두 간단하게 처리하는 방법 = ?

하...
중간 삽입도 있네....

*/
var insert = function (intervals, newInterval) {
    const [newStart, newEnd] = newInterval;

    // 비-병합 예외 케이스
    if (intervals.length === 0) {
        return [newInterval];
    }
    if (intervals[0][0] > newEnd) {
        intervals.unshift(newInterval);
        return intervals;
    }
    if (intervals[intervals.length - 1][1] < newStart) {
        intervals.push(newInterval);
        return intervals;
    }

    // 병합 케이스
    const intersectingIndices = [];
    for (let currIdx = 0; currIdx < intervals.length; currIdx++) {
        // TO-DO: 비 병합 중간 삽입 케이스 찾아야 함

        const [currStart, currEnd] = intervals[currIdx];
        const isIntersecting =
            (currStart <= newStart && newStart <= currEnd) ||
            (currStart >= newStart && currEnd <= newEnd) ||
            (currStart <= newEnd && newEnd <= currEnd);

        if (isIntersecting) {
            intersectingIndices.push(currIdx);
        }
    }

    if (intersectingIndices.length > 0) {
        const firstIdx = intersectingIndices[0];
        const lastIdx = intersectingIndices[intersectingIndices.length - 1];
        const [firstStart] = intervals[firstIdx];
        const [, lastEnd] = intervals[lastIdx];
        const replacingInterval = [
            Math.min(newStart, firstStart),
            Math.max(newEnd, lastEnd),
        ];
        intervals.splice(
            firstIdx,
            intersectingIndices.length,
            replacingInterval
        );
    }

    return intervals;
};
