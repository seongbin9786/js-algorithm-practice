// 전부 비교해봐야 함
const findClosestParentIdx = (child, parentCandidates) => {
  const { x, y } = child;
  let minDistance = 999999;
  let closestParent = null;

  for (const candidate of parentCandidates) {
    const { x: cx, y: cy } = candidate;
    if (y === cy) {
      continue;
    }

    const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    if (minDistance > distance) {
      const connectToLeft = candidate.x > child.x && !candidate.left;
      const connectToRight = candidate.x < child.x && !candidate.right;
      // 이미 자식이 연결되어 있는 경우 확인
      if (connectToLeft || connectToRight) {
        minDistance = distance;
        closestParent = candidate;
      }
    }
  }
  return closestParent;
}

const buildTree = (nodeinfo) => {
  const sortedNodes = nodeinfo.sort(
    // y 좌표가 컴퓨터 배열과 다름
    ({ x: ax, y: ay }, { x: bx, y: by }) => by === ay ? ax - bx : by - ay
  );

  const rootNode = sortedNodes[0];
  console.log(`creating node: No.${rootNode.n} (${rootNode.y}, ${rootNode.x})`);

  // 어떻게 만들지? 반환해야 하는 건 rootNode. 이걸로 전위, 후위 순회하면 되니까.
  for (let childIdx = 1; childIdx < sortedNodes.length; childIdx++) {
    const child = sortedNodes[childIdx];
    const { n, x, y } = child;
    console.log(`creating node: No.${n} (${y}, ${x})`);

    // 부모 결정
    const parent = findClosestParentIdx(child, nodeinfo.slice(1, childIdx));
    console.log(`im: ${child.n}, my parent: ${parent.n}`);

    // 부모와 연결
    if (parent.x < child.x) {
      if (parent.right) {
        throw new Error('bad parent');
      }
      parent.right = child;
    } else {
      if (parent.left) {
        throw new Error('bad parent');
      }
      parent.left = child;
    }
  }

  return rootNode;
}

// 전위 순회
const firstTraverse = (node, visited) => {
  if (node === null) {
    return;
  }

  visited.push(node.n);
  firstTraverse(node.left, visited);
  firstTraverse(node.right, visited);
}

// 후위 순회
const lastTraverse = (node, visited) => {
  if (node === null) {
    return;
  }

  lastTraverse(node.left, visited);
  lastTraverse(node.right, visited);
  visited.push(node.n);
}

/**
 * @param {number[][]} nodeinfo 이진트리를 구성하는 각 노드의 좌표 배열의 배열
 * @returns {number[][]} 전위 순회, 후위 순회한 각 노드 번호의 배열의 배열
 */
const solution = (nodeinfo) => {
  const namedNodes = nodeinfo.map(([x, y], i) => ({
    n: i + 1,
    y,
    x,
    left: null,
    right: null,
  }));

  const tree = buildTree(namedNodes);
  const firstTraversed = [];
  const lastTraversed = [];

  firstTraverse(tree, firstTraversed);
  lastTraverse(tree, lastTraversed);

  return [firstTraversed, lastTraversed];
}

const result = solution([[5, 3], [11, 5], [13, 3], [3, 5], [6, 1], [1, 3], [8, 6], [7, 2], [2, 2]]);
console.log(result);
