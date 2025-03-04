/*
[문제]
- 문자열 s, t를 입력 받아 t가 s의 아나그램 여부를 반환
- 아나그램 = 모든 알파벳을 주어진 개수를 모두 써서 재구성할 수 있는지
- s, t의 길이 5만
- 알파벳 소문자로만 구성

[해결 방법]
- Map으로 카운팅하는 것밖에 생각이 나지 않는다.
- 해결 가능한가?
- 알파벳 소문자일 때는 배열 트릭을 쓰면 조금 더 낫다 ( 노 해싱 , 콜리전 )

*/
const A = "a".charCodeAt(0);

var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const sMap = Array(26).fill(0);
    const tMap = Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        sMap[s.charCodeAt(i) - A]++;
    }
    for (let i = 0; i < t.length; i++) {
        tMap[t.charCodeAt(i) - A]++;
    }
    for (let i = 0; i < 26; i++) {
        if (sMap[i] !== tMap[i]) {
            return false;
        }
    }

    return true;
};
