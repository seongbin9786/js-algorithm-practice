class Player {
  /**
   * @param {number} n 선수 번호
   */
  constructor(n) {
    this.n = n;
    // 배열을 써도 됨
    this.wonAt = new Set();
    this.lostAt = new Set();
  }

  /**
   * @param {Player} loser Player 본인에게 배패한 상대 선수
   */
  wins(loser) {
    this.wonAt.add(loser);
    loser.loses(this);

    // 1. 상대가 승리한 모든 enemies에 대해 나도 승리한다.
    for (const whoWonAtLoser of loser.wonAt) {
      this.wonAt.add(whoWonAtLoser);

      // [빠져있던 로직] 상대에게 이긴 winner들은 나에게 패배함.
      whoWonAtLoser.loses(this);
    }

    // 2. 상대는 내게 승리한 모든 enemies에 대해 패배한다.
    for (const whoWonOnMe of this.lostAt) {
      loser.lostAt.add(whoWonOnMe);

      // [빠져있던 로직] 나를 이긴 winner들에게 enemy가 패배함.
      whoWonOnMe.wins(loser);
    }
  }

  /**
   * 나를 이긴 선수를 추가하고, 내가 이겼던 선수들이 나를 이긴 선수에게 지도록 함.
   * @param {Player} winner 나를 이긴 상대 선수
   */
  loses(winner) {
    this.lostAt.add(winner);

    for (const whoLostOnMe of this.wonAt) {
      whoLostOnMe.loses(winner);
    }
  }
}

/**
 * n명의 권투선수가 권투 대회에 참여했고 각각 1번부터 n번까지 번호를 받았습니다. 
 * 권투 경기는 1대1 방식으로 진행이 되고, 만약 A 선수가 B 선수보다 실력이 좋다면 A 선수는 B 선수를 항상 이깁니다. 
 * 심판은 주어진 경기 결과를 가지고 선수들의 순위를 매기려 합니다. 
 * 하지만 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없습니다.
 * 
 * results 배열 각 행 [A, B]는 A 선수가 B 선수를 이겼다는 의미입니다.
 * 
 * @param {number} n 선수의 수 (1 <= n <= 100)
 * @param {number[][]} results 경기 결과 (1 <= results.length <= 4,500)
 * @returns {number} <정확하게> 순위를 매길 수 있는 선수의 수
 */
const solution = (n, results) => {

  // 1. 0...n번 선수 생성 (0번 선수는 사용하지 않음.)
  const players = [...Array(n + 1)].map((_, i) => new Player(i));

  // 2. results 순회
  for (const [winnerNumb, loserNumb] of results) {
    const winner = players[winnerNumb];
    const loser = players[loserNumb];
    winner.wins(loser);

    console.log(`winner[${winnerNumb}]: wonAt: [${[...winner.wonAt].join(",")}], lostAt: [${[...winner.lostAt].join(",")}]`);
    console.log(`loser[${loserNumb}]: wonAt: [${[...loser.wonAt].join(",")}], lostAt: [${[...loser.lostAt].join(",")}]\n\n`);
  }

  // 3. Player 중 wonAt + lostAt === n-1 이면 승부가 모두 진행된 것
  const allFought = players.filter(({ wonAt, lostAt }) => wonAt.size + lostAt.size === n - 1);

  console.log(allFought);

  // 순위 판별 가능한 선수의 숫자
  return allFought.length;

}

// const result = solution(5, [[4, 3], [3, 2], [1, 2], [2, 5]]);
// const result = solution(5, [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]);
const result = solution(5, [[1, 2], [1, 3], [2, 4], [2, 5], [3, 4]]);
// const result = solution(5, [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]]);
console.log(result);
