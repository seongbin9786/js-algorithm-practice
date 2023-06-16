class Counter extends Map {

  count(key) {
    super.set(key, true);
  }
}

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
  let counter = new Counter();

  while (right < s.length) {
    const included = counter.has(s[right]);

    // 1. 새로 만나면, counter 조회해서 없으면 추가
    if (!included) {
      counter.count(s[right]);
      // 2. right 전진
      right++;
      continue; // 이 시점에서 right === s.length; 됨.
    }

    // 3. 만약 counter 조회해서 있으면, 맨 처음이 같은 글자인지 확인함
    if (s[left] === s[right]) {
      // 4. 같은 글자이면, 맨 앞에서 빼고, 전진함
      left++;
      right++;
      continue;
    }

    // 5. 같은 글자가 아니면, 이번 right(아직 들어오지 않았음)를 left로 놓고 전진 시작
    // 현재 right는 미포함 구간이므로 -1, 길이는 right-left+1 이므로 상쇄됨. 
    maxLength = Math.max(maxLength, right - left);

    // counterMap 다시 만들어야 함.
    counter.clear();
    left = right;
  }

  // 여기서 계산하는 case: 배열 끝까지 포함했을 때 최대인 경우, 처음부터 끝까지 하나의 substring인 경우
  maxLength = Math.max(maxLength, right - left);

  return maxLength;
};

console.log(lengthOfLongestSubstring("ohvhjdml"));
