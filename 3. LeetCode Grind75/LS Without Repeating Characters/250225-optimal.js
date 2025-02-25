const A_CODE = "a".charCodeAt(0);

var lengthOfLongestSubstring = function (wholeString) {
    let maxLength = 0;

    let currLength = 0;
    let startingIdx = 0;
    const alphabetIndices = Array(26).fill(-1);
    for (let idx = 0; idx < wholeString.length; idx++) {
        const alphabetCode = wholeString.charCodeAt(idx) - A_CODE;
        const existingIdx = alphabetIndices[alphabetCode];
        if (existingIdx >= 0) {
            for (let i = startingIdx; i <= existingIdx; i++) {
                const alphabetCode = wholeString.charCodeAt(i) - A_CODE;
                alphabetIndices[alphabetCode] = -1;
            }
            currLength -= existingIdx - startingIdx + 1;
            startingIdx = existingIdx + 1;
        }

        alphabetIndices[alphabetCode] = idx;
        currLength++;

        maxLength = Math.max(maxLength, currLength);
    }

    return maxLength;
};
