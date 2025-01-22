const solution = (m, n, rawBoard) => {
    const board = rawBoard.map((boardRow) => [...boardRow]);

    let removedBlocks = 0;

    // (y,x)로 저장
    // 배열로 저장할까 하다가 중복 시 개수 세기가 불가능해서 중복을 제거하는 Set 사용
    const blocksToRemove = new Set();
    do {
        // 1. 제거 단계
        blocksToRemove.clear();

        // 보자마자 지우면 영역이 겹쳤을 때는 지울 수가 없게 된다.
        for (let x = 0; x < n - 1; x++) {
            for (let y = 0; y < m - 1; y++) {
                // 2x2 영역을 확인
                const a = board[y][x];
                const b = board[y + 1][x];
                const c = board[y][x + 1];
                const d = board[y + 1][x + 1];
                if (a === " ") {
                    continue;
                }
                if (a === b && b === c && c === d) {
                    blocksToRemove.add(`${y},${x}`);
                    blocksToRemove.add(`${y + 1},${x}`);
                    blocksToRemove.add(`${y},${x + 1}`);
                    blocksToRemove.add(`${y + 1},${x + 1}`);
                }
            }
        }

        for (const coord of blocksToRemove) {
            const [y, x] = coord.split(",").map(Number);
            board[y][x] = " ";
        }

        // 2. 제거된 블록 개수 정산
        removedBlocks += blocksToRemove.size;

        // 3. 밑으로 끌어내리기
        for (let x = 0; x < n; x++) {
            // y는 밑에서 위로 올라감
            for (let y = m - 1; y > 0; y--) {
                // 맨 윗칸은 밑에서 끌어내려지기만 함. 최상단에서 1칸 밑 칸이 안 비어있다면 최상단 칸은 안 봐도 됨.

                // 이미 채워진 칸인 경우 생략 후 그 윗칸으로 이동
                if (board[y][x] !== " ") {
                    continue;
                }

                // 빈 칸이 아닐 때까지 윗 칸으로 이동
                let ny = y - 1;
                while (ny >= 0 && board[ny][x] === " ") {
                    ny--;
                }

                // 최상단까지 빈 칸인 경우, 현재 열 반복을 중단
                if (ny === -1) {
                    break;
                }

                // 위에서 빈 칸이 아닌 칸을 발견한 경우, 해당 값을 현재 칸으로 끌어내리고, 해당 칸은 빈 값 처리
                board[y][x] = board[ny][x];
                board[ny][x] = " ";
            }
        }
    } while (blocksToRemove.size > 0);

    return removedBlocks;
};
