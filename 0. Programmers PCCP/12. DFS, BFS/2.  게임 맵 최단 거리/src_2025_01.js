const solution = (maps) => {
    const WALL = 0;
    const MAX_Y = maps.length;
    const MAX_X = maps[0].length;

    const isSafeBound = (y, x) => {
        if (y >= MAX_Y || y < 0) {
            return false;
        }
        if (x >= MAX_X || x < 0) {
            return false;
        }
        if (maps[y][x] === WALL) {
            return false;
        }
        return true;
    };

    const visited = [...Array(maps.length)].map(() =>
        Array(maps[0].length).fill(false)
    );

    const queue = [];

    // y,x,moves
    queue.push([0, 0, 1]);

    while (queue.length > 0) {
        const [y, x, moves] = queue.shift();

        if (visited[y][x]) {
            continue;
        }
        visited[y][x] = true;

        if (y === MAX_Y - 1 && x === MAX_X - 1) {
            return moves;
        }

        const nextMoves = [
            [y, x - 1],
            [y - 1, x],
            [y, x + 1],
            [y + 1, x],
        ].filter(([ny, nx]) => isSafeBound(ny, nx) && !visited[ny][nx]);

        nextMoves.forEach(([ny, nx]) => {
            queue.push([ny, nx, moves + 1]);
        });
    }

    return -1;
};
