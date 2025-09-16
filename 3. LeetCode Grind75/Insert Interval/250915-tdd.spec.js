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

describe("Insert Interval", () => {
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
        [
            [
                [1, 2],
                [3, 4],
            ],
            [2, 3],
            [[1, 4]],
        ],
        // newInterval이 intervals들을 포함하는 케이스
        [
            [
                [1, 2],
                [3, 4],
            ],
            [1, 4],
            [[1, 4]],
        ],
        // // newInterval만 있는 케이스
        [[], [1, 2], [[1, 2]]],
        // intervals의 interval 하나가 newInterval을 포함하는 케이스 (리트 코드 틀린 Case)
        [[[1, 4]], [2, 3], [[1, 4]]],
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
    const prevIntervals = [];

    /*
    2. [병합이 있는 경우]
    - 겹치는 건 합쳐야 함
    - 겹칠 때 max로 end 구간을 확인하면 될 듯?

    1. 일단 병합이 발생한다면, 그것은 newInterval의 구간에 겹치기 때문임
    2. newInterval은 하나이므로, 경우의 수가 적음
    3. interval.end < newInterval.start || interval.start < newInterval.end 이면 겹치는 것임
      - 겹친다면, end = max(i.end, nI.end)
    4. 해서, 겹치는 interval들은 모두 제거하고, newInterval의 '수정된' start, end를 삽입하면 됨
    5. newInterval은 처음 겹친 interval부터 마지막 겹친 interval를 대체하고 삽입됨
      - 안 겹치면 그대로 삽입하다가, newInteval 겹치는 부분들 처리하고 삽입 후, 이후 interval들은 그대로 삽입하면 됨

    (생각이 든 것)
    - 아예 포함 관계일 수도 있잖아? 이 TC 추가해야겠다.
    */
    let idx = 0;
    while (idx < intervals.length) {
        const interval = intervals[idx];
        if (interval[1] < newInterval[0]) {
            // newInterval 앞의 interval들은 여기에 저장해두었다가 따로 삽입
            prevIntervals.push(interval);
        } else if (interval[0] > newInterval[1]) {
            // newInterval 뒤의 interval들은 slice로 따로 삽입
            break;
        } else if (
            // interval이 newInterval 앞쪽에서 겹치는 경우
            // interval포함하는 경우
            interval[1] >= newInterval[0] &&
            interval[0] <= newInterval[0] // newInterval의 뒷 interval인 경우 이 조건이 없으면 항상 매치됨
        ) {
            // interval이 newInterval을 포함하는 경우 때문에 start도 min으로 갱신
            newInterval[0] = Math.min(interval[0], newInterval[0]);
            newInterval[1] = Math.max(interval[1], newInterval[1]);
        } else if (interval[0] <= newInterval[1]) {
            // interval이 newInterval 뒤쪽에서 겹치는 경우
            newInterval[1] = Math.max(interval[1], newInterval[1]);
        }
        idx++;
    }

    return [...prevIntervals, newInterval, ...intervals.slice(idx)];
};
