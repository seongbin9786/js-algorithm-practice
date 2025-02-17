/*
    [문제]
    - 2차원 격자에서 (0,0)에서 (m,n)까지 이동하는 경우의 수의 합계를 1,000,000,007로 나눈 값
    - m,n <= 100
    - 물에 잠긴 지역이 중간 중간 있음 (puddles)
    - 1-indexed 좌표 사용

    [해결 방법]
    - 도착점 기준에서 경우의 수는 (좌측 경우의 수) + (상단 경우의 수) 이다.
    - 시작점의 경우의 수 = 0
    - 시작점을 제외한 1행의 경우의 수 = 1
    - 시작점을 제외한 1열의 경우의 수 = 1
    - 나머지 경우의 수 = 0으로 초기화 후 더하기
    - 이 때, 물 웅덩이 좌표의 경우 경우의 수 = 0으로 고정한다.
    - 즉, 초기화 이후 1행, 1열을 제외한 칸을 순회하면서 더하되, 물웅덩이 좌표는 계산을 생략하면 된다.
    
    [고민 지점]
    - 덧셈의 순서가 유의미할까?
        - 상관 없어 보임

    [실패]
    - (y,x) 순설 확인해야 하는 것이 맞다는 것을 확인.
    - % 1000000007 를 안 한 것을 확인
    - 1열, 1행에서 물웅덩이가 있으면 그 뒤는 모두 0이 되므로, continue가 아닌 break를 써야 함
    - 성능 TC 문제: 
        - Set을 쓴 건 잘한 일이라고 생각
        - 배열 초기화에서 문제가 있지 않을까 생각
        - 그냥 (0,0)=1로 초기화하고 1번만 돌아야 하나? X 불가능
        - GPT에게 배열 초기화 물어봤고, from 이후 map할 필요 없이 한 번에 가능했음.
            - `Array.from({ length: height }).map(() => Array(width).fill(0));
            - `const paths = Array.from({ length: height }, () => Array(width).fill(0));`
            - 배열 전체 순회를 1번 덜 하게 될 거라고 생각이 듬.
*/
const solution = (width, height, rawPuddles) => {
    const puddles = new Set(rawPuddles.map(([x, y]) => `${y - 1},${x - 1}`));

    const paths = Array.from({ length: height }).map(() =>
        Array(width).fill(0)
    );

    for (let y = 0; y < height; y++) {
        if (puddles.has(`${y},${0}`)) {
            break;
        }
        paths[y][0] = 1;
    }

    for (let x = 0; x < width; x++) {
        if (puddles.has(`${0},${x}`)) {
            break;
        }
        paths[0][x] = 1;
    }

    for (let y = 1; y < height; y++) {
        for (let x = 1; x < width; x++) {
            if (puddles.has(`${y},${x}`)) {
                continue;
            }
            paths[y][x] = (paths[y][x - 1] + paths[y - 1][x]) % 1_000_000_007;
        }
    }

    return paths[height - 1][width - 1];
};
