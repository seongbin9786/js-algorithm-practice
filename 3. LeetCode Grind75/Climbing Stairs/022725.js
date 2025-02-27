/*
[속도 개선]
- dfs로 하면 중복 계산이 많을 수 있어보인다.
- dfs에 캐싱을 넣자.

[오류]
n=4 floor
floor=0, [1]=1, [2]=1
floor=1, [2]=2, [3]=1
floor=2, [3]=2, [4]=1
floor=3, [4]=2, [5]=

아-! 이거 -1, -2에서 올라온 거 추가해줘야 됨

*/
var climbStairs = function (destination) {
    let combinations = 0;

    // 캐시 히트를 하려면 Top-down으로 dfs를 해야 되나?
    // bottom-up이 이 문제에서 더 자연스러워보이는데 그렇게 DP를 하는 방법이 있는지 모르겠음.
    // 가능할 거 같음. 그냥 이전값 + 1, 이렇게 하면 될 거 같은데?
    const cache = Array(destination + 1).fill(0);
    cache[1] = 1;
    cache[2] = 2;
    // 요거로 되나? 안 됨~ 선형적일 수가 없지.
    for (let floor = 3; floor <= destination; floor++) {
        cache[floor] = cache[floor - 1] + cache[floor - 2];
    }

    return cache[destination];
};
