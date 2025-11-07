/*
[문제 해석]
- 병사 n명으로 공격 x회를 최대한 방어
- 버틴 최대 라운드 수 반환
- 무적 스킬 K회 사용

[발상]
- 처음엔 enemy 배열 정렬해서 거기서 k개 만큼 무효화하면 되겠다고 생각했는데,
- 도달 가능한 라운드 내에서만 무효화해야 함
- 시간 복잡도 상 O(N log N) 내에서 해결해야 했음. 즉 순회하면서 max array를 구성해야 했음.
- max array를 어떻게 보관할 방벙비 없었는데, max heap이 떠올라서 사용하기로 함
- 피통이 딸리면 max 값을 하나씩 없었던 걸로 치면 됨

[헤맨 부분]
- max heap pop 구현 실수가 문제였음. max heap 초기 구현은 그렇게 오래 걸리지 않았음.

*/
import { describe, it, assert } from "vitest";

describe("디펜스 게임 (Lv.2)", () => {
    it.each([
        [7, 3, [4, 2, 4, 5, 3, 3, 1], 5],
        [2, 4, [3, 3, 3, 3], 4],
    ])("%j => %i", (n, k, enemy, expected) => {
        const result = solution(n, k, enemy);
        assert.equal(result, expected);
    });
});

function solution(n, k, allEnemies) {
    let turns = 0;
    let remainingSoldiers = n;
    const maxHeap = new MaxHeap();

    for (const currEnemy of allEnemies) {
        maxHeap.push(currEnemy);
        if (remainingSoldiers < currEnemy) {
            if (k > 0) {
                const skippedEnemy = maxHeap.pop();
                // while을 안 해도 됨. 현재 currEnemy까지 포함되기 때문에 무조건 한 방 인출로 해결 가능함
                // 무조건 !heap.isEmpty() 임
                remainingSoldiers += skippedEnemy;
                k--;
            } else {
                return turns;
            }
        }
        remainingSoldiers -= currEnemy;
        turns++;
    }

    return turns;
}

// Max Heap 구현은 이제 안정적인듯
function MaxHeap() {
    const arr = [undefined];

    function push(toAdd) {
        // 맨 끝에 넣고 위랑 비교
        arr.push(toAdd);
        let childIdx = arr.length - 1;
        let parentIdx = Math.floor(childIdx / 2);

        while (arr[childIdx] > arr[parentIdx]) {
            swap(childIdx, parentIdx);
            childIdx = parentIdx;
            parentIdx = Math.floor(parentIdx / 2);
        }
    }

    function pop() {
        if (isEmpty()) {
            throw new Error("heap is empty");
        }
        console.log(`on pop: ${arr} --> ${arr[1]}`);

        const result = arr[1];
        const smallest = arr.pop();
        if (arr.length === 2) {
            return result;
        } else {
            arr[1] = smallest;
        }

        console.log("popping...");

        let parentIdx = 1;
        let childIdx = getMaxChildIdx(parentIdx);
        while (arr[parentIdx] < arr[childIdx]) {
            swap(parentIdx, childIdx);
            parentIdx = childIdx;
            childIdx = getMaxChildIdx(parentIdx);
        }

        return result;
    }

    function isEmpty() {
        return arr.length === 1;
    }

    function swap(idxA, idxB) {
        const temp = arr[idxA];
        arr[idxA] = arr[idxB];
        arr[idxB] = temp;
    }

    function getMaxChildIdx(idx) {
        const childIdx = idx * 2;
        if (arr.length <= childIdx) {
            return idx; // 동일 idx를 반환해서 사용처에서 루프돌지 않게 하도록
        }
        if (arr.length - 1 === childIdx) {
            return childIdx;
        }
        return arr[childIdx] > arr[childIdx + 1] ? childIdx : childIdx + 1;
    }

    return {
        push,
        pop,
        isEmpty,
    };
}
