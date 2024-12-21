/**
 * @param {number} num
 * @returns {number[]} 약수의 배열
 */
const factorsOf = (num) => {
    const factors = [];

    for (let factor = 1; factor <= num; factor++) {
        if (num % factor === 0) {
            factors.push(factor);
        }
    }

    return factors;
};

/**
 * @param {number} brown
 * @param {number} yellow
 */
const solution = (brown, yellow) => {
    const factors = factorsOf(yellow);

    for (const factor of factors) {
        const dividend = yellow / factor;
        if (factors.includes(dividend)) {
            // check!
            if (factor * 2 + dividend * 2 + 4 === brown) {
                return [factor, dividend]
                    .map((v) => v + 2) // yellow의 (width, height)를 구한 것이므로, 직사각형의 (width, height)는 +2씩 해야 함.
                    .sort((a, b) => b - a); // (Width, height) 내림차순 정렬
            }
        }
    }
};

console.log(solution(24, 24));
