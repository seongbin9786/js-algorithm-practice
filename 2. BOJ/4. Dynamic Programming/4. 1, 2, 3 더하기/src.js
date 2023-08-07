const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

const [, ...targets] = input.map(Number);

// N=11 까지이므로
const count = new Array(12).fill(0); // N= 1 ~ 11

count[1] = 1; // 1
count[2] = 2; // 1+1, 2
count[3] = 4; // ()+3, (1)+2, (1+1)+1, (2)+1
// target=4,
// target=(3)->(4) +1 // target=(3) * 경우의수=1
// target=(2)->(4) +2 // target=(2) * 경우의수=1
for (let i = 4; i <= 11; i++) {
    count[i] = count[i - 3] + count[i - 2] + count[i - 1];
}

for (const target of targets) {
    console.log(count[target]);
}
