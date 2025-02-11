class MinHeap {
    items = [];
    compareFn = (a, b) => 0;

    constructor(compareFn) {
        this.items.push(undefined);
        this.compareFn = compareFn;
    }

    isEmpty() {
        return this.items.length === 1;
    }

    compareAt(aIndex, bIndex) {
        return this.compareFn(this.items[aIndex], this.items[bIndex]);
    }

    peek() {
        return this.items[1];
    }

    push(item) {
        this.items.push(item);
        let childIndex = this.items.length - 1;
        let parentIndex = Math.floor(childIndex / 2);

        while (
            childIndex > 1 &&
            this.compareFn(item, this.items[parentIndex]) < 0
        ) {
            this.items[childIndex] = this.items[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(childIndex / 2);
        }

        this.items[childIndex] = item;
    }

    clearAndPop(counter) {
        const top = this.pop();
        const quantity = counter.get(top) ?? 0;
        if (quantity > 0) {
            return top;
        }
        counter.increment(top);
        return this.clearAndPop(counter);
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }
        const result = this.items[1];
        const last = this.items.pop();
        if (this.isEmpty()) {
            return result;
        }

        this.items[1] = last;
        let parentIndex = 1;
        let childLeftIndex = parentIndex * 2;

        while (this.items.length > childLeftIndex) {
            const minChildIndex =
                this.items.length - 1 === childLeftIndex
                    ? childLeftIndex
                    : this.compareAt(childLeftIndex, childLeftIndex + 1) < 0
                    ? childLeftIndex
                    : childLeftIndex + 1;

            if (this.compareFn(last, this.items[minChildIndex]) < 0) {
                break;
            }

            this.items[parentIndex] = this.items[minChildIndex];
            parentIndex = minChildIndex;
            childLeftIndex = parentIndex * 2;
        }

        this.items[parentIndex] = last;
        return result;
    }
}

class Counter extends Map {
    increment(key) {
        const existingCount = this.get(key) ?? 0;
        this.set(key, existingCount + 1);
    }
    decrement(key) {
        const existingCount = this.get(key) ?? 0;
        this.set(key, existingCount - 1);
    }
}

const solution = (rawOperations) => {
    const minHeap = new MinHeap((a, b) => a - b);
    const maxHeap = new MinHeap((a, b) => b - a);

    const minCounter = new Counter();
    const maxCounter = new Counter();

    let totalLength = 0;

    rawOperations.forEach((operation) => {
        const [opcode, rawValue] = operation.split(" ");
        const value = Number(rawValue);

        if (opcode === "I") {
            minHeap.push(value);
            maxHeap.push(value);

            minCounter.increment(value);
            maxCounter.increment(value);
            return;
        } else if (value === -1) {
            const minRemoved = minHeap.clearAndPop(minCounter);
            maxCounter.decrement(minRemoved);
            return;
        }
        const maxRemoved = maxHeap.clearAndPop(maxCounter);
        minCounter.decrement(maxRemoved);
    });

    return [
        maxHeap.clearAndPop(maxCounter) ?? 0,
        minHeap.clearAndPop(minCounter) ?? 0,
    ];
};
