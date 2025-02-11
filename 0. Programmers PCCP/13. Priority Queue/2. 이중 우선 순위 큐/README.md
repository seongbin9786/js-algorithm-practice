# 이중 우선 순위 큐

## 문제 개요

-   문제 유형: 우선 순위 큐
-   문제 난도: 프로그래머스 Lv3, 61% (2025/02)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42628

### 문제 핵심 요약

-   최대, 최소값을 제거할 수 있는 우선 순위 큐를 구현

### 문제 입출력

-   입력 값: 삽입 명령, 최대/최소 삭제 명령
-   출력 값: 명령들을 실행한 후의 [최댓값, 최솟값] 반환

## 문제 해설

-   문제 해결책 설명
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1. [접근 1] heap을 안 쓰기

-   그냥 list를 써보기
    -   속도 면에서 한계가 있어 list를 쓸 수는 없다.

#### 1-2. [접근 2] heap을 하나만 쓰기

-   min heap만 쓰고, max는 O(n)으로 선형 탐색하기
    -   이건 반쪽 짜리여서 한계가 있다.

#### 1-3. [접근 3] min, max heap 둘 다 쓰기

-   선형 탐색 없이 min, max를 출력하려면 각 heap이 필요하므로 2개를 사용
    -   삭제해야 할 값이 살아있는데 방법 = ?
    -   pop만 해결하면 되는데...

#### 1-4. [접근 4] Map을 쓰기

-   Map을 써서 counter만 유지하면 된다.
    -   한계: 무슨 값을 제거할지를 Map에서 알려면 List와 같이 선형 탐색이 필요...

#### 1-5. [접근 5] (외부 답변 참고) pop 해결 방법 = 삭제를 지연해서 처리하기

-   min, max heap을 사용한다. 빠르게 min, max 값을 조회하는 방법이 heap 뿐이기 때문이다.
-   min, max 값을 확인하는 과정에서 해당 heap에서는 실제로 제거한다.
-   그 반대쪽 heap에서는 max, min 값을 빠르게 삭제하는 기능이 없다.
-   따라서 실제로 삭제하지 않고, remove flag를 사용해 추후 pop 시에 삭제된 값인 경우 재귀적으로 pop해서 처리한다.
-   중복 값이 있을 수 있으므로 Map으로 counter 상태를 보관해야 한다.

#### 2-1. 1차 시도

-   착각해서 만든 Map 풀이.
-   삭제할 값이 주어져야만 가능한 방법이다.

```js
// ["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]
const solution = (operations) => {
    const map = new Map(); // 적절한 이름 구상이 어려움
    operations.forEach((operation) => {
        const [opcode, rawValue] = operation.split(" ");
        const value = Number(rawValue);
        console.log(opcode, value);
        if (opcode === "I") {
            const remainingCount = map.get(value) ?? 0;
            map.set(value, remainingCount + 1);
        } else {
            const remainingCount = map.get(value) ?? 0;
            map.set(value, Math.max(0, remainingCount - 1));
        }
    });

    const remainingValues = [];
    for (const [value, remainingCount] of map.entries()) {
        if (remainingCount > 0) {
            remainingValues.push(value);
        }
    }
    remainingValues.sort();
    if (remainingValues.length === 0) {
        return [0, 0];
    }
    return [remainingValues[remainingValues.length - 1], remainingValues[0]];
};
```

#### 2-2. 2차 시도 (실패 - 60점)

-   정답을 기대했는데 오답 판정이 났다.
-   오답의 원인
    -   pop에서 삭제된 값 처리하는 걸 최종 파트에서만 해서 문제가 됐다.
    -   제거 개수 합산에서 오류가 있어 제대로 합산을 못 했다.

```js
class MinHeap {
    // ...중략

    peek() {
        return this.items[1];
    }
}

const solution = (rawOperations) => {
    const minHeap = new MinHeap((a, b) => a - b);
    const maxHeap = new MinHeap((a, b) => b - a);

    const minRemoveCounts = new Map();
    const maxRemoveCounts = new Map();

    let totalLength = 0;

    rawOperations.forEach((operation) => {
        const [opcode, rawValue] = operation.split(" ");
        const value = Number(rawValue);

        if (opcode === "I") {
            minHeap.push(value);
            maxHeap.push(value);
            totalLength++;
            return;
        } else if (value === -1) {
            if (totalLength === 0) {
                return;
            }
            const removed = minHeap.pop();
            const existingCount = maxRemoveCounts.get(value) ?? 0;
            maxRemoveCounts.set(Math.max(0, existingCount - 1));
            totalLength--;
            return;
        }
        if (totalLength === 0) {
            return;
        }
        const removed = maxHeap.pop();
        const existingCount = minRemoveCounts.get(value) ?? 0;
        minRemoveCounts.set(Math.max(0, existingCount - 1));
        totalLength--;
    });

    if (totalLength === 0) {
        return [0, 0];
    }

    while (!minHeap.isEmpty()) {
        const top = minHeap.peek();
        const existingCount = minRemoveCounts.get(top) ?? 0;
        if (existingCount <= 0) {
            break;
        }
        minRemoveCounts.set(top, Math.max(0, existingCount - 1));
        minHeap.pop();
    }

    while (!maxHeap.isEmpty()) {
        const top = maxHeap.peek();
        const existingCount = maxRemoveCounts.get(top) ?? 0;
        if (existingCount <= 0) {
            break;
        }
        maxRemoveCounts.set(top, Math.max(0, existingCount - 1));
        maxHeap.pop();
    }

    return [maxHeap.pop(), minHeap.pop()];
};
```

#### 2-3. 3차 시도 (완성 코드)

-   집계에 실수가 있던 점을 해소했다.
-   집계 자체를 명확히 생각하지 않고 진행했는데, 그래서 오답이 났을 때 좀 헤맸다 :(
-   코드 간결화
    -   집계에서 get-set이 반복되는 문제를 Map을 상속해서 해결했다.
    -   pop하고 while 하는 부분이 반복되어서 Heap에 넣었다.

```js
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
```

### 3. 배운 점

-   아이디어를 모를 땐 답안을 보는 게 좋겠다.
    -   단, 외부에서 힌트를 얻을 때는 직접 풀 때와는 다른 목적을 세워야 한다.
        -   나 혼자서 풀 때는 혼자 깨우치고 유도 과정을 설명하기만 하면 끝이다.
    -   그 목표는 바로, "해당 답안 작성자의 답안 생성을 직접 유도할 수 있게 깨우치기"
        -   일단 모든 답안을 다 보지 않고, 조금씩 보면서 스스로 답안을 유도해본다.
        -   만약 답안이 이해가 가지 않으면 혼자서 유도할 수도 없으므로 다른 답안을 참고한다.
        -   스스로 유도가 가능한 경우는 내가 막힌 부분이 파악이 된다. 그게 이 문제에서 내가 얻어갈 부분이다.
    -   답안을 보는 것은 일종의 문제 풀이 강의이다. 문제 풀이 강의를 감상하는 게 아니라 내가 강의를 구현할 수 있으면 성공이다.
-   꼭 스스로 깨우치지 못해도 된다.
    -   깨우치지 못했다는 사실을 잘 보관하면 나 스스로를 잘 파악할 수 있다.
-   그리고 이 정도 수준의 문제(골드 4 정도)도 기본 개념 이해를 돕는 수준의 문제인 것 같다.
    -   (ex) heap의 min, max를 O(log N)에 조회 가능하다는 성질, 그리고 다른 자료구조로는 안 된다는 것을 알고 있느냐가 중요한 것 같다.
        -   그래서 heap의 삭제 속도의 한계를 해소하는 방법밖에 없다는 접근을 했다면 삭제 flag까지는 빠르게 도달했을 것 같다.
-   기본 유형의 아이디어들은 사실 개념 이해 측면이 강하므로, 유도 못했다고 자책할 게 아니라, 유도한다고 미련하게 몇 시간 쓰는 게 더 문제다.
    -   앞으로 점점 더 빠르게 학습할 수 있겠다는 생각이 든다 :)
