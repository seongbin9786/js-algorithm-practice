const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const MAP = [];
for (let i = 1; i <= N; i++) {
    MAP.push(input[i].split(" ").map(Number));
}

const printMap = (map) => {
    const stringified = map.map((line) => line.join(" ")).join("\n");
    console.log(stringified);
};

const createEmptyMap = () =>
    Array(N)
        .fill()
        .map(() => Array(M).fill(0));

const fillMap = (lastMap, curMap, yStart, yEnd, xStart, xEnd) => {
    // 1. 상단 순회 (우측 끝 제외, 왼쪽으로 한 칸씩)
    for (let x = xStart; x < xEnd - 1; x++) {
        curMap[yStart][x] = lastMap[yStart][x + 1];
    }

    // 2. 하단 순회 (좌측 끝 제외, 오른쪽으로 한 칸씩)
    for (let x = xStart + 1; x < xEnd; x++) {
        curMap[yEnd - 1][x] = lastMap[yEnd - 1][x - 1];
    }

    // 3. 좌측 1줄 순회 (상단 제외, 아래로 한 칸씩)
    for (let y = yStart + 1; y < yEnd; y++) {
        curMap[y][xStart] = lastMap[y - 1][xStart];
    }

    // 4. 우측 1줄 순회 (하단 제외, 위로 한 칸씩)
    for (let y = yStart; y < yEnd - 1; y++) {
        curMap[y][xEnd - 1] = lastMap[y + 1][xEnd - 1];
    }
};

let lastMap = null;
let curMap = MAP;

// 1. 모든 회전에 대해 순회
for (let round = 1; round <= R; round++) {
    // 2. 현재 배열을 이전 단계 배열로 설정
    lastMap = curMap;

    // 3. 현재 배열을 신규로 생성한 배열로 설정
    curMap = createEmptyMap();

    // 4. 순회하면서 신규 배열을 채움
    let yStart = 0;
    let yEnd = N;
    let xStart = 0;
    let xEnd = M;
    while (yStart < yEnd && xStart < xEnd) {
        // 신규 배열 채우기
        fillMap(lastMap, curMap, yStart, yEnd, xStart, xEnd);

        // 감소
        yStart++;
        xStart++;
        yEnd--;
        xEnd--;
    }
}

// 5. 현재 배열을 출력
printMap(curMap);
