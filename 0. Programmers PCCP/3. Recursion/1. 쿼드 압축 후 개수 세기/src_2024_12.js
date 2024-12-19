function createCounter(arr) {
    return function count(x1, x2, y1, y2) {
        // 기본 Case
        if (x2 === x1) {
            const value = arr[y1][x1];
            if (value === 0) {
                return [1, 0];
            }
            return [0, 1];
        }

        // 반복 Case
        const midX = Math.floor((x1 + x2) / 2);
        const midY = Math.floor((y1 + y2) / 2);

        const [zerosA, onesA] = count(midX + 1, x2, y1, midY);
        const [zerosB, onesB] = count(x1, midX, y1, midY);
        const [zerosC, onesC] = count(x1, midX, midY + 1, y2);
        const [zerosD, onesD] = count(midX + 1, x2, midY + 1, y2);

        const zeros = zerosA + zerosB + zerosC + zerosD;
        const ones = onesA + onesB + onesC + onesD;

        if (zeros === 0) {
            return [0, 1];
        }
        if (ones === 0) {
            return [1, 0];
        }
        return [zeros, ones];
    };
}

const solution = (arr) => {
    const SIZE = arr.length;
    const count = createCounter(arr);
    return count(0, SIZE - 1, 0, SIZE - 1);
};
