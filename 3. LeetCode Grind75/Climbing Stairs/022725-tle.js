/*
[문제]
- n칸의 계단을 올라갈 때 1, 2단계씩 올라갈 수 있고, 전체 계단을 올라가는 방법의 개수?
- 1 <= n <= 45

[해결 방법]
- 현 단계에서 n에 도달할 때까지 선택한 1,2의 분기 중 n에 실제로 도달한 경우에만 카운팅하면 됨
- (ex) n =5, 
    curr=0, 
        next=1
            curr=1
                next=1
                next=2
        next=2
            curr=2
                next=1
                next=2

        이런 식
- dfs로 수행 가능할 듯
*/
var climbStairs = function (destination) {
    let combinations = 0;

    const climb = (curr) => {
        if (curr > destination) {
            return;
        }
        if (curr === destination) {
            combinations++;
            return;
        }

        climb(curr + 1);
        climb(curr + 2);
    };

    climb(0);

    return combinations;
};
