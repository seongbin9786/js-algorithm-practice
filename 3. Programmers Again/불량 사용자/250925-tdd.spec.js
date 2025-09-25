import { describe, it, assert } from "vitest";

/*
[문제 해석]
- 불량 사용자 목록이 주어짐
- 이 때 개인정보 보호을 위해 사용자 아이디 중 일부 문자를 '*' 문자로 가려서 전달
- 당첨에서 제외되어야 할 제재 아이디 목록은 몇가지 경우의 수가 가능한지 반환
- 제제 아이디의 조합이 같으면 같은 것으로 처리 (아이디 순서 무관)

(ex)
[전체 사용자]
frodo
fradi
crodo
abc123
frodoc

[불량 사용자]
fr*d*
abc1**

[경우의 수 = 2]
[제재 아이디 조합 1]
frodo
abc123
[제재 아이디 조합 2]
fradi
abc123

[제한 조건]
1. 1 <= user_id.length <= 8
2. 1 <= user_id[i].length <= 8
3. 1 <= banned_id.length <= user_id.length
4. 1 <= banned_id[i].length <= 8

[발상]
1. 제한 조건을 봤을 때 되게 느린 작업이겠거니 싶었다. 아마도 연산을 매우 많이 해야 하는 것으로 보인다.
2. 매칭을 어떻게 구현할지가 고민인데...
    - *에 들어갈 수 있는 모든 조합을 구한다 -> 8글자 *인 경우 (36)^8 >= 2조 (절대 불가능)
    - 매번 확인하는 수밖에 없음
        - 우선 길이로 비교하고, *로 slice하고 합쳤을 때 똑같으면 매칭
3. 어떻게든 매칭은 구한다고 치면, 각 '불량 아이디' 별 일치하는 아이디 숫자를 세고, 조합 구하면 됨
    - 주의할 점: 특정 아이디가 여러 불량 아이디에 매칭되는 경우에 중복 포함되면 안 됨. 개별로 구하고, 곱셈해서 구할 수 없음.
    - 그냥 루프로 구하면 됨. '조합' 보다는 그냥 조건에 맞는 것 단순 필터링..
*/
describe("불량 사용자 (Lv.3)", () => {
    it.each([
        [["a"], ["*"], 1],
        [["a", "b"], ["*"], 1],
        [["a", "b", "ab", "ba"], ["a", "a*"], 2],
        [["aaa", "aba", "aac", "aca"], ["a*a"], 1],
        // 2개 이상의 bannedId에 걸릴 수 있는 상황
        [["a"], ["a", "*"], 1],
        // 프로그래머스 TC
        [
            ["frodo", "fradi", "crodo", "abc123", "frodoc"],
            ["fr*d*", "abc1**"],
            2,
        ],
        [
            ["frodo", "fradi", "crodo", "abc123", "frodoc"],
            ["*rodo", "*rodo", "******"],
            2,
        ],
        [
            ["frodo", "fradi", "crodo", "abc123", "frodoc"],
            ["fr*d*", "*rodo", "******", "******"],
            3,
        ],
    ])("%j => %j", (userIds, bannedIds, expected) => {
        const result = solution(userIds, bannedIds);
        assert.deepEqual(result, expected);
    });
});

function getAsteriskIndices(bannedId) {
    const asteriskIndices = [];
    for (let i = 0; i < bannedId.length; i++) {
        if (bannedId.charAt(i) === "*") {
            asteriskIndices.push(i);
        }
    }
    return asteriskIndices;
}

function removeCharsAtAsterisk(target, asteriskIndices) {
    const chars = [...target];
    asteriskIndices.forEach((idx) => {
        chars[idx] = "";
    });
    return chars.join("");
}

function solution(userIds, bannedIds) {
    const bannedIdCombos = new Set();

    // 1. 각 bannedId에 대응되는 userId들을 모두 찾는다.
    // 2. (1)을 정렬해서 직렬화해 Set에 넣는다.
    // 3. (2)의 Set의 크기를 반환하면 '조합의 개수'를 구할 수 있다.
    bannedIds.forEach((bannedId) => {
        const noMaskBannedId = bannedId.split("*").join("");
        const asteriskIndices = getAsteriskIndices(bannedId);
        console.log(
            `bannedId: ${bannedId}, asteriskIndices: ${asteriskIndices}, noMask: [${noMaskBannedId}]`
        );
        const matchedUserIds = userIds.filter((userId) => {
            if (userId.length !== bannedId.length) {
                return false;
            }
            const noMaskUserId = removeCharsAtAsterisk(userId, asteriskIndices);
            console.log(
                `checking: nomask-chars: [${noMaskUserId}], ${
                    noMaskUserId === noMaskBannedId
                }`
            );
            return noMaskUserId === noMaskBannedId;
        });

        console.log("adding combo:", matchedUserIds);

        // 여기서 중복될 수도 있기 때문에 직렬화
        return bannedIdCombos.add(
            matchedUserIds.sort((a, b) => a - b).toString()
        );
    });

    return bannedIdCombos.size;
}
