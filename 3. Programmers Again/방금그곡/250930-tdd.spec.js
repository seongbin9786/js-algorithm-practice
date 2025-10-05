import { describe, it, assert } from "vitest";

/*
[문제 해석]
1. n번 연속 재생 가능: 네오가 기억하고 있는 멜로디는 음악 끝부분과 처음 부분이 이어서 재생된 멜로디일 수도 있다
2. 음악이 재생 시간보다 긴 경우, 틀어진 부분으로 한정해서 일치해야 함.
    - 처음부터 재생
    - 음악 길이보다 재생된 시간이 길면 반복 재생
    - 음악 길이보다 재생된 시간이 짧으면 재생 시간만큼만 재생
3. 기억한 멜로디를 재생 시간과 제공된 악보를 직접 보면서 비교
    - 방금그곡 서비스에서는 음악 제목, 재생이 시작되고 끝난 시각, 악보를 제공
    - 네오가 기억한 멜로디와 악보에 사용되는 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개
    - 각 음은 1분에 1개씩 재생

[제한 조건]
1. 1 <= 음악 정보 <= 1439
2. 음악 개수 100개 이하
3. 24시간 형식으로 표시

[발상]
1. 주어진 음악들에 대해 # 처리를 한다.
2. 주어진 음악들에 대해 재생 시간만큼 늘이거나 줄인다
3. map을 한다. [재생 시간, 원본 배열의 위치]를 추가한다.
4. include로 필터링하고, [재생 시간 내림차순, 원본 배열의 위치 오름차순]으로 정렬하고 첫 원소 반환 

*/
describe("방금그곡", () => {
    it.each([
        // 기본 TC
        ["a", ["00:00,00:01,answer,a"], "answer"],
        ["a", ["00:00,00:01,answer,b"], "(None)"],
        // 프로그래머스 TC
        [
            "ABCDEFG",
            ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"],
            "HELLO",
        ],
        [
            "CC#BCC#BCC#BCC#B",
            ["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"],
            "FOO",
        ],
        [
            "ABC",
            ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"],
            "WORLD",
        ],
    ])("%j => %j", (m, musicinfos, expected) => {
        const result = solution(m, musicinfos);
        assert.deepEqual(result, expected);
    });
});

function solution(m, musicinfos) {
    // 1. 주어진 음악들에 대해 # 처리를 한다.
    m = escapeSharp(m);

    // 2. 주어진 음악들에 대해 재생 시간만큼 늘이거나 줄인다
    // 3. map을 한다. [재생 시간, 원본 배열의 위치]를 추가한다.
    musicinfos = musicinfos.map((info, index) => {
        const [rawStartAt, rawEndAt, title, rawMusic] = info.split(",");
        const startAt = parseTime(rawStartAt);
        const endAt = parseTime(rawEndAt);
        const duration = endAt - startAt;
        const escapedMusic = escapeSharp(rawMusic);
        const music =
            escapedMusic.repeat(Math.floor(duration / escapedMusic.length)) +
            escapedMusic.slice(0, duration % escapedMusic.length);

        console.log(
            `rawMusic: ${rawMusic} ==> music: ${music} (repeat: ${Math.floor(
                escapedMusic.length / duration
            )}) (duration: ${duration})`
        );

        return {
            index,
            duration,
            title,
            music,
        };
    });

    // 4. include로 필터링하고, [재생 시간 내림차순, 원본 배열의 위치 오름차순]으로 정렬하고 첫 원소 반환
    const sortedMusics = musicinfos.sort((a, b) => {
        if (a.duration === b.duration) {
            return a.index - b.index;
        }

        return b.duration - a.duration; // DESC
    });

    console.log(`m: ${m}, sortedMusics:${JSON.stringify(sortedMusics)}`);

    const found = sortedMusics.find(({ music }) => {
        console.log(`music: ${music}, m: ${m}`);
        return music.includes(m);
    });

    return found?.title ?? "(None)";
}

function escapeSharp(original) {
    const diff = "a".charCodeAt(0) - "A".charCodeAt(0);
    const arr = [...original];
    for (let i = 0; i < original.length; i++) {
        if (arr[i] === "#") {
            arr[i - 1] = String.fromCharCode(arr[i - 1].charCodeAt(0) + diff);
            arr[i] = "";
        }
    }
    return arr.join("");
}

function parseTime(hhmm) {
    const [hours, minutes] = hhmm.split(":").map(Number);
    return hours * 60 + minutes;
}
