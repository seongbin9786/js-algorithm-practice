/**
 *
 * @param {number} index 백트래킹 용 index
 * @param {string} prefix 현재까지 생성된 key
 * @param {string[]} tokens `info`를 " and?" 기준으로 split한 문자열 배열
 * @param {function(string): void} onKeyCreated 각 조합의 key가 생성될 때 호출되는 콜백함수
 */
const forEachKey = (index, prefix, tokens, onKeyCreated) => {
    if (index === tokens.length - 1) {
        return onKeyCreated(prefix);
    }

    // 현재 조건을 추가한다. (e.g. java + backend = javabackend)
    forEachKey(index + 1, prefix + tokens[index], tokens, onKeyCreated);

    // 현재 조건 대신 -가 들어가도 포함되어야 한다. (e.g. java + - = java-)
    forEachKey(index + 1, prefix + "-", tokens, onKeyCreated);
};

/**
 * 지원자가 검색 결과로 표현될 수 있는 모든 검색 조건에 대해 배열을 만들고 점수를 추가한다.
 *
 * @param {string[]} info 지원자 배열
 * @returns {Map} Map<string, array<number>> 객체
 */
const buildQueryResultMap = (info) => {
    // Map<String, Array<number>>
    const queryMap = new Map();

    for (const candidate of info) {
        const tokens = candidate.split(" ");
        const score = Number(tokens[tokens.length - 1]);
        // 1. candidate가 포함될 수 있는 질의를 모두 만든다.
        forEachKey(0, "", tokens, (query) => {
            if (!queryMap.has(query)) {
                // 2. 해당 질의에 대해 List를 만들고, 해당 질의를 List와 함께 Map에 매핑한다.
                queryMap.set(query, []);
            }
            const resultArray = queryMap.get(query);
            resultArray.push(score);
        });
    }

    // 3. Map을 순회하며 각 List를 모두 오름차순 정렬한다.
    for (const [, map] of queryMap) {
        map.sort((a, b) => a - b);
    }

    return queryMap;
};

/**
 * 시작 index를 반환한다(lower bound).
 *
 * @param {number} score 검색 점수
 * @param {number[]} scores 질의 대상 배열
 */
const binarySearch = (score, scores) => {
    let start = 0;
    let end = scores.length - 1;

    while (end > start) {
        const mid = Math.floor((start + end) / 2);

        if (scores[mid] >= score) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }

    if (scores[start] < score) {
        return scores.length;
    }

    return start;
};

const queryRegExp = /^([\w-]+) and ([\w-]+) and ([\w-]+) and ([\w-]+) (\d+)$/;

/**
 * 질의를 만족하는 지원자의 수를 반환한다.
 *
 * @param {string} rawQuery 질의
 * @param {Map} queryMap 질의-결과배열 맵
 */
const count = (rawQuery, queryMap) => {
    const [, ...tokens] = queryRegExp.exec(rawQuery);
    const score = tokens[tokens.length - 1];
    tokens.pop();
    const query = tokens.join("");

    const resultArray = queryMap.get(query);

    if (!resultArray) {
        return 0;
    }

    // 4. 각 질의에 대해 순회하며 질의에 대응되는 List에서 최소 점수의 index를 찾는다.
    // 이진 탐색에서 뭔가 다른 거 같은데, 일단 코드를 그대로 옮기기로 한다.
    // 5. List의 길이에서 최소 점수의 index를 빼면 질의 대상 지원자 수가 되므로 반환한다.
    return resultArray.length - binarySearch(score, resultArray);
};

/**
 * O(N*Q*log N) solution, N <= 100,000 , Q <= 108
 *
 * @param {string[]} info
 * @param {string[]} query
 * @returns {number[]} 각 query를 만족하는 지원자 수
 */
const solution = (info, query) => {
    const queryResultMap = buildQueryResultMap(info);

    return query.map((query) => count(query, queryResultMap));
};

const result = solution(
    [
        "java backend junior pizza 150",
        "python frontend senior chicken 210",
        "python frontend senior chicken 150",
        "cpp backend senior pizza 260",
        "java backend junior chicken 80",
        "python backend senior chicken 50",
    ],
    [
        "java and backend and junior and pizza 100",
        "python and frontend and senior and chicken 200",
        "cpp and - and senior and pizza 250",
        "- and backend and senior and - 150",
        "- and - and - and chicken 100",
        "- and - and - and - 150",
    ],
);

console.log(result);
