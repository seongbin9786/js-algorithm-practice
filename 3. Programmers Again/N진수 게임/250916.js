/*
1. N진법으로 숫자 t개 ? / 숫자 4 ? 00 01 10 11 100 101
2. 내 순서가 주어지고, 참가 인원이 주어지면, 내가 말해야할 숫자들이 제공된다.

(Ex)
2명이서 내가 먼저 시작하는 2진수 게임에서, 나에게 4턴이 진행됨

(잘못된 해석)
[전체 숫자]
0-1-10-11-100-101-110-111-1000
^   ^     ^

[내 숫자]
0 10 100 (음? "0111"랑 다른데?)

--> 이해가 안됐는데, '숫자를 하나씩', 즉 자릿수 하나 단위로 얘기하는 거였음.

(정상 해석)
0-1-10-11-100-101-110-111-1000
^   ^  ^  ^
= 0111

[풀이]
1. 그냥 N진수로 0부터 숫자를 안전하게 t*m 개 정도 구하고, 앞에서 주기에 따라 글자 하나 단위로 가져오면 됨
2. 주기는 i += 2 등으로 체크하면 될 듯. 총 t개를 가져오면 됨

--


*/
// K진수에서 가져옴
/*
16진수 변환법?
16 = 16(F) * 1 + 0
0 = 16 * 0 + 0
*/
const alphaMap = {
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
};

function convertRemainder(r) {
    if (r < 10) {
        return r;
    }
    return alphaMap[r];
}

function convert(target, base) {
    if (target === 0) {
        return "0";
    }

    let remainders = "";
    while (target > 0) {
        const remainder = target % base;
        remainders = convertRemainder(remainder) + remainders;
        target = Math.floor(target / base);
    }
    return remainders;
}

// 헷갈려서 n -> base 이름 변경
//
function solution(base, turns, members, order) {
    let allNumbers = "";
    const enoughCount = turns * members;
    for (let decimal = 0; decimal <= enoughCount; decimal++) {
        const result = convert(decimal, base);
        allNumbers += result;
    }

    let myNumbers = "";
    for (let turn = 0; turn < turns; turn++) {
        const myNumber = allNumbers.charAt(order - 1 + turn * members); // 1번째, 3번째, 5번째, ...
        myNumbers += myNumber;
    }
    return myNumbers;
}
