import { describe, it, assert } from "vitest";

describe.only("Flood Fill", () => {
    it.each([
        [
            {
                image: [[0]],
                sr: 0,
                sc: 0,
                color: 0,
                expected: [[0]],
            },
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
        ],
    ])(
        "fill [%j] from (%i,%j) to [%i] => %j",
        ({ image, color, sr, sc, expected }) => {
            const result = floodFill(image, sr, sc, color);
            assert.equal(JSON.stringify(result), JSON.stringify(expected));
        }
    );
});

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
    return image;
};
