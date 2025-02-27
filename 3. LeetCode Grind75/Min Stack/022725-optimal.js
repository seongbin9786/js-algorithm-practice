class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
        // 스택에서 현재 값들 중 min을 출력하려면?
        // 일반적인 방법으로 Min을 구하려면 Min Heap의 O(log N)을 필요로 하겠지만,
        // Min List가 따로 있는 게 아니라면, 스택의 상태 별로 Min을 구하는 건 항상 (currMin, newValue) 간 비교만 있으면 된다.
        // 만약 value가 빠져나가서, 이전의 min을 복구해야 한다면 스택의 min이 자동으로 갱신되게 만들면 된다.
        // 바로 스택에 현재 스택 원소들 간의 min값도 함께 넣으면 된다.
    }

    push(value) {
        this.stack.push(value);
        this.minStack.push(
            !this.minStack.length ? value : Math.min(this.getMin(), value)
        );
    }

    pop() {
        if (!this.stack.length) return;
        this.minStack.pop();
        return this.stack.pop();
    }

    top() {
        if (!this.stack.length) return;
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        if (!this.stack.length) return;
        return this.minStack[this.minStack.length - 1];
    }
}
