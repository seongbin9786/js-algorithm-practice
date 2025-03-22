/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
/*
[문제]
- magazine의 문자열들로 ransomNote의 문자열을 구성할 수 있는지 여부 반환
- 둘 다 영소문자로 구성
- 1 <= 길이 <= 10만
- 중복 사용X

[해결 방법]
- 그냥 letter counter인데 optimal하게 하면 되는 듯
- aa, ab, aab

*/
const A_CODE = "a".charCodeAt(0);

var canConstruct = function (ransomNote, magazine) {
    const counter = Array(26).fill(0);
    const minLength = Math.min(magazine.length, ransomNote.length);
    for (let i = 0; i < minLength; i++) {
        counter[magazine.charCodeAt(i) - A_CODE]++;
        counter[ransomNote.charCodeAt(i) - A_CODE]--;
    }
    for (let i = minLength; i < magazine.length; i++) {
        counter[magazine.charCodeAt(i) - A_CODE]++;
    }
    for (let i = minLength; i < ransomNote.length; i++) {
        counter[ransomNote.charCodeAt(i) - A_CODE]--;
    }

    return !counter.some((count) => count < 0);
};
