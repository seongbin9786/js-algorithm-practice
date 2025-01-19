const solution = (bridgeLength, bridgeMaxWeight, truckWeights) => {
    let lastExitTime = 0;
    let now = 0;

    let currBridgeWeight = 0;

    const waitingTrucksWeight = [...truckWeights];
    const trucksOnBridge = [];

    // 반복 종료 조건: 진입할 차, 다리에 차가 모두 없을 때
    while (waitingTrucksWeight.length > 0 || trucksOnBridge.length > 0) {
        // 다리 길이=2인 다리를 처음 건너는 트럭은 t=3에 다리를 건넌 상태가 된다.
        // onBoardAt = 0이 아닌 1이어야, 1+2(bridgeLength)=3에 다리를 건넌 상태가 된다.
        now++;

        // 다리의 선두 차량 처리: 다리에 트럭이 있을 때만 실행
        if (trucksOnBridge.length > 0) {
            const headTruckLeavesAt =
                trucksOnBridge[0].onBoardAt + bridgeLength;

            // 무게 제한으로 진입 불가능 CASE
            // 진입할 수 없는 무게이면 진입 불가하므로, 맨 앞 차를 진출시키기 위해 fast-forward
            // 매 루프마다 직전 진입으로부터 시간이 적어도 1초 흐른 시점이므로, 무조건 적어도 1칸이 존재
            const bridgeAvailableWeight = bridgeMaxWeight - currBridgeWeight;
            if (
                waitingTrucksWeight.length === 0 ||
                waitingTrucksWeight[0] > bridgeAvailableWeight
            ) {
                now = headTruckLeavesAt;
            }

            // 맨 앞 차가 진출 가능하다면 진출
            if (now === headTruckLeavesAt) {
                currBridgeWeight -= trucksOnBridge[0].weight;
                lastExitTime = now;
                trucksOnBridge.shift();
            }
        }

        // 진입할 차가 존재한다면, 새 차를 진입시킨다.
        if (waitingTrucksWeight.length > 0) {
            // 무게 제한에 걸리면 다음 루프에서 처리
            const bridgeAvailableWeight = bridgeMaxWeight - currBridgeWeight;
            if (waitingTrucksWeight[0] > bridgeAvailableWeight) {
                continue;
            }

            trucksOnBridge.push({
                weight: waitingTrucksWeight[0],
                onBoardAt: now,
            });
            currBridgeWeight += waitingTrucksWeight[0];
            waitingTrucksWeight.shift();
        }
    }

    return lastExitTime;
};
