/*
[문제]
- 모든 트럭이 다리를 건너는 최소 시간 = ?
- 조건
    - 일차선 다리를 정해진 순서로 이동
    - 최대 bridgeLength만큼 올라갈 수 있음
    - 다리는 weight 무게 제한이 있음
    - 완전히 오르지 않은 트럭의 무게는 무시 = ?
    - 각 트럭의 무게는 1 <= 무게 <= weight(다리 무게 제한)
    - 트럭 개수 <= 10,000
    - 다리 길이 <= 10,000

[해결 방법]
- 시뮬레이션으로 해결
- 조금 헷갈리는 시간 계산
    - 1초부터 다리를 지나기 시작
    - 완전히 지나가려면 1초 추가?
    - (ex) length = 2 이면, 지나갈 때까지 3초가 걸린다고 함. 
        - 0초에는 이동X, 1초에 들어가고, 2초까지 있다가, 3초에 비워짐.
        - 3초에 그래서 새 차가 함께 들어올 수 있음.
    - 결론: 1초에 차가 들어가고, 그로부터 다리 길이만큼 있어야 이동이 완료되며, 나감과 입장은 동시에 가능.
- 일단 다리 길이는 규칙 설명이 없는 것으로 보아, 최대 적재 대수와 상관 없어 보임.

[시뮬레이션 코드 시작]
- 현재 시각 = 1초부터 시작
- (대기 트럭 + 다리 위 트럭)이 없어질 때까지
    - 진출 체크
        - 다리 위 가장 앞 트럭의 (현재 시각 - 진입 시각) = (다리 길이)이면 shift
        - 다리 무게에서 제외 처리
    - 진입 체크
        - 다리 무게에 여유가 있으면 트럭을 push
        - 여유가 없으면 생략함
    - 시각 + 1
- 현재 시각 반환 (최종 진출 시점 + 1)

[코드]
- 생각보다 쉬웠다. 그래도 시뮬레이션이라 좀 복잡하다고 느껴졌다.
- 요구사항이 모호했던 부분이 제일 문제점이었던 것 같다.
*/
const solution = (bridgeLength, bridgeWeightLimit, trucksWaiting) => {
    // 1초부터 시작
    let currTime = 1;
    let onBridgeWeight = 0;
    const trucksOnBridge = [];

    while (true) {
        // 진출
        if (
            trucksOnBridge.length > 0 &&
            currTime - trucksOnBridge[0].entranceTime >= bridgeLength
        ) {
            const leavingTruck = trucksOnBridge.shift();
            onBridgeWeight -= leavingTruck.weight;

            if (trucksOnBridge.length + trucksWaiting.length <= 0) {
                break;
            }
        }

        // 진입
        if (
            trucksWaiting.length > 0 &&
            bridgeWeightLimit - onBridgeWeight >= trucksWaiting[0]
        ) {
            const upcomingTruckWeight = trucksWaiting.shift();

            onBridgeWeight += upcomingTruckWeight;
            trucksOnBridge.push({
                weight: upcomingTruckWeight,
                entranceTime: currTime,
            });
        }

        currTime++;
    }

    return currTime;
};
