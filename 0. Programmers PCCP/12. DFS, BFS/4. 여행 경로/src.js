const solution = (tickets) => {
    const path = [];

    // [출발, 도착] 오름차순 정렬, 더 작은 쪽이 앞으로 감
    tickets.sort(([aFrom, aTo], [bFrom, bTo]) => {
        if (aFrom === bFrom) {
            return aTo < bTo ? -1 : 1;
        }
        return aFrom < bFrom ? -1 : 1;
    });

    // 지도 생성
    /*
    {
        "ATL":["ICN","SFO"],
        "ICN":["ATL","SFO"],
        "SFO":["ATL"]
    }
    */
    const map = tickets.reduce((map, [from, to]) => {
        if (!map[from]) {
            map[from] = [];
        }
        map[from].push(to);
        return map;
    }, {});

    const travel = (from) => {
        path.push(from);

        // 추가로 갈 곳이 없음 (종료 조건)
        if (!map[from] || map[from].length <= 0) {
            return;
        }

        // 다음 갈 곳을 path에 추가 후 진행
        const next = map[from].shift();
        travel(next);
    };

    travel("ICN");

    return path;
};
