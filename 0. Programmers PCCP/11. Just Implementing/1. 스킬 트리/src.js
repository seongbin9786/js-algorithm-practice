// 스킬이 중복해 주어지지 않습니다.
// 즉 한 번만 배울 수 있다. 
// 즉 등장한다면 순서대로 등장해야 함. 
// 길이가 더 긴 쪽이 dependencies를 inclues 해야 함.
const validateSkillTree = (skillDependencies) => (target) => {
  // O(N)
  const dependencies = new Set([...skillDependencies]);

  // O(N)
  // [ 'B', 'C', 'D' ]
  // 타겟을 단일 String으로 만들어 includes 연산으로 쉽게 계산하도록
  const targetString = [...target]
    .filter(skill => dependencies.has(skill))
    .join("");

  // CASE 1: 타겟이 모든 스킬을 학습하는 경우 - 
  if (targetString.length >= skillDependencies.length) {
    return targetString.includes(skillDependencies);
  }

  // CASE 2: 타겟이 더 짧은 경우 - 의존성을 타겟 길이만큼 줄여서 검증
  // e.g. 타겟: [ 'B', 'D' ], 의존성: CBD => [ 'C', 'B' ]
  return skillDependencies.slice(0, targetString.length).includes(targetString);
}

/**
 * 스킬 익힘 순서의 유효성을 검사한다.
 * O(N*M), N = skill.length, M = skill_trees.length
 * 
 * @param {string} skill 스킬의 의존성 순서
 * @param {string[]} skill_trees 스킬 익힘 순서들의 목록
 * @returns {number} 유효한 요소의 개수
 */
const solution = (skill, skill_trees) => skill_trees.filter(validateSkillTree(skill)).length;

console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));
