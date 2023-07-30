const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0);

const [N, ...steps] = input.map(Number);
const maxPoints = new Array(N).fill(0);
maxPoints[0] = steps[0];
maxPoints[1] = steps[0] + steps[1];
maxPoints[2] = Math.max(maxPoints[0] + steps[2], maxPoints[1] + steps[2]);

for (let floor = 3; floor < N; floor++) {
    maxPoints[floor] = Math.max(
        maxPoints[floor - 2] + steps[floor], // 2칸 뛰어올라오기
        maxPoints[floor - 3] + steps[floor - 1] + steps[floor] // 2칸 + 1칸 + 1칸
    );
}

console.log(maxPoints[N - 1]);
