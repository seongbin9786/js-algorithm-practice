let TARGET = -1;
let NUMBERS = [];
let COUNTER = 0;

const backtrack = (visitingIdx, curValue) => {
    console.log(`visiting: ${visitingIdx}, curValue: ${curValue}`);
    // 조합에 도달
    if (visitingIdx >= NUMBERS.length) {
        if (curValue === TARGET) {
            COUNTER++;
        }
        return;
    }

    // 각 조합을 수행
    backtrack(visitingIdx + 1, curValue + NUMBERS[visitingIdx]);
    backtrack(visitingIdx + 1, curValue - NUMBERS[visitingIdx]);
};

/**
 * @param {number[]} numbers 주어진 정수 배열
 * @param {number} target 합, 차로 만들어야 할 정수
 * @returns 주어진 배열로 target을 만드는 방법의 개수
 */
function solution(numbers, target) {
    // backtrack으로 각 idx 별로 +/-를 분기해서 조합을 구성한다.
    // 각 조합의 완성 시점에 target인 경우 count를 추가한다.
    // 모든 조합을 순회한 후 count를 반환한다.
    NUMBERS = numbers;
    TARGET = target;

    backtrack(0, 0);

    return COUNTER;
}

console.log(solution([4, 1, 2, 1], 4));
