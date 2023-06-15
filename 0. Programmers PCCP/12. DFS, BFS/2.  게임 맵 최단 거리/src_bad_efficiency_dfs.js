let MIN_MOVES = Infinity;
let MAP = [];
let VISITED = [];

// 동서남북
let dy = [0, 0, 1, -1];
let dx = [1, -1, 0, 0];

const arrived = (y, x) => y === MAP.length - 1 && x === MAP[0].length - 1;

const wall = (y, x) => MAP[y][x] === 0;

const outOfBounds = (y, x) => y < 0 || y >= MAP.length || x < 0 || x >= MAP[0].length;

// visited를 관리해야 하나? 애매 함... 이게 설정/초기화하면서 진행하면 됐던 거였나?
const DFS = (y, x, moves) => {
  if (outOfBounds(y, x) || wall(y, x) || VISITED[y][x]) {
    return;
  }

  if (arrived(y, x)) {
    MIN_MOVES = Math.min(moves, MIN_MOVES);
    return;
  }

  VISITED[y][x] = true;

  for (let i = 0; i < 4; i++) {
    DFS(y + dy[i], x + dx[i], moves + 1);
  }

  VISITED[y][x] = false;
}

/**
 * @param {number[][]} maps 지도 (y,x)=1이면 이동 가능
 * @returns {number} 목적지까지의 최단 거리의 이동 횟수
 */
const solution = (maps) => {
  MAP = maps;
  VISITED = Array.from(Array(MAP.length), _ => Array(MAP[0].length).fill(false));

  DFS(0, 0, 1);

  return MIN_MOVES === Infinity ? -1 : MIN_MOVES;
}

console.log(solution([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 0], [0, 0, 0, 0, 1]]));
