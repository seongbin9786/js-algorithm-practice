// n,m <= 30 이므로, (y,x)에 대해 y * 10,000 해서 넣어야겟다.
const encode = (y, x) => y * 10_000 + x;
const decode = (encoded) => ({
    y: Math.floor(encoded / 10000),
    x: encoded % 10_000,
});

// 좌상단 (y,x)를 받아 비교
const compare2X2 = (y, x, board) => {
    // 위쪽 2칸 비교
    if (board[y][x] !== board[y][x + 1]) {
        return false;
    }
    // 아래쪽 2칸 비교
    if (board[y + 1][x] !== board[y + 1][x + 1]) {
        return false;
    }
    // 위쪽 아래쪽 비교
    const topBottomEqual =
        board[y][x] >= "A" &&
        board[y][x] <= "Z" &&
        board[y][x] === board[y + 1][x];
    // if (topBottomEqual) {
    // console.log(`topBottomEqual: ${topBottomEqual}, y:${y}, x:${x}`);
    // }
    return topBottomEqual;
};

const remove = (y, x, set) => {
    set.add(encode(y, x));
    set.add(encode(y, x + 1));
    set.add(encode(y + 1, x));
    set.add(encode(y + 1, x + 1));
};

const fallDown = (set, board) => {
    // -, +는 예약된 거임 (이 구현에선)

    // 1. 기존 위치들을 -로 변경
    for (const record of set) {
        const { y, x } = decode(record);
        board[y][x] = "-";
    }

    // 2. -에 대해 위의 모든 좌표를 한 칸씩 내리고, 맨 위는 +를 추가
    // 이렇게 하면 최종적으로는 내려간 보드 + ('+'로 채워진) 게 나오게 됨
    // 아래에서부터 탐색해야 내리기 좋을 듯?
    // 안 됨. 내려가면서 해야 쌓여있는 -를 해소할 수 있음.
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            if (board[y][x] === "-") {
                // 여기서부터 현재 y를 포함해 한 칸씩 내리자
                for (let ty = y; ty > 0; ty--) {
                    board[ty][x] = board[ty - 1][x];
                }
                // 가장 위에건 +로 치환 (내릴 게 없는 경우도 여기에 포함됨)
                board[0][x] = "+";
            }
        }
    }
    // console.log(board);
};

let loop = 0;

const executeCurrentState = (m, n, board) => {
    loop++;
    // console.log(board);
    const removed = new Set();

    let y = 0;
    let x = 0;

    // 최하층 + 1층까지만 탐색
    while (y < m - 1) {
        x = 0;
        // 최우측 한 칸 왼쪽까지만 탐색
        while (x < n - 1) {
            if (compare2X2(y, x, board)) {
                remove(y, x, removed);
            }
            x++;
        }
        y++;
    }

    fallDown(removed, board);

    return removed.size;
};

const solution = (m, n, board) => {
    // char[][]로 변경
    board = board.map((row) => row.split(""));

    let totalRemovedCount = 0;
    let curRemoveCount = 0;
    do {
        curRemoveCount = executeCurrentState(m, n, board);
        // console.log('removed:', curRemoveCount);
        totalRemovedCount += curRemoveCount;
    } while (curRemoveCount > 0);

    return totalRemovedCount;
};
