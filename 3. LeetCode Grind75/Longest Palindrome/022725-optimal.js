var longestPalindrome = function (s) {
    const wordMap = {};
    let oddChars = 0;

    for (const char of s) {
        if (!wordMap[char]) {
            wordMap[char] = 0;
        }
        wordMap[char]++;

        // 짝수개면 결국 oddChars +/- 0, 홀수개면 결국 oddChars=1
        if (wordMap[char] % 2 === 0) {
            oddChars--;
        } else {
            oddChars++;
        }
    }

    return s.length - oddChars + (oddChars > 0 ? 1 : 0);
};
