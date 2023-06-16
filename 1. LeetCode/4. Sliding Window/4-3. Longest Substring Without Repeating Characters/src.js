/**
 * @param {string} s length <= 5 * 10^4
 * @return {number} character 단위로 중복이 없는 substring
 */
const lengthOfLongestSubstring = (s) => {
  // O(n)으로 투포인터로 풀 수 있을 듯.
  // substring이므로 오직 양 끝의 pos만 있음.

  // 현재
  let left = 0
  let right = 0;
  let maxLength = 0;

  // 존재 여부를 체크해야 하는데, Map으로 하는 게 제일 좋을 듯?
  // boolean 배열로 idx로 하면 될 듯. charCode - 97.
  let counter = new Map();

  while (right < s.length) {
    const included = counter.has(s[right]);

    // 1. 새로 만나면, counter 조회해서 없으면 추가
    if (!included) {
      counter.set(s[right], right); // pos를 저장하도록 변경
      // 2. right 전진
      right++;
      continue; // 이 시점에서 right === s.length; 됨.
    }

    // 3. 만약 counter 조회해서 있는 경우

    // 3-1. max 갱신
    // 현재 right는 미포함 구간이므로 -1, 길이는 right-left+1 이므로 상쇄됨. 
    maxLength = Math.max(maxLength, right - left);

    // 3-2. 해당 글자 idx+1을 left로 놓고 재시작해야 함.
    // left ~ 해당 글자 idx 까지 counter.delete 하면 됨.
    const idxOfDuplicateChar = counter.get(s[right]);
    while (left <= idxOfDuplicateChar) {
      counter.delete(s[left++]);
    } // left = targetIdx + 1
    counter.set(s[right], right);
    right++;
  }

  // 여기서 계산하는 case: 배열 끝까지 포함했을 때 최대인 경우, 처음부터 끝까지 하나의 substring인 경우
  maxLength = Math.max(maxLength, right - left);

  return maxLength;
};

console.log(lengthOfLongestSubstring("ohvhjdml"));
