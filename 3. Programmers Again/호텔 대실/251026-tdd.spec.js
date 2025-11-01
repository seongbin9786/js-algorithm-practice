/*
[문제 해석]
- 최소한의 객실로 예약 내역을 처리하려고 함
- 퇴실 후 10분 간 청소 시간 있음
- 최소한의 객실 개수를 반환

[발상]
- 1분 단위로 1440회(24시간을 1분 단위로) 루프하며 예약 내역을 순회
- [startTime, endTime]에 대해 매번 순회 vs 모든 분에 대해 채우기 (둘 다 똑같은 수준)
*/

import { describe, it, assert } from "vitest";

describe("호텔 대실 (Lv.2)", () => {
    it.each([
        [
            [
                ["15:00", "17:00"],
                ["16:40", "18:20"],
                ["14:20", "15:20"],
                ["14:10", "19:20"],
                ["18:20", "21:20"],
            ],
            3,
        ],
        [
            [
                ["09:10", "10:10"],
                ["10:20", "12:20"],
            ],
            1,
        ],
        [
            [
                ["10:20", "12:30"],
                ["10:20", "12:30"],
                ["10:20", "12:30"],
            ],
            3,
        ],
    ])("%j => %i", (book_time, expected) => {
        const result = solution(book_time);
        assert.equal(result, expected);
    });
});

function parse(hhmm) {
    const [hours, minutes] = hhmm.split(":").map(Number);
    return hours * 60 + minutes;
}

function solution(book_time) {
    let maxRooms = 0;
    const roomsByMinutes = Array(1440).fill(0); // 00:00 ~ 23:59

    book_time.forEach(([startTime, endTime]) => {
        const startedAt = parse(startTime);
        const endedAt = Math.min(1439, parse(endTime) + 9); // -1 해야 함. 종료 시각 = 시작 시각이면, 방이 비워진것으로 봄
        for (let currMinute = startedAt; currMinute <= endedAt; currMinute++) {
            roomsByMinutes[currMinute]++;
            maxRooms = Math.max(maxRooms, roomsByMinutes[currMinute]);
        }
    });

    return maxRooms;
}
