/*
1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
     만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

*/

/**
 * @param {string} c
 */
const toBeRemoved = (c) => {
    if (c === "-") return false;
    if (c === "_") return false;
    if (c === ".") return false;
    if (c >= "0" && c <= "9") return false;
    if (c >= "a" && c <= "z") return false;

    return true;
};

/**
 * 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
 *
 * @param {string} s
 */
const removeBadChars = (s) => {
    const chars = [...s];
    const result = [];
    for (const c of chars) {
        if (!toBeRemoved(c)) {
            result.push(c);
        }
    }
    return result.join("");
};

/**
 * 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
 *
 * @param {string} s
 */
const removeSequentialDots = (s) => {
    const [first, ...chars] = s;
    const result = [first];

    let prev = first;
    for (const c of chars) {
        if (prev === "." && c === ".") {
            continue;
        }
        result.push(c);
        prev = c;
    }
    return result.join("");
};

/**
 * 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
 *
 * @param {string} s
 */
const removeFirstAndLastDot = (s) => {
    let startPos = 0;
    let endPos = undefined;

    if (s.startsWith(".")) {
        startPos = 1;
    }
    if (s.endsWith(".")) {
        endPos = -1;
    }
    return s.slice(startPos, endPos);
};

/**
 * 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
 * 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
 *
 * @param {string} s
 */
const maxLengthChars = (s, maxLength) =>
    s.length < maxLength ? s : s.slice(0, maxLength);

/**
 * 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
 *
 * @param {string} s
 */
const appendUntil3 = (s) => {
    if (s.length > 2) {
        return s;
    }
    if (s.length === 2) {
        return `${s}${s[s.length - 1]}`;
    }
    return `${s}${s[s.length - 1]}${s[s.length - 1]}`;
};

/**
 * @param {string} new_id
 */
function solution(new_id) {
    const lowered = new_id.toLowerCase();
    const badCharsRemoved = removeBadChars(lowered);
    const badDotsRemoved = removeSequentialDots(badCharsRemoved);
    const lastDotRemoved = removeFirstAndLastDot(badDotsRemoved);
    const nonEmptyId = lastDotRemoved || "a";
    const max16 = maxLengthChars(nonEmptyId, 15);
    const max16WithoutFirstAndLastDot = removeFirstAndLastDot(max16);
    const appended = appendUntil3(max16WithoutFirstAndLastDot);

    return appended;
}

const result = solution("z-+.^.");

console.log(result);
