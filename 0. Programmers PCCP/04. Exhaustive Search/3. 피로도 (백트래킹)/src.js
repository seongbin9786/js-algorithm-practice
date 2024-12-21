function solution(k, dungeons) {
    const visited = dungeons.map(() => false);

    let maxVisited = 0;

    const backtrack = (tries, left, myVisits) => {
        // 매번 방문 시 Math.max 하면 되겠음.
        maxVisited = Math.max(maxVisited, myVisits);
        // console.log(`backtrack: tries: ${tries}, left: ${left}, myVisits: ${myVisits}`);

        if (tries > dungeons.length) {
            return;
        }

        // for-of를 사용하기엔 visited 접근에 i가 필요함
        for (let i = 0; i < dungeons.length; i++) {
            if (visited[i]) {
                continue;
            }
            const [required, consumed] = dungeons[i];
            if (required > left) {
                continue;
            }
            visited[i] = true;
            backtrack(tries + 1, left - consumed, myVisits + 1);
            visited[i] = false;
        }
    };

    backtrack(1, k, 0);

    return maxVisited;
}
