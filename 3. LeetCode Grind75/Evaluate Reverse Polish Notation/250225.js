/**
 * @param {string[]} tokens
 * @return {number}
 */
/*
[문제]
- Reverse Polish Notation = Postfix = 후위 표기식
- 사칙 연산
- 소수점 버림 (towards 0 를 하면 음수에서는 값이 커지는 쪽 - 소수점 버리는 쪽임)
- 0으로 나누기 없음

[해결 방법]
- 걍 숫자는 스택에 넣고 연산 기호 나오면 두 개 빼면 됨

*/
var evalRPN = function (tokens) {
    const operands = [];
    for (const token of tokens) {
        switch (token) {
            case "/": {
                const p2 = operands.pop();
                const p1 = operands.pop();
                const result = p1 / p2;
                operands.push(
                    result > 0 ? Math.floor(result) : Math.ceil(result)
                );
                break;
            }
            case "+": {
                const p2 = operands.pop();
                const p1 = operands.pop();
                operands.push(p1 + p2);
                break;
            }
            case "-": {
                const p2 = operands.pop();
                const p1 = operands.pop();
                operands.push(p1 - p2);
                break;
            }
            case "*": {
                const p2 = operands.pop();
                const p1 = operands.pop();
                operands.push(p1 * p2);
                break;
            }
            default:
                operands.push(Number(token));
        }
    }
    return operands.pop();
};
