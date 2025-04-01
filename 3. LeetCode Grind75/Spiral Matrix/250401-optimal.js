const spiralOrder = (matrix) => {
    if (matrix.length === 0) {
        return [];
    }

    // 재귀적으로 붙여나가서 반환
    const firstRow = matrix.shift();
    // append가 아니라, concat (배열에 배열 붙이기)
    return firstRow.concat(spiralOrder(transposeAndReverse(matrix)));
};

const transposeAndReverse = (matrix) => {
    if (matrix.length === 0) {
        return [];
    }
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    // 일단 transpose 부터 작성
    // 열 하나마다 모든 열의 행을 가져온다.
    // 이후 열을 뒤집어야 하므로 c 순회를 반대로
    for (let c = cols - 1; c >= 0; c--) {
        const curr = [];
        for (let r = 0; r < rows; r++) {
            curr.push(matrix[r][c]);
        }
        result.push(curr);
    }
    return result;
};
