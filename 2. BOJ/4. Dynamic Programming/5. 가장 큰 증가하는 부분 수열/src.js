const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const _numbers = input[1].split(" ").map(Number);
const arr = [0, ..._numbers];

const sumUntil = new Array(N + 1).fill(0);
sumUntil[1] = arr[1];

for (let now = 2; now <= N; now++) {
    for (let prev = 1; prev < now; prev++) {
        // prev <= now 여야 더해줄 수 있음
        if (arr[prev] < arr[now]) {
            // 내가 활용할 수 있는 이전까지의 합 중 최댓값 (sumUntil은 기본값=0)
            sumUntil[now] = Math.max(sumUntil[now], sumUntil[prev]);
        }
    }
    console.log(
        `sumUntil[${now}](${sumUntil[now]}) += arr[${now}](=${arr[now]}); = ${
            sumUntil[now] + arr[now]
        }`
    );
    sumUntil[now] += arr[now]; // 본인 더하기
}

// 전체 [현재까지의 합] 중 최댓값 반환
console.log(Math.max(...sumUntil));
