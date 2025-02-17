/*
[문제 해석] 18:18~
- "정확하게 순위를 매길 수 있는 선수의 명수 = ?"
- n명의 선수 참가 (<= 100)
- 1~n번 번호
- 대진 (a, b) <=> a선수가 b선수를 이김
- 일부 경기 결과만 주어짐 (<= 4,500)

[해결 방법]
- 그래프를 그려보면 알 수 있는데, 간단하다.
- (이긴 선수, 진 선수)와 관계 있는 모든 노드에게 승패를 전파하면 된다.
- 4가지 경우의 수가 있다.
    - (이긴 선수 a)를 (이긴 선수 a1) --> a1도 b를 이겼다고 추가
    - (이긴 선수 a)에게 (진 선수 a2) --> (무관할까?) 애매함.
    - (진 선수 b)를 (이긴 선수 b1) --> (무관할까?) 애매함.
    - (진 선수 b)에게 (진 선수 b2) --> b2도 a에게 졌다고 추가
- 이 때 확실한 2케이스만 반영하면 틀리게 된다. (기억 의존...)
- 애매한 경우는 즉시 승패가 결정되지 않는 관계이다.
- [막힘..] 이걸 완전 탐색에서 어떻게 했던 거 같은데... (18:24)

- 증명해서 진행해야되는데...
    - 개별 선수들에게도 반영해야함 
    - 모든 곳에서 재반영 진행?
    - 모호한 선수들은 이후 다시 진행시켜야 하나?
    - 종료 조건을 잘 생각해야 한다. 이게 1pass만에 끝나지 않는다.
    - (확실히 막힌 상태)
    - 제대로 승패가 결정되지 않은 상태를 어떻게 판단?
        - 모든 노드가 다른 모든 노드에 대해 승/패 여부를 명확히 결정한 상태가 정상
        - 그럼 위에서 명확한 2케이스로 1Pass를 돌린 후, 
        - 모든 노드가 명확히 결정된 상태인지 조회하고,
        - 다시 실행을 해야?

- 그냥 답 보자. 노답이다.

[내가 예전에 푼 방법]
- 아! 불확실한 2케이스를 해소하는 게 답이 아니라,
- 연쇄적으로 재반영시키는 게 답이었다.
- 즉, (a1, b)를 추가하고, 이를 마치 원래 추가되어야 할 값처럼 재귀 호출하면 된다.
- 이건 이론적으로 이해를 해봐야 할 듯? 플로이드-와샬
- 일단 풀고, 플로이드-와샬을 적용해보면 좋을 듯?

[얻은 교훈]
- 왜 틀렸는지 5분 이상 이해가 안되면 최대한 빨리 출력을 해보자. 결국 헤매고만 있게 된다.
*/
const solution = (n, rawResults) => {
    const results = rawResults.map(([a, b]) => [a - 1, b - 1]);

    const battleResults = Array.from({ length: n }, () =>
        Array(n).fill(undefined)
    );

    /*
        문제 원인 후보(?):
        - (winner, loser)가 전부 다 등록되지 않은 상태에서 순회하기 때문
        - Ancestors, Descendents를 발견할 때마다 순회를 하면
            1. 순회 횟수 예측이 어려움
            2. 순회가 실제로 제대로 동작하지 않음
                - (winner|winnerAncestor, loser|loserDescendent) 짝으로 승/패가 추가됨을 의도했지만...
                - 아래 로직의 문제점:
                    - winnerAncestor들에게 loser만 추가되어 loserDescendent 연결이 누락됨
                    - loserDescendent들에게 winner만 추가되어 winnerAncestor 연결이 누락됨
                    --> 즉 (winnerAncestor, loserDescendent) 연결이 누락됨
                - 근데 이렇게 추가할 때, ()...)
    */

    // 결국 왜 틀렸는지는 알아내지 못 했다...
    // 미리 구해놓기 vs 루프로 구하기 --> 무슨 차이? 잘 모르겠다.
    // 나중에 시간 나면 출력해보면서 차이를 확인할 수 있을 듯.
    const spreadWin = (winner, loser) => {
        battleResults[winner][loser] = true;
        battleResults[loser][winner] = false;

        console.log(`${winner} wins ${loser}`);
        for (let winnerAncestor = 0; winnerAncestor < n; winnerAncestor++) {
            if (battleResults[winnerAncestor][winner]) {
                spreadWin(winnerAncestor, loser);
            }
        }

        for (let loserDescendent = 0; loserDescendent < n; loserDescendent++) {
            if (battleResults[loser][loserDescendent]) {
                spreadWin(winner, loserDescendent);
            }
        }

        // 그럼 이렇게 하면 되겠네?
        for (let winnerAncestor = 0; winnerAncestor < n; winnerAncestor++) {
            for (
                let loserDescendent = 0;
                loserDescendent < n;
                loserDescendent++
            ) {
                if (
                    battleResults[winnerAncestor][winner] &&
                    battleResults[loser][loserDescendent]
                ) {
                    spreadWin(winnerAncestor, loserDescendent);
                }
            }
        }
    };

    results.forEach(([a, b]) => {
        battleResults[a][b] = true;
        battleResults[b][a] = false;
    });

    console.log(battleResults);

    results.forEach(([a, b]) => spreadWin(a, b));

    let preciseRankings = 0;
    for (let a = 0; a < n; a++) {
        console.log(battleResults[a]);
        for (let b = 0; b < n; b++) {
            if (a !== b && battleResults[a][b] === undefined) {
                break;
            }
            if (b === n - 1) {
                preciseRankings++;
            }
        }
    }

    return preciseRankings;
};
