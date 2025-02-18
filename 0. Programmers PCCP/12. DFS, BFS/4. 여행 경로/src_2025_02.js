/*
[문제]
- 모든 항공권을 사용하는 경로 중 알파벳 순서가 가장 앞서는 경로를 반환
- 공항 수 <= 10,000
- [a, b] 는 a -> b로 가는 티켓


[해결 방법]
- 해결 방법 2가지 예상
    - 가능한 모든 경로를 만들기 -> ?
    - 한 번만 경로 탐색하고, 알파벳 순서로 탐색하기 -> BFS로 최초 완결 경로를 사용
- 1번 방법은 어떻게 하는지도 모르겠고 2번은 쉬워보여서 2번으로 진행
- BFS를 하되, 방문 순서는 알파벳 순으로 진행함
- BFS 따라서 가다가 안 되면 되돌아가는 식으로 구현
    - Q. 근데 BFS가 되돌아가는 게 가능한가?
        - 안 되는 거 같은데
- 되돌아가기가 100% 가능한 백트래킹으로 변경함

*/
const solution = (tickets) => {
    // 항공권을 미리 알파벳 순으로 정렬하고, BFS에서는 배열 index 순서로 방문
    tickets.sort((a, b) => {
        if (a[0].localeCompare(b[0]) === 0) {
            return a[1].localeCompare(b[1]);
        }
        return a[0].localeCompare(b[0]);
    });

    const path = ["ICN"];
    const ticketUsed = Array(tickets.length).fill(false);

    const visit = (stage) => {
        if (stage === tickets.length) {
            // 전체 호출 스택을 빠르게 탈출하기 위한...
            throw new Error();
        }

        // 뒤 stage에서 쓸 티켓이 없으면 루프만 빙빙 돌다가 돌아오게 된다.
        // 루프를 다 도는 걸 막기는 어려워보인다.
        for (let i = 0; i < tickets.length; i++) {
            if (!ticketUsed[i] && tickets[i][0] === path[path.length - 1]) {
                path.push(tickets[i][1]);
                ticketUsed[i] = true;
                visit(stage + 1);
                ticketUsed[i] = false;
                path.pop();
            }
        }
    };

    try {
        visit(0);
    } catch {
        return path;
    }
};
