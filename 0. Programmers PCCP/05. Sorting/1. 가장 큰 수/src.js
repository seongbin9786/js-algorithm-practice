const solution = (numbers) => {
    numbers = numbers.map((num) => num + "");

    // 둘을 붙여본 후 더 큰 값이 되는 순서로 정렬한다.
    numbers.sort((a, b) => {
        const aFirst = Number(`${a}${b}`);
        const bFirst = Number(`${b}${a}`);

        console.log("comparing:", aFirst, bFirst);

        if (aFirst === bFirst) {
            return 0;
        }

        if (aFirst > bFirst) {
            return -1;
        }

        return 1;
    });

    if (numbers.filter((num) => num !== "0").length === 0) {
        return "0";
    }

    return numbers.join("");
};

const result = solution([34, 34321, 34342, 34344]);

console.log(result);
