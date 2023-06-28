const diffLetters = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diff++;
        }
    }
    return diff;
};

const solution = (begin, target, words) => {
    if (!words.includes(target)) {
        return 0;
    }

    const SIZE = words.length;

    const map = new Map();

    map.set(begin, new Set());
    for (let i = 0; i < SIZE; i++) {
        if (diffLetters(begin, words[i]) === 1) {
            map.get(begin).add(words[i]);
        }
    }

    // words에 있는 단어로만 변환할 수 있기 때문에
    // begin을 words에 넣으면 양방향이 되어버림
    // 따로 추가
    for (const word of words) {
        map.set(word, new Set());
    }

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (i === j) {
                continue;
            }
            if (diffLetters(words[i], words[j]) === 1) {
                map.get(words[i]).add(words[j]);
                map.get(words[j]).add(words[i]);
            }
        }
    }

    // 2. BFS 순회 시작
    const q = [];
    q.push({ cur: begin, moves: 0, visited: new Set() });
    while (q.length > 0) {
        const { cur, moves, visited } = q.shift();
        if (cur === target) {
            // 4. 방문 시 횟수 출력 후 종료
            return moves;
        }
        const curSet = map.get(cur);
        for (const next of curSet) {
            if (visited.has(next)) {
                continue;
            }
            q.push({
                cur: next,
                moves: moves + 1,
                // 3. visited는 각 순회 시점마다 만들기
                visited: new Set([...visited, cur]),
            });
        }
    }
};
