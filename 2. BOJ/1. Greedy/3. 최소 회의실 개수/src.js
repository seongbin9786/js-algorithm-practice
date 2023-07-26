const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const meetings = [];

const TYPE_END = 0;
const TYPE_START = 1;

for (let i = 1; i <= N; i++) {
    const [startsAt, endsAt] = input[i].split(" ").map(Number);
    meetings.push({ type: TYPE_END, time: endsAt });
    meetings.push({ type: TYPE_START, time: startsAt });
}

// (시작 시각 오름차순, 끝 시각 오름차순)으로 정렬
meetings.sort(
    ({ time: timeA, type: typeA }, { time: timeB, type: typeB }) =>
        timeA - timeB || typeA - typeB // ends가 start보다 우선
);

let numberOfRooms = 0;
let availableRooms = 0;

for (let i = 0; i < meetings.length; i++) {
    const { type } = meetings[i];
    if (type === TYPE_END) {
        availableRooms++;
    } else {
        if (availableRooms === 0) {
            numberOfRooms++;
        } else {
            availableRooms--;
        }
    }
}

console.log(numberOfRooms);
