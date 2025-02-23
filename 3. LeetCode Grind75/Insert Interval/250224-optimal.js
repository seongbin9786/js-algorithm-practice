// interval을 순회하는 것으로 해결
// interval과 newInterval의 관계를 확인하고, interval의 처우를 결정
// 굉장히 직관적이고 쉬운 풀이라고 생각함
// 왜 굳이 splice 쓰는 풀이부터 시작했던 걸까?

function insert(intervals, newInterval) {
    let i = 0;
    const SIZE = intervals.length;
    const nextIntervals = [];

    // 겹치지 않는 것만 newInterval 앞에다 놓기
    // 겹치는 걸 체크하는 게 아니라, 겹치지 않는 걸 체크하다니, 똑똑함
    while (i < SIZE && intervals[i][1] < newInterval[0]) {
        nextIntervals.push(intervals[i++]);
    }

    // 겹치는 상태가 끝나기 전까지 - 즉 이미 newInterval.start >= intervals[i].end 인 상태
    // 겹친다 = interval.start <= newInterval.end
    while (i < SIZE && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    nextIntervals.push(newInterval);

    // newInterval 뒤에다 놓기
    // 이 코드는 i < SIZE; 만 있어도 됨-!
    while (i < SIZE && intervals[i][0] > newInterval[1]) {
        nextIntervals.push(intervals[i++]);
    }

    return nextIntervals;
}
