const solution = (begin, target, words) => {
    if (!words.find((word) => word === target)) {
        return 0;
    }

    const isOneLetterDiff = (a, b) => {
        let isDifferent = false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                if (isDifferent) {
                    return false;
                }
                isDifferent = true;
            }
        }
        return true;
    };

    const visited = words.reduce((visitMap, word) => {
        visitMap[word] = false;
        return visitMap;
    }, {});

    const queue = [];

    queue.push([begin, 0]);

    while (queue.length > 0) {
        const [currWord, transformCount] = queue.shift();
        if (visited[currWord]) {
            continue;
        }
        visited[currWord] = true;

        if (currWord === target) {
            return transformCount;
        }

        const toVisit = words.filter(
            (word) => !visited[word] && isOneLetterDiff(currWord, word)
        );

        toVisit.forEach((nextWord) => {
            queue.push([nextWord, transformCount + 1]);
        });
    }

    return 0;
};
