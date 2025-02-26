/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/*
[문제]
- 합계와 단위 코인 종류를 입력받아, 코인 개수의 최소가 되는 코인 개수 합계를 반환
- (ex) sum=11, coins=[1,2,5] --> 3 (5+5+1)
- 합계 만들기가 불가능한 경우 -1, 합계=0 이면 0
- 코인값 > 합계일 수 있음
- 코인 종류는 12

[해결 방법]
- 처음에는 그냥 max코인들로 나머지만 계속 반복하면 될 것 같았는데...
- 아예 불가능한 케이스가 있다고 하니 흠...?
- 이것도 풀릴 것 같은데?
- 별로 시간 복잡도 문제도 없어보이고...

[오답]
- 코인이 정렬이 안 돼있었음

[반례]
- amount: 6249
- coins=[83 186 408 419]
- 큰 순서로 먼저 빼면 해답이 없음...

-------
[다른 해결 방법을 찾아야 함]
--> 완전 탐색
--> DP
- 어려웠던 것 같은데 ㅎ...

- 오름차순으로 코인 정렬
- 이거 모르겠다. 답 봐야 될 듯.

-----
해답 이해
- 최대 amount <= 1만
- 정수 배열 1만개 만들면 충분할 듯
*/
var coinChange = function (coins, amount) {
    coins.sort((a, b) => a - b);

    // 1만개짜리 정수 배열도 가능
    // 객체 = 일종의 Map<string, integer>
    const cache = {};

    // top-down으로 실행됨
    const dfs = (remaining) => {
        if (remaining === 0) return 0;
        if (remaining < 0) return -1;
        if (cache[remaining]) return cache[remaining];

        let minCoinUsage = Infinity;
        for (const coin of coins) {
            // DP 단위가 1코인 사용 단위임
            // 코인 사용 = 모든 코인을 다 사용
            // 재귀적으로 깎아나가며 0으로 수렴
            // 재귀라서 최소 CASE까지 한 번에 쭉 가고, 거기서부터 다시 반환
            // 각 dfs 호출은 cache[remaining]을 반환하는데, 도달 가능하면 minCoinUsage를 반환하고, 불가능하면 -1을 반환
            // 최종적으로 도달했으면 거기서부터 코인 횟수 = 1, 2, 3, ... 이렇게 하나씩 늘어날 것이고,
            // 최종적으로 도달 못 했으면 -1이 반환될 것이고, 그 case를 호출한 부모 호출은 전체가 무시될 것임.

            // 현재 minimum은 어떻게 집계 되는지 이해 못하는 중...
            // dfs 호출이 반환되면서 cache[remaining]이 반환되는데, 이건 0에 도달을 했을 때를 기준으로 0+1+1+1+1... 이렇게 됨
            // amount=11, coin=1인 경우 11이 반환될텐데... 얘는 max임...
            // 어떻게 최솟값을 갱신하지?
            // 즉, dfs(11)을 호출했으면, for (coins) 문에서 minCoinUsageForRest = 10이 먼저 나올 거라는 것임
            // 10이 나오면, minCoinUsage=11이 됨
            // minCoinUsageForRest < minCoinUsage(11) 일 때만 갱신해줌.
            // 음~ 뭐 그러면 되겟네
            // bottom-up도 궁금한데.. 그리고 bottom-up이 더 빠르려나?
            // 이 답안은 상위 65%임.. 되게 느리네?
            const minCoinUsageForRest = dfs(remaining - coin);
            if (
                minCoinUsageForRest >= 0 &&
                minCoinUsageForRest < minCoinUsage
            ) {
                minCoinUsage = minCoinUsageForRest + 1; // coin도 1개 썼다고 해주는 거임
            }
        }

        return (cache[remaining] =
            minCoinUsage === Infinity ? -1 : minCoinUsage);
    };

    return dfs(amount);
};
