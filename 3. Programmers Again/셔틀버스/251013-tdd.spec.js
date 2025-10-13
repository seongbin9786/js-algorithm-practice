import { describe, it, assert } from "vitest";

/*

셔틀은 09:00부터 총 n회 t분 간격으로 역에 도착
하나의 셔틀에는 최대 m명
도착한 순간에 대기열에 선 크루까지 포함해서 대기 순서대로 태우고 바로 출발
콘이 셔틀을 타고 사무실로 갈 수 있는 도착 시각 중 제일 늦은 시각 = ?
같은 시각이라면 도착한 크루 중 대기열에서 제일 뒤에 선다
전날 줄이 있는 경우는 없다

[문제 해석]
1. 셔틀을 실제로 시뮬레이션해서 탈 수 있는 가장 늦은 시각을 구해야 함
2. 마지막 셔틀에 탈 수 있는 마지막 사람과 같거나(인원수가 충분하다면), 딱 1분 빨라야 함 (같은 시각이면 뒤로 가게 됨)

[시간 복잡도]
- timetable.length <= 2,000이어서 전체 순회해도 됨

[해결 방법]
1. `HH:MM`을 숫자로 치환한다
2. 각 셔틀에 대해 시뮬레이션을 한다.
3. 마지막 셔틀일 때 남는 대기인수가 탑승 가능 인원수보다 많은지 확인한다.
    - 아예 인원이 남는 경우: 해당 셔틀의 도착 시각
    - 인원이 부족한 경우:
        - 탑승할 수 있는 마지막 시각을 구하고, 해당 시각까지 탔을 때 자리가 남는지 확인한다.
            - 자리가 남는다면 해당 시각을 쓴다.
            - 자리가 남지 않는다면 해당 시각 -1을 쓴다.
                (이대로 하면 됐는데 왜 헤맸지...)

*/
describe("[1차] 셔틀버스", () => {
    it.each([
        // 기본 TC
        // 굳이 필요 없을 거 같은데?
        // ㅋㅋ 바로 반례 발견
        [1, 1, 1, ["00:01"], "00:00"],
        // 아... 83.3 받음; 뭔가 불안하더라니.. TC 추가하는 중
        [1, 1, 1, ["00:02"], "00:01"],
        [1, 1, 1, ["09:00"], "08:59"],
        [1, 1, 2, ["09:00"], "09:00"],
        [2, 1, 1, ["09:00"], "09:01"],
        [2, 2, 1, ["09:00", "09:02", "09:02"], "09:01"],
        [1, 2, 1, ["09:00", "09:02", "09:02"], "08:59"],
        // 프로그래머스 TC
        [1, 1, 5, ["08:00", "08:01", "08:02", "08:03"], "09:00"],
        [2, 10, 2, ["09:10", "09:09", "08:00"], "09:09"],
        [2, 1, 2, ["09:00", "09:00", "09:00", "09:00"], "08:59"],
        [1, 1, 5, ["00:01", "00:01", "00:01", "00:01", "00:01"], "00:00"],
        [1, 1, 1, ["23:59"], "09:00"],
        [
            10,
            60,
            45,
            [
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
                "23:59",
            ],
            "18:00",
        ],
    ])("[h:%i,t:%i,m:%i]", (n, t, m, timetable, expected) => {
        const result = solution(n, t, m, timetable);
        assert.equal(result, expected);
    });
});

/*
[해결 방법]
1. `HH:MM`을 숫자로 치환한다
2. 각 셔틀에 대해 시뮬레이션을 한다.
3. 마지막 셔틀일 때 남는 대기인수가 탑승 가능 인원수보다 많은지 확인한다.
    - 아예 인원이 남는 경우: 해당 셔틀의 도착 시각
    - 인원이 부족한 경우:
        - 탑승할 수 있는 마지막 시각을 구하고, 해당 시각까지 탔을 때 자리가 남는지 확인한다.
            - 자리가 남는다면 해당 시각을 쓴다.
            - 자리가 남지 않는다면 해당 시각 -1을 쓴다.
*/
function convertToMinutes(hhMMString) {
    const [hh, mm] = hhMMString.split(":").map(Number);
    return hh * 60 + mm;
}

function convertToHHMM(minutes) {
    return `${padZero(Math.floor(minutes / 60))}:${padZero(minutes % 60)}`;
}

function padZero(num) {
    return num >= 10 ? num : `0${num}`;
}

function solution(shuttles, period, maxPeople, timetable) {
    const totalPeople = timetable.length;

    timetable = timetable.map(convertToMinutes).sort((a, b) => a - b);

    let person = 0;
    let arrivedAt = convertToMinutes("09:00");
    const lastShuttleTime = convertToHHMM(arrivedAt + period * (shuttles - 1));

    // 셔틀을 모두 소진해야 함
    for (let shuttle = 0; shuttle < shuttles; shuttle++) {
        let availableSeats = maxPeople;

        // 현재까지 도착한 사람들 중 maxPeople만큼 태움
        for (let i = 0; i < maxPeople; i++) {
            // 순회 중간에 모든 사람이 다 탄 경우 -> 마지막 셔틀 도착 시각 반환
            if (person === totalPeople) {
                return lastShuttleTime;
            }
            if (timetable[person] > arrivedAt) {
                break;
            }
            person++;
            availableSeats--;
        }

        // 마지막 셔틀에 최대한 태운 후의 상황
        if (shuttle === shuttles - 1) {
            // 현재 셔틀에 자리가 있는 경우 (못 탄 사람이 있더라도, 셔틀보다 늦은 경우)
            if (availableSeats > 0) {
                return lastShuttleTime;
            }

            // 셔틀에 자리가 없는 경우
            // person = 0인 경우는 availableSeats > 0 분기에서 제외됨
            const lastSafeTime = timetable[person - 1];

            // 자리가 있어야 방금 사람 자리에 들어갈 수 있음
            // 마지막 자리라서 해당 시각과 동일하면 못타서, -1 해서 1명이든 아니든 추월해야 함.
            return convertToHHMM(lastSafeTime - 1);
        }

        arrivedAt += period;
    }
}
