/*
[문제]
- lower/uppercase 영문 문자열 (길이 <= 2,000)
- Case Sensitive
- (ex)
    abccccdd
- 주어진 알파벳들로 만들 수 있는 가장 긴 palindrome의 길이를 반환

[해결 방법]
- 문자열 수집은 그냥 하는데...
- palindrome을 직접 만들 거라곤 생각 못 했음.
- 어떻게 만들 수 있지?
    - dccaccd
    - 'a'
    - hmmmmm...
    - 짝수개이면 그냥 사용 가능함
    - 홀수개이면 중앙에 박히거나, 하나 버려야 함
    - 홀수개이면 기본적으로 -1을 하되, 홀수개가 하나라도 있다면 최종적으로 +1 하면 될 듯
*/
var longestPalindrome = function (s) {
    const wordMap = {};

    for (const char of s) {
        if (!wordMap[char]) {
            wordMap[char] = 1;
        }
        wordMap[char]++;
    }

    let hasOdd = false;
    let total = 0;
    for (let count of Object.values(wordMap)) {
        if (count % 2 === 0) {
            hasOdd = true;
            count--;
        }
        total += count % 2 === 0 ? count : count - 1;
    }

    return hasOdd ? total + 1 : total;
};
