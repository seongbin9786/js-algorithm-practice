const validChunksOf = (rawStr) => {
    const str = rawStr.toLowerCase();
    const chunks = [];
    for (let i = 0; i < str.length - 1; i++) {
        chunks.push(str.slice(i, i + 2));
    }
    // non a-z가 없다면 null을 반환
    return chunks.filter((chunk) => !chunk.match(/[^a-z]/));
};

const numberOfItems = (items) =>
    items.reduce((obj, item) => {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;

        return obj;
    }, {});

const intersectionOfCounters = (counterA, counterB) => {
    const allKeys = [
        ...new Set([...Object.keys(counterA), ...Object.keys(counterB)]),
    ];

    return allKeys.reduce((sum, key) => {
        if (counterA[key] && counterB[key]) {
            return sum + Math.min(counterA[key], counterB[key]);
        }
        return sum;
    }, 0);
};

const unionOfCounters = (counterA, counterB) => {
    const allKeys = [
        ...new Set([...Object.keys(counterA), ...Object.keys(counterB)]),
    ];

    return allKeys.reduce((sum, key) => {
        if (counterA[key] && counterB[key]) {
            return sum + Math.max(counterA[key], counterB[key]);
        }
        if (counterA[key]) {
            return sum + counterA[key];
        }
        return sum + counterB[key];
    }, 0);
};

const solution = (str1, str2) => {
    if (str1.toLowerCase() === str2.toLowerCase()) {
        return 65536;
    }

    const counters = [str1, str2]
        .map(validChunksOf) // 1. 문자열을 소문자로 만들고 chunk로 나눈다.
        .map(numberOfItems); // 2. chunk[]를 순회하여 (chunk, 개수) 쌍을 만든다.

    // 3. 교집합의 원소의 개수를 구한다.
    const intersection = intersectionOfCounters(...counters);

    // 4. 합집합의 원소의 개수를 구한다.
    const union = unionOfCounters(...counters);

    // 5. 자카드 유사도를 반환한다.
    return Math.floor((intersection * 65536) / union);
};
