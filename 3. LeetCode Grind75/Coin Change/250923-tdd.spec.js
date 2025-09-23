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

*/
describe("Course Schedule", () => {
    it.each([
        [[1, 2, 5], 11, 3],
        [[8, 7, 3, 1], 10, 2], // 이것도 잘 됨
        [[2], 3, -1],
        [[1], 0, -1],
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
        return -1;
    }

    coins.sort((a, b) => a - b); // 혹시모르니 오름차순 정렬 해둠

    let minCoins = Infinity;

    function go(currSum, coinCount) {
        console.log(`go(${currSum},${coinCount})`);
        if (currSum > amount) {
            return;
        }
        if (currSum === amount) {
            minCoins = Math.min(minCoins, coinCount);
            return;
        }

        for (const coin of coins) {
            go(currSum + coin, coinCount + 1);
        }
    }

    go(0, 0);

    return minCoins === Infinity ? -1 : minCoins;
};
