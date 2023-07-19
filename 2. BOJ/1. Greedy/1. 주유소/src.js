let inputPerLine = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .split("\n");

/**
4
2 3 1
5 2 4 1
 */
const [_N, _distances, _prices] = inputPerLine;
const N = Number(_N);
const [distances, prices] = [_distances, _prices].map((arr) =>
    arr.split(" ").map(Number)
);

let totalMoney = 0n; // bigint
let minPrice = prices[0];
for (let i = 0; i < N - 1; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    totalMoney += BigInt(minPrice * distances[i]); // BigInt += Number는 TypeError
}

console.log(totalMoney.toString()); // BigInt 단순 출력 시 `n`이 붙어서 출력됨. `toString()` 필요
