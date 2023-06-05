let arr;

const compressibleToOne = ([zeros]) => zeros === 0;

const compressibleToZero = ([_, ones]) => ones === 0;

/**
 * 모든 Tuple이 압축 가능한지 반환
 * 
 * @param {number[][]} arrays
 */
const allTuplesCompressible = (tuples) => {
  const compressed = mergeTuples(tuples);
  if (compressed.length === tuples.length) {
    return false;
  }


}

/**
 * 모든 Tuple을 병합
 *
 * @param {number[][]} tuple
 */
const mergeTuples = (tuples) => tuples.reduce((sum, tuple) => {
  sum[0] += tuple[0];
  sum[1] += tuple[1];
  return sum;
}, [0, 0]);

const TUPLE_OF_ZERO = [1, 0];
const TUPLE_OF_ONE = [0, 1];

/**
 * [start, end) 구간에 대해 압축을 수행하고, 0과 1의 개수를 반환
 * 
 */
const compress = (N, startX, endX, startY, endY) => {
  console.log(`[CALL] N: ${N}, startX: ${startX}, endX: ${endX}, startY: ${startY}, endY: ${endY}`);
  if (N === 2) {
    const counter = [0, 0];
    // 4칸을 확인한 후 반환해야 함.
    // 영역: [startX, endX), [startY, endY)
    for (let i = startX; i < endX; i++) {
      for (let j = startY; j < endY; j++) {
        // console.log(`[ACCESS] checking arr[${i}][${j}]=${arr[i][j]}`)
        counter[arr[i][j]]++;
      }
    }
    const [zeros, ones] = counter;

    if (zeros === 0 && ones > 0) {
      console.log(`\t\t return unit-compressed [0, 1]`);
      return TUPLE_OF_ONE;
    }

    if (zeros > 0 && ones === 0) {
      console.log(`\t\t return unit-compressed [1, 0]`);
      return TUPLE_OF_ZERO;
    }

    console.log(`\t\t return [${zeros}, ${ones}]; `);
    return counter;
  }

  const middleX = startX + (endX - startX) / 2;
  const middleY = startY + (endY - startY) / 2;

  const subAreaTuples = [
    compress(N / 2, middleX, endX, startY, middleY),    // 1사분면
    compress(N / 2, startX, middleX, startY, middleY),  // 2사분면
    compress(N / 2, startX, middleX, middleY, endY),    // 3사분면
    compress(N / 2, middleX, endX, middleY, endY),      // 4사분면
  ];

  const merged = mergeTuples(subAreaTuples);
  console.log(`\t\t\tX: [${startX}, ${endX}), Y: [${startY}, ${endY}) tuple-merged. before compressed: `, merged);
  if (compressibleToZero(merged)) {
    console.log(`\t\t\treturn tuple-compressed [${subAreaTuples[0]}] + [${subAreaTuples[1]}] + [${subAreaTuples[2]}] + [${subAreaTuples[3]}] = [${TUPLE_OF_ZERO}]`);
    return TUPLE_OF_ZERO;
  }

  if (compressibleToOne(merged)) {
    console.log(`\t\t\treturn tuple-compressed [${subAreaTuples[0]}] + [${subAreaTuples[1]}] + [${subAreaTuples[2]}] + [${subAreaTuples[3]}] = [${TUPLE_OF_ONE}]`);
    return TUPLE_OF_ONE;
  }

  console.log(`\t\t\tnone-compressed merge result: [${merged}]`);
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

  if (N === 1) {
    return _arr[0][0] === 0 ? TUPLE_OF_ZERO : TUPLE_OF_ONE;
  }

  return compress(N, 0, N, 0, N);
}

const result = solution(
  [[1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 1, 1], [0, 1, 0, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 1, 1, 1]]
);

console.log(result);
