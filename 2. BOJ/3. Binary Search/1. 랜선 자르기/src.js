const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [kn, ...numbers] = input;
const [K, N] = kn.split(" ").map(Number);
const cables = numbers.map(Number).filter((num) => num > 0); // 빈 라인 제외

console.log(K, N, cables);

let up = Math.max(...cables);
let down = 1;

// 계산될 값들
let unit = 0;
let splitted = 0;

let lastUnit = 0;
while (down <= up) {
    unit = Math.ceil((up + down) / 2);
    console.log("unit:", unit);
    splitted = cables.reduce((sum, cable) => sum + Math.floor(cable / unit), 0);
    if (splitted >= N) {
        // 너무 많은 케이블이 있음. 더 커질 수 있음.
        down = unit;
        console.log(
            `splitted: ${splitted}, down = ${down}, up = ${up} DOWN=unit`
        );
    } else {
        up = unit;
        console.log(
            `splitted: ${splitted}, down = ${down}, up = ${up} UP=unit`
        );
    }
    if (lastUnit === unit) {
        break;
    }
    lastUnit = unit;
}

console.log(down);
