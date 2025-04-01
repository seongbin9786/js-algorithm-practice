/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/*
[문제]
- m*n 행렬에 대해 spiral 순서로 반환
- 행렬 크기 = 1*1 ~ 100*100

[해결 방법]
- 직접 해보면서 패턴을 찾아야 할 듯.
- 우 -> 하 -> 좌 -> 상
- 쉽게 풀려면?
- input이 존재하므로, 기존 값을 바꿔도 됨 -> 느리진 않을 듯. in-place 변경이니깐
- idx 계산으로 한다면? 
    - 우3 -> 하2 -> 좌3 -> 상1 -> 우2

- 5*4라면?
    - 우4 -> 하3 -> 좌4 -> 상2
    - 우3 -> 하1 -> 좌2 -> 상(x)
    - [우]를 갈 때 가로 한 라인이 지워짐
    - [하]를 갈 때는 세로 한 라인이 지워짐
    - [좌]를 갈 때는 가로 한 라인이 지워짐
    - [상]을 갈 때는 세로 한 라인이 지워짐
    - 이동 방향을 바꾸는 시점에서는 라인이 아직 다 안 지워진 셈임.

01 02 03 04 05
06 07 08 09 10
11 12 13 14 15
16 17 18 19 20

- 그냥 딱 남은 (가로, 세로)만 세면 됨?
- 나라면 rLow, rHigh, cLow, cHigh로 구분할 듯.
- 우측 한바퀴 다 돌면 하단 이동 시작. rLow++
- 우측 끝에서 세로 한 줄 다 내려가면 cHigh--
- 좌측 한 줄 다 돌면 rHigh--
- 좌측 끝에서 세로 한 줄 다 올라가면 cLow++
- 각 방향마다 [low, high] 범위를 방문하면 끝날 듯
- while 로 쭉 가면 될 듯

코딩 시작 20:44
- index 변수 실수 때문에 처음 헤맴
- 마지막에 하나 값 추가 되는 버그 있는데, 잘 모르겠음...
- 끝 21:05

다른 사람 답변 참고해서 굳이 매번 r,c 모두 정합성 체크할 필요가 없음을 알게 됨
*/
var spiralOrder = function (matrix) {
    const result = [];

    let rLow = 0;
    let cLow = 0;
    let rHigh = matrix.length - 1;
    let cHigh = matrix[0].length - 1;

    // 이게 벗어난 경우는 논리적으로, rLow|High, cLow|High에 대한 안전한 접근이 아님.
    while (rLow <= rHigh && cLow <= cHigh) {
        // 우측 이동
        if (rLow <= rHigh) {
            for (let c = cLow; c <= cHigh; c++) {
                result.push(matrix[rLow][c]);
            }
            rLow++;
        }

        // 하단 이동
        if (cLow <= cHigh) {
            for (let r = rLow; r <= rHigh; r++) {
                result.push(matrix[r][cHigh]);
            }
            cHigh--;
        }

        // 좌측 이동
        if (rLow <= rHigh) {
            for (let c = cHigh; c >= cLow; c--) {
                result.push(matrix[rHigh][c]);
            }
            rHigh--;
        }

        // 상단 이동
        if (cLow <= cHigh) {
            for (let r = rHigh; r >= rLow; r--) {
                result.push(matrix[r][cLow]);
            }
            cLow++;
        }
    }

    return result;
};
