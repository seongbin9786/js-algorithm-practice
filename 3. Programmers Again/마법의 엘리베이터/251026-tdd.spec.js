/*
[문제 해석]

마법의 세계에 사는 민수는 아주 높은 탑에 살고 있습니다. 
탑이 너무 높아서 걸어 다니기 힘든 민수는 마법의 엘리베이터를 만들었습니다. 
마법의 엘리베이터의 버튼은 특별합니다. 
마법의 엘리베이터에는 -1, +1, -10, +10, -100, +100 등과 같이 절댓값이 10c (c ≥ 0 인 정수) 형태인 정수들이 적힌 버튼이 있습니다. 
마법의 엘리베이터의 버튼을 누르면 현재 층 수에 버튼에 적혀 있는 값을 더한 층으로 이동하게 됩니다. 
단, 엘리베이터가 위치해 있는 층과 버튼의 값을 더한 결과가 0보다 작으면 엘리베이터는 움직이지 않습니다. 
민수의 세계에서는 0층이 가장 아래층이며 엘리베이터는 현재 민수가 있는 층에 있습니다.

마법의 엘리베이터를 움직이기 위해서 버튼 한 번당 마법의 돌 한 개를 사용하게 됩니다.
예를 들어, 16층에 있는 민수가 0층으로 가려면 -1이 적힌 버튼을 6번, -10이 적힌 버튼을 1번 눌러 마법의 돌 7개를 소모하여 0층으로 갈 수 있습니다. 
하지만, +1이 적힌 버튼을 4번, -10이 적힌 버튼 2번을 누르면 마법의 돌 6개를 소모하여 0층으로 갈 수 있습니다.

마법의 돌을 아끼기 위해 민수는 항상 최소한의 버튼을 눌러서 이동하려고 합니다. 
민수가 어떤 층에서 엘리베이터를 타고 0층으로 내려가는데 필요한 마법의 돌의 최소 개수를 알고 싶습니다. 
민수와 마법의 엘리베이터가 있는 층을 나타내는 정수 storey 가 주어졌을 때, 
0층으로 가기 위해 필요한 마법의 돌의 최소값을 return 하도록 solution 함수를 완성하세요.

[발상]
1. DP 문제로 풀어야 한다. 그냥 그리디로 풀면 절대 못 품
2. x층에서 0층까지 가야 함. 더 많이 갔다가 조금 되돌아올 수도 있음
    - 시작 지점에서 갈 수 있는 종류마다 하나씩 가보고, 해당 시점에 대해 이동 횟수로 갱신한다. (min으로 갱신)
        - 결과가 0층 미만인 경우 무시
    - 계속해서 가다가 0층에 처음 도착하면 이동 횟수를 반환한다.
    - 계산 순서 정렬을 위해 흠.. 필요한가? 싶기도
    - BFS로 풀면 횟수가 제대로 카운팅이 될까?
        - 고민되는 지점

[답지 보고 배운 것]
1. 이 문제는 greedy 문제
2. 공식이 있었는데, 자릿수를 올림해서 
*/

import { describe, it, assert } from "vitest";

describe("마법의 엘리베이터 (Lv.2)", () => {
    it.each([
        [16, 6],
        [2554, 16],
    ])("%i => %i", (storey, expected) => {
        const result = solution(storey);
        assert.equal(result, expected);
    });
});

// 1. 0층으로 가는 게 미션
// 2. 0층으로 가려면 1씩 내려가는 게 있고, 뭉텅이로(10, 100, 1000) 내려가는 게 있다.
// --> 뭉텅이로 이동 가능하다는 게 발상이 매우 어려운 부분인데 이건 직접 숫자를 써봤어야 하는 것 같다 (쉽게 보고 숫자 안 써보면 이해 불가)
// 3. 판단 기준: 끝 자리가 [6이상/5/4이하]으로 구분
// --> 현재 숫자가 6이상이면 올리고 -10하면 이득이다 (1씩 +4, -10씩 +1)
// --> 현재 숫자가 4이하라면 내리고 +10하면 이득이다 (1씩 -4) (ex: 94이면 -1씩 +4, +10씩 +1 로 +5만에 100으로 이동 가능)
// --> 현재 숫자가 5라면 그 앞 자릿수를 봐야 한다 (ex: 945이면 940으로 가는 게 이득 / 975면 980으로 가는 게 이득. 이동 거리가 동일하기 떄문)
// 4. 끝자리가 0인 경우 /10을 해서 로직을 간소화함(끝자리로만 계속 처리)
function solution(storey, expected) {
    let moves = 0;

    while (storey > 0) {
        const lastDigit = storey % 10;
        const prevDigit = ((storey - lastDigit) / 10) % 10;

        if (lastDigit === 0) {
            storey /= 10;
            continue;
        }

        if (lastDigit > 5) {
            const diff = 10 - lastDigit;
            moves += diff;
            storey += diff;
        } else if (lastDigit === 5) {
            if (prevDigit >= 5) {
                moves += 5;
                storey += 5;
            } else {
                moves += 5;
                storey -= 5;
            }
        } else {
            const diff = lastDigit;
            moves += diff;
            storey -= diff;
        }
    }

    return moves;
}

// 위에서 내려가면 정답인데 나머지는 시간 초과 (15.5점)
// --> currStorey는 계속 커질 수 있음. 이것의 max를 정해야 쓸모 없는 계산을 안 할 수 있음
function solution(storey) {
    // 1. storey 가 1억까지 가능하므로 배열로 만들 수는 없음
    // 2.
    // const map = new Map();

    // map.set(0, 0); // 0 -> storey로 가는 방향으로 생각

    // move의 범위가 무제한
    // 덧셈 탐색은 각자 별도로 해야 할 듯
    // DFS+캐싱으로 하면 괜찮을 듯
    // BFS로 해야 최소 방문 횟수가 안전하게 고려될 듯

    const visited = new Set();

    const Q = [[storey, 0]];
    while (Q.length > 0) {
        const [currStorey, count] = Q.shift();
        if (visited.has(currStorey)) {
            continue;
        }
        visited.add(currStorey);
        if (currStorey === 0) {
            return count;
        }

        // 좀 애매한 게... 어디까지 허용해야 할지?
        if (storey - currStorey) {
        }
        for (let c = 0; c <= Math.log10(currStorey); c++) {
            const d = Math.pow(10, c);
            const added = currStorey + d;
            if (added >= 0 && !visited.has(added)) {
                Q.push([added, count + 1]);
            }
            const subtracted = currStorey - d;
            if (subtracted >= 0 && !visited.has(subtracted)) {
                Q.push([subtracted, count + 1]);
            }
        }
    }
}

// 밑에서 올라가는 버전: 한계가 있음
// function solution(storey) {
//     // 1. storey 가 1억까지 가능하므로 배열로 만들 수는 없음
//     // 2.
//     // const map = new Map();

//     // map.set(0, 0); // 0 -> storey로 가는 방향으로 생각

//     // move의 범위가 무제한
//     // 덧셈 탐색은 각자 별도로 해야 할 듯
//     // DFS+캐싱으로 하면 괜찮을 듯
//     // BFS로 해야 최소 방문 횟수가 안전하게 고려될 듯

//     const visited = new Set();

//     const Q = [[0, 0]];
//     while (Q.length > 0) {
//         const [currStorey, count] = Q.shift();
//         // const prevCount = map.get(currStorey);
//         // if (prevCount !== undefined && prevCount <= count) {
//         //     continue;
//         // }
//         console.log(`visiting: ${currStorey}, ${count}`);
//         if (visited.has(currStorey)) {
//             continue;
//         }
//         visited.add(currStorey);
//         if (currStorey === storey) {
//             return count;
//         }

//         // 좀 애매한 게... 어디까지 허용해야 할지?
//         for (let c = 0; c <= Math.log10(storey); c++) {
//             const d = Math.pow(10, c);
//             console.log(`d: ${d}`);
//             const added = currStorey + d;
//             if (added >= 0 && !visited.has(added)) {
//                 Q.push([added, count + 1]);
//             }
//             const subtracted = currStorey - d;
//             if (subtracted >= 0 && !visited.has(subtracted)) {
//                 Q.push([subtracted, count + 1]);
//             }
//         }
//     }
// }
