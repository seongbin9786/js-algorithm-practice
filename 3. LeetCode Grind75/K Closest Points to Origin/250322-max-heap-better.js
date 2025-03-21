// 개선점: 비교용도로 sqrt 불필요
const euclideanDistance = ([x, y]) => x * x + y * y;

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

    size() {
        return this.items.length - 1;
    }

    getItems() {
        return this.items.slice(1);
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

    peek() {
        return this.items[1];
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

var kClosest = function (points, k) {
    const maxHeap = new MinHeap(
        (a, b) => euclideanDistance(b) - euclideanDistance(a)
    );

    // 개선점: push만 하는 Case를 위로 이관. 속도 향상됨.
    for (let i = 0; i < k; i++) {
        maxHeap.push(points[i]);
    }
    for (let i = k; i < points.length; i++) {
        const currDistance = euclideanDistance(points[i]);
        const max = maxHeap.peek();
        const maxDistance = euclideanDistance(max);

        if (maxDistance > currDistance) {
            // 개선점: push 과정 생략
            maxHeap.items.push(points[i]);
            maxHeap.pop();
        }
    }

    return maxHeap.getItems().slice(0, k);
};
