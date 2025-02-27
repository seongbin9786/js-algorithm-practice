/*
[문제]
- 걍 heap 구현인데?
- 엥 ? constant time...?
- how?
- 뭐냐 이거
- 이거 되는 거냐
- 정렬- 사라졋냐?
- 아 근데 가능할 거 같음


[해결 방법]
- LinkedList 느낌으로 가능할 거 같은데 -?
- 어차피 랜덤엑세스 안해도 되니깐
- 아 근데 이러면 구현 좀 걸릴 거 같은데 방법 없나?
- 링크드로 구현하려면 어떻게?
    - minPos 갖기
    - 어라? 중간 삽입은요? 아 개애매한데
    - 불가능함 이거
- N개 쌓이면 결국 정렬해야 되는데?
- (ex)
     5 7 3 6 2 1 8 이렇게 오면?
[list]
5
5-7
3-5-7

여기에 6이 들어오면? 리스트 순회가 필요해짐.
아 뭐야? 그냥 스택 + min 값만 유지인가?

~17:07 모르겠는데...? 결국 min list가 있어야 할텐데? 흠

뭐가 됐든, 빨라지려면 time complexity를 희생해야 될 것이다.

min value를 트래킹하는 건 O(1)
그 다음의 min value를 알 수는 없음
흠... [ 1, 2, 3, 4, 5 ]
Tree ?
그냥 보고 배우는 게 낫겠는데?

----
GPT한테 물어봤음.

방법 1. stack에 min도 쌓는 방식 - 굳이 Node 필요 없음. (value, minValue) 튜플이면 충분함
- 어차피 prevMin, nextMin 2개만 비교하면 되니까 스택으로 충분함

*/
class MinStack {
    constructor() {
        this.stack = [];
    }

    push(value) {
        const minValue = this.stack.length > 0 ? this.getMin() : Infinity;
        this.stack.push([value, Math.min(minValue, value)]);
    }

    pop() {
        if (!this.stack.length) return;
        return this.stack.pop()[0];
    }

    top() {
        if (!this.stack.length) return;
        return this.stack[this.stack.length - 1][0];
    }

    getMin() {
        if (!this.stack.length) return;
        return this.stack[this.stack.length - 1][1];
    }
}
