const bannedWords = [..."~!@#$%^&*()=+[{]}:?,<>/"];

const removeConsecutiveDots = (input) => {
    while (input.includes("..")) input = input.replace("..", ".");
    return input;
};

const removeFirstLetterIfItIsDot = (input) => {
    if (input.length > 0 && input[0] === ".") {
        return input.slice(1);
    }
    return input;
};

const removeLastLetterIfItIsDot = (input) => {
    if (input.length > 0 && input[input.length - 1] === ".") {
        return input.slice(0, input.length);
    }
    return input;
};

const paddToLength3 = (input) => {
    let padded = input;

    while (padded.length < 3) {
        padded += padded[padded.length - 1];
    }

    return padded;
};

const solution = (input) => {
    const lowered = input.toLowerCase();
    const bannedWordsFiltered = [...lowered]
        .filter((word) => !bannedWords.includes(word))
        .join("");

    const consecutiveDotsFiltered = removeConsecutiveDots(bannedWordsFiltered);

    const firstDotRemoved = removeFirstLetterIfItIsDot(consecutiveDotsFiltered);
    const lastDotRemoved = removeLastLetterIfItIsDot(firstDotRemoved);

    const aPadded = lastDotRemoved === "" ? "a" : lastDotRemoved;

    const slicedTo15 = aPadded.slice(0, 15);
    const lastDotRemovedAgain = removeLastLetterIfItIsDot(slicedTo15);

    const paddedToLength3 = paddToLength3(lastDotRemovedAgain);

    return paddedToLength3;
};
