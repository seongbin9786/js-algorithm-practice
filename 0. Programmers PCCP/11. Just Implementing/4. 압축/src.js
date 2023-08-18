// 1. A-Z까지 미리 채워놓기
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 색인 번호는 0-indexed로 두고 나중에 +1 처리하죠
const dictionary = [...alphabets];

const findLongestMatch = (targetString) => {
    let maxAlpha = targetString[0]; // 첫 문자
    let maxIndex = maxAlpha - "A"; // 첫 문자의 idx

    for (const [index, record] of dictionary.entries()) {
        if (!targetString.startsWith(record)) {
            continue;
        }
        if (maxAlpha.length >= record) {
            continue;
        }
        maxAlpha = record;
        maxIndex = index;
    }

    return maxIndex;
};

const solution = (msg) => {
    const recordUsages = [];

    while (msg.length > 0) {
        // 1. 가장 길게 일치하는 문자열을 출력 후 나머지 자르기

        // 1-1. 가장 길게 일치하는 문자열을 출력하기
        const index = findLongestMatch(msg);
        const matchString = dictionary[index];
        recordUsages.push(index + 1); // 0-indexed => 1-indexed

        // 1-2. 일치 문자열 이후의 문자열을 자르기
        msg = msg.slice(matchString.length); // eg KAKAO에서 K로 slice하면 1, 이니까 맞네.

        // 2. 잘랐는데도 남아있다면, 직전일치문자열 + 남은첫문자를 사전에 신규 등록

        // 2-1. 다 잘렸는지 확인
        if (msg.length === 0) {
            break;
        }

        // 2-2. 직전일치문자열 + 남은첫문자를 사전에 신규 등록
        const newRecord = matchString + msg[0];
        dictionary.push(newRecord);

        // 반복
    }

    return recordUsages;
};
