const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [N, ...numbers] = input.split(/\s/).map(Number);

// 각 Node의 부모를 0으로 초기화
const parentOfNodes = new Array(N + 1).fill(0);

// 인접 배열 생성
const connectedNodes = [...new Array(N + 1)].map(() => []);
for (let i = 1; i < N; i++) {
    connectedNodes[numbers[i * 2 - 2]].push(numbers[i * 2 - 1]);
    connectedNodes[numbers[i * 2 - 1]].push(numbers[i * 2 - 2]);
}

// DFS
const setParentOfChildren = (parent) => {
    const children = connectedNodes[parent];
    for (const child of children) {
        if (parentOfNodes[child] > 0) {
            continue;
        }
        parentOfNodes[child] = parent;
        setParentOfChildren(child);
    }
};

// 1번 노드부터 탐색하면서 부모-자식 관계 설정
setParentOfChildren(1);

// 시간 초과
// for (let i = 2; i <= N; i++) {
//   console.log(parentOfNodes[i]);
// }

console.log(parentOfNodes.slice(2).join("\n"));
