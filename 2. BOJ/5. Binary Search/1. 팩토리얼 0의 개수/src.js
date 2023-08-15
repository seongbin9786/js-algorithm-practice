const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const N = Number(input);

const log_e_5 = Math.log(5);

// 로그 밑변환 공식
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/log#math.log_%EB%8B%A4%EB%A5%B8_%EA%B8%B0%EC%B4%88%EA%B0%92_%EC%82%AC%EC%9A%A9
// round를 해도 되는데 floor도 되어서,,, 잘 모르겠네요
const getBase5Log = (x) => Math.floor(Math.log(x) / log_e_5);

const getZerosFromNFactorial = (targetZeros) => {
    let zeros = 0;
    let lastSuccessN = 0; // M과 일치하는 N이 없을 수 있음

    // N 탐색
    let low = 5;
    let high = 500_000_000; // 실제 상한은 4억 초반대
    while (low <= high) {
        const n = Math.floor((low + high) / 2);
        const maxP = getBase5Log(n); // e.g. n=5, maxP=1 | n=25, maxP=2
        zeros = 0;
        for (let p = 1; p <= maxP; p++) {
            zeros += Math.floor(n / Math.pow(5, p));
        }
        if (zeros === targetZeros) {
            lastSuccessN = n;
        }
        if (zeros >= targetZeros) {
            // M과 일치허더라도 좁혀 나가기
            high = n - 1;
        } else {
            low = n + 1;
        }
    }
    if (lastSuccessN !== 0) {
        return lastSuccessN;
    }
    // 없는 경우 예외 처리
    if (zeros !== targetZeros) {
        return -1;
    }
    return low;
};

console.log(getZerosFromNFactorial(N));
