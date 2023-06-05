
//numbers의 길이는 1 이상 100,000 이하입니다.
//numbers의 원소는 0 이상 1,000 이하입니다.
const createRandomInput = () => {
  const result = [];

  for (let i = 0; i < 100; i++) {
    result.push(Math.floor(Math.random() * 1000));
  }

  return result;
}


const CANDIDATES = [];

/**
 * 
 * @param {string} current 
 * @param {string[]} numbers
 */
const backtrack = (current, numbers) => {
  // console.log('backtrack!', current, numbers)
  // 더 이상 추가할 수 없음.
  if (numbers.length === 0) {
    return CANDIDATES.push(current);
  }

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    // console.log(`[APPEND]: ${current}+${num}`);

    // filter가 엄청 오래 걸리는 것 같음. O(N) 이니까. 그렇다고 includes를 쓰기 위해 O(N^2) 으로 만들기도 그럼. 어떻게 해야?
    backtrack(current + num, numbers.filter((_, idx) => i !== idx));
    // num을 빼고 제공. idx로 빼야 함. 동일 정수값의 원소가 또 있을 수 있으므로.
  }
}

const solution = (numbers) => {
  numbers = numbers.map(num => num + '');

  // 1. 백트래킹으로 모든 조합을 string으로 구한다.
  backtrack("", [...numbers]);

  // 내림차순 정렬. compareFunction(a, b)이 0보다 작은 경우 a를 b보다 낮은 색인으로 정렬합니다. 즉, a가 먼저옵니다.
  CANDIDATES.sort((a, b) => {
    // b - a 일 경우, a가 더 작으면 양수가 되어 a가 뒤로 감. a가 크면 음수가 되어 a가 앞으로 감.
    // 정수 차이만큼 나게 됨. b - a 이므로 내림차순 정렬됨.
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) continue;
      return b[i] - a[i];
    }
  });

  // console.log(CANDIDATES);

  return CANDIDATES[0];
}

solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
