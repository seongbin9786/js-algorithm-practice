# 스킬 트리

## 문제 개요

-   문제 유형: 구현
-   문제 난도: 프로그래머스 Lv2, 60% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/49993

### 문제 핵심 요약

-   유효한 스킬트리 순서가 주어질 때, 임의의 스킬트리들의 유효성을 검증한다.

### 문제 입출력

-   입력 값: 유효한 스킬트리 순서(길이 <= 26), 임의로 구성된 스킬트리의 목록 (길이 <= 20)
-   출력 값: 스킬트리 목록 중 유효한 스킬트리의 개수

## 문제 해설

### 1. 문제 해결책 설명

-   굉장히 쉽고 직관적인 문제이므로 복잡한 설명은 생략한다.

#### 1-1 [접근 1] 단순 순회

```js
const solution = (rawValidSkillTree, skillTreeInputs) => {
    const validSkillTree = [...rawValidSkillTree];

    const validSkillTreeInputs = skillTreeInputs.filter((skillTreeInput) => {
        let validSkillTreeIndex = 0;
        for (skill of skillTreeInput) {
            if (validSkillTree.includes(skill)) {
                if (skill === validSkillTree[validSkillTreeIndex]) {
                    validSkillTreeIndex++;
                } else {
                    return false;
                }
            }
        }
        return true;
    });

    return validSkillTreeInputs.length;
};
```

#### 1-2. 검산

```
valid: "CBD"
input: ["BACDE", "CBADF", "AECB", "BDA"]

validSkillTree=["C","B","D"]
skillTreeInputs.filter
    for skill of "BACDE"
        "B"
            if (includes -> true)
                if (index -> false)
                    return false

    for skill of CBADF"
        "C"
            if (includes -> true)
                if (index -> true)
        "B"
            if (includes -> true)
                if (index -> true)
        "A"
            if (includes -> false)
        "D"
            if (includes -> true)
                if (index -> true)
        "F"
            if (includes -> false)
        return true
```

### 2. 배운 점

-   쉬운 문제더라도 직접 데이터를 넣어서 시도해보는 검산하는 습관을 계속 유지했다 :)
-   빠르게, 또 한 번에 성공하는 것도 중요하다고 생각이 든다.
