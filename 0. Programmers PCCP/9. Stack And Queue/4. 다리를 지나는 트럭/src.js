class Queue {
    #front = 0;
    #rear = 0;
    #arr = [];

    // 추가 기능
    #weights = 0;
    #bridgeLength = 0;
    #weightLimit = 0;
    numOfCrossed = 0; // public field

    constructor(bridgeLength, weightLimit) {
        this.#bridgeLength = bridgeLength;
        this.#weightLimit = weightLimit;
    }

    push(pushed) {
        this.#arr.push(pushed);
        this.#rear++;
        this.#weights += pushed.weight;
    }

    pop() {
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        const popped = this.#arr[this.#front++];
        this.#weights -= popped.weight;
        this.numOfCrossed++;
        return popped;
    }

    empty() {
        return this.#front === this.#rear;
    }

    peek() {
        if (this.empty()) {
            throw new Error("Queue is empty");
        }
        return this.#arr[this.#front];
    }

    size() {
        return this.#rear - this.#front;
    }

    weightSum() {
        return this.#weights;
    }

    accessible(newTruckWeight) {
        return this.#weightLimit - this.#weights >= newTruckWeight;
    }

    crossed(tick) {
        if (this.empty()) {
            return false;
        }
        const { startedAt } = this.peek();

        // 들어간 시각 이후로 length가 지나야 함
        // e.g. tick=1 에서 들어가면
        // tick=3에서 pop됨
        return this.#bridgeLength === tick - startedAt;
    }

    // 다음 idx 구하는 코드가 길어져서 내장함
    get nextTruckIdx() {
        // 다음 트럭 = 지난 개수 + 지나고 있는 개수 + 1
        // 0-indexed이므로, +1은 안 해도 됨
        return this.numOfCrossed + this.size();
    }
}

const solution = (bridge_length, weight, truck_weights) => {
    const bridge = new Queue(bridge_length, weight);
    let tick = 1; // 첫 진입이 1s 이므로

    // 모든 트럭을 순회
    while (bridge.numOfCrossed < truck_weights.length) {
        // 1. 진출
        if (bridge.crossed(tick)) {
            bridge.pop();
        }

        // 2. 진입
        let nextTruckWeight = truck_weights[bridge.nextTruckIdx];
        if (bridge.accessible(nextTruckWeight)) {
            bridge.push({ startedAt: tick, weight: nextTruckWeight });
        }

        // 3. 1초씩 대기
        tick++;
    }
    // 마지막 tick은 무의미
    return tick - 1;
};
