const solution = (numbers) => {
    const compareFunction = (_a, _b) => {
        const a = _a.toString();
        const b = _b.toString();
        return (a + b).localeCompare(b + a) * -1;
    };

    const result = numbers.sort(compareFunction).join("");
    return result[0] === "0" ? "0" : result;
};
