/*
[패인 분석]
- index 기준으로 i, j, k가 서로 달라야 한다는 말을 보고는 정렬을 못 하게 됐네라고 생각했음.
- 같은 원소를 쓰면 안 되는 정도로 충분한 게, 값으로 변환하고 index를 버렸다고 해도, 
  어차피 같은 순번의 원소를 의도적으로 2회 이상 쓰지 않는 한 idx 수준에서의 중복도 없는 거임
  내가 걱정한 건 값 수준에서 중복이 없어도 idx 수준에서 중복이 있을 수 있다는 거임. 같은 값이 가능하기 때문.
  맞음. 나처럼 Pair를 완성하고 하나를 찾으려고 했으면, 무조건 중복이 나올 수 있음. 애초에 접근이 너무 어려운 거임.
  애초에 Map을 썼을 때, value가 배열로 나온 것부터가 문제임. 순회가 계속 들어가기 때문에 Map을 쓰는 게 의미가 없어진 거 같음.

- 정렬 없이 중복 제거를 했고, index 기준으로 중복 제거 후에 value 기준 중복이 발생해으로 또 중복 제거함
- O(n^3)가 나올 리가 없는데 이게 나왔을 때 직감했어야 했는데 쉬었다 푸니 생각을 못 했음...
- 정렬을 못한다고 생각했던 게 너무 컸다. 가장 첫 접근이 정렬이기 때문에 첫 시작부터 실패할 예정이었던 거임

[문제 조건]
정수 배열을 입력 받아 서로 다른 idx를 갖는 세 숫자의 합이 0인 경우 각 숫자(idx 아님)를 배열로 담아 반환
- idx 중복, 값 중복 모두 없어야 함!

[접근 1]
- 투 포인터 문제라며
- 숫자 두 개의 경우는 모든 숫자를 map에 넣고, target - self 가 있는지 확인하면 끝임
- 숫자 세 개이면 어떻게 해야?
  - 솔직히 1도 모르겠음 ㅋㅋ
  - 2개 조합도 Map에 넣으면 풀 수 있음.
  - 중복 구분은 결국 idx를 .. 써야 되나?
    - 굳이? 그냥 정렬하고 난 후 막 써도 될 듯?
    - 대신 정렬하면 각 숫자의 개수는 알아야 할 듯? 근데 그렇게 비교하면 좀 느릴 듯..?

  - Map<integerSum, Array<{ [value: number]: number(=>idx), }>> 으로 처리하자.
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const uniqueIndicesTriples = [];

    // 최초 생성 시
    const map = new Map();
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const a = nums[i];
            const b = nums[j];
            const key = a + b;
            const prevValue = map.get(key) || [];
            // 동일한 (i, j) 조합은 없음
            // key가 겹칠 수 있음. multimap은 없음. 배열로 저장하면 됨.
            map.set(key, [[i, j], ...prevValue]);
        }
    }

    // 순회 단위
    // reduce로 리팩토링 가능 총 O(n^3) ... 이건 못 쓰겠네.
    // 짜면서 알아차렸어야 했는데.
    for (let i = 0; i < nums.length; i++) {
        const curValue = nums[i];
        const counterValue = curValue * -1;

        // 순회하며 sum=0이 되는 pair를 확보
        const possibleDuplicatePairs = map.get(counterValue);
        if (!possibleDuplicatePairs) {
            continue;
        }

        // idx가 겹치는 pair는 제외 O(n^2)
        const uniquePairs = possibleDuplicatePairs.filter(
            (candidatePair) => !candidatePair.includes(i),
        );
        // O(n^2)
        uniquePairs.forEach((pairs) => {
            // 기존 triple 중 겹치는 것 제외
            // k + (i, j) 조합은 k, i, j 간 중복 가능
            // 따라서 k, i, j 에 대해 중복을 체크해줘야 함.
            // Map의 key에서 array deepEqual 지원 X
            // class에서 equals 지원 X
            // 그러면 그냥 removeDuplicate 만들어서 O(n^2) 돌리는 수 밖에 없음
            const triple = [i, ...pairs];
            triple.sort();
            const [x, y, z] = triple;
            // check duplicates
            const isDuplicated = uniqueIndicesTriples.find(
                ([a, b, c]) => a === x && b === y && c === z,
            );
            if (isDuplicated) {
                return;
            }
            uniqueIndicesTriples.push(triple);
        });
    }

    // 실제 값으로 매핑 O(n)
    const duplicateValuesTriples = uniqueIndicesTriples.map(([i, j, k]) => [
        nums[i],
        nums[j],
        nums[k],
    ]);

    // 최종 값 기준으로도 한 번 더 제거해야 함
    const uniqueValuesTriples = [];
    if (duplicateValuesTriples.length > 1) {
        uniqueValuesTriples.push(duplicateValuesTriples[0]);
    }
    // O (n^2) // sort는 array size = 3 이어서 카운트 의미 없음
    for (let i = 0; i < duplicateValuesTriples.length; i++) {
        const [a, b, c] = duplicateValuesTriples[i].sort();

        let j;
        for (j = 0; j < uniqueValuesTriples.length; j++) {
            const [x, y, z] = uniqueValuesTriples[j];
            if (a === x && b === y && c === z) {
                break; // 더 볼 게 없음
            }
        }
        // 모두 순회한 경우 중복이 없으니 추가
        if (j === uniqueValuesTriples.length) {
            uniqueValuesTriples.push([a, b, c]);
        }
    }

    return uniqueValuesTriples;
};

threeSum([-1, 0, 1, 2, -1, -4]);
