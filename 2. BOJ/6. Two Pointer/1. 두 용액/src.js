/*
5
-2 4 -99 -1 98
*/
const fs = require("fs");
const [N, ...numbers] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(/\s/) // space, tab, newline
    .map(Number);

let optimalSum = 2_000_000_002; // MAX+1
let lowOfOptimalSum = 0;
let highOfOptimalSum = 0;

// O(N log N) 오름차순 정렬
numbers.sort((a, b) => a - b);

// O(N) 투포인터 탐색 시작
let lowIdx = 0;
let highIdx = N - 1;
while (optimalSum !== 0 && lowIdx < highIdx) {
    const sum = numbers[lowIdx] + numbers[highIdx];
    const distance = Math.abs(sum);
    if (distance < optimalSum) {
        optimalSum = distance;
        lowOfOptimalSum = numbers[lowIdx];
        highOfOptimalSum = numbers[highIdx];
    }
    if (sum > 0) {
        // 합이 양수이므로, 양수 부분이 줄어야 함
        highIdx--;
    }
    if (sum < 0) {
        // 합이 음수이므로, 음수 부분이 줄어야 함
        lowIdx++;
    }
}
console.log(`${lowOfOptimalSum} ${highOfOptimalSum}`);
