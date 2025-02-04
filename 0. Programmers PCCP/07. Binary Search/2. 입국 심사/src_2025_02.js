const solution = (n, times) => {
    const people = BigInt(n);

    let low = 1n;
    let high = people * BigInt(times[times.length - 1]) + 1n; // high는 정상 범위 + 1

    const maxTourists = (totalTime) =>
        times.reduce((sum, time) => sum + totalTime / BigInt(time), 0n);

    while (low < high) {
        const mid = (low + high) / 2n;
        if (people > maxTourists(mid)) {
            low = mid + 1n;
        } else {
            high = mid;
        }
    }
    return low;
};
