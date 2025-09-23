import { describe, it, assert } from "vitest";

/*
[조건 이해]
1. 서로 다른 coin 값들이 주어지고, 합계가 주어짐
2. 합계를 맞출 수 있다면 최소한의 coin 개수를 반환하고, 맞출 수 없다면 -1 반환

[제한 사항]
1. 코인 개수 <= 12
2. 0 <= 합계 <= 1만
3. 1 <= 각 코인 값 <= 21억

[풀이 생각]
1. 제일 큰 놈부터 차례로 넣었을 때 안 되는 반례를 찾기
    - [1,2,3], (흠;; 생각이 도무지 안남..)
    - 8,7,3,1 --> 8+1+1 > 7+3 이므로, 8을 선택하면 손해임
    - (발상은 생각보다 쉬웠다..)

2. 그럼 어떻게 구현해야 할까?
    - 모든 조합을 시도해보고 min 개수를 갱신
    - 모든 조합을 해봐도 안 되면 -1 반환

3. 모든 조합을 시도하는 방법 = ?
    - 전체를 순회하고, 이를 최적화하는 방향으로 개선하기
    - 모든 경우의 수를 하되, 이미 계산한 부분은 기존 계산으로 생략
    -> bottom-up 으로 하면 될 듯? (DP)

4. 전체를 순회하는 방법
    - 모든 경우를 계산하면 됨
    - bottom-up 으로 하는 게 발상이 안 돼서, top-down으로 해보려고 함.
    - 합계를 못 맞출 수도 있는 건데. 그건 어떻게 확인?
        - bottom-up으로 채워보면서, 합계가 넘치면 종료
        - 그 중에서 합계랑 일치하면 min을 갱신
        - 합계가 일치하는 경우가 없으면 -1을 반환하게 됨

5. 캐싱을 구현하는 법
    - 이미 다녀온 경우 그 개수를 보관하면 됨
    - 문제는, 더 적은 개수가 나중에 발견될 수도 있다는 점임
    - 그럼 기존 연산이 덜 최적이라는 게 되지 않을까?
    - 작업 순서 조절이 필요하다...

6. 그리면서 생각해봄
    - [8,7,3,1], amount=10일 때, 그냥 무작정 합 = 1~10 인 최소 코인을 다 구할 게 아님.
    - amount = min(amount가 각각 (10-8),(10-7),(10-3),(10-1)일 때의 코인 개수) + 1임
    - DFS로 방문하면, 모든 방문에 대해 최솟값부터 min을 계산하기 때문에 모든 방문에 대해 min 값이 보장됨
*/
describe("Course Schedule", () => {
    it.each([
        [[1, 2, 5], 11, 3],
        [[8, 7, 3, 1], 10, 2], // 이것도 잘 됨
        [[2], 3, -1],
        [[1], 0, 0],
    ])("%j => %j", (coins, amount, expected) => {
        const result = coinChange(coins, amount);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // 예외 처리
    if (amount === 0) {
        return 0;
    }

    // 코인 순회 시 amount가 coin보다 작으면 멈출 수 있게 미리 정렬
    coins.sort((a, b) => a - b);

    // 초기값 설정 - amount = coin이면 개수 1
    const minCoinCount = Array(amount + 1).fill(Infinity);
    coins.forEach((coin) => {
        minCoinCount[coin] = 1;
    });

    function getMinCount(amount) {
        if (minCoinCount[amount] < Infinity) {
            console.log("eary return for ", amount);
            return minCoinCount[amount];
        }
        console.log(`go(${amount})`);
        for (const coin of coins) {
            if (amount < coin) {
                break;
            }
            const subAmount = amount - coin;
            console.log("checking:", subAmount);
            const subAmountCount = getMinCount(subAmount);
            minCoinCount[amount] = Math.min(
                minCoinCount[amount],
                subAmountCount + 1
            );
        }

        return minCoinCount[amount];
    }

    getMinCount(amount);

    return minCoinCount[amount] === Infinity ? -1 : minCoinCount[amount];
};
