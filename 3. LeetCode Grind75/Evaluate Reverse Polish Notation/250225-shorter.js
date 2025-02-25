var evalRPN = function (tokens) {
    const operations = {
        "/": (a, b) => Math.trunc(a / b),
        "+": (a, b) => a + b,
        "*": (a, b) => a * b,
        "-": (a, b) => a - b,
    };
    const operands = [];
    for (const token of tokens) {
        if (!operations[token]) {
            operands.push(Number(token));
            continue;
        }
        const p2 = operands.pop();
        const p1 = operands.pop();
        operands.push(operations[token](p1, p2));
    }
    return operands.pop();
};
