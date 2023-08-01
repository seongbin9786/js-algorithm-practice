const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .split(/ |\n/)
    .filter((n) => n.length > 0);

let [_N, ..._stoneValues] = input.map(Number);

const N = _N;
// 첫째 돌을 idx=1로 생각한다.
// 첫째 돌의 비용은 0이다. 이미 첫째 돌이기 때문이다.
const stoneValues = [0, ..._stoneValues];
const minJumpCosts = new Array(N + 1).fill(Infinity);
minJumpCosts[1] = 0;

for (let now = 2; now <= N; now++) {
    for (let prev = 1; prev < now; prev++) {
        // prev -> now 점프 비용.
        const fromPrevToNowCost =
            (now - prev) * (1 + Math.abs(stoneValues[now] - stoneValues[prev]));
        // prev까지의 점프 비용.
        // 둘 중 더 큰 값이 prev를 거쳐 now까지 오는 점프 비용의 최소.
        const thisCost = Math.max(minJumpCosts[prev], fromPrevToNowCost);
        console.log(
            `fromPrevToNowCost: ${fromPrevToNowCost}, thisCost: ${thisCost}`
        );
        // now까지의 최소 점프 비용을 비교 후 할당.
        minJumpCosts[now] = Math.min(minJumpCosts[now], thisCost);
    }
}

console.log(minJumpCosts[N]);
