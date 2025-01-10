const isCorrectParenthesisString = (parenthesisCharacters) => {
    const stack = [];

    // 비정상 문자열인 경우 true를 반환해 index를 반환
    const found = parenthesisCharacters.findIndex((char) => {
        if (char === "(" || char === "{" || char === "[") {
            stack.push(char);
            return false;
        }

        if (stack.length === 0) {
            return true;
        }

        const top = stack[stack.length - 1];
        if (
            (char === ")" && top === "(") ||
            (char === "}" && top === "{") ||
            (char === "]" && top === "[")
        ) {
            return false;
        }
        return true;
    });

    return found === -1 && stack.length === 0;
};

const solution = (toTest) => {
    // 홀수 길이인 경우 올바를 수 없음
    if (toTest.length % 2 === 1) {
        return 0;
    }

    let chars = [...toTest];
    let correctCaseCounter = 0;

    for (let i = 0; i < toTest.length; i++) {
        const isCorrect = isCorrectParenthesisString(chars);
        if (isCorrect) {
            correctCaseCounter++;
        }
        const lastChar = chars.pop();

        // LinkedList 미구현으로 매번 전체 순회 필요
        chars = [lastChar, ...chars];
    }

    return correctCaseCounter;
};
