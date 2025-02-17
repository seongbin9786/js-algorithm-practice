/*

[문제]
- info.length <= 50,000
- (개발언어, 직군, 경력, 소울푸드, 코딩테스트점수)
- 개발언어 = cpp, java, python
- 경력 = junior, senior
- 소울푸드 = chicken, pizza
- 점수 [1, 100,000]
- 공백문자로 구분

- query.length <= 100,000
- (개발언어, 직군, 경력, 소울푸드, 코딩테스트점수) 형식
- `-`을 사용해 조건 없음을 표현할 수 있음
- 코딩테스트 점수는 항상 포함

[시간복잡도 계산 및 해결 방법 도출] (~10:16)
- "몇 명인지 반환해야 함"
- 모든 원소를 매번 순회하면?
    - 50,000 * 100,000 = 50 * 100 * 1억 = 5천억
    - 5천억보다 최소 5,000배 빨라야 한다.
        - 크기에 영향을 덜 받는 알고리즘 사용 필요
- 전체 순회 없이 처리해야 함
    - query 형식이 이미 주어졌으므로, 여기에 최적화해야 함
        - (언어, 직군, 경력, 소울 푸드, 점수)
        - 검색 조건에 딱 맞게 분리하고, 미리 정렬해두면 더 줄일 수 있어보임.
            - (언어3 * 직군2 * 경력2 * 소울푸드2) = 24 종류의 리스트
            - "선택 안 함"의 경우는 특정 조건의 리스트들을 모두 확인한다는 의미
            - "특정 점수 이상"을 탐색해야 하므로, lower_bound 사용
            - (리스트의 길이 - 특정 점수 이상의 첫 원소의 위치) = 만족하는 사람 수
            - 최대 24종류의 리스트 * 이진탐색(log2(5만) < 17)
                - log2(100) < log2(128)(=7)
                - log2(5) < log2(8)(=3)
                - log2(10,000) = log2(100) + log2(100) + log2(8) < 17
                - 즉 매 조회 시 최악의 경우 대략 400번 조회
                - query = 10만개이므로, 4000천만번으로 해결 가능

[리스트 분리 방법]
- 모든 조건의 곱연산을 해서 리스트를 만들어야 함 (24개)
- 가장 쉬운 듯한 방법: 5차원 배열로 만들기
- list[lang][position][career][food]; // 점수 배열나오게
- 검증 1: any lang + pizza
- 검증 2: python + any position + senior
- 이렇게 해버리면 조회 조건이 되게 복잡함. 앞선 조건의 개수만큼 뒤에서 반복해줘야 하는 게 복잡함.
- 일종의 fetcher(?)를 만들 필요가 있어보임..
    - (잘 모르겠다. 어떻게 해야 하지?)
        - 스스로의 힘으로 IDEA를 떠올리는 게 답일까?
        - 일종의 filter를 4번 돌리기만 하면 될 거 같음
        - 리스트마다 태그를 4개씩 붙이기만 하면 되지 않음?
            - ㅇㅇ
        - tag 별 조회 가능하고
        - list 별 tag 조회 가능하고
            - (10:40 종료)

- (이게 문제 본체 같기도 하다...)
- 아니면 가능한 모든 조건으로 리스트를 만들고 push해도 됨
- 모든 조건으로 리스트 만들기(4*3*3*3=108) vs 리스트는 24개만 만들고 알아서 리스트 선택해서 조회하기
    - 4.5배 더 많아지네... 흠. 그냥 24개만 만듭시다.

[리스트 구축 재도전] (11:00 ~ 11:05)
- (답 확인) 조건을 문자열로 직렬화(?)해서, Map<string, array>로 만듬.
- info를 받으면, info가 해당할 수 있는 모든 key를 생성하고, 거기에 모두 푸시함.
    - key는 백트래킹으로 생성(-가 들어가는 모든 조합 생성 필요)
- info를 받아서 한 번에 처리할지, 별도로 먼저 모든 리스트를 만들지
- 별도로 모든 리스트를 만든다면 어떻게 만들 건데?
    - 가능은 할 거 같은데?
- 리스트 구축은 info를 순회해서 QueryList를 다 만들면 되므로 해결됨
- query 조회는 queryList에서 그냥 key로 조회하면 끝남
- list 길이 - lowerBound index만 해도 됨. 그러면 첫 원소를 포함한 개수가 딱 나옴.
*/

// 백트래킹 만드는데 엄청 오래 걸렸네.
// 처음부터 다시 학습하는 수준이었음.
// 11:05~11:20
const conditions = [
    ["cpp", "java", "python", "-"],
    ["backend", "frontend", "-"],
    ["junior", "senior", "-"],
    ["chicken", "pizza", "-"],
];

const combination = [];

const createQueryLists = (stage) => {
    if (stage === 4) {
        console.log(combination.join(""));
        return;
    }
    for (let i = 0; i < conditions[stage].length; i++) {
        combination.push(conditions[stage][i]);
        createQueryLists(stage + 1);
        combination.pop();
    }
};

// 11:20 ~ 11:33
// 백트래킹 틀 - 답안을 간단히 참조함
const applicant = ["java", "backend", "junior", "pizza"];
const combination = [];
const createPossibleQueryLists = (applicant, stage) => {
    if (stage === 4) {
        console.log(combination.join(""));
        return;
    }

    // 코드가 좀 길긴 한데... 상태를 매번 새로 생성 안 하는 게 더 빨라보임.
    combination.push(applicant[stage]);
    createPossibleQueryLists(applicant, stage + 1);
    combination.pop();
    combination.push("-");
    createPossibleQueryLists(applicant, stage + 1);
    combination.pop();
};

// 11:35 ~ 11:45 (중간에 멍 좀 때려줬음.)
const queryListMap = new Map();

// const query = "java and backend and junior and pizza 100";
queries.forEach((query) => {
    const splitted = query.split(" ");
    const score = Number.parseInt(splitted.pop(), 10);
    const queryKey = splitted.join("");
    const targetList = queryListMap.get(queryKey);
    const numberOfApplicants =
        targetList.length - lowerBound(targetList, score);

    return numberOfApplicants;
});

// 10:16 ~ 10:20 ~ 10:30 (완료)
// 잘 되는데, 더 작은 값이 없을 때 0을 반환해버리네...? -> 이건 정상임
// 더 큰 값이 없을 때는 length - 1을 반환해버리고...? -> 이건 비정상임
const lowerBound = (array, target) => {
    let low = 0;
    let high = array.length;

    // low <= high일 이유는 동일값 검사 시에만.
    // ex: [low, high=target] 자리일 때, mid=low이며, low=mid+1이 되고, low가 답이 됨.
    // high = length-1 대신 length로 두어도 되는 게,
    // target=length-1이라면 high는 계속 가만히 있을 거고, low만 올라가는 구조임.
    // low = length - 1일 때 array[mid]=target이 되므로, high=mid가 됨.
    // 즉, low=high=mid가 되고, 그대로 low를 반환함.
    // 만약, high보다 더 큰 값을 찾는 경우는 low=high=length가 되고, 루프가 종료됨.
    while (low < high) {
        // 항상 내림 처리
        const mid = Math.floor((low + high) / 2);

        // lower_bound는 target값 이상의 원소의 가장 첫 원소를 찾아야 함
        // 즉, target 값 미만으로는 절대 가면 안 되며,
        // target 값 이상의 원소는 항상 탐색 범위에 남겨두어야 함
        if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
};

const solution = (applicants, queries) => {};
