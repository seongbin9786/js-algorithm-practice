/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/*
[문제]
- nums 배열을 받아 n개의 객체 (red=0, white=1, blue=2 색상)을 정렬
- 라이브러리의 정렬 함수 없이 풀어야 함
- in-place = 제자리 = 추가 공간이 필요 없음. 공간 복잡도 O(1)

[해결 방법]
- O(n log n)인 힙 정렬, 퀵 정렬(도 뭐 인정) 등을 사용해서 해결
- follow up인 1-pass in-place 알고리즘은 평가가 매우 박하네..?
*/

const heapSort = (arr) => {
    // 모든 '부모'를 역-레벨 순회
    for (let parent = arr.length - 1; parent >= 0; parent--) {
        heapify(arr, parent, arr.length);
    }

    for (let length = arr.length - 1; length >= 1; length--) {
        // 이미 선출된 루트를 끝으로 빼고
        [arr[0], arr[length]] = [arr[length], arr[0]];
        // 길이를 1 줄이고 루트에 대해 heapify
        heapify(arr, 0, length);
    }
};

// heapify는 참 대단하다. 더 갈 필요가 없으면 멈춰서, 매우 효율적이다.
const heapify = (arr, parent, length) => {
    const left = parent * 2 + 1;
    const right = left + 1;
    let max = parent;

    if (right < length && arr[max] < arr[right]) {
        // 매우 귀찮은 부분임...
        max = right;
    }

    if (left < length && arr[max] < arr[left]) {
        // 매우 귀찮은 부분임...
        max = left;
    }

    // 교환이 일어날 때는, 서브트리의 root의 heap이 깨질 수 있다.
    // 미리 잡아두어야 한다.
    if (parent !== max) {
        [arr[parent], arr[max]] = [arr[max], arr[parent]];

        // max 자리 - 즉 - 추락한 parent가 루트가 된 서브트리에서 재귀 호출
        // max가 부모 노드일 때만 수행하면 된다.
        if (max < Math.floor(length / 2)) {
            heapify(arr, max, length);
        }
    }
};

var sortColors = function (nums) {
    heapSort(nums);
};
