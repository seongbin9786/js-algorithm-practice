// 제거하지 않는 큐...
class Queue {
    #front = 0;
    #size = 0;
    #arr = [];

    push(elem) {
        this.#arr.push(elem);
        this.#size++;
    }

    pop() {
        if (this.empty()) {
            return;
        }
        this.#size--;
        return this.#arr[this.#front++];
    }

    empty() {
        return this.#size === 0;
    }
}

let MIN_MOVES = Infinity;
let MAP = [];
let VISITED = [];

// 동서남북
let dy = [0, 0, 1, -1];
let dx = [1, -1, 0, 0];

const arrived = (y, x) => y === MAP.length - 1 && x === MAP[0].length - 1;

const wall = (y, x) => MAP[y][x] === 0;

const outOfBounds = (y, x) =>
    y < 0 || y >= MAP.length || x < 0 || x >= MAP[0].length;

/**
 * @param {Queue} queue
 */
const BFS = (queue) => {
    while (!queue.empty()) {
        const [y, x, moves] = queue.pop();
        console.log(`BFS: (${y}, ${x}) - moves: ${moves}`);

        if (outOfBounds(y, x) || wall(y, x) || VISITED[y][x]) {
            continue;
        }

        if (arrived(y, x)) {
            return moves;
        }

        VISITED[y][x] = true;

        for (let i = 0; i < 4; i++) {
            queue.push([y + dy[i], x + dx[i], moves + 1]);
            console.log(`push: (${y + dy[i]}, ${x + dx[i]})`);
        }
    }

    return -1;
};

/**
 * @param {number[][]} maps 지도 (y,x)=1이면 이동 가능
 * @returns {number} 목적지까지의 최단 거리의 이동 횟수
 */
const solution = (maps) => {
    MAP = maps;
    VISITED = Array.from(Array(MAP.length), (_) =>
        Array(MAP[0].length).fill(false),
    );

    const queue = new Queue();
    queue.push([0, 0, 1]);

    return BFS(queue);
};

console.log(
    solution([
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1],
    ]),
);
