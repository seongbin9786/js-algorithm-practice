const SIZE = 5;

const dy = [0, 0, -1, 1];
const dx = [1, -1, 0, 0];

const ddy = [-1, -1, 1, 1];
const ddx = [-1, 1, -1, 1];

const isSafeAxis = (p) => p >= 0 && p < SIZE;
const isSafePos = (y, x) => isSafeAxis(y) && isSafeAxis(x);

const checkPlace = (place) => {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            if (place[y][x] !== "P") {
                continue;
            }

            // 1. 동서남북 확인
            for (let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];
                if (!isSafePos(ny, nx)) {
                    continue;
                }
                if (place[ny][nx] === "P") {
                    return false;
                }
                if (place[ny][nx] === "O") {
                    const ny = y + dy[i] * 2;
                    const nx = x + dx[i] * 2;
                    if (!isSafePos(ny, nx)) {
                        continue;
                    }
                    if (place[ny][nx] === "P") {
                        return false;
                    }
                }
            }

            // 2. 대각선 확인
            for (let i = 0; i < 4; i++) {
                const ny = y + ddy[i];
                const nx = x + ddx[i];
                if (!isSafePos(ny, nx)) {
                    continue;
                }
                if (place[ny][nx] !== "P") {
                    continue;
                }
                if (place[ny][x] !== "X") {
                    return false;
                }
                if (place[y][nx] !== "X") {
                    return false;
                }
            }
        }
    }

    return true;
};

const solution = (rawPlaces) => {
    const places = rawPlaces.map((place) => place.map((row) => [...row]));

    return places.map(checkPlace).map((result) => (result ? 1 : 0));
};
