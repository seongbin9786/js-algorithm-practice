const makeNumbers = (wordList, wordLength, numbers) => {
    const selected = [];
    const used = Array(wordLength).fill(false);

    const backtrack = (digit) => {
        if (digit === wordLength) {
            wordList.add(Number(selected.join("")));
            return;
        }
        for (let i = 0; i < numbers.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            selected.push(numbers[i]);
            backtrack(digit + 1);
            selected.pop();
            used[i] = false;
        }
    };

    backtrack(0);
};

const isPrime = (num) => {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

const solution = (rawNumbers) => {
    const numbers = [...rawNumbers].map((str) => Number(str));
    const wordList = new Set();
    for (let wordLength = 1; wordLength <= rawNumbers.length; wordLength++) {
        makeNumbers(wordList, wordLength, numbers);
    }
    return [...wordList].filter(isPrime).length;
};
