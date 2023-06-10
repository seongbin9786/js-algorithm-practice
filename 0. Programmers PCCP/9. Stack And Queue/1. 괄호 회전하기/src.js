const matchingParenthesis = (opening, closing) =>
  opening === '(' && closing === ')' ||
  opening === '{' && closing === '}' ||
  opening === '[' && closing === ']';

const openingParenthesis = (s) => s === '[' || s === '{' || s === '(';

const closingParenthesis = (s) => s === ']' || s === '}' || s === ')';

/**
 * @param {string[]} s 괄호 문자열의 문자 배열
 * @returns {boolean} 올바른 괄호 문자열인지 여부
 */
const goodParenthesisString = (s) => {
  const stack = [];
  const [firstCh, ...chars] = [...s];

  // 첫 원소 처리
  if (closingParenthesis(firstCh)) {
    return false;
  }
  stack.push(firstCh);

  for (const ch of chars) {
    if (openingParenthesis(ch)) {
      stack.push(ch);
      continue;
    }

    const prev = stack[stack.length - 1];
    if (!matchingParenthesis(prev, ch)) {
      return false;
    }
    stack.pop();
  }

  // stack에 남아있으면 확인해야? Yes.
  while (stack.length > 0) {
    const next = stack.pop();
    const prev = stack.pop();

    if (!matchingParenthesis(prev, next)) {
      return false;
    }
  }
  return true;
};

/**
 * 문자열의 문자를 왼쪽으로 n칸 회전한 후 반환한다.
 * 
 * @param {string} s 대상 문자열
 * @param {number} steps 이동할 칸
 * @returns {string} 이동된 문자열
 */
const moveCharactersToLeft = (s, steps) => s.slice(steps) + s.slice(0, steps);

/**
 * [0, length)의 자연수 수열을 반환
 * @param {number} length 생성할 수열의 길이
 * @returns {number[]} 자연수 수열
 */
const range = (length) => [...Array(length).keys()];

/**
 * @param {string} s 대, 중, 소괄호로 이루어진 문자열
 * @returns {number} count - 입력을 '올바른 괄호 문자열'로 만들기 위해 왼쪽으로 회전해야 하는 횟수
 */
const solution = (s) => {
  let count = 0;
  for (const num of range(s.length)) {
    const shifted = moveCharactersToLeft(s, num);
    if (goodParenthesisString(shifted)) {
      count++;
    }
  }
  return count;
}

const result = solution("}]()[{");
console.log(result);
