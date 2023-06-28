// O(N), N = jobs.length
const findEarliestAndShortestTask = (jobs, currentTime, completedJobs) => {
    let earliestReqAt = 999999;
    let earliestJobExeTime = 999999;
    let targetId = -1;
    for (const [id, requestedAt, jobExecutionTime] of jobs) {
        if (completedJobs.has(id) || currentTime >= requestedAt) {
            continue;
        }
        // 더 늦게 도착
        if (earliestReqAt < requestedAt) {
            continue;
        }
        // 같이 도착했으나 더 긴 작업
        if (
            earliestReqAt == requestedAt &&
            earliestJobExeTime <= jobExecutionTime
        ) {
            continue;
        }
        // requestAt이 같으면 교체해봤자 의미는 없다? 아니었음.
        // 같이 도착했다면 더 짧은 작업이 있을 수 있음.
        earliestReqAt = requestedAt;
        earliestJobExeTime = jobExecutionTime;
        targetId = id;
    }
    return jobs[targetId];
};

// O(N log N), N = jobs.length
const findShortestTask = (jobs, currentTime, completedJobs) =>
    jobs
        .filter(([id, reqAt]) => currentTime >= reqAt && !completedJobs.has(id))
        .sort(
            ([, aReqAt, aExeTime], [, bReqAt, bExeTime]) =>
                aExeTime - bExeTime || aReqAt - bReqAt,
        );

const findNextTask = (jobs, currentTime, completedJobs) => {
    const requestedJobs = findShortestTask(jobs, currentTime, completedJobs);
    if (requestedJobs.length) {
        return {
            task: requestedJobs[0],
            hasNoRequest: false,
        };
    }
    // 대기 중인 작업이 없으면 가장 이른 작업을 수행해야 함.
    return {
        task: findEarliestTask(jobs, currentTime, completedJobs),
        hasNoRequest: true,
    };
};

/**
 * @param {number[]} noIdJobs [시작 시각, 실행 시간] 쌍의 배열
 * @returns {number} 각 요청~완료까지의 평균
 */
const solution = (noIdJobs) => {
    const timePerTask = [];
    const completedJobs = new Set();
    const jobs = noIdJobs.map((job, i) => [i, ...job]);
    let now = 0;

    // O(N^2 log N)
    // O(N^2)보다 느리므로 이렇게는 안 쓰는 게 좋다.
    while (timePerTask.length < jobs.length) {
        // 1. 이미 요청된 작업 중에서만 고른다. 모두 추가 대기 시간이 없으므로 [실행 시간]만으로 정렬하면 됨.
        const { task, hasNoRequest } = findNextTask(jobs, now, completedJobs);
        const [id, requestedAt, jobExecutionTime] = task;
        const diskWaitTime = hasNoRequest ? requestedAt - now : 0;
        const jobWaitTime = hasNoRequest ? 0 : now - requestedAt;
        const totalJobTime = jobWaitTime + jobExecutionTime;

        // 2. 총 실행 시간에는 추가 대기시간 있다면 더해줘야 함.
        // 3. 작업을 실행
        now += diskWaitTime + jobExecutionTime;
        timePerTask.push(totalJobTime);
        completedJobs.add(id);
    }

    // 3. 평균 구하기
    const sum = timePerTask.reduce((sum, cur) => sum + cur, 0);
    return Math.floor(sum / jobs.length);
};

console.log(
    solution([
        [0, 3],
        [1, 9],
        [2, 6],
    ]),
);
console.log(
    solution([
        [7, 8],
        [3, 5],
        [9, 6],
    ]),
);
