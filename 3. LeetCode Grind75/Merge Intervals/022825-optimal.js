var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    // start는 모두 정렬되었으니 병합 시 min을 갱신할 필요가 없으므로, 첫 interval은 넣고 시작
    let mergedIntervals = [intervals[0]];

    // 모든 intervals 순회 가능. 비교군이 merged에 있으므로.
    // 왜 merged에 넣고 그걸 비교할 생각을 못했을까?
    // 다른 문제를 제대로 이해 못해서 그렇다.
    // 그거 먼저 다시 복기하고, 이걸 풀었어야 했다. 그럼 그 문제의 접근을 이 문제에 활용하지 않았을텐데.
    // 어설프게 재현하려고 했다가 망했다.
    // 오늘 문제도 다 어렵고 참 배우는 게 많네..
    for (let i = 1; i < intervals.length; i++) {
        // 현재 interval의 start가 병합된 interval 끝에 것의 end보다 크면 그냥 추가
        if (intervals[i][0] > mergedIntervals[mergedIntervals.length - 1][1]) {
            mergedIntervals.push(intervals[i]);
            continue;
        }

        // 일단 겹쳐서 병합. start는 이미 정렬해둬서 최소이고, end는 max를 가려야 함.
        // 추가하지 않고 단순 비교로 기존 merged에 end만 갱신
        mergedIntervals[mergedIntervals.length - 1][1] = Math.max(
            mergedIntervals[mergedIntervals.length - 1][1],
            intervals[i][1]
        );
    }

    return mergedIntervals;
};
