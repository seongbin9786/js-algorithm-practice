const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// 0번째 유닛 채우고 시작
const maxSumFromEachItem = [arr[0]];

// arr = 1, -2, 3, 4, 5
// sum = 1, -1, 3, 7, 12
for (let i = 1; i < N; i++) {
    maxSumFromEachItem[i] = Math.max(
        maxSumFromEachItem[i - 1] + arr[i],
        arr[i]
    );
}

console.log(Math.max(...maxSumFromEachItem));
