const fs = require("fs");
const [N, ...numbers] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(/\s/)
    .map(Number);

const tree = new Map();
for (let i = 0; i < numbers.length; i += 3) {
    const [value, left, right] = [i, i + 1, i + 2].map((i) => numbers[i]);
    tree.set(value, { left, right });
}

let up = 0;
let down = 0;

// 중위 순회 자체는 쉽습니다.
const inorderTraverse = (node, hasRight) => {
    const { left, right } = tree.get(node);
    if (left > 0) {
        down++;
        inorderTraverse(left);
        up++;
    }
    if (right > 0) {
        down++;
        inorderTraverse(right);
        up++;
    }
};

inorderTraverse(1);

// case:
//  1->2    [나]
//  1->2->1 [정답]
//   1
// 2

// 3down, 3up
//    1
//   2
//  3 6
// 4 5

// 3down 3up (falsyRightUps = 3)
// 1
//  2
//   3
//  5 4

// TODO: falsyRightUps 제거 가능
// 우측 노드의 틀린 되돌아오기 횟수를 제거하기
// root 우측에서 직진해서 root로 돌아오는 경로는 모두 거짓입니다.
// 나머지는 모두 유효합니다. left->node 경로이기 때문입니다.
// 즉 right->node 식으로 쭉 root까지 오는 경우만 거짓이므로,
// 반대로 root에서 right로 쭉 내려가는 case만 제거하면 됩니다.
let falsyRightUps = 0;
let cur = 1;
while (true) {
    const { right } = tree.get(cur);
    if (right < 0) {
        break;
    }
    cur = right;
    falsyRightUps++;
}

console.log(up + down - falsyRightUps);
