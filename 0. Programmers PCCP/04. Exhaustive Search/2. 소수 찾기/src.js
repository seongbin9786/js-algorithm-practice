const prime = (num) => {
    if (num < 2) {
        return false;
    }
    const minFactor = Math.sqrt(num);
    for (let i = 2; i <= minFactor; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
};

function solution(numbersString) {
    const numbers = [...numbersString];
    const allCombinations = new Set();

    // 1. 채워나갈 자리수를 기준으로 DFS를 하면 모든 가능한 순서로 만들어낼 수 있다.
    const visited = [...Array(numbers)].fill(false);
    const permutationDFS = (selected, idx, maxSize) => {
        // 종료 조건
        if (idx >= maxSize) {
            allCombinations.add(Number(selected));
        }
        // 각 자리수에 쓸 숫자를 선택한다 (idx)
        // 0번째 자리수부터 각 자리수마다 numbers의 모든 숫자를 사용한다.
        // string으로 저장해 상태 관리를 쉽게 한다.
        for (let i = 0; i < numbers.length; i++) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            permutationDFS(selected + numbers[i], idx + 1, maxSize);
            visited[i] = false;
        }
    };

    // 2. 가능한 모든 숫자를 생성한다.
    // maxSize = 선택할 자리수 (2자리, 3자리, ...)
    for (let maxSize = 1; maxSize <= numbers.length; maxSize++) {
        permutationDFS("", 0, maxSize);
    }

    // 3. 생성된 것들에 대해 소수 여부로 필터링 후 개수 반환
    return [...allCombinations].filter(prime).length;
}
