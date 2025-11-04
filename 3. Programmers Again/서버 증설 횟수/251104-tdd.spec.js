/*
[문제 해석]
- 동접자 m명 단위로 서버 증설이 1대씩 필요하다.
- 증설하면 k시간 동안 유지된다.
- 모든 유저를 수용할 수 있게 하려면 필요한 증설 횟수 = ?

[발상]
- 0~23시에 대해 시간 단위로 서버 개수 배열 구성
- players 순회하며 서버 증설 진행 (k시간 칸만큼 채움)
- 부족할 때마다 증설 진행, 카운터 증가
- 카운터 합계 반환

*/
import { describe, it, assert } from "vitest";

describe("서버 증설 횟수 (Lv.2)", () => {
    it.each([
        [
            [
                0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10,
                0, 1, 5,
            ],
            3,
            5,
            7,
        ],
        [
            [
                0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0,
                8, 0, 0, 0,
            ],
            5,
            1,
            11,
        ],
        [
            [
                0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0,
                0, 0, 1,
            ],
            1,
            1,
            12,
        ],
    ])("%j, %i, %i => %i", (players, m, k, expected) => {
        const result = solution(players, m, k);
        assert.equal(result, expected);
    });
});

function solution(players, serverCapacity, duration) {
    let serversAdded = 0;
    const serversPerHour = Array(24).fill(0);

    players.forEach((players, currHour) => {
        const serversRequired = Math.floor(players / serverCapacity);
        const serversToAdd = serversRequired - serversPerHour[currHour];
        if (serversToAdd > 0) {
            serversAdded += serversToAdd;
            for (let hour = currHour; hour < currHour + duration; hour++) {
                serversPerHour[hour] += serversToAdd;
            }
        }
    });

    return serversAdded;
}
