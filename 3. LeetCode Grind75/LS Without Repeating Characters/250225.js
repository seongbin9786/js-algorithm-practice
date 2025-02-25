/*
[문제]
- 최장길이의 중복 글자가 없는 부분 문자열의 길이를 반환

[해결 방법]
- 뭔가 복잡함
- 일단 필요한 준비물
    - Set, Map 혹은 알파벳 배열로 중복 검사 기능 구현 필요
    - 길이 자체는 max를 구하면 되므로, 한 번 지나치기만 해도 충분
    - Map으로 인덱스를 저장해서, 기존 중복 문자의 위치부터 연속된 걸로 해놓으면 될 듯
    - 문제 자체가 별로 복잡하지 않아서 이 정도로 만족이 될 거 같은데?
*/
var lengthOfLongestSubstring = function (wholeString) {
    let maxLength = 0;

    let currLength = 0;
    let startingIdx = 0;
    const alphabetIndices = new Map();
    for (let idx = 0; idx < wholeString.length; idx++) {
        const alphabet = wholeString[idx];
        const existingIdx = alphabetIndices.get(alphabet);
        if (existingIdx !== undefined) {
            for (let i = startingIdx; i <= existingIdx; i++) {
                alphabetIndices.delete(wholeString[i]);
            }
            currLength -= existingIdx - startingIdx + 1;
            startingIdx = existingIdx + 1;
        }

        alphabetIndices.set(alphabet, idx);
        currLength++;

        maxLength = Math.max(maxLength, currLength);
    }

    return maxLength;
};
