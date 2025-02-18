/*
[문제]
- (begin) 문자열에서 (target) 문자열로 변환하는 가장 짧은 과정을 반환
- 한 번에 하나의 알파벳만 변경 가능
- words에 있는 단어로만 변경 가능
- 모든 단어의 길이 동일
- 단어 개수 <= 50
- begin != target
- 반환할 수 없는 경우, 0 반환

[해결 방법]
- 별도의 조건 없이 최단 경로이므로 BFS를 사용
- 방문 가능한 대상을 words에서 추출
- 각각을 방문
- 최적화 포인트: 이미 방문한 문자열을 재방문하면 최단 경로가 아님
- BFS로 갔다가 막다른 길일 수도 있지 않나?
- "일단 가면 무조건 답을 찾는데, 그 중 최단 경로"인 문제여야 BFS를 쓰지.
- 이거는 막 갔다가는 다 못 쓰고 되돌아와야 할 수도 때문에 BFS 불가능일 듯
- 백트래킹으로 풀면 어떻게? 도달할 때마다 min 갱신하는 수밖에 없을 듯
 */
const isOneLetterDifferent = (a, b) => {
    let differentLetters = 0;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            if (differentLetters === 1) {
                return false;
            }
            differentLetters++;
        }
    }

    return differentLetters === 1;
};

const solution = (begin, target, words) => {
    let minMoves = Infinity;

    let reached = false;
    let moves = 0;
    const visitedWords = new Set();
    const transferToNextWord = (currWord) => {
        if (currWord === target) {
            reached = true;
            minMoves = Math.min(minMoves, moves);
        }
        words.forEach((word) => {
            if (!isOneLetterDifferent(currWord, word)) {
                return;
            }
            if (visitedWords.has(word)) {
                return;
            }
            visitedWords.add(word);
            moves++;
            transferToNextWord(word);
            visitedWords.delete(word);
            moves--;
        });
    };

    transferToNextWord(begin);

    return reached ? minMoves : 0;
};
