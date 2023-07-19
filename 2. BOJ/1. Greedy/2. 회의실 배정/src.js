const inputNumbers = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .replaceAll("\n", " ")
    .split(" ")
    .map(Number);

const N = inputNumbers[0];
const pairs = [];
for (let i = 1; i < inputNumbers.length - 1; i += 2) {
    pairs.push([inputNumbers[i], inputNumbers[i + 1]]);
}

pairs.sort(([, aEnded], [, bEnded]) => aEnded - bEnded);

let meetings = 0;
let now = 0;
for (const [started, ended] of pairs) {
    if (now > started) {
        continue;
    }
    now = ended;
    meetings++;
}

console.log(meetings);
