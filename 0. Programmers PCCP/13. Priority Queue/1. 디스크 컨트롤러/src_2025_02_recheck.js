/*
[문제]
- 전체 작업의 처리 시간의 평균값의 정수 부분을 반환
- 작업 개수 <= 500
- 처리 시간 = (처리 완료 시각 - 요청 시각)
- (번호, 요청 시각, 소요 시간) 단위의 작업 단위
- !!들어온!! 작업은 우선 순위대로 처리
- 작업 처리 우선 순위 = (소요 시간 짧은 것, 요청 시각 빠른 것, 작업 번호 작은 것) 순서
- 작업 종료 후 즉시 시작 가능

[해결 방법]
- 현재 시점까지 요청된 작업 중에서 최우선 작업을 선택해 처리를 시작
- 작업 처리 시, 처리 시간을 모아둔 후, 모든 작업 처리 완료 시 처리 시간의 평균을 구해야 함
- 만약 작업이 비어 있다면 남은 작업의 첫 작업의 요청 시각까지 빨리 감기해야 함

[시도 1]
- 단순 배열로 일단 시도
- 16:42
- 정상 TC 성공 6 / 11

[시도 2]
- 사소한 로직 실수 수정
- 16:50 - 정확성 TC만 있어서 모두 통과...
- 28분 썼고, 12분 남았는데 MinHeap을 12분 만에 구현할 수 있을지는 의문이긴 함
*/
const solution = (rawJobs) => {
    const jobs = rawJobs.map(([requestedAt, length], index) => ({
        id: index,
        requestedAt,
        length,
    }));

    // 요청 시각 오름차순으로 정렬
    jobs.sort((a, b) => a.requestedAt - b.requestedAt);

    let nextRequestJobIndex = 0;
    const jobsRequested = [];
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

        // 여기서 그냥 배열 쓰고 정렬해도 안 느릴 수도 있을 듯?
        // 0이면 false 이니깐 || 으로 깔끔하게 표현 가능
        jobsRequested.sort(
            (a, b) =>
                a.length - b.length ||
                a.requestedAt - b.requestedAt ||
                a.id - b.id
        );

        // 작업 빼내서 진행시키기
        const nextJob = jobsRequested.shift();
        currTime += nextJob.length;
        const totalWaitTime = currTime - nextJob.requestedAt;
        jobTotalWaitTimes.push(totalWaitTime);
    }

    const waitTimeSum = jobTotalWaitTimes.reduce((sum, cur) => sum + cur, 0);
    const averageWaitTime = Math.floor(waitTimeSum / jobs.length);

    return averageWaitTime;
};
