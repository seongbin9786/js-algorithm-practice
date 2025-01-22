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
