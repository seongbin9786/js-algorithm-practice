/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
/*
[문제]
- [x,y] 의 배열을 받아 (0,0)과 가장 가까운 k개의 가까운 값을 반환, 순서는 무관
- k <= 1만
- [x,y], x,y <= |1만|

[해결 방법]
- 그냥 정렬이 아닌가?
- 생각해도 모르겠으므로 그냥 함
--> 되긴 한데, optimal이 아님을 확인 (실행 속도 10배 차이...!)

- 조금 더 생각해보기..
- O(N)으로 가능할 듯? 하나의 값으로 나오니까.
- k개짜리 배열을 만들고, 꽉 차면, max 값과 매번 교체하면 됨
- max를 알아야 하니 max heap을 쓰면 좋을 듯 --> 최악의 경우 O N log N이긴 함 (매번 교체)
*/
const euclideanDistance = ([x, y]) =>
    Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

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
    // k개를
    const maxHeap = new MinHeap(
        (a, b) => euclideanDistance(b) - euclideanDistance(a)
    );

    maxHeap.push(points[0]);
    for (let i = 1; i < points.length; i++) {
        const currDistance = euclideanDistance(points[i]);
        const max = maxHeap.peek();
        const maxDistance = euclideanDistance(max);

        if (maxHeap.size() < k) {
            maxHeap.push(points[i]);
        } else if (maxDistance > currDistance) {
            // 개선한다면 pop - push 하지 말고 한 번에 하면 좋을 듯
            maxHeap.pop();
            maxHeap.push(points[i]);
        }
    }

    return maxHeap.getItems().slice(0, k);
};
