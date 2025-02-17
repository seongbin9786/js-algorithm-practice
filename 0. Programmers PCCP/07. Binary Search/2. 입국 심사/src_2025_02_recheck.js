/*
[문제]
- n명이 입국심사 (n <= 10억)
- times.length개의 심사대 (times.length <= 10만)
- times[i] <= 10억

[풀이 방법, 시간 복잡도]
- 모든 사람의 심사 시간을 최소로 하고 싶을 때.
    - 최소? 이진 탐색 느낌이 팍 나죠.
- "더 빨리 끝나는 심사대가 있으면 기다렸다가 그 곳으로 가서 심사를 받는다"
- 생각해보니 이 문제는 풀이 방법부터가 개노답임
- 고민해보면 알겠지만, 결론: 뭔가 계산해서는 풀기가 어려움.
- 큰 틀:
    1. 다른 모든 심사대의 처리 속도를 합한 것보다 더 오래 걸리는 심사대는 배제해야 한다. (ex: 혼자만 10억분 걸림)
    2. (1)의 심사대들로 최대한 돌려서 심사 시간을 앞당긴다.
    3. 마지막 즈음의 심사에서는 "더 빨리 끝나는 심사대"를 고려한다.
- 위 방법을 계산해서 풀기가 어려움.
    - 점유 중인 심사대를 대기시간을 더해 우선 순위 큐에 계속 넣어두어도 꽤 어렵다고 생각.
    - 우선순위 큐를 사용하면 시간을 만족시킬 수 없음.

[해결 방법]
- 최악의 입국 심사 시간 = (가장 느린 심사 시간 * 입국 인원)
    - 10억 * 10억 = 100 * 억 * 억 = 1억 = 10^9 * 10^9 = 10^18 정도
- 최선의 입국 심사 시간 = (계산하기 어려움)
    - "특정 시간 내에 이 사람들 처리할 수 있나요?"로 문제를 바꿀 수 있음
        - 이건 계산이 쉬움
            - (ex) 28분에 6명을 [7,10]심사대로 가동할 수 있는지?
            - times 순회(10만) 하면서 확인 가능
            - 1억번이면 10만짜리 계산은 1,000번 할 수 있음.
            - log2(X) = 1,000 = 2^1,000 = 2^10 = 1024이니깐, 1,000^100 정도 = 10^300 정도
            - 그래서 (0, max(times) * n) 사이를 이진 탐색하면서, "가동할 수 있음?" 여부로 확인 가능함
- lowerBound 사용 필요?
    - 특정 값을 찾는 이진 탐색은 아님. 즉, lower/upperbound 중 하나.
    - 가장 작은 값을 찾는 lowerbound가 적절.

아이디어 ~12:42
코드 ~12:49
*/

const isUnderLimit = (allPeople, times, limit) => {
    const checkedPeople = times.reduce((sum, time) => sum + limit / time, 0n);
    return checkedPeople >= allPeople;
};

const solution = (n, times) => {
    times.sort((a, b) => a - b);
    times = times.map((time) => BigInt(time)); // 미리 변환해두는 게 계산에 유리
    const maxTime = BigInt(times[times.length - 1]) * BigInt(n);

    // 이진 탐색 시작
    let low = 0n;
    let high = maxTime;
    while (low < high) {
        const mid = (low + high) / 2n;
        if (isUnderLimit(n, times, mid)) {
            high = mid;
        } else {
            low = mid + 1n;
        }
    }

    return low;
};
