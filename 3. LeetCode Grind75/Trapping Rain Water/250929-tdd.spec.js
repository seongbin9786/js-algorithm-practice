import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. 벽의 높이를 나타내는 n개의 0 혹은 자연수의 배열을 입력 받아, 담을 수 있는 물의 양을 계산해야 함 (벽의 두께는 1)
2. 1 <= n <= 20,000, 0 <= 높이 <= 100,000
3. [히든 요구사항? O(n)으로 풀어야 함]

[풀이]
1. n = 20,000이어서 1억이 아닌 4억이 되므로 O(n^2)을 못하게 하려고 한 듯. 전체 순회는 해야 하므로, O(n) or O(n log n)일 듯
2. 정렬할 일은 없기 때문에 O(n) -> 투포인터일 수 있음
3. 양쪽 벽 중 더 낮은 벽의 높이 * 벽 간 간격으로 물의 부피를 구할 수 있음
4. 벽이 양쪽에서 줄어든다고 할 수 있음
5. 여러 가지 케이스가 있을 것 같은데...
    - 양쪽 끝에 벽이 하나씩만 있는 경우
    - 한쪽 벽이 없는 경우
    - 벽 사이 공간이 없는 경우 (벽의 높이가 동일)

[풀이 다시]
(직접 손으로 해보면서 이해하게 됨)
1. 처음에는 그냥 단순히 양쪽에서 좁히면 충분하다고 생각
2. 하다보니, 한 쪽 벽이 더 큰 경우 해당 벽에서 이동하면 안 됨을 알게 됨.
    - 더 낮은 쪽에서, 더 높은 쪽의 벽보다 더 높아질 때까지 더 낮은 쪽만 계속 움직여야 함.
    - 그래야만 실제 벽 높이를 온전히 반영할 수 있음.
    - 만약 더 높은 벽도 '함께' 움직인다면, 이후 더 낮은 쪽에서 더 높은 벽으로 갱신했을 때, 그 갱신 전까지 높은 벽에서 이동한 높이는 실제보다 낮게 판정되며, 투포인터라 보상받을 방법이 없음
3. 투포인터로 양쪽 끝의 벽에서 시작 (양 끝에서 처음 height[i]>0인 곳)
    - 각각을 l, r으로 두고, min 값을 wall로 둠
    - l, r은 범위를 좁히는 방향으로 이동하며, 각 칸을 방문할 때마다 wall보다 낮은 만큼 침수됨
    - l, r 중 더 낮은 값만 움직임. 만약 똑같으면 아무 쪽이나 움직여도 됨. 이렇게 하면 항상 실제 물의 양과 일치하게 됨.
*/
describe("Trapping Rain Water", () => {
    it.each([
        // 아무 것도 없음
        [[0], 0],
        // 양쪽 끝에 벽이 하나씩만 있는 경우
        [[1, 0, 1], 1],
        // 벽이 하나밖에 없음
        [[1], 0],
        [[0, 1, 0], 0],
        // 벽 간 공간이 없음
        [[1, 1], 0],
        [[1, 1, 1], 0],
        // 벽 간 공간이 있어보이지만 실제로는 물을 담을 수 없음
        [[1, 2], 0],
        [[1, 2, 3], 0],
        // 일반 - 쉬움
        [[1, 0, 1, 0, 1], 2],
        // 일반 - 바닥이 항상 0보다 큰 경우
        [[2, 1, 2, 1, 2], 2],
        // 일반 - 제대로 구현하지 않으면 넓이가 누락되는 경우
        [[3, 1, 0, 4, 3, 1, 0, 2, 1, 0, 5], 22],
    ])("%j => %i", (intervals, expected) => {
        const result = trap(intervals);
        assert.equal(result, expected);
    });
});

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let l = 0;
    let r = height.length - 1;

    let lvalue = height[l];
    let rvalue = height[r];

    while (lvalue === 0) {
        l++;
        lvalue = height[l];
    }

    while (rvalue === 0) {
        r--;
        rvalue = height[r];
    }

    let wall = Math.min(lvalue, rvalue);

    let water = 0;
    while (l < r) {
        if (lvalue > rvalue) {
            r--;
            rvalue = Math.max(rvalue, height[r]);
            wall = Math.min(lvalue, rvalue);
            water += Math.max(0, wall - height[r]);
        } else {
            // height가 동일한 경우 어떻게 해도 상관 없음
            l++;
            lvalue = Math.max(lvalue, height[l]);
            wall = Math.min(lvalue, rvalue);
            water += Math.max(0, wall - height[l]);
        }
    }

    return water;
};
