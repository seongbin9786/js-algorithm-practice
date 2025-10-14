import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. Stack 기능인 push,pop,top 함수를 구현하되, getMin()을 추가로 구현해야 하며, 전체를 O(1)에 구현

[제한 조건]
1. pop,top,getMin은 빈 스택에 대해 수행되지 않음

[발상]
1. getMin이 관건. getMin을 구현하면서도 나머지를 상수 시간에 구현해야 함
2. 방법 후보들:
    - min값의 배열
        - push 될 때마다 min을 계산하고, 아... 새로 들어온 애가 min이 아닐 수도 있네. 그럼 섞어야 되니 안 됨 (X)
    - min 값의 배열 + counter Map 사용
        - min의 배열을 구현할 수가 없나?
        - Map으로 카운팅하고, min의 배열을 카운팅하고,
        - 하나 빠질 때마다 Map에서 빼고,
        - min 배열의 끝에 있지만 값이 없는 상태이면 계속 제거해서 개수가 있는 것까지 pop하기.
            - 아니잖아. min 값이 아닌 게 들어오면 뒤에 넣어야 되잖아. 이런 건 불가능함.
    - heap -> O(1)이 아님
    - 진짜 모르겠는데...??
    - Deque으로 구현하면 어떰
        - 이게 가능한 건가? o(1)이?
        - X. min/max 값만 계속 오는 게 아니라 중간 값들도 들어옴;
    - push: 10 7 12 8 15 1 5 4 2
    - min: 10 7 7  7  7  1 1 1 1
    - pop:  - -  O  - -  - O - -
    - min: 10 10 10 10 10 1 1 4 2
    - 흠... 오 링크드리스트 생각을 좀 하다가 갑자기 생각남
        - 현재의 min값을 저장해두면 되지 않을까?
        - 맞네. 진짜 말 그대로 <Min Stack> 임 
3. 


*/
describe("Min Stack", () => {
    it.each([
        [
            [
                "MinStack",
                "push",
                "push",
                "push",
                "getMin", // -3
                "pop", // null
                "top", // 0
                "getMin", // -2
            ],
            [[], [-2], [0], [-3], [], [], [], []],
            [null, null, null, null, -3, null, 0, -2],
        ],
    ])("%j => %j", (operations, inputArray, expected) => {
        const result = solution(operations, inputArray);
        assert.deepEqual(result, expected);
    });
});

function solution(operations, inputArray) {
    const minStack = new MinStack();
    const result = [null]; // new MinStack에 대한 반환값

    for (let i = 1; i < operations.length; i++) {
        switch (operations[i]) {
            case "push":
                result.push(minStack.push(inputArray[i][0])); // 인자가 하나인데도 불구하고 배열에 담겨 있음; why?
                break;
            case "getMin":
                result.push(minStack.getMin());
                break;
            case "top":
                result.push(minStack.top());
                break;
            case "pop":
                minStack.pop();
                result.push(null);
        }
        console.log(`result: ${result}`);
    }
    return result;
}

var MinStack = function () {
    this.arr = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    console.log(`push:${val}`);
    const prevMinVal = this.arr[this.arr.length - 1]?.minVal;
    const minVal = this.arr.length === 0 ? val : Math.min(val, prevMinVal);
    this.arr.push({ val, minVal });
    return null;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    return this.arr.pop().val;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.arr[this.arr.length - 1].val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.arr[this.arr.length - 1].minVal;
};
