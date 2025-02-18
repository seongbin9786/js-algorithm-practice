/*
[문제]
- 두 문자열의 자카드 유사도를 65536을 곱한 후 소수점을 버려 반환한다.
- 자카드 유사도 = n(교집합) / n(합집합)
- 둘 다 공집합일 때는 1
- 다중 집합 = 중복을 허용하는 집합
- (ex) FRANCE, FRENCH
    - 두 글자씩 끊어서 다중 집합을 생성 (중복 O)
    - 두 글자 모두 영문이어야 유효 (나머지 버림)
    - 대소문자 구분 없음

[해결 방법]
- 그냥 시키는대로 하면 될 거 같은 lv1 느낌인데...?
- 문자열을 2개씩 끊고 유효한 문자열만 남긴다.
- 문자열 별로 카운팅한다. 각 문자열에 대해 map 각각 사용
- 교집합, 합집합 구하고 끝

*/
const isNonAlphabet = (char) => char < "a" || char > "z";

const createJacardSubstrings = (targetString) => {
    const rawSubstrings = [];

    for (
        let startingIndex = 0;
        startingIndex < targetString.length - 1;
        startingIndex++
    ) {
        const substring = targetString
            .slice(startingIndex, startingIndex + 2)
            .toLowerCase();
        rawSubstrings.push(substring);
    }

    const validSubstrings = rawSubstrings.filter(
        (substring) => [...substring].findIndex(isNonAlphabet) === -1
    );

    return validSubstrings;
};

const solution = (str1, str2) => {
    const jacardSubstrings1 = createJacardSubstrings(str1);
    const jacardSubstrings2 = createJacardSubstrings(str2);

    const counter1 = new Map();
    const counter2 = new Map();

    // 둘 다 공집합일 때의 예외
    if (jacardSubstrings1.length === 0 && jacardSubstrings2.length === 0) {
        return 65536;
    }

    jacardSubstrings1.forEach((substring) => {
        const previousCount = counter1.get(substring) ?? 0;
        counter1.set(substring, previousCount + 1);
    });

    jacardSubstrings2.forEach((substring) => {
        const previousCount = counter2.get(substring) ?? 0;
        counter2.set(substring, previousCount + 1);
    });

    // 교집함
    let intersectionSize = 0;
    for (const key of counter1.keys()) {
        const counter1Count = counter1.get(key) ?? 0;
        const counter2Count = counter2.get(key) ?? 0;
        intersectionSize += Math.min(counter1Count, counter2Count);
    }

    // 합집합
    let unionSize = 0;
    const allKeys = [...new Set([...counter1.keys(), ...counter2.keys()])];
    for (const key of allKeys) {
        const counter1Count = counter1.get(key) ?? 0;
        const counter2Count = counter2.get(key) ?? 0;
        unionSize += Math.max(counter1Count, counter2Count);
    }

    return Math.floor((intersectionSize / unionSize) * 65536);
};
