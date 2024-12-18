const solution = (n) => {
    const array = [...Array(n)].map(() => Array(n).fill(0));
    let distance = n;
    let currentValue = 1;

    let currY = 0;
    let currX = 0;
    while (distance > 0) {
        // 1. 아래
        for (let i = 0; i < distance; i++) {
            array[currY++][currX] = currentValue++;
        }
        distance--;
        currY--;

        currX++; // 우측으로 이동 필요

        // 2. 우측
        for (let i = 0; i < distance; i++) {
            array[currY][currX++] = currentValue++;
        }
        distance--;
        currX--;

        // 위쪽으로 이동 필요
        currX--;
        currY--;

        // 3. 대각선
        for (let i = 0; i < distance; i++) {
            array[currY--][currX--] = currentValue++;
        }
        distance--;
        currY++;
        currX++;

        // 아래쪽으로 이동 필요
        currY++;
    }

    return array.flat().filter((v) => v > 0);
};
