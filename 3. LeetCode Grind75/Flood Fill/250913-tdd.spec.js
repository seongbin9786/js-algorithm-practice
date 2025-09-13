import { describe, it, assert } from "vitest";

// {
//     image: [
//         [1, 1, 1],
//         [1, 1, 0],
//         [1, 0, 1],
//     ],
//     sr: 1,
//     sc: 2,
//     color: 1,
//     expected: [
//         [2, 2, 2],
//         [2, 2, 0],
//         [2, 0, 1],
//     ],
// },

describe.only("Flood Fill", () => {
    it("fill [[0]] from (0,0) to 0 => [0]", () => {
        const image = [[0]];
        const color = 0;
        const [sr, sc] = [0, 0];
        const expected = [[0]];
        const result = floodFill(image, sr, sc, color);
        assert.equal(JSON.stringify(result), JSON.stringify(expected));
    });
    it("fill [[0]] from (0,0) to 1 => [1]", () => {
        const image = [[0]];
        const color = 1;
        const [sr, sc] = [0, 0];
        const expected = [[1]];
        const result = floodFill(image, sr, sc, color);
        assert.equal(JSON.stringify(result), JSON.stringify(expected));
    });
    it("fill [[0,0],[0,0]] from (0,0) to 1 => [[1,1],[1,1]]", () => {
        const image = [
            [0, 0],
            [0, 0],
        ];
        const color = 1;
        const [sr, sc] = [0, 0];
        const expected = [
            [1, 1],
            [1, 1],
        ];
        const result = floodFill(image, sr, sc, color);
        assert.equal(JSON.stringify(result), JSON.stringify(expected));
    });
    it("fill [[1,0],[0,0]] from (0,0) to 2 => [[2,0],[0,0]]", () => {
        const image = [
            [1, 0],
            [0, 0],
        ];
        const color = 2;
        const [sr, sc] = [0, 0];
        const expected = [
            [2, 0],
            [0, 0],
        ];
        const result = floodFill(image, sr, sc, color);
        assert.equal(JSON.stringify(result), JSON.stringify(expected));
    });
    it("fill [[0,0],[0,1]] from (0,0) to 2 => [[2,2],[2,1]]", () => {
        const image = [
            [0, 0],
            [0, 1],
        ];
        const color = 2;
        const [sr, sc] = [0, 0];
        const expected = [
            [2, 2],
            [2, 1],
        ];
        const result = floodFill(image, sr, sc, color);
        assert.equal(JSON.stringify(result), JSON.stringify(expected));
    });
});

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
    // 실제로 구현해야 함. BFS로 해야 함. 1칸씩 이동해야 하기 때문임.
    // 성능 상 image 방어적 복사 없이 쓰기 수행

    const MAX_R = image.length;
    const MAX_C = image[0].length;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const targetColor = image[sr][sc];
    const queue = [[sr, sc]];

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        const currColor = image[r][c];
        console.log("currColor:", currColor);
        if (currColor === targetColor) {
            console.log("visiting:", r, c, image[r][c]);
            image[r][c] = color;

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];
                if (nr < 0 || nr >= MAX_R || nc < 0 || nc >= MAX_C) {
                    continue;
                }
                if (image[nr][nc] === targetColor) {
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return image;
};
