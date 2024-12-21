const createDungeonPaths = (dungeons) => {
    const allPaths = [];
    const currPath = [];
    const visited = Array(dungeons.length).fill(false);
    const backtrack = (index) => {
        if (index === dungeons.length) {
            allPaths.push([...currPath]);
            return;
        }
        dungeons.forEach((dungeon, i) => {
            if (visited[i]) {
                return;
            }
            visited[i] = true;
            currPath.push(dungeon);
            backtrack(index + 1);
            currPath.pop();
            visited[i] = false;
        });
    };

    backtrack(0);

    return allPaths;
};

const solution = (k, dungeons) => {
    const allPaths = createDungeonPaths(dungeons);
    let maxVisits = 0;

    allPaths.forEach((path) => {
        let hp = k;
        let visits = 0;

        // 탈출이 필요하므로 forEach 사용 불가
        for (const [required, price] of path) {
            if (hp < required || hp < price) {
                break;
            }
            hp -= price;
            visits++;
        }

        maxVisits = Math.max(maxVisits, visits);
    });

    return maxVisits;
};
