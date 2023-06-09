const infoParsingRegExp = /^(\w+) (\w+) (\w+) (\w+) (\d+)$/;

/**
 * @typedef {Object} Candidate
 * @property {string} lang
 * @property {string} position
 * @property {string} experience
 * @property {string} food
 * @property {string} score
 */

/**
 * @returns {Candidate}
 */
const createCandidateObj = ([lang, position, experience, food, score]) => ({
  lang,
  position,
  experience,
  food,
  score
});

/**
 * 지원자 정보를 파싱한다.
 * @param {string} info 
 * @returns {Candidate}
 */
// TODO: ^(?:([\w-]+) and )+([\w-]+) (\d+)$ 로 하면 last match만 추출된다.
// 
const parseInfo = (info) => {
  const parsed = infoParsingRegExp.exec(info).slice(1, 6);
  return createCandidateObj(parsed);
}

const queryParsingRegExp = /^([\w\-]+) and ([\w-]+) and ([\w-]+) and ([\w-]+) (\d+)$/;

/**
 * 쿼리를 파싱한다.
 * @param {string} query 
 * @returns {Candidate}
 */
// TODO: ^(?:([\w-]+) and )+([\w-]+) (\d+)$ 로 하면 last match만 추출된다.
// 
const parseQuery = (query) => {
  const parsed = queryParsingRegExp.exec(query).slice(1, 6);
  return createCandidateObj(parsed);
}

/**
 * 필터 함수를 생성
 * @param {Candidate} query
 * @returns {function(Candidate): boolean} sorter
 */
const createSorter = (query) => {

  // 어쩔 수 없는 노가다
  return ({ lang, position, experience, food, score }) => {
    if (Number(query.score) > Number(score)) return false;
    if (query.lang !== '-' && query.lang !== lang) return false;
    if (query.position !== '-' && query.position !== position) return false;
    if (query.experience !== '-' && query.experience !== experience) return false;
    return query.food === '-' || query.food === food;
  }
}

/**
 * O(N*M) solution, N <= 100,000 , M <= 50,000, N*M <= 5,000,000
 * 
 * @param {string[]} info 
 * @param {string[]} query 
 * @returns {number[]} 각 query를 만족하는 지원자 수
 */
const solution = (info, query) => {
  // O(N)
  const queries = query.map(parseQuery);

  // O(M)
  const candidates = info.map(parseInfo);

  // O(N*M)
  return queries.map(query => {
    const filterFn = createSorter(query);

    return candidates.filter(filterFn).length;
  });
}

const result = solution(
  [
    "java backend junior pizza 150",
    "python frontend senior chicken 210",
    "python frontend senior chicken 150",
    "cpp backend senior pizza 260",
    "java backend junior chicken 80",
    "python backend senior chicken 50"
  ],
  [
    "java and backend and junior and pizza 100",
    "python and frontend and senior and chicken 200",
    "cpp and - and senior and pizza 250",
    "- and backend and senior and - 150",
    "- and - and - and chicken 100",
    "- and - and - and - 150"
  ]
);

console.log(result);
