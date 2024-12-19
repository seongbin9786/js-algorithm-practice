const base10to2 = (base10) => {
    let share = base10;
    const remainders = [];

    while (share > 0) {
        remainders.push(share % 2);
        share = Number.parseInt(share / 2);
    }

    return remainders.reverse().join("");
};

const solution = (input) => {
    let curr = input;
    let loopCount = 0,
        removedZerosTotal = 0;
    while (curr !== "1") {
        let removedZeros = 0;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === "0") {
                removedZeros++;
            }
        }
        curr = base10to2(curr.length - removedZeros); // 1만 남은 문자열의 길이 = 기존 길이 - 0의 개수
        removedZerosTotal += removedZeros;
        loopCount++;
    }

    return [loopCount, removedZerosTotal];
};
