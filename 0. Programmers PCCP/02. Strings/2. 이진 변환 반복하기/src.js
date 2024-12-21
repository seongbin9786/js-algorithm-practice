/*
  0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.

    x의 모든 0을 제거합니다.
    x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
    예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.

  0과 1로 이루어진 문자열 s가 매개변수로 주어집니다.

  s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때,
  이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 
  각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.

  s의 길이는 1 이상 150,000 이하입니다.
  s에는 '1'이 최소 하나 이상 포함되어 있습니다.

  7 => 1 + 2 * 1 + 4 * 1

  7 / 2 = 3 ... 1
  3 / 2 = 1 ... 1
  1 / 2 = 0 ... 1

  10 / 2 = 5 ... 0
  5 / 2 = 2 ... 1
  2 / 2 = 1 ... 0
  1 / 2 = 0 ... 1

*/
const countCharOfStr = (s, c) => [...s].filter((ch) => ch === c).length;

const base10Tobase2 = (num) => {
    const result = [];
    while (num > 0) {
        result.push(num % 2);
        num = Math.floor(num / 2);
    }
    result.reverse();
    return result.join("");
};

function solution(s) {
    let numberOfConversion = 0;
    let numberOfRemovedZeros = 0;

    while (s !== "1") {
        // 제거된 0 개수 세기
        const ones = countCharOfStr(s, "1");
        const removedZeros = s.length - ones;
        numberOfRemovedZeros += removedZeros;

        // 이진 변환하기
        s = base10Tobase2(ones);
        numberOfConversion++;
    }

    return [numberOfConversion, numberOfRemovedZeros];
}

const result = solution("110010101001"); // [3,8]

console.log(result);
