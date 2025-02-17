// 백트래킹 코드를 더 줄일 수 있겠지만, 지금도 굉장히 짧아짐! (141 -> 82)
// 코드 자체는 되게 짧아서 굉장히 만족스럽다 =)
const lowerBound = (array, target) => {
    let low = 0;
    let high = array.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
};

const solution = (applicants, queries) => {
    const queryListMap = new Map();

    const conditions = [
        ["cpp", "java", "python", "-"],
        ["backend", "frontend", "-"],
        ["junior", "senior", "-"],
        ["chicken", "pizza", "-"],
    ];

    const combination = [];

    const createQueryLists = (stage) => {
        if (stage === 4) {
            const queryKey = combination.join("");
            queryListMap.set(queryKey, []);
            return;
        }
        for (let i = 0; i < conditions[stage].length; i++) {
            combination.push(conditions[stage][i]);
            createQueryLists(stage + 1);
            combination.pop();
        }
    };

    createQueryLists(0);

    applicants.forEach((rawApplicant) => {
        const applicant = rawApplicant.split(" ");
        const score = Number.parseInt(applicant.pop(), 10);

        const combination = [];

        const createPossibleQueryKeys = (applicant, stage) => {
            if (stage === 4) {
                const queryKey = combination.join("");
                queryListMap.get(queryKey).push(score);
                return;
            }

            combination.push(applicant[stage]);
            createPossibleQueryKeys(applicant, stage + 1);
            combination.pop();
            combination.push("-");
            createPossibleQueryKeys(applicant, stage + 1);
            combination.pop();
        };

        createPossibleQueryKeys(applicant, 0);
    });

    for (const list of queryListMap.values()) {
        list.sort((a, b) => a - b);
    }

    return queries.map((query) => {
        const splitted = query.split(" ").filter((str) => str !== "and");
        const score = Number.parseInt(splitted.pop(), 10);
        const queryKey = splitted.join("");
        const targetList = queryListMap.get(queryKey);
        const firstIndex = lowerBound(targetList, score);
        const numberOfApplicants = targetList.length - firstIndex;

        return numberOfApplicants;
    });
};
