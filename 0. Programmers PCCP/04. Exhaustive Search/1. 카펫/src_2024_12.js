const solution = (brown, yellow) => {
    const xySum = (brown + 4) / 2;
    let x = Math.floor(xySum / 2) + (xySum % 2);
    let y = Math.floor(xySum / 2);

    while (y > 2) {
        if ((x - 2) * (y - 2) === yellow) {
            return [x, y];
        }
        x++;
        y--;
    }
};
