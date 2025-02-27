var climbStairs = function fibonacci(n) {
    if (n <= 1) {
        return 1;
    }

    // 피보나치와 동일하다는 아이디어
    // f(n) = f(n-1) + f(n-2)
    // 마지막 2개만 갖고 있으면 되고, 보관만 하고 선형적으로 더해주기만 하면 끝이다.
    let twoBefore = 1;
    let oneBefore = 1;

    for (let i = 2; i <= n; i++) {
        let temp = oneBefore;
        oneBefore += twoBefore;
        twoBefore = temp;
    }

    // 이게 왜 됨?
    return oneBefore;
};
