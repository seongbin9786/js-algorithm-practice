/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/*
[문제]
- 링크드리스트를 뒤집어야 함

[해결 방법]
- 한 바퀴만 도는 게 좋겠음~
*/
var reverseList = function (head) {
    let reverseHead = null;
    let curr;

    let pos = head;
    while (pos) {
        // 현재 노드를 복사
        curr = pos;

        // 다음 노드로 이동
        pos = pos.next;

        // 기존 노드를 직접 수정해도 괜찮음.
        // 이미 pos는 다음 노드를 가리키기 때문.
        // 역방향 가리키기 할당
        curr.next = reverseHead;

        // reverseHead는 끝 노드까지 전진
        reverseHead = curr;
    }

    return reverseHead;
};
