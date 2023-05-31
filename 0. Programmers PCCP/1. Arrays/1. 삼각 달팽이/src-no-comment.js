const draw = (arr, maxFloor, startingValue, startingIdx, startingFloor) => {

  if (maxFloor - startingFloor < 0) {
    return;
  }

  if (maxFloor === startingFloor) {
    arr[startingIdx] = startingValue;
    return;
  }

  let value = startingValue;
  let idx = startingIdx;
  let floor = startingFloor; // 위에서부터 오름차순으로 증가함

  while (floor <= maxFloor) {
    arr[idx] = value++; // 값은 별개로 증가합니다.

    if (floor === maxFloor) {
      break;
    }
    idx += floor;
    floor++;
  }

  idx++;
  for (let i = 0; i < maxFloor - startingFloor; i++) {
    arr[idx++] = value++; // idx와 값 증가
  }
  idx--;

  while (floor > startingFloor + 1) {
    idx -= floor--; // floor는 한 칸씩 올라가고 있음
    arr[idx] = value++; // value 증가
  }

  draw(arr, maxFloor - 1, value, idx + floor, floor + 1);
}

function solution(n) {
  const answer = Array(n * (n + 1) / 2).fill(0); // 일단 단일 배열 사용
  draw(answer, n, 1, 0, 1);
  return answer;
}

console.log(solution(5));
