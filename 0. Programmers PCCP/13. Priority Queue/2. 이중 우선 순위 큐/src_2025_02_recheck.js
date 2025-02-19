/*
[문제]
- 주어진 (삽입, 삭제) 연산을 모두 처리한 후 [최댓값, 최솟값] 반환 (큐가 비어있으면 [0,0])  
- 이중 우선 순위 큐 = 큐에 숫자를 삽입하고, 최대/최소값을 삭제할 수 있는 큐
- 연산 개수 <= 1,000,000
- "I 값" = 값 삽입, "D -1" = 최솟값 삭제, "D 1" = 최댓값 삭제

[해결 방법]
- (기억이 좀 잘 나는데...ㅋㅋ...)
- 자료구조 중 최댓값, 최솟값을 "빠르게" 조회하려면 힙밖에 없다.
- 힙에는 최댓값, 최솟값을 동시에 유지하는 기능이 없으므로, 둘을 각각 만들어야 한다.
- 두 힙 간의 동기화가 필요하다. 이 동기화는 "빠르게" 수행되어야 한다.
- 우선 신규 값은 두 힙에 모두 추가한다.
- 최대힙에서 최솟값 제거는 선형 탐색이 필요하므로 "빠르게"할 수 없다.
- 이를 "빠르게" 우회하는 방법은 delete flag 사용이다. 나중에 pop 시에 delete flag인 값이 등장하면 그 때 함께 제거하는 것이다.
- 각 힙은 전체 값의 극단값을 갖고 있기 때문에, 만약 극단값이 제거 대상이 아니라면, 해당 값들은 제거되지 않은 상태이며, 극단값에 delete flag가 있다면, 이를 삭제해줌으로써 갱신하면 된다.

- 우선 MinHeap 구현체는 그냥 들고 온다.

[기록]
- 17:49 - 1차 제출 - 기본 TC 1 / 4 ---> 구현에 문제 있음
- 17:53 - 마지막에 둘 다 minHeap 써서 이상하게 된 거였음;;
*/

class MinHeap {
    #compareFn = (a, b) => 0;
    #array = [undefined];
    #removeFlags = new Set();

    constructor(compareFn) {
        this.#compareFn = compareFn;
    }

    push(elem) {
        this.#array.push(elem);
        let childIndex = this.#array.length - 1;

        while (childIndex > 1) {
            const parentIndex = Math.floor(childIndex / 2);

            if (this.compare(parentIndex, childIndex) < 0) {
                break;
            }

            const parentValue = this.at(parentIndex);
            const childValue = this.at(childIndex);
            this.set(childIndex, parentValue);
            this.set(parentIndex, childValue);

            childIndex = Math.floor(childIndex / 2);
        }
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        const root = this.#array[1];
        const rear = this.#array.pop();
        if (this.isEmpty()) {
            return root;
        }

        this.#array[1] = rear;

        let parentIndex = 1;
        while (parentIndex * 2 < this.#internalLength) {
            const childLeftIndex = parentIndex * 2;
            const childRightIndex =
                this.#internalLength > childLeftIndex + 1
                    ? childLeftIndex + 1
                    : childLeftIndex;

            const childMinimumIndex =
                this.compare(childLeftIndex, childRightIndex) <= 0
                    ? childLeftIndex
                    : childRightIndex;

            if (this.compare(parentIndex, childMinimumIndex) <= 0) {
                break;
            }

            const parentValue = this.at(parentIndex);
            const childValue = this.at(childMinimumIndex);
            this.set(parentIndex, childValue);
            this.set(childMinimumIndex, parentValue);
            parentIndex = childMinimumIndex;
        }

        return root;
    }

    isEmpty() {
        return this.#array.length === 1;
    }

    compare(aIndex, bIndex) {
        return this.#compareFn(this.#array[aIndex], this.#array[bIndex]);
    }

    at(index) {
        return this.#array[index];
    }

    set(index, value) {
        this.#array[index] = value;
    }

    get #internalLength() {
        return this.#array.length;
    }

    get length() {
        return this.#array.length - 1;
    }

    addRemoveFlag(value) {
        this.#removeFlags.add(value);
    }

    popWithClear() {
        const popped = this.pop();
        if (popped === undefined) {
            return;
        }

        if (this.#removeFlags.has(popped)) {
            this.#removeFlags.delete(popped);
            return this.pop();
        }

        return popped;
    }
}

const solution = (operations) => {
    const minHeap = new MinHeap((a, b) => a - b);
    const maxHeap = new MinHeap((a, b) => b - a);

    operations.forEach((operation) => {
        const [opcode, rawValue] = operation.split(" ");
        const value = Number.parseInt(rawValue, 10);

        if (opcode === "I") {
            minHeap.push(value);
            maxHeap.push(value);
        } else if (value === -1) {
            const minValue = minHeap.popWithClear();
            maxHeap.addRemoveFlag(minValue);
        } else {
            const maxValue = maxHeap.popWithClear();
            minHeap.addRemoveFlag(maxValue);
        }
    });

    const maxValue = maxHeap.popWithClear() ?? 0;
    const minValue = minHeap.popWithClear() ?? 0;

    return [maxValue, minValue];
};
