let arr;

/**
 * Tuple을 입력 받아 0과 1로만 구성되어 있는지 반환
 *
 * @param {number[]} arr [ 0의 개수, 1의 개수 ]를 갖는 배열
 */
const tupleCompressible = ([zeros, ones]) => zeros === 0 || ones === 0;

/**
 * 모든 Tuple이 압축 가능한지 반환
 * 
 * @param {number[][]} arrays
 */
const allTuplesCompressible = (tuples) => {
  const compressibles = tuples.filter(tupleCompressible);
  return compressibles.length === tuples.length;
}

/**
 * 모든 Tuple을 병합
 *
 * @param {number[][]} tuple
 */
const mergeTuples = (tuples) => tuples.reduce((sum, cur) => {
  sum[0] += cur[0];
  sum[1] += cur[1];
  return sum;
}, [0, 0]);

/**
 * [start, end) 구간에 대해 압축을 수행하고, 0과 1의 개수를 반환
 * 
 */
const compress = (N, startX, endX, startY, endY) => {
  if (endX - startX !== N || endY - startY !== N) {
    throw new Error(`BAD RANGE: N: ${N}, startX: ${startX}, endX: ${endX}, startY: ${startY}, endY: ${endY}`);
  }

  console.log(`[CALL] N: ${N}, startX: ${startX}, endX: ${endX}, startY: ${startY}, endY: ${endY}`);
  if (N === 2) {
    // 4칸을 확인한 후 반환해야 함.
    // 영역: [startX, endX), [startY, endY)
    let zeros = 0;
    let ones = 0;
    for (let i = startX; i < endX; i++) {
      for (let j = startY; j < endY; j++) {
        if (arr[i][j] === 0) {
          zeros++;
        } else {
          ones++;
        }
      }
    }

    if (zeros === 0) {
      console.log(`\t\t return compressed [0, 1]`);
      return [0, 1];
    }

    if (ones === 0) {
      console.log(`\t\t return compressed [1, 0]`);
      return [1, 0];
    }

    console.log(`\t\t return [${zeros}, ${ones}];`);
    return [zeros, ones];
  }

  const middleX = startX + (endX - startX) / 2;
  const middleY = startY + (endY - startY) / 2;

  const subAreaTuples = [
    compress(N / 2, middleX, endX, startY, middleY),    // 1사분면
    compress(N / 2, startX, middleX, startY, middleY),  // 2사분면
    compress(N / 2, startX, middleX, middleY, endY),    // 3사분면
    compress(N / 2, middleX, endX, middleY, endY),      // 4사분면
  ];

  console.log('-------allTuplesCompressible??');
  if (allTuplesCompressible(subAreaTuples)) {
    const hasOne = subAreaTuples[0][0] !== 0;
    return hasOne ? [1, 0] : [0, 1];
  }

  const merged = mergeTuples(subAreaTuples);
  console.log(`------- X:[${startX} - ${endX}], Y:[${startY} - ${endY}] merged: [${merged}]`);

  return merged;
}

/**
 * 쿼드 압축 후 0, 1의 개수를 반환
 * 
 * @param {number[]} tuple
 */
const solution = (_arr) => {
  arr = _arr; // 재귀 특성상 호출이 많아서 전역으로 활용

  const N = _arr.length;
  return compress(N, 0, N, 0, N);
}

const result = solution([[1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 1], [0, 1, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 1, 1, 1]]);

console.log(result);
