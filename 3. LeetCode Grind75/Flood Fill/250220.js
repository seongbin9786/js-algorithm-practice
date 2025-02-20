/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
const dy = [1, -1, 0, 0];
const dx = [0, 0, 1, -1];

const floodFill = (image, sr, sc, color) => {
    const WIDTH = image[0].length;
    const HEIGHT = image.length;
    const sColor = image[sr][sc];
    const visited = Array.from({ length: HEIGHT }, () =>
        new Array(WIDTH).fill(false)
    );

    let headIndex = 0;
    const queue = [[sr, sc]];
    while (queue.length - headIndex > 0) {
        const [y, x] = queue[headIndex++];
        if (visited[y][x]) {
            continue;
        }

        visited[y][x] = true;
        image[y][x] = color;

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];

            if (
                ny >= 0 &&
                ny < HEIGHT &&
                nx >= 0 &&
                nx < WIDTH &&
                !visited[ny][nx] &&
                image[ny][nx] === sColor
            ) {
                queue.push([ny, nx]);
            }
        }
    }

    return image;
};
