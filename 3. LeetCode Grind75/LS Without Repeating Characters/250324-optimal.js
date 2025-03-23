/**
 * @param {string} s
 * @return {number}
 */
/*
[문제]
- 문자열 s에서 중복 문자가 없는 최장 길이의 부분문자열의 길이를 반환 
- 길이: 5만
- 숫자,영문,공백, 심볼 포함 (무관? 맞냐?)

[해결 방법]
- 곧장 최적화된 방법이 떠오르지는 않음.
- 브루트포스 방법
    - 각 문자에 대해
        - 아직 없는 문자라면 추가하고, 길이++
        - max길이 갱신
        - 이미 있는 문자라면?
            - 해당 문자의 위치 + 1을 첫 위치로 두고 길이 갱신, 해당 문자의 위치를 현재로 갱신
        max길이 반환
- 더 개선된 방법이 있을까?
    - 이거 최적 같은데?
*/
// 틀림: "abba" -> 3
// 아... 지나온 만큼 안 뺐다.
// 이렇게 쉽게 못 품
// ---> 제대로 TC 돌리기
// --> start 지점만 보관하면 풀 수 있음..? 아닌데? 그럼 다음 분기 때 이상해짐.
/*
abc abc dabcde
abc bca 아! 뭐야 이거? 되는 거네. 어차피 1글자씩만 이동하니깐? 막 순회할 필요가 없네.

abba ->
ab
bb ? --> 예외 처리 필요함 (X. 괜찮았음.)
ba --> 오류 발생 지점 !!

*/
var lengthOfLongestSubstring = function (s) {
    const charIndexMap = new Map();
    let maxLength = 0;
    let startingIdx = 0; // 필요했음.

    for (let i = 0; i < s.length; i++) {
        const prevIndex = charIndexMap.get(s[i]);
        charIndexMap.set(s[i], i);
        if (prevIndex === undefined) {
            // no-op (set으로 충분)
        } else if (startingIdx > prevIndex) {
            // 과거 슬라이스에서 중복된 것이므로 무관함
            // set으로 충분함.
        } else {
            // 현재 슬라이스에서 중첩된 것
            // 별도의 순회를 생략하고, 이렇게 처리해줌.
            // abba 이면, a 시점에서 a를 만나게 됨.
            startingIdx = prevIndex + 1;
        }
        maxLength = Math.max(maxLength, i - startingIdx + 1);
    }
    return maxLength;
};
