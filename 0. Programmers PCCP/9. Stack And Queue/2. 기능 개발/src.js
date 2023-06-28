/**
 * @param {number} progress 시작 진도
 * @param {number} speed 작업 속도
 * @returns {number} 배포까지 걸리는 날짜(일 단위)
 */
const daysToDeploy = (progress, speed) => Math.ceil((100 - progress) / speed);

/**
 * @param {number} progress 시작 진도
 * @param {number} speed 작업 속도
 * @param {number} remainingDays 작업 기간
 * @returns {boolean} 배포 가능 여부
 */
const canDeploy = (progress, speed, remainingDays) =>
    progress + speed * remainingDays >= 100;

/**
 * 기능은 진도가 100%일 때 서비스에 반영
 * 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있음
 * 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포
 *
 * @param {number[]} progresses 배포되어야 하는 순서대로 작업의 진도(<100)가 적힌 정수 배열 (length <= 100)
 * @param {number[]} speeds 각 작업의 개발 속도(<=100)가 적힌 정수 배열 (length <= 100)
 * @returns {number[]} 각 배포마다 몇 개의 기능이 배포되는지
 *
 * solution idea:
 * --------------
 * 1. 그냥 progresses 를 갖는 action의 speeds 만큼 날짜를 진행시킨다.
 * 2. '날짜' 만큼 뒤의 progresses + speeds * 날짜를 해서 100 이상인 것들은 같이 배포한다.
 * 3. 처음으로 progresses + speeds
 */
const solution = (progresses, speeds) => {
    const result = [];

    for (let i = 0; i < progresses.length; i++) {
        let deployedFeatures = 1;
        const waitingDays = daysToDeploy(progresses[i], speeds[i]);

        while (
            i + 1 < progresses.length &&
            canDeploy(progresses[i + 1], speeds[i + 1], waitingDays)
        ) {
            console.log("waitingDays:", waitingDays);
            deployedFeatures++;
            i++;
        }

        result.push(deployedFeatures);
    }

    return result;
};

console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
