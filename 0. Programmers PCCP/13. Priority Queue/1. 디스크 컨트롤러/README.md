# 디스크 컨트롤러

## 문제 개요

-   문제 유형:
-   문제 난도: 프로그래머스 Lv3, 45% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42627

### 문제 핵심 요약

-   (소요시간 적은 순, 요청 시각이 빠른 순, 작업 번호가 낮은 순)으로 작업을 실행
-   모든 작업이 끝났을 때, 모든 작업의 작업 시간(완료 시각 - 요청 시각)의 평균 값의 정수부 반환

### 문제 입출력

-   입력 값: 작업 별 [요청 시각, 소요 시간], 작업의 index가 작업 번호.
-   출력 값: 모든 작업의 작업 시간(완료 시각 - 요청 시각)의 평균 값의 정수부

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] Min Heap 사용 + 각 작업 완료 시 완료 시간의 평균 계산

-   입력된 jobs를 요청 시각 오름차순으로 정렬
-   첫 작업을 heap에 넣고 현재 시각 = 작업의 요청 시각
-   반복:
    -   heap.pop 해서 현재 시각 += 작업의 소요 시간
    -   해당 작업의 완료 시간(현재 시각 - 요청 시각)을 작업 시간 배열에 push
    -   jobs를 순회하며 요청 시각 <= 현재 시각인 작업을 모두 push
-   PQ에서 요소가 안 남을 때까지 heap에서 위 과정을 반복
-   return floor(sum(완료 시간 배열) / 작업 개수)

### 2. 사용 단위 알고리즘 종류

-   우선 순위 큐, 힙

### 3. 사용 단위 알고리즘 구현

-   Custom Comparator 필요

### 4. 코드

#### 4-1. 시도 1 - Min heap + custom comparator 구현

-   Min Heap을 복붙하지 않고 연습 삼아 한 번 더 구현
    -   몇 번의 우여곡절 끝에 구현 성공

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

    push(item) {
        this.items.push(item); // 우선 끝에 넣고, 위로 전달
        let childIndex = this.items.length - 1;
        let parentIndex = Math.floor(childIndex / 2);

        // parent가 아니어도 되나? 일단 ㄱ
        // (a,b) => a-b 이면 오름차순인 원리?
        // (1,4) = - 이니깐, b가 크다는 뜻. (4,1) = + 이니깐, a가 크다는 뜻.
        while (childIndex > 1 && this.compareAt(childIndex, parentIndex) < 0) {
            // push는 밑에서 위로 올라가는 방식.
            // 계속해서 parent를 밑으로 복사하고, child는 최후에 내려온 parent 자리에 삽입하는 구조
            // child 자리는 while을 거치면 한 칸씩 올라가기 때문에, 더 이상 while이 통하지 않을 때가 마지막으로 복제한 parent 자리가 된다.
            this.items[childIndex] = this.items[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(childIndex / 2);
        }

        this.items[childIndex] = item;
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

        // last를 root로 올린 후, 내릴 수 있을 때까지 내림.
        // 이 과정에서, 트리의 min 값들이 한 칸씩 올라가게 됨.
        this.items[1] = last;
        let parentIndex = 1;
        let childLeftIndex = parentIndex * 2;

        // 내려갈 때는 left, right 모두 있어서 조금 난해함.
        while (this.items.length > childLeftIndex) {
            // 아휴 복잡하다.
            // minimum 값을 찾는다.
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

        // 마지막 노드에 last를 넣어줘야 함. 기존 값들이 다 parent로 복제해왔음.
        // parentIndex가 마지막으로 복제한 childIndex 값이 되므로 여기에 넣어줘야 함.
        this.items[parentIndex] = last;
        return result;
    }
}
```

-   custom comparator 구현

```js
const solution = (rawJobs) => {
    const jobs = rawJobs.map(([requestTime, duration], index) => ({
        requestTime,
        duration,
        index,
    }));
    // 세 기준 다 오름차순 정렬
    const heap = new MinHeap((a, b) => {
        if (a.duration !== b.duration) {
            return a.duration - b.duration;
        }
        if (a.requestTime !== b.requestTime) {
            return a.requestTime - b.requestTime;
        }
        return a.index - b.index;
    });
};
```

-   첫 코드 작성
-   단위 테스트하기에는 다 합쳐져 있는 로직이어서 어쩔 수 없이 한 번에 제출
-   약간의 문제 해결 후 예제 TC 성공
-   제출 시 35점/100점 (정확성 TC)

```js
const solution = (rawJobs) => {
    const jobComparator = (a, b) => {
        if (a.duration !== b.duration) {
            return a.duration - b.duration;
        }
        if (a.requestTime !== b.requestTime) {
            return a.requestTime - b.requestTime;
        }
        return a.index - b.index;
    };

    const jobs = rawJobs
        .map(([requestTime, duration], index) => ({
            requestTime,
            duration,
            index,
        }))
        .sort(jobComparator);

    // 세 기준 다 오름차순 정렬
    const heap = new MinHeap(jobComparator);

    const actualDurations = [];
    let currTime = 0;

    const firstJob = jobs.shift();
    currTime = firstJob.requestTime;
    heap.push(firstJob);

    while (heap.items.length > 1) {
        const { requestTime, duration, index } = heap.pop();
        currTime += duration;
        actualDurations.push(currTime - requestTime);

        while (jobs.length > 0 && jobs[0].requestTime <= currTime) {
            heap.push(jobs.shift());
        }
    }

    const averageActualDuration = Math.floor(
        actualDurations.reduce((a, b) => a + b, 0) / actualDurations.length
    );

    return averageActualDuration;
};
```

#### 4-2. 시도 1 문제 분석

-   35점이면 기본 TC를 통과하지 못하는 문제가 있다는 것
-   만족하지 못한 요구사항 우선 확인

    -   소요시간이 짧은 것, 요청 시각이 빠른 것, 번호가 작은 것 순으로 우선 순위 결정이 됐는가?
        -   comparator가 정확히 작성됐는지 확인
        -   comparator 호출부가 정확히 작성됐는지 확인

-   틀린 부분을 발견할 수 없어서, 더 복잡한 정상 TC를 만들기로 함

##### 4-2-1. TC 1 (통과)

-   jobs: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10]]
-   durations:

```
1       0
2       1
3       3
4       6
5       10
6       15
7       21
8       28
9       36
10      45

1,3,6,10,15,21,28,36,45,55 = 220 / 10 = 22
```

##### 4-2-2. TC 2

-   jobs: [[0,10],[0,9],[0,8],[0,7],[0,6],[0,5],[0,4],[0,3],[0,2],[0,1]]
-   durations: 22

-   오류 확인!

    -   job -> heap에 넣을 때, job이 requestTime 순으로만 정렬돼서 잘못 들어감.
    -   job sort도 heap의 comparator를 넣어주니 해결됨

-   결과: 5점으로 추락... why?

##### 4-2-3. TC 3

-   PQ를 잘못 만들었을 수도 있음. 흠... 기본 TC가 잘 되는데 이렇게 틀릴 수가 있나?
-   문득 깨달은 점:

    -   job은 정렬할 필요 없이 처음부터 다 넣으면 됨
    -   이렇게 바꿨더니 5점 -> 10점으로 올라감.
    -   흠...

-   오, 중복 값이 있을 때 처리가 어떻게 되는지 확인 필요

    -   jobs: [[0,1],[0,1],[0,1],[0,1],[0,1]]
    -   durations: 3
    -   결과:
        -   별 문제 없이 통과.... 흠...? 아 하긴 index 때문에 중복이 없구나?

-   문득 생각난 점:

    -   중간에 빈 시간이 있으면?
        -   jobs: [[0,1], [100,1]]
        -   durations: 1
        -   결과:
            -   `-49` 값이 나옴. 오류.
    -   fix: `currTime = Math.max(currTime, requestTime)`
        -   requestTime > currTime 일 때, 그만큼 기다리는 게 아니기 때문이다.
        -   결과:
            -   문제는 해결됐지만, 여전히 10점이다.

-   jobs:[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]]
-   durations: 1
-   결과: 성공

-   현재 코드 (기록용)
-   뭔가 되게 간단한 걸 틀렸을 것 같다는 생각이 든다.
    -   MinHeap에서 오류 발견
        -   틀린 비교: `while (childIndex > 1 && this.compareAt(childIndex, parentIndex) < 0)`
        -   정상 비교: `while (childIndex > 1 && this.compareFn(item, this.items[parentIndex]) < 0)`

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

    push(item) {
        this.items.push(item);
        let childIndex = this.items.length - 1;
        let parentIndex = Math.floor(childIndex / 2);

        while (childIndex > 1 && this.compareAt(childIndex, parentIndex) < 0) {
            this.items[childIndex] = this.items[parentIndex];
            childIndex = parentIndex;
            parentIndex = Math.floor(childIndex / 2);
        }

        this.items[childIndex] = item;
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

const solution = (rawJobs) => {
    const jobs = rawJobs.map(([requestTime, duration], index) => ({
        requestTime,
        duration,
        index,
    }));

    const heap = new MinHeap((a, b) => {
        if (a.duration !== b.duration) {
            return a.duration - b.duration;
        }
        if (a.requestTime !== b.requestTime) {
            return a.requestTime - b.requestTime;
        }
        return a.index - b.index;
    });

    const actualDurations = [];
    let currTime = 0;

    jobs.forEach((job) => {
        heap.push(job);
    });

    while (!heap.isEmpty()) {
        const { requestTime, duration, index } = heap.pop();
        currTime = Math.max(currTime, requestTime);

        // console.log(
        //     `[${currTime} -> ${
        //         currTime + duration
        //     }] [currJob] requestTime: ${requestTime}, duration: ${duration}, index: ${index}, taken: ${
        //         currTime + duration - requestTime
        //     }`
        // );

        currTime += duration;
        actualDurations.push(currTime - requestTime);
    }

    const sum = actualDurations.reduce((a, b) => a + b, 0);
    const averageActualDuration = Math.floor(sum / actualDurations.length);
    return averageActualDuration;
};
```

##### 4-3. 시도 2

-   MinHeap 검증이 끝남. 문제 풀이 전략에 문제가 있을 것으로 추정
-   아래 코드는 95점 (TC 9번 제외하고 성공)

```js
const solution = (rawJobs) => {
    // 일단 Mutable하게
    let jobs = rawJobs.map(([requestTime, duration], index) => ({
        requestTime,
        duration,
        index,
    }));

    const heap = new MinHeap((a, b) => {
        if (a.duration !== b.duration) {
            return a.duration - b.duration;
        }
        if (a.requestTime !== b.requestTime) {
            return a.requestTime - b.requestTime;
        }
        return a.index - b.index;
    });

    const actualDurations = [];
    let currTime = 0;

    // 우선 순위는 둘 다 큐에 들어와있을 때에만 확인
    // 큐에 아무 것도 없으면 선착순으로 처리해야 함
    //
    // 아직 하나도 도달 못 한 경우는 먼저 가서 찾아줘야 하고,
    // 이미 시간이 꽤 지난 경우는 그동안 쌓인 걸 찾아줘야 함.
    // 뭔가 복잡해서 고민 중
    const split = (arr, predicate) => {
        const truthies = [];
        const falsies = [];
        arr.forEach((item) => {
            const target = predicate(item) ? truthies : falsies;
            target.push(item);
        });
        return [truthies, falsies];
    };

    const splitEarliestJobs = (jobs) => {
        const earliestJobRequestTime = jobs.reduce((min, curr) => {
            return Math.min(min, curr.requestTime);
        }, Infinity);

        return split(jobs, (job) => job.requestTime <= earliestJobRequestTime);
    };

    const splitRequestedJobs = (jobs, currTime) => {
        return split(jobs, (job) => job.requestTime <= currTime);
    };

    do {
        // 현재 시간에 도달한 작업들을 추가
        const [requestedJobs, jobsLeft] = splitRequestedJobs(jobs, currTime);
        requestedJobs.forEach((job) => heap.push(job));
        jobs = jobsLeft;

        // requestedJobs.length = 0
        // --> 만약 없다면 "최근접 작업들"을 조회해서 추가
        // heap.isEmpty
        // --> heap이 비어있지도 않은데 현재 시간에 도달한 작업들이 없다고 추가하면 안 됨
        if (requestedJobs.length === 0 && heap.isEmpty()) {
            const [earliestJobs, jobsLeft] = splitEarliestJobs(jobs);
            earliestJobs.forEach((job) => heap.push(job));
            jobs = jobsLeft;
        }

        if (heap.isEmpty()) {
            break;
        }

        const { requestTime, duration, index } = heap.pop();
        currTime = Math.max(currTime, requestTime); // 대기 시간까지의 시차가 있으면 그때까지 대기
        currTime += duration;
        actualDurations.push(currTime - requestTime); // actualDuration = currTime - requestTime + duration
    } while (true);

    const sum = actualDurations.reduce((a, b) => a + b, 0);
    const averageActualDuration = Math.floor(sum / actualDurations.length);
    return averageActualDuration;
};
```

#### 5-3. 완성 코드

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

const split = (arr, predicate) => {
    const truthies = [];
    const falsies = [];
    arr.forEach((item) => {
        const target = predicate(item) ? truthies : falsies;
        target.push(item);
    });
    return [truthies, falsies];
};

const splitEarliestJobs = (jobs) => {
    const earliestJobRequestTime = jobs.reduce((min, curr) => {
        return Math.min(min, curr.requestTime);
    }, Infinity);

    return split(jobs, (job) => job.requestTime <= earliestJobRequestTime);
};

const splitRequestedJobs = (jobs, currTime) => {
    return split(jobs, (job) => job.requestTime <= currTime);
};

const solution = (rawJobs) => {
    let jobs = rawJobs.map(([requestTime, duration], index) => ({
        requestTime,
        duration,
        index,
    }));

    const heap = new MinHeap((a, b) => {
        if (a.duration !== b.duration) {
            return a.duration - b.duration;
        }
        if (a.requestTime !== b.requestTime) {
            return a.requestTime - b.requestTime;
        }
        return a.index - b.index;
    });

    const actualDurations = [];
    let currTime = 0;

    do {
        const [requestedJobs, jobsLeft] = splitRequestedJobs(jobs, currTime);
        requestedJobs.forEach((job) => heap.push(job));
        jobs = jobsLeft;

        if (requestedJobs.length === 0 && heap.isEmpty()) {
            const [earliestJobs, jobsLeft] = splitEarliestJobs(jobs);
            earliestJobs.forEach((job) => heap.push(job));
            jobs = jobsLeft;
        }

        if (heap.isEmpty()) {
            break;
        }

        const { requestTime, duration } = heap.pop();
        currTime = Math.max(currTime, requestTime);
        currTime += duration;
        actualDurations.push(currTime - requestTime);
    } while (true);

    const sum = actualDurations.reduce((a, b) => a + b, 0);
    const averageActualDuration = Math.floor(sum / actualDurations.length);
    return averageActualDuration;
};
```

### 5. 배운 점

-   아예 문제 풀이가 잘못됐는데 애먼 Min Heap 의심만 하고 있었다.
    -   앞으로는 자료구조, 알고리즘 직접 구현 시 별도로 TC 돌려서 검증하고, 문풀 시에는 의심 없이 진행하자.
-   맞았다고 생각했는데 틀린 TC들이 있다.
    -   물론 머리로 돌리는 것도 중요하지만 그동안 만든 TC를 다 통과함에도 틀렸다.
    -   Hidden TC를 제공하지 않는 곳들은 크게 틀릴 수도 있겠다고 생각이 들었다.
    -   어차피 오답이 뜨면 다시 머리로 돌리는데, 이걸 더 하고 제출해야겠다.
