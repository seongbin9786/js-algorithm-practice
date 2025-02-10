// TODO: MaxHeap
// TODO: 중복도 되게
export class MinHeap {
    items = [undefined];

    isEmpty() {
        return this.items.length === 1;
    }

    push(item) {
        this.items.push(item);
        let childIndex = this.items.length - 1;
        let parentIndex = Math.floor(childIndex / 2);

        // NOTE: items[childIndex]를 쓰면 안 되는게, item으로 비교하면 매번 exchange 효과가 있음.
        // 근데 items[childIndex]를 쓰면, 원래 이 자리에 있던 요소가 비교 대상이 되니까 오동작하게 됨
        while (childIndex > 1 && item < this.items[parentIndex]) {
            this.items[childIndex] = this.items[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(parentIndex / 2);
        }
        this.items[childIndex] = item; // NOTE: 원래의 parentIndex에 해당하는 곳에, 적합한 item인 input을 할당해준다.
    }

    pop() {
        if (this.items.length === 1) {
            return;
        }
        const result = this.items[1];
        const last = this.items.pop();
        if (this.items.length === 1) {
            // NOTE: 아래 코드를 돌리면, 다시 들어오게 되므로 여기서 중단.
            return last;
        }

        this.items[1] = last;

        let parentIndex = 1;
        let childLeftIndex = parentIndex * 2;
        while (childLeftIndex < this.items.length) {
            const left = this.items[childLeftIndex];
            const right =
                this.items.length > childLeftIndex + 1
                    ? this.items[childLeftIndex + 1]
                    : Infinity;
            if (last < Math.min(left, right)) {
                break;
            }

            const minChildIndex =
                left <= right ? childLeftIndex : childLeftIndex + 1;
            this.items[parentIndex] = this.items[minChildIndex];
            parentIndex = minChildIndex;
            childLeftIndex = parentIndex * 2;
        }
        this.items[parentIndex] = last;

        return result;
    }
}
