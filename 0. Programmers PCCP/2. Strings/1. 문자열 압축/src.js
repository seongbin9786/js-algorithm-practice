/*
예를 들면, 단위 1 => "aabbaccc" => "2a2ba3c" (1은 생략)
예를 들면, 단위 3 => "abcabcdede" => "2abcdede"(가장 짧음).
예를 들면, 단위 4 => "xababcdcdababcdcd" => 그대로. 17. "x8ababcdcd"는 불가능. 맨 앞부터 등간격으로 잘라야 하기 때문

압축할 문자열 s가 매개변수로 주어질 때, 위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라 압축하여 표현한 
문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.

---

<아이디어 1>

1. string을 n 칸씩 slice 한다. (n은 length의 약수)
2. slice를 순회한다. 숫자를 1로 놓는다. 다음 slice와 비교한다. 동일하면 다음 slice로 넘어간다. 아니면 탈출한다.
2-1. 탈출 시에는 숫자가 2 이상이면 숫자의 길이 + slice의 길이만 추가한다.
3. 1~n을 반복해서 min을 구한다.

*/
const sliceStringBySize = (str, sliceSize) => {
  const result = [];

  for (let pos = 0; pos < str.length; pos += sliceSize) {
    if (pos + sliceSize > str.length) {
      // 남은 길이가 부족해 남은 부분만큼을 모두 잘라냄
      result.push(str.slice(pos, str.length));
      break;
    }
    result.push(str.slice(pos, pos + sliceSize));
  }

  return result;
}

const compress = (slices) => {
  const [firstSlice, ...restSlices] = slices;
  let result = 0;

  let duplicates = 1; // 
  let prevSlice = firstSlice;
  for (const slice of restSlices) {
    // 이전 slice와 일치하면 단순 증가만 수행
    if (prevSlice === slice) {
      duplicates++;
      continue;
    }
    // 이전 slice의 중복 분량을 최종 길이에 반영함
    result += prevSlice.length;
    if (duplicates > 1) {
      result += (duplicates + '').length;
    }

    // 새로운 slice의 시작
    duplicates = 1;
    prevSlice = slice;
  }

  // 최종 slice는 더해지지 않고 종료됨
  result += prevSlice.length;

  // 마지막 slice까지 중복인 경우 정산을 못하고 루프가 종료됨
  if (duplicates > 1) {
    result += (duplicates + '').length;
  }

  return result;
}

function solution(s) {
  let answer = 1001;

  for (let sliceSize = 1; sliceSize <= s.length; sliceSize++) {
    const slices = sliceStringBySize(s, sliceSize);
    const compressedSize = compress(slices);
    answer = Math.min(answer, compressedSize);
  }

  return answer;
}

const result = solution("xababcdcdababcdcd");

console.log(result);
