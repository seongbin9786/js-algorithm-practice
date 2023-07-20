const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, target] = input.map(Number);
const map = [...Array(N)].map(() => Array(N).fill(0));

// 북 동 남 서
const ny = [-1, 0, 1, 0];
const nx = [0, 1, 0, -1];

let number = 1;
let level = 1;
let dir = 0;
let y = Math.floor(N / 2);
let x = Math.floor(N / 2);

let ty = 0;
let tx = 0;

while (level < N) {
    for (let count = 0; count < 2; count++) {
        for (let i = 0; i < level; i++) {
            if (number === target) {
                ty = y;
                tx = x;
            }
            map[y][x] = number++;
            y += ny[dir];
            x += nx[dir];
        }
        dir = (dir + 1) % 4;
    }
    level++;
}

// 마지막 올라가기
for (let i = 0; i < level; i++) {
    if (number === target) {
        ty = y;
        tx = x;
    }
    map[y][x] = number++;
    y += ny[dir];
    x += nx[dir];
}

const str = map.map((line) => line.join(" ")).join("\n");
console.log(str);
console.log(`${ty + 1} ${tx + 1}`);
