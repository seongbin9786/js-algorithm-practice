const candidates = ["A", "E", "I", "O", "U"];

const createWord = (wordList, wordLength) => {
    const selected = [];

    const backtrack = (currDigit) => {
        if (currDigit === wordLength) {
            const selectedWord = selected.join("");
            wordList.push(selectedWord);
            return;
        }

        for (let i = 0; i < candidates.length; i++) {
            selected.push(candidates[i]);
            backtrack(currDigit + 1);
            selected.pop();
        }
    };

    backtrack(0);
};

const solution = (searchTerm) => {
    const wordList = [];

    for (let wordLength = 1; wordLength <= 5; wordLength++) {
        createWord(wordList, wordLength);
    }

    wordList.sort();

    return wordList.findIndex((word) => word === searchTerm) + 1;
};
