const solution = (applicants, queries) => {
    const findFirstGte = (array, searchTerm, start, end) => {
        if (array.length <= 0) {
            return array[0] >= searchTerm ? 0 : array.length;
        }
        if (searchTerm > array[end]) {
            return array.length;
        }
        const mid = Math.floor((start + end) / 2);
        const currValue = array[mid];
        if (start === end) {
            return mid;
        }
        if (currValue >= searchTerm) {
            return findFirstGte(array, searchTerm, start, mid);
        } else {
            return findFirstGte(array, searchTerm, mid + 1, end);
        }
    };

    const parseQuery = (query) => {
        const [languageType, positionType, experienceType, foodType, rawScore] =
            query.split(" ").filter((unit) => unit !== "and");
        const score = Number(rawScore);

        return {
            languageType,
            positionType,
            experienceType,
            foodType,
            score,
        };
    };

    const parseApplicant = (applicant) => {
        const [languageType, positionType, experienceType, foodType, rawScore] =
            applicant.split(" ");
        const score = Number(rawScore);

        return {
            languageType,
            positionType,
            experienceType,
            foodType,
            score,
        };
    };

    const vaultMap = new Map();

    const getVault = (key) => {
        if (!vaultMap.has(key)) {
            vaultMap.set(key, []);
        }
        return vaultMap.get(key);
    };

    const generateKeys = (types) => {
        // -가 아닌 값은 on/off 토글이 필요함
        // -인 값은 토글이 필요 없음
        // 그냥 모든 값에 on/off 만들고 중복 제거하는 게 쉬울 듯?

        const toggleArray = ["-", "-", "-", "-"];
        const result = [];

        const backtrack = (idx) => {
            if (idx >= 4) {
                return result.push([...toggleArray].join(" "));
            }

            if (types[idx] !== "-") {
                toggleArray[idx] = types[idx];
                backtrack(idx + 1);
                toggleArray[idx] = "-";
            }
            toggleArray[idx] = "-";
            backtrack(idx + 1);
        };

        backtrack(0);
        return result;
    };

    const initializeApplicants = () => {
        applicants.forEach((applicant) => {
            const {
                languageType,
                positionType,
                experienceType,
                foodType,
                score,
            } = parseApplicant(applicant);

            const entryKeys = generateKeys([
                languageType,
                positionType,
                experienceType,
                foodType,
            ]);

            entryKeys.forEach((entryKey) => {
                const vault = getVault(entryKey);
                vault.push(score);
            });
        });

        for (const [key, value] of vaultMap.entries()) {
            value.sort((a, b) => a - b);
        }
    };

    const getAnswers = () => {
        return queries.map((query) => {
            const {
                languageType,
                positionType,
                experienceType,
                foodType,
                score,
            } = parseQuery(query);

            const key = [
                languageType,
                positionType,
                experienceType,
                foodType,
            ].join(" ");

            const vault = getVault(key);

            const peopleCount =
                vault.length - findFirstGte(vault, score, 0, vault.length - 1);

            return peopleCount;
        });
    };

    initializeApplicants();
    return getAnswers();
};
