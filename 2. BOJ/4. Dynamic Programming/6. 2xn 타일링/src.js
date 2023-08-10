const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const N = Number(input);

const numberOfTilePatterns = new Array(N + 1).fill(0);
numberOfTilePatterns[1] = 1;
numberOfTilePatterns[2] = 2;

for (let curN = 3; curN <= N; curN++) {
    numberOfTilePatterns[curN] =
        (numberOfTilePatterns[curN - 2] + numberOfTilePatterns[curN - 1]) %
        10007;
}

console.log(numberOfTilePatterns[N]);
