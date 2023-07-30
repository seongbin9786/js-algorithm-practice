// 주어진 시간에 대해 심사 통과자 수의 최대(합계)
const getMaxPassesOf = (totalTime, times) =>
    times.reduce((sum, duration) => sum + totalTime / BigInt(duration), 0n);

// n=6, times=[7,10]
// t=28 -> 최적
// 주어진 시간에 대해서 n명을 최적으로 심사할 수 있느냐?
// t=28 (마지막 사람이 7), t=30 (마지막 사람이 10)
// t=28 n=6 ~ 일정 구간 n=6
const solution = (n, times) => {
    // 1. 심사대 오름차순 정렬
    times.sort((a, b) => a - b);

    // 2. 이분 탐색 시작
    let minTotalTime = 1n;
    // Q. 최대 시간 = 최소 심사대 * n명 (나머지 심사대가 도와줄 수 있으니까)
    // 최대 심사대 * n명
    let maxTotalTime = BigInt(times[times.length - 1]) * BigInt(n);

    // while(min<max), return max
    // min>max 상태는 이진 탐색 자체의 오류
    // min=max,
    // n=6 cur=30 max----- => 정상 min 반환
    while (minTotalTime <= maxTotalTime) {
        const curTotalTime = (minTotalTime + maxTotalTime) / 2n;
        const passes = getMaxPassesOf(curTotalTime, times);

        if (passes >= BigInt(n)) {
            maxTotalTime = curTotalTime - 1n;
        } else {
            minTotalTime = curTotalTime + 1n;
        }
    }
    return Number(minTotalTime.toString());
};
