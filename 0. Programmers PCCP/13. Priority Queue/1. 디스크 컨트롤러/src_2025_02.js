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
