/*
[해결 방법]
1. Backtracking으로 가장 앞 문자열을 제거하는 방식으로 해결
2. (1)에서 발생하는 중복 호출 확인
3. DP를 활용해 중복 호출을 제거해주어야 함. 또한 DP로 해결할 수 있어야 함.

[Top-down 재귀 - 중복 CASE 예시]
s = "aaaaaaa" (글자수 10 넘어가면 TLE 나옴)
- 혹은 s = “aaaaaaab”와 같이 실패할 수밖에 없는 케이스 나오면 풀스캔함.
- wordDict = ["a","aa","aaa","aaaa"]

```
a
a
aa
a
a
aaa
aa
a
a
aa
a
```

[DP 접근 방법]

[중복 문제 식별]
- slice로 반복하는 방식으로 문제를 해결하되, 중복을 제거해야 함
- 중복의 원인을 회피 = 문제 해결 방법
- 중복의 원인 = 재귀 호출을 할 때마다 모든 단어에 대해 재귀 호출을 하고, 그것이 반복됨.
    - 시간 복잡도 = slice 자체의 경우의 수 max = 입력 문자열 길이
    - O(2^n)임 (이건 나열이 아니라 계산한 거라...)
    - 각 노드는 최대 N개 만큼의 다음 노드를 가질 수 있음
        - (ex) "abcd"는 최대 "bcd", "cd", "d"를 가질 수 있음.
            - 이는 prefix로 잘라내기 때문임.
            - 즉, 길이N 문자열의 하위 호출의 개수는 최대 N-1개임 (=가능한 prefix의 개수임 = 처음부터 연속하는 부분 문자열의 모든 가능한 개수)
            - 때문에 T(n) = T(n-1) + T(n-2) + T(n-3) +... T(1)이 성립함.
            - T(n) - T(n-1) 을 해보면, T(n) = 2T(n-1)이 나오게 되며,
            - 이는 T(n) = 2^(n-1)로 유도됨 (2*2*2*2*...T(0))
- 시간 복잡도 계산에서 알 수 있듯, 더 작은 문자열에서 다시 prefix 자르기가 반복됨.
    - 더 작은 prefix로 자르면 이후 계산량이 많아짐. (ex) bcd
        - 결국 여기서는 abcd,bcd,cd,d 계산을 다 함.
    - 더 큰 prefix로 잘라도 계산을 또 함. (ex) cd
        - c, d
    - 어디서 뭘 해도 계속 다시 함.

[최적 구조 확인]
- 중복 구조는 식별됨. 만약 이를 해결할 수 있는 최적 구조가 있다면, DP로 이 문제를 최적화할 수 있음.
- 어떻게 위 문제를 모델링해서, 반복을 제거할 수 있을까?
    - DP에서는 이걸 시작 지점으로 봄.
    - start=0, start=1, start=2, start=3, ... start=length-1
        - 여기서 wordDict에 있으면, 그 길이에 해당하는 start를 유효하게 만듬.
            (ex) start=0 = TRUE
                - [start=1] start=0 TRUE이므로, 길이=1인 게 있으면 TRUE
                - [start=2] start=0, start=1 TRUE 인 게 하나라도 있이면 길이=1,2인 게 있으면 TRUE
                - [start=2] start=0, start=1, start=2 TRUE인 게 하나라도 ...
                - [start=length] 가 TRUE인가? = 정답 여부
*/
var wordBreak = function (s, wordDict) {
    const wordSet = new Set(wordDict);

    const fillable = Array(s.length + 1).fill(false);
    fillable[0] = true;

    for (let startIdx = 1; startIdx <= s.length; startIdx++) {
        for (let prevStartIdx = 0; prevStartIdx < startIdx; prevStartIdx++) {
            if (
                fillable[prevStartIdx] &&
                wordSet.has(s.slice(prevStartIdx, startIdx))
            ) {
                fillable[startIdx] = true;
                break;
            }
        }
    }

    return fillable[s.length];
};
