import { describe, it, assert } from "vitest";

/*
[이해 시도, 실패 지점]
1. pop하는 곳의 순서를 섞을 수 있다고 생각해, pop 조합에 대한 완전 탐색으로 생각
2. 연결리스트로 보고, 2번 자르는 곳을 생각 -> nC2, n=30만, 450억... 흠... 아니라고 생각
3. 합계/2가 불가능 여부 판정은 알 수 없었음

[사용한 힌트]
1. 투포인터로 해결해야 한다는 점

[코드 작성 도중 막힌 점]
1. 투포인터로 어떻게 이동하지? -> 무조건 이동이 한쪽으로 강제되는 걸 깨닫지 못 함 (머리로 안 되면.. 그림을 그려보는 게 맞을 것 같음..)

[배운 점]
1. O(n^2)으로 안 되면 투포인터를 생각해보자

*/
describe("두 큐 합 같게 만들기 (Lv.2)", () => {
    it.each([
        // 알고리즘을 모르겠으니 우선 해본다.
        // 합=30
        // 좌측 끝 범위를 우측으로 이동
        // -3, 27 -2, 25, -7 20, -2 18, -4 14 (실패)
        // 좌측 범위를 살리고, 우측 범위 이동
        // +4 18,
        // 우측 범위 이동
        // -1 17, -5 12
        // 좌측 범위 이동
        // +7 19
        // 우측 범위 이동
        // -6 13
        // 좌측 범위 이동
        // +2 15
        // 흠. . . 이건 무슨 패턴일까?
        /*
        1. 처음에 전체 합계가 된다.
        2. 목표치까지 줄여야 함
        3. 왼쪽에서 쭉 줄임 (이유는 없음)
        4. 목표치보다 더 떨어지면, 마지막을 롤백하고, 반대쪽으로 가서 범위를 줄임
        5. 목표치보다 더 떨어지면, 마지막을 롤백하고, (흠;; 모르겠는데?)
        6. 어디를 롤백하고 그런 정해진 게 없음

        포기

        내가 놓친 것: pop-insert는 한 몸이므로
        -> 한 칸만 움직이는 건 그대로임
        -> 근데 
        */
        [[3, 2, 7, 2], [4, 6, 5, 1], 2],
        [[1, 2, 1, 2], [1, 10, 1, 2], 7],
        [[1, 1], [1, 5], -1],
        [[1], [1], 0],
    ])("%j + %j => min: %i", (queue1, queue2, expected) => {
        const result = solution(queue1, queue2);
        assert.equal(result, expected);
    });
});

function solution(queue1, queue2) {
    let total = 0;
    let maxValue = 0;
    let currSum = 0;
    const queue = [];
    for (let i = 0; i < queue1.length; i++) {
        maxValue = Math.max(maxValue, queue1[i]);
        total += queue1[i];
        currSum += queue1[i];
        queue.push(queue1[i]);
    }
    for (let i = 0; i < queue2.length; i++) {
        maxValue = Math.max(maxValue, queue2[i]);
        total += queue2[i];
        queue.push(queue2[i]);
    }
    // NOTE: 합계가 홀수면 1/2 불가
    // NOTE: 한 값이 합계의 절반을 초과하면 불가
    if (total % 2 === 1 || maxValue > total / 2) {
        return -1;
    }

    // 1. 한쪽씩 움직여야 하나? 2개씩 같이 넣을 필요는 없잖아.
    // 2. 우측 고정하고 좌측만 줄어들기
    // 3. 좌측 고정하고 우측만 줄어들기
    // 4. 양쪽이 한 번씩 줄어들기?
    // 애초에 방향이 하나로 고정되어 있어야 함. 한 번 왔다가, 취소할 순 없음. (q1->q2, q2->q1) (뭐 취소할 순 있는데 아무 의미 없음)
    const targetSum = total / 2;
    let moves = 0;
    let left = 0;
    let right = queue1.length;
    while (left < right && right < queue.length) {
        console.log("currSum:", currSum);
        if (currSum === targetSum) {
            return moves;
        }
        if (currSum > targetSum) {
            currSum -= queue[left++];
        } else {
            currSum += queue[right++];
        }
        moves++;
    }

    return -1;
}
