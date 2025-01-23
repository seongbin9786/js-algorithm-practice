const solution = (numbers, target) => {
    const makeSignPermutation = (length) => {
        const allPermutations = [];

        const currPermutation = [];
        const backtrack = (currIndex) => {
            if (currIndex >= length) {
                allPermutations.push([...currPermutation]);
                return;
            }
            // "+", "-"로 저장 후 분기하기보다는 1, -1로 매번 곱하는 게 코드가 더 간단하다.
            currPermutation.push(1);
            backtrack(currIndex + 1);
            currPermutation.pop();

            currPermutation.push(-1);
            backtrack(currIndex + 1);
            currPermutation.pop();
        };

        backtrack(0);

        return allPermutations;
    };

    const sumUp = (numbers, signPermutation) => {
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i] * signPermutation[i];
        }
        return sum;
    };

    const signPermutations = makeSignPermutation(numbers.length);

    return signPermutations.reduce((numberOfMatches, currSignPermutation) => {
        const currSum = sumUp(numbers, currSignPermutation);
        if (currSum === target) {
            return numberOfMatches + 1;
        }
        return numberOfMatches;
    }, 0);
};
