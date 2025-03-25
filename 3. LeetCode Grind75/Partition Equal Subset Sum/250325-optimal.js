const canPartition = function (nums) {
    const total = nums.reduce((acc, curr) => acc + curr);
    if (total % 2) return false;
    const target = total / 2;

    // 합=0이 가능하다고 초기화함
    // 합=0이 가능해야, 다른 값들을 더할 수 있음
    let sumFlag = 1n;

    // 이렇게 하려면 sumFlag는 (target+1)bit를 잡아먹는 숫자가 되어야 함.
    // int=4byte=32bit 이므로... 매우 큰 수임.
    // sumFlag = 기존 플래그
    // sumFlag << num = 기존 플래그들을 모두 num만큼 밀어냄. = 기존 값들에 num을 각각 더한 효과 (O(N) -> O(1))
    // 대박임. 10배 빨라질만함.
    for (const num of nums) sumFlag = sumFlag | (sumFlag << BigInt(num));

    // flag의 target 부분을 0번째 비트 자리로 끌고 옴
    return (sumFlag >> BigInt(target)) & 1n;
};
