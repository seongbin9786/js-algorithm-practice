const solution = (input) => {
    let globalMin = input.length;

    for (let length = 1; length < input.length; length++) {
        let currDuplicate = 0;
        let currSum = "",
            prev = "",
            curr = "";

        for (
            let currIndex = 0;
            currIndex * length < input.length;
            currIndex++
        ) {
            curr = input.slice(
                currIndex * length,
                Math.min((currIndex + 1) * length, input.length)
            );

            if (prev === curr) {
                currDuplicate++;
            } else {
                currSum += `${currDuplicate > 1 ? currDuplicate : ""}${prev}`;
                currDuplicate = 1;
            }
            prev = curr;
        }

        if (prev === curr) {
            currSum += `${currDuplicate > 1 ? currDuplicate : ""}${prev}`;
        }

        globalMin = Math.min(globalMin, currSum.length);
    }

    return globalMin;
};
