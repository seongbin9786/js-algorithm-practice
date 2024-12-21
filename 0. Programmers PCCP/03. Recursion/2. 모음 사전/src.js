const WORD_MAX_LENGTH = 5;
const ELEMENTS = ["A", "E", "I", "O", "U"];
const DICTIONARY = [];

/**
 * 재귀적으로 순회하면서 사전을 생성한다.
 *
 * @param {string} str
 */
const iterateAndConcat = (str) => {
    // 모든 원소 순회
    // + e 로 진행하기 때문에 직접 제거하지 않아도 된다.
    for (const e of ELEMENTS) {
        const appended = str + e;
        DICTIONARY.push(appended);
        // 내가 마지막 자리가 아니면
        if (appended.length < WORD_MAX_LENGTH) {
            iterateAndConcat(appended);
        }
    }
};

/**
 * @param {string} target
 */
const solution = (target) => {
    iterateAndConcat("");

    const idx = DICTIONARY.findIndex((e) => e === target);

    // 0-indexed => 1-indexed
    return idx + 1;
};

console.log(solution("EIO"));
