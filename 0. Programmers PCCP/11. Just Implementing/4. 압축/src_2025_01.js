const solution = (compressTargetInput) => {
    let dictionaryNextIndex = 1;

    const createDictionary = () => {
        const dictionary = new Map();
        for (
            let charCode = "A".charCodeAt(0);
            charCode <= "Z".charCodeAt(0);
            charCode++
        ) {
            const char = String.fromCharCode(charCode);
            dictionary.set(char, dictionaryNextIndex++);
        }
        return dictionary;
    };

    const findLongestWordEntry = (toCompress, dictionary) => {
        let maxLengthEntry = undefined;
        for (const currEntry of dictionary.entries()) {
            if (!toCompress.startsWith(currEntry[0])) {
                continue;
            }

            if (!maxLengthEntry) {
                maxLengthEntry = currEntry;
                continue;
            }

            if (currEntry[0].length > maxLengthEntry[0].length) {
                maxLengthEntry = currEntry;
            }
        }

        return maxLengthEntry;
    };

    const compressIndices = [];
    const dictionary = createDictionary();
    let toCompress = compressTargetInput;
    while (toCompress.length > 0) {
        const longestEntry = findLongestWordEntry(toCompress, dictionary);
        const [compressWord, index] = longestEntry;
        compressIndices.push(index);
        toCompress = toCompress.slice(compressWord.length);
        dictionary.set(
            `${compressWord}${toCompress.slice(0, 1)}`,
            dictionaryNextIndex++
        );
    }

    return compressIndices;
};
