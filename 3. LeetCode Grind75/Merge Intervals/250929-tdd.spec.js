import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. [start, end]로 구성되는 interval의 배열 intervals을 입력받아, 겹치는 interval을 병합하여 interval을 반환
2. 1 <= intervals.length <= 10,000
3. 0 <= start <= end <= 10,000

[풀이]
1. intervals를 정렬하고, 맨 앞 interval부터 시작해서 구간이 겹치면 병합.
2. 기본적으로 result 배열을 별도로 만들어 반환해서 쉽게 진행
3. 현재 구간에 '포함' 될 수도 있음 => 어쨌든 겹치는 거라면 max(end)로 갱신만 하면 될 듯. 어차피 start는 먼저 시작한 쪽이 min임.
4. 그 다음의 start가 현재 max(end)보다 뒤이면, 현재 interval을 결과에 삽입하고 새로운 구간 시작
*/
describe("Merge Intervals", () => {
    it.each([
        // 가장 기초적인 TC
        [[[0, 0]], [[0, 0]]],
        [
            [
                [0, 0],
                [0, 1],
            ],
            [[0, 1]],
        ],
        [
            [
                [0, 0],
                [1, 1],
            ],
            [
                [0, 0],
                [1, 1],
            ],
        ],
        // 비정렬 TC
        [
            [
                [1, 2],
                [0, 0],
            ],
            [
                [0, 0],
                [1, 2],
            ],
        ],
        // 기본 TC들
        [
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
        ],
        [
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2],
                [2, 2],
            ],
            [[0, 2]],
        ],
        [
            [
                [0, 100],
                [1, 99],
                [2, 98],
            ],
            [[0, 100]],
        ],
    ])("%j => %i", (intervals, expected) => {
        const result = merge(intervals);
        assert.deepEqual(result, expected);
    });
});

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    if (intervals.length === 1) {
        return intervals;
    }

    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }

        return a[0] - b[0];
    });

    console.log(`intervals: ${intervals}`);
    const result = [];

    let [currStart, currEnd] = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];

        console.log(
            `pick: [${start}, ${end}], curr: [${currStart},${currEnd}]`
        );

        if (currEnd >= start) {
            currEnd = Math.max(currEnd, end);
            console.log("merge!");
        } else {
            console.log("add!");
            result.push([currStart, currEnd]);
            currStart = start;
            currEnd = end;
        }

        // 마지막에 남겨진 경우 push 필요
        if (i === intervals.length - 1) {
            result.push([currStart, currEnd]);
        }
    }

    return result;
};
