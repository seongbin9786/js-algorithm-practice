const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .split("\n")
    .filter((n) => n.length > 0);

const N = Number(input[0]);

const costs = [];
for (let line = 1; line < N; line++) {
    const [one, two] = input[line].split(" ").map(Number);
    costs.push({ one, two });
}
const three = Number(input[input.length - 1]);

// min을 구하는 거여서 Inf로 초기화
// Object를 주는 경우 무슨 공유하는 버그가 있나봄;
// map을 써줘야 함
const minE = Array(N + 1)
    .fill()
    .map(() => ({ hasK: Infinity, usedK: Infinity }));

// 예외 처리
if (N === 1) {
    return console.log(0); // 첫 돌은 아무것도 필요 없음
}
if (N === 2) {
    return console.log(costs[0].one); // 둘째 돌은 첫 점프 필요
}

// index가 헷갈림
minE[0].hasK = 0; // 시작점, 비용 없음.
minE[1].hasK = costs[0].one; // 두번 째 돌
minE[2].hasK = Math.min(costs[0].two, minE[1].hasK + costs[1].one); // 세 번째 돌

// 네 번째 돌
for (let i = 3; i < N; i++) {
    // hasK 계산
    const from_HasK_DoubleJump = minE[i - 2].hasK + costs[i - 2].two; // 둘째 돌(1)에서 더블 점프(3)
    const from_HasK_SingleJump = minE[i - 1].hasK + costs[i - 1].one; // 셋째 돌(2)에서 싱글 점프(4)
    minE[i].hasK = Math.min(from_HasK_SingleJump, from_HasK_DoubleJump);

    // usedK 계산
    const from_UsedK_DoubleJump = minE[i - 2].usedK + costs[i - 2].two;
    const from_UsedK_SingleJump = minE[i - 1].usedK + costs[i - 1].one;
    const from_HasK_TripleJump = minE[i - 3].hasK + three;
    minE[i].usedK = Math.min(
        from_UsedK_SingleJump,
        from_UsedK_DoubleJump,
        from_HasK_TripleJump
    );
}

// N번째 돌의 비용
console.log(Math.min(minE[N - 1].hasK, minE[N - 1].usedK));
