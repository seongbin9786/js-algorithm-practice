/*
[Min Heap 별도 구현 시작]
- 16:50 구현 시작
- 17:15 MinHeap 첫 구현 완료, 일부 케이스 무한 루프 발생
- 17:17 내려가기/올라가기 루프 탈출 조건 추가
- 17:20 올라가기 childIndex 감소문 추가 / 정답
*/
class MinHeap {
    #compareFn = (a, b) => 0;
    #array = [undefined]; // 1-indexed가 index 계산에 편리

    constructor(compareFn) {
        this.#compareFn = compareFn;
    }

    /*
    [push 원리]
    - 개념 잘 몰라서 유도해야 함. 지금은 유도 연습하는 중.
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

const solution = (rawJobs) => {
    const jobs = rawJobs.map(([requestedAt, length], index) => ({
        id: index,
        requestedAt,
        length,
    }));

    // 요청 시각 오름차순으로 정렬
    jobs.sort((a, b) => a.requestedAt - b.requestedAt);

    let nextRequestJobIndex = 0;
    const jobsRequested = new MinHeap(
        (a, b) =>
            a.length - b.length || a.requestedAt - b.requestedAt || a.id - b.id
    );
    const jobTotalWaitTimes = [];

    let currTime = 0;
    while (jobsRequested.length > 0 || nextRequestJobIndex < jobs.length) {
        // 가장 가까운 요청보다 현재 시각이 이르다면 시간 빨리 감기
        if (jobsRequested.length === 0) {
            const nextJobRequestTime = jobs[nextRequestJobIndex].requestedAt;
            currTime = Math.max(currTime, nextJobRequestTime);
        }

        // 현재 시각까지 요청된 작업 모두 추가하기
        while (
            nextRequestJobIndex < jobs.length &&
            jobs[nextRequestJobIndex].requestedAt <= currTime
        ) {
            jobsRequested.push(jobs[nextRequestJobIndex++]);
        }

        if (jobsRequested.length === 0) {
            break;
        }

        // 작업 빼내서 진행시키기
        const nextJob = jobsRequested.pop();
        currTime += nextJob.length;
        const totalWaitTime = currTime - nextJob.requestedAt;
        jobTotalWaitTimes.push(totalWaitTime);
    }

    const waitTimeSum = jobTotalWaitTimes.reduce((sum, cur) => sum + cur, 0);
    const averageWaitTime = Math.floor(waitTimeSum / jobs.length);

    return averageWaitTime;
};
