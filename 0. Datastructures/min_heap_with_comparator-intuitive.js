// NOTE: class로 안 짜면 코드가 좀 더 짧아질 듯 (this. 생략)
// NOTE: #은 확실히 타이핑하기 힘들어 이를 생략하기 위한 메소드를 별도로 만들어서 코드가 길어짐.
class MinHeap {
    #compareFn = (a, b) => 0;
    #array = [undefined]; // 1-indexed가 index 계산에 편리

    constructor(compareFn) {
        this.#compareFn = compareFn;
    }

    /*
    [push 원리]
    - min heap은 레벨 별로 더 작은 값이 상위 레벨에 있는 트리
    - O(log2(N))의 삽입 성능
    - 임의의 값을 배열 맨 끝에 추가
    - 해당 값을 부모와 비교해 계속해서 올림
    */
    push(elem) {
        this.#array.push(elem);
        let childIndex = this.#array.length - 1;

        // 올라가기
        while (childIndex > 1) {
            const parentIndex = Math.floor(childIndex / 2);

            // parent가 더 작아서 종료
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

    /*
    [pop 원리]
    - 루트 값을 반환
    - 맨 마지막 요소의 값(가장 큰 값들 중 하나임)을 루트에 배치
    - 루트에서 내려가며 자기 자리를 찾음
    - 기존 노드가 올라오는 과정에서 더 작은 값이 올라오게 되며, 자연스럽게 루트와 중간 부모 노드들이 결정됨
    */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        const root = this.#array[1];
        const rear = this.#array.pop();
        if (this.isEmpty()) {
            // 추가 노드가 없어 진행 불가
            return root;
        }
        this.#array[1] = rear;

        // 내려가기
        // left, right 자식이 다 있음
        // 비교할 자식 칸이 있으면 비교
        let parentIndex = 1;
        while (parentIndex * 2 < this.#internalLength) {
            // right가 없으면 그냥 left 것 사용
            const childLeftIndex = parentIndex * 2;
            const childRightIndex =
                this.#internalLength > childLeftIndex + 1
                    ? childLeftIndex + 1
                    : childLeftIndex;

            const childMinimumIndex =
                this.compare(childLeftIndex, childRightIndex) <= 0
                    ? childLeftIndex
                    : childRightIndex;

            // parent가 더 작아서 종료
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
}
