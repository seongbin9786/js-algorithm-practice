/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
/*
[문제]
- 풀었던 거 아닌가 이거?
- 아니네...?
- Insert Interval이 이거 이전 거구만.. 뭐냐 구성 이거
- 겹치는 건 다 병합한 상태로 반환

[해결 방법]
- 예전에 풀었던 방식이 기억나질 않는다...
- 안 겹치는 것들 제외하고 갔던 거 같은데.
- 인터벌이 정렬되어 있는지 모르겠다. 일단 정렬하자.

*/
var merge = function (intervals) {
    const length = intervals.length;
    if (intervals.length <= 1) {
        return intervals;
    }

    // 근본 없는 순서도 나오기 때문에 정렬이 꼭 필요.
    intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    // 2,2      2,3     3,4     3,4     5,5

    const intervalsMerged = [];

    // 이거 예전 문제랑 다르네.
    let idx = 1;

    // 애초에 -1 짜리를 바라보고 있는데 어떻게 삽입이 됨?
    // 그러게?
    while (idx < length) {
        // 안 겹침
        while (idx < length && intervals[idx - 1][1] < intervals[idx][0]) {
            intervalsMerged.push(intervals[idx - 1]);
            idx++;
        }

        // 병합 실행
        // 마지막 노드가 병합 대상이면 정상 동작하지만
        // 마지막 노드가 병합 대상이 아니라면 문제가 됨
        // 병합 안 했어도 문제네...
        let minStart = intervals[idx - 1][0];
        let maxEnd = intervals[idx - 1][1];
        while (idx < length && maxEnd >= intervals[idx][0]) {
            minStart = Math.min(minStart, intervals[idx][0]);
            maxEnd = Math.max(maxEnd, intervals[idx][1]);
            idx++;
        }
        intervalsMerged.push([minStart, maxEnd]);
        idx++;
    }

    // 마지막 노드 처리
    // [2,4],[5,7] 인 경우
    if (
        intervals[length - 1][0] >
        intervalsMerged[intervalsMerged.length - 1][1]
    ) {
        intervalsMerged.push(intervals[length - 1]);
    }

    return intervalsMerged;
};
