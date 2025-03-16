/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
/*
[문제]
- intervals는 서로 겹치지 않음
- start 기준으로 오름차순 정렬되어 있음
- newInterval을 삽입해야 함
- 삽입 후의 intervals를 반환 - 겹치는 intervals가 없게.

[해결 방법]
- 신규 배열을 만들어 반환
- 겹치는 경우 모두 병합하고, 기존 것들을 제거해야 함
- 안 겹칠 수도 있음.

- interval을 순회하면서 현재 interval에 대해 new.start가 interval.start >= new.start && interval.end <= new.start 일 때
- '겹친다' 해석 (여기서 되게 복잡함)
    - 겹치는 경우의 수
        - 전체가 겹침
            - new가 더 큼
            - 기존 게 더 큼
            - 일치함
        - 일부만 겹침
            - new가 기존의 앞과 겹침
            - 기존이 new 앞과 겹침

    - 1차원에서 두 구간이 겹치는 걸 쉽게 판별하는 법
        - 포개지고, 한쪽만 걸치고 이런 건 너무 복잡함
        - 안 겹치는가를 판별하면 됨
    - 안 겹친다 - 이미 서로 안 겹침
        - 일단 안 겹칠때까지 삽입
            - 다음 것의 end가 넣을 것의 start보다 작음
        - 겹치는 건 합침
        - 나머지 것들을 붙임
    - 겹치는 거 합치는 법
        - 안 겹칠 때까지 합치면 될 듯?
        - 겹치는 걸 합쳤을 때의 end의 max보다 다음 것의 start 가 크면 안 겹침
*/
var insert = function (intervals, newInterval) {
    const result = [];
    let i = 0;

    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // 틀림... 단순 삽입만 해야 할 수도 도있음
    // 조금 더 리팩토링해서 조건을 단순화할 수 있음.
    let minStart = newInterval[0];
    let maxEnd = newInterval[1];
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        minStart = Math.min(minStart, intervals[i][0]);
        maxEnd = Math.max(maxEnd, intervals[i][1]);
        i++;
    }
    result.push([minStart, maxEnd]);

    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};
