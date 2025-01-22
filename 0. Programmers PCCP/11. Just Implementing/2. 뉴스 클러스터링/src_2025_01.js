const solution = (str1, str2) => {
    const hasOnlyAlphabet = (str) =>
        [...str].findIndex((char) => char < "a" || char > "z") === -1;

    const sliceIntoLengthOf2 = (inputString) => {
        const characters = [...inputString];

        const sliced = [];
        for (let i = 0; i < characters.length - 1; i++) {
            const slice = `${characters[i]}${characters[i + 1]}`;
            sliced.push(slice);
        }

        return sliced;
    };

    const convertToDuplicateSizeMap = (inputStrings) => {
        const map = new Map();
        inputStrings.forEach((inputString) => {
            if (!map.has(inputString)) {
                map.set(inputString, 1);
            } else {
                map.set(inputString, map.get(inputString) + 1);
            }
        });

        return map;
    };

    const getIntersectionSize = (aMap, bMap) => {
        let size = 0;
        const unionKeys = [...new Set([...aMap.keys(), ...bMap.keys()])];
        for (const key of unionKeys) {
            const aMapSize = aMap.get(key) ?? 0;
            const bMapSize = bMap.get(key) ?? 0;

            size += Math.min(aMapSize, bMapSize);
        }
        return size;
    };

    const getUnionSize = (aMap, bMap) => {
        let size = 0;
        const unionKeys = [...new Set([...aMap.keys(), ...bMap.keys()])];
        for (const key of unionKeys) {
            const aMapSize = aMap.get(key) ?? 0;
            const bMapSize = bMap.get(key) ?? 0;

            size += Math.max(aMapSize, bMapSize);
        }
        return size;
    };

    const a = sliceIntoLengthOf2(str1.toLowerCase()).filter(hasOnlyAlphabet);
    const b = sliceIntoLengthOf2(str2.toLowerCase()).filter(hasOnlyAlphabet);

    if (a.length === 0 && b.length === 0) {
        return 65536;
    }

    const aMap = convertToDuplicateSizeMap(a);
    const bMap = convertToDuplicateSizeMap(b);

    const intersectionLength = getIntersectionSize(aMap, bMap);
    const unionLength = getUnionSize(aMap, bMap);

    return Math.floor((intersectionLength / unionLength) * 65536);
};
