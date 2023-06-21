class Queue {
    #arr = [];
    #front = 0;
    #rear = 0;
    
    constructor(initialState) {
        this.#arr = initialState;
        this.#front = 0;
        this.#rear = initialState ? initialState.length : 0;
    }
    
    empty() {
        return this.#rear === this.#front;
    }
    
    push(e) {
        this.#arr.push(e);
        this.#rear++;
    }
    
    pop() {
        return this.#arr[this.#front++];
    }
    
    hasHigherPriority(poppedPri) {
        for (let i = this.#front; i < this.#rear; i++) {
            if (this.#arr[i].pri > poppedPri) {
                return true;
            }
        }
        return false;
    }
}

const solution = (priorities, targetLocation) => {
    let order = 0;
    const q = new Queue(priorities.map((pri, i) => ({ pri, loc: i })));
    
    while (!q.empty()) {
        const { pri, loc } = q.pop();
        if (q.hasHigherPriority(pri)) {
            q.push({ pri, loc });
            continue;
        }
        order++;
        if (loc === targetLocation) {
            break;
        }
    }
    // 맨 끝
    return order;
}