/*
    [문제]
    - 삼각형의 최상단 - 최하단을 가로지르는 경로 중 숫자 합이 최대인 경로 상의 숫자의 합을 반환
    - 칸 이동은 대각선 아래 좌/우측으로만 가능

    [해결 방법] (구상이 좀 막연하게 시간이 걸리는 중)
    - 이미 풀어봐서 알지만, 지역해가 의미 없어서 그리디 아님
    - 모든 경우를 탐색하려고 하면 완전 탐색 -> X
    - 현재 지점까지의 최선을 저장할 수 있음.
    - 각 지점은 상단에서 1 or 2가지 경우의 수가 있음
    - 그 중 max를 저장하면 됨
    - (ex) 3행의 1은 2가지 경우의 수를 받음: 7+3 vs 7+8 = 10 vs 15 => 15.
        - 얘는 1이 아니라 16이 됨 (1+15)
        - 이렇게 중첩해서 쌓아나가고, 맨 마지막 행에서 max를 반환
        - 애초에 더해버리고, max로 갱신하면 충분함
    
    [구현 상세]
    - bottom-up / top-down 모두 가능해보임
    - top-down으로 진행
    - 1행에서 시작, 3, 8은 스스로에게 0행의 본인의 대각선 좌, 우 위치의 숫자를 더함 (max 사용)
        - 3은 index=0이어서 좌측 숫자가 없음
        - 8은 index=length-1이어서 우측 숫자가 없음
        - (나머지는 둘 다 있음)
    - 이렇게 마지막 행까지 반복

    [오류]
    - NaN으로 저장됨
    - index 오류로 undefined 조회해서 그런듯
    - length 안 붙여서 발생한 오류였음; 5분 잡아먹음..

    [시간 초과]
    - case 2건 시간 초과 발생함
    - 분기문 줄여서 해결 (... 이게 맞나...)
        - undefined이면 0으로 처리하게 함
*/
const solution = (triangle) => {
    for (let row = 1; row < triangle.length; row++) {
        for (let column = 0; column < triangle[row].length; column++) {
            triangle[row][column] += Math.max(
                triangle[row - 1][column - 1] ?? 0,
                triangle[row - 1][column] ?? 0
            );
        }
    }

    return Math.max(...triangle[triangle.length - 1]);
};
