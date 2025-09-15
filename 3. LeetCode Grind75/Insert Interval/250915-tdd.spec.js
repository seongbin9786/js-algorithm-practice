/*
You are given an array of non-overlapping intervals intervals 
where intervals[i] = [starti, endi] represent the start and the end of the ith interval 
and intervals is sorted in ascending order by starti. 

You are also given an interval newInterval = [start, end] 
that represents the start and end of another interval.

Insert newInterval into intervals 
such that intervals is still sorted in ascending order by starti 
and intervals still does not have any overlapping intervals 
(merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. 
You can make a new array and return it.

 

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 105
*/

import { describe, it, assert } from "vitest";

describe.only("Insert Interval", () => {
    it.each([
        /*
            CASES
            1. [병합이 없는 경우]
            - 그냥 넣으면 끝임

            2. [병합이 있는 경우]
            - 겹치는 건 합쳐야 함
            - 겹칠 때 max로 end 구간을 확인하면 될 듯?

        */
        [
            [
                [1, 2],
                [5, 6],
            ],
            [3, 4],
            [
                [1, 2],
                [3, 4],
                [5, 6],
            ],
        ],
        // [
        //     [
        //         [1, 2],
        //         [3, 4],
        //     ],
        //     [2, 5],
        //     [
        //         [1, 2],
        //         [3, 4],
        //     ],
        // ],
    ])("%j + %j = %j", (intervals, newInterval, expected) => {
        const result = insert(intervals, newInterval);
        assert.deepEqual(result, expected);
    });
});

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    return [intervals[0], newInterval, intervals[1]];
};
