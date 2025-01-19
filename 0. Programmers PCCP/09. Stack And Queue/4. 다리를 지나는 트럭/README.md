# 다리를 지나는 트럭

## 문제 개요

-   문제 유형: 큐
-   문제 난도: 프로그래머스 Lv2, 54% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42583

### 문제 핵심 요약

-   무게와 대수 제한이 있는 다리를 n대의 트럭이 주어진 순서대로 지나가야 한다.
-   다리를 지나는데는 다리 길이 \* 1초가 걸린다.
-   전부 다 지나가는데 걸리는 시간(초 단위) = ?

### 문제 입출력

-   입력 값: 다리 길이, 허용 무게, 각 트럭의 무게 배열
-   출력 값: 이동에 걸리는 총 시간

## 문제 해설

-   문제 해결책 설명
-   수도 코드
-   사용 단위 알고리즘 종류
-   사용 단위 알고리즘 구현
-   문제 해결 코드

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 시뮬레이션

-   선형 순회로 충분하다. (10,000 \* 10,000 = 1억)
-   1초 단위로 for문을 돌면서 시뮬레이션한다.
    -   1초 단위는 비효율적이다.
        -   다리 진입/진출 시점마다 for문을 돌면 된다.
            -   다리의 가장 앞 트럭 진출 시
            -   다리에 여유가 생겨 신규 트럭 진입 시
-   모든 트럭이 건너간 시점을 반환한다.

### 2. 수도 코드

#### 2-1. 수도 코드 시도 1

1. 모든 트럭에 대해 순회하는 것으로 신규 트럭의 순번을 보관한다.
2. 다리 맨 앞의 트럭이 나갈 수 있는지 확인한다.
    - 만차일 때는 맨 앞 트럭을 빼내고, 시간을 갱신한다.
    - 만차가 아닐 때는 시간을 1초만 추가하고, 트럭이 빠질 시간이라면 빼준다.
        - 언제 이런 케이스가 발생함?
            - 다리 길이=100, 다리 무게=무한, 트럭=1대를 t=1에 넣었을 때, t=101까지 갈 게 아니라, t=2에서 신규 트럭을 추가해야 한다.
                - 동시에 t=1에서 100대를 넣을 순 없다.
                    - 칸 개념이 있기 때문에, 100대를 넣으려면 t=100이 걸린다.
                    - 즉, 1초에는 한 대만 추가 가능
3. 다리에 신규 트럭을 추가한다. (항상 추가할 수 있다.)
    - 신규 트럭의 진입 시점을 보관한다.
    - 다리의 점유 시간, 점유 무게를 갱신한다.

#### 2-2. 수도 코드 시도 2

-   1초씩 시뮬레이션하되, 다리가 만차일 때만 앞차를 빠르게 빼내기 위해 fast forward 한다.
-   1초 단위의 시뮬레이션은 구현이 쉽다.

1. 1초 단위 반복문으로 시뮬레이션한다.
2. 각 반복에 대해 (t=0,...)
    - 진입할 차, 다리에 차가 모두 없으면 반복을 종료한다.
    - 모든 차를 한 칸씩 전진시킨다.
        - 필요성: 이미 만차일 수도 있기 때문에, 먼저 진출시켜야 한다.
        - 예외처리: 다리 위의 모든 차는 항상 최소 1회 전진할 수 있다. (다리 길이 >= 1)
    - 맨 앞 차가 진출한 경우 다리에서 제거한다.
        - "마지막 차 진출 시각"을 갱신한다.
    - 다리에 진입할 수 있고, 진입할 차가 있는 경우, 1대를 진입시킨다.
3. 반복문이 끝나면 "마지막 차 진출 시각"을 반환한다.

### 3. 사용 단위 알고리즘 종류

-   큐

### 4. 사용 단위 알고리즘 구현

-   (JS 내장 배열 사용)

### 5. 단위 알고리즘 활용 코드

#### 5-1. 시도 1

-   index를 계산해서 shift() 사용을 회피하는 시도이다. (포기)

```js
const solution = (bridgeLength, bridgeMaxWeight, truckWeights) => {
    let lastExitTime = 0;
    let now = 0;

    const onBoardTime = []; // 진입한 시각을 기록
    let firstTruckOnBridge = 0;
    let currWaitTruck = 0;
    let currBridgeWeight = 0;

    // 조건이 뭔가 너무 어려움.
    // 원인: 배열을 pop하지 않고 index로 접근하기 때문에?
    while (true) {
        // 진입할 차, 다리에 차가 모두 없으면 반복을 종료한다.
        // 조건을 모르겠다.
        // 마지막 차만 남은 경우
        // 아 너무 어려운데? 시나리오가 여러가지여서 머리가 아프다.
        //
        if (
            currWaitTruck === truckWeights.length &&
            firstTruckOnBridge === currWaitTruck
        ) {
            break;
        }

        // 맨 앞 차가 진출 가능하다면 진출시킨다.
        if (now - onBoardTime[firstTruckOnBridge] === bridgeLength) {
            currBridgeWeight -= onBoardTime[firstTruckOnBridge];
            lastExitTime = now;
            firstTruckOnBridge++;
        }

        // 진입할 수 없는 무게이면 대기해야 한다.
        // 맨 앞 차를 진출시키기 위해 fast-forward한다.
        if (bridgeMaxWeight - currBridgeWeight < truckWeights[currWaitTruck]) {
            const timeToFastForward =
                bridgeLength - (now - onBoardTime[firstTruckOnBridge]);
            now += timeToFastForward;
            continue;
        }

        // 진입할 차가 존재한다면, 새 차를 진입시킨다.
        if (currWaitTruck < truckWeights.length) {
            onBoardTime.push(now);
            currBridgeWeight += truckWeights[currWaitTruck];
        }

        // now 갱신
        now++;
    }

    return lastExitTime;
};
```

#### 5-2. 시도 2

-   코드를 단순하기 만들기 위해 array.shift를 사용했다.

```js
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
```

##### 직접 실행

```text
[입력]
bridgeLength = 2
bridgeMaxWeight = 10
truckWeights = [ 7,4,5,6 ]

[상태]
lastExitTime = 0
now = 0
currBridgeWeight = 0
waitingTrucksWeight = [ 7,4,5,6 ]
trucksOnBridge = []

while (4>0 || 0>0)
    now 1
    if(0>0){}
    if(4>0) trucksOnBridge=[{7,1}]
    waitingTrucksWeight=[4,5,6]
    currBridgeWeight=0+7=7

while(3>0||1>0)
    now=2
    if(1>0){
        headTruckLeavesAt=1+2=3
        bridgeAvailableWeight=10-7=3
        if(4>3){
            now=3
        }
        if(3=3){
            currBridgeWeight=7-7=0
            lastExitTime=3
            trucksOnBridge=[]
        }
    }
    if(3>0){
        trucksOnBridge=[{4,3}]
        waitingTrucksWeight=[5,6]
        currBridgeWeight=0+4=4
    }

while(2>0||1>0)
    now=4
    if(1>0){
        headTruckLeavesAt=3+2=5
        bridgeAvailableWeight=10-4=6
        if(5>6){}
        if(4=5){}
    }
    if(2>0){
        trucksOnBridge=[{4,3},{5,4}]
        waitingTrucksWeight=[6]
        currBridgeWeight=4+5=9
    }

while(1>0||2>0)
    now=5
    if(2>0){
        headTruckLeavesAt=3+2=5
    }
    if(6>1){
        now=5
    }
    if(5=5){
        currBridgeWeight=9-4=5
        lastExitTime=5
        trucksOnBridge=[{5,4}]
    }
    if(1>0){
        //무게제한으로대기필요
    }

while(1>0||1>0)
    now=6
    if(1>0){
        headTruckLeavesAt=4+2=6
    }
    if(6>5){
        now=6
    }
    if(6=6){
        currBridgeWeight=6-6=0
        lastExitTime=6
        trucksOnBridge=[]
    }
    if(1>0){
        //무게제한안걸림
        if(6>10){}
        trucksOnBridge=[{6,6}]
        waitingTrucksWeight=[]
        currBridgeWeight=0+6=6
    }

while(0>0||1>0)
    now=7
    if(1>0){
        headTruckLeavesAt=6+2=8
        if(0)
    }
```

-   이걸 작성해보면서, 1가지 실수를 발견했다.

    -   `waitingTrucksWeight[0] > bridgeAvailableWeight` 계산 시 `waitingTrucksWeight.length = 0`일 수 있는데, 이 경우 예외처리해야한다.

-   제출했더니, TC가 틀렸다.
    -   6이 진입할 때 now=6이 아니라 now=4인 상태로 들어가게 되었다.
        -   원인: 아래 라인의 순서가 바뀌어서, weight 제한 계산이 잘못되고 있었다.
            ```js
            currBridgeWeight += waitingTrucksWeight[0];
            waitingTrucksWeight.shift();
            ```

#### 5-3. 완성 코드

```js
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
```

### 6. 배운 점

-   처음부터 1초마다 시뮬레이션하지 않고 했는데, 되게 어렵게 느껴졌다.
-   수도 코드를 작성할 때는 처음부터 완성본을 작성하려고 하지 않아야겠다고 생각이 들었다.
    -   분기를 판단하는데 1분 이상 걸리고, 그것이 불명확하다면 무조건 그림이나 표로 TC 만들어야 한다고 생각이 들었다.
    -   문제를 쉽게 보고 시간만 날리면 손해다.
-   코드 설명도 요약 + 발전 과정 식으로 서술하면 좋을 것 같다.
-   index 계산이 예상보다 코드가 복잡해져서 결국 shift() 사용했다. 확실히 쉽게 짜고 성능 개선하는 게 나을 것 같다.
-   컴파일 없이 직접 코드를 실행해보았다. 생각보다 오래 걸렸지만, 일단 해본 것에 의의를 둔다.
-   직접 머리로 코드를 실행해보았다고 해도 코드 라인 순서가 바뀐 걸 인지하지 못 했다..
-   직접 머리로 실행하면서 예외조건을 찾았는데, 이런 예외 조건 자체를 찾으려면 좀 간단해야 누락 없이 찾기가 가능한 것 같다.
