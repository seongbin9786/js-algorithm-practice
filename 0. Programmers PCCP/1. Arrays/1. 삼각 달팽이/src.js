const draw = ({ arr, maxFloor, startingValue, startingIdx, startingFloor }) => {

  // 무슨 case 일까?
  if (maxFloor - startingFloor < 0) {
    return;
  }

  // 예외 케이스
  if (maxFloor === startingFloor) {
    arr[startingIdx] = startingValue;
    console.log(`[DEF 1] arr[${startingIdx}] = ${startingValue}`)
    return;
  }

  // n=2부터 순회 가능
  let value = startingValue;
  let idx = startingIdx;
  let floor = startingFloor; // 위에서부터 오름차순으로 증가함

  // 내려가며 왼쪽 구간 채우기
  // 내려갈 때는 본인의 층수만큼 더해줌
  // 처음엔 floor === value 이지만 두번째 회전부턴 floor !== value 이므로 따로 관리함
  while (floor <= maxFloor) {
    console.log(`arr[${idx}] = ${value}`)
    arr[idx] = value++; // 값은 별개로 증가합니다.

    // 더 좋은 방법이 있을 것 같은데...
    if (floor === maxFloor) {
      break;
    }
    idx += floor; // 밑으로 가려면 floor만큼 증가해야 합니다.
    floor++; // 내려갑니다.
  }

  // 아래쪽 직선 구간 채우기
  // 직선 구간의 길이는 maxFloor - staringFloor
  // value는 이미++되어 있어서 그대로 시작하면 됨.
  // idx는 하나 앞으로 이동해야 함.
  idx++;
  for (let i = 0; i < maxFloor - startingFloor; i++) {
    console.log(`arr[${idx}] = ${value}`)
    arr[idx++] = value++; // idx와 값 증가
  }
  idx--; // idx가 마지막에서 하나 추가됐으므로 감소시킴

  // 올라가며 오른쪽 채우기
  // value는 이미++되어 있어서 그대로 시작하면 됨.
  // startingFloor + 1까지만 올라감. 맨 윗층은 끝났기 때문.
  while (floor > startingFloor + 1) {
    // 먼저 올라가고 시작해야 함. 올라갈 때는 현재 floor만큼 빼줘야 함.
    idx -= floor--; // floor는 한 칸씩 올라가고 있음
    console.log(`arr[${idx}] = ${value}`)
    arr[idx] = value++; // value 증가
  }

  // 계속 이어서 시작해야 됨.
  // maxFloor는 하나가 줄어듬.
  // startingFloor는 2개가 줄어듬.
  // value는 미리 ++시켜놨으니 그대로. 
  // startingFloor는 방금 위치에서 한 칸 내려와야 함.
  // startingIdx는 방금 위치에서 한 칸 내려와야 함 (예외는 maxFloor=1일 경우. 이 때는 단순 할당후 종료)
  // maxFloor: any, startingValue: any, startingIdx: any, startingFloor
  draw({
    arr,
    maxFloor: maxFloor - 1,
    startingValue: value,
    startingIdx: idx + floor,
    startingFloor: floor + 1
  });
}

function solution(n) {
  const answer = Array(n * (n + 1) / 2).fill(0); // 일단 단일 배열 사용
  draw({
    arr: answer,
    maxFloor: n,
    startingValue: 1,
    startingIdx: 0,
    startingFloor: 1
  });
  return answer;
}

console.log(solution(5));
