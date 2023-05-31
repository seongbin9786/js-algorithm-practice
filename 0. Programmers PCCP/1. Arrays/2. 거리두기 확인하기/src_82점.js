/*
대기실은 5개이며, (안 중요)

(중요)
각 대기실은 5x5 크기입니다. 
거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.
*/
const MAP_SIZE = 5;

// 상하좌우
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

// 대각선 (좌측상단, 좌측하단, 우측상단, 우측하단)
const diagonal_dy = [-1, 1, -1, 1];
const diagonal_dx = [-1, -1, 1, 1];

// 대각선에 대응하는 상,하,좌,우 박스 위치
// 좌측상단 = 상, 좌 => 상단, 좌측 박스 체크
// 좌측하단 = 하, 좌 => 하단, 좌측 박스 체크
// 우측상단 = 상, 우 => 상단, 우측 박스 체크
// 우측하단 = 하, 우 => 하단, 우측 박스 체크
const partitions_dy = [[-1, 0], [1, 0], [1, 0], [-1, 0]];
const partitions_dx = [[0, -1], [0, -1], [0, 1], [0, 1]];

const findBadNeighbor = (arr, y, x) => {
  let type;

  // 상하좌우 확인
  for (let i = 0; i < 4; i++) {
    // 한 칸 거리 확인
    if (y + dy[i] < 0 || y + dy[i] >= MAP_SIZE) continue;
    if (x + dx[i] < 0 || x + dx[i] >= MAP_SIZE) continue;
    type = arr[y + dy[i]][x + dx[i]];
    if (type === 'P') {
      return true;
    }

    // 한 칸 더 진행
    // 파티션을 만나면 한 칸 더 진행하지 않고 생략
    if (type === 'X') continue;
    if (y + dy[i] * 2 < 0 || y + dy[i] * 2 >= MAP_SIZE) continue;
    if (x + dx[i] * 2 < 0 || x + dx[i] * 2 >= MAP_SIZE) continue;
    type = arr[y + dy[i] * 2][x + dx[i] * 2];
    if (type === 'P') {
      return true;
    }
  }

  // 대각선 확인
  for (let i = 0; i < 4; i++) {
    if (y + diagonal_dy[i] < 0 || y + diagonal_dy[i] >= MAP_SIZE) continue;
    if (x + diagonal_dx[i] < 0 || x + diagonal_dx[i] >= MAP_SIZE) continue;

    // 대각선 진행 경로 상 양쪽이 파티션으로 막혀있다면 skip
    if (y + partitions_dy[i][0] < 0 || y + partitions_dy[i][0] >= MAP_SIZE) continue;
    if (x + partitions_dx[i][0] < 0 || x + partitions_dx[i][0] >= MAP_SIZE) continue;
    if (y + partitions_dy[i][1] < 0 || y + partitions_dy[i][1] >= MAP_SIZE) continue;
    if (x + partitions_dx[i][1] < 0 || x + partitions_dx[i][1] >= MAP_SIZE) continue;
    if (arr[y + partitions_dy[i][0]][x + partitions_dx[i][0]] === 'X' &&
      arr[y + partitions_dy[i][1]][x + partitions_dx[i][1]] === 'X') {
      continue;
    }

    if (arr[y + diagonal_dy[i]][x + diagonal_dx[i]] === 'P') {
      return true;
    }
  }

  return false;
}

const isBadPartitioning = (arr) => {
  // P 찾기
  for (let y = 0; y < MAP_SIZE; y++) {
    for (let x = 0; x < MAP_SIZE; x++) {
      if (arr[y][x] === 'P') {
        // P 주변을 전수 조사
        if (findBadNeighbor(arr, y, x)) {
          return true;
        }
      }
    }
  }

  return false;
};

function solution(places) {

  // 1. string[] => char[][] 로 변환
  const partitionArr = places.map(str => [...str]);

  // 2. 판단
  return partitionArr.map(isBadPartitioning).map(bad => bad ? 0 : 1);
}

const result = solution([
  ["OOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOOO"],
  ["XXXXX", "XXXXX", "XXXXX", "XXXXX", "XXXXX"],
  ["PPPPP", "PPPPP", "PPPPP", "PPPPP", "PPPPP"],
  ["OOOPX", "OOOXP", "OOOOO", "OOOOO", "OOOOO"],
]);

console.log(result);
