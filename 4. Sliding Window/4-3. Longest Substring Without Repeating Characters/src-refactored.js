const lengthOfLongestSubstring = (s) => {
  let left = 0
  let maxLength = 0;
  let counter = new Set();

  for (let right = 0; right < s.length; right++) {
    // [abc[[decabdefghkilmn]
    while (counter.has(s[right])) {
      counter.delete(s[left++]);
    }
    counter.add(s[right]);
    maxLength = Math.max(maxLength, counter.size()); // +1 해줘야 하는데 size=0인 경우도 있어서..
  }

  return maxLength;
};
