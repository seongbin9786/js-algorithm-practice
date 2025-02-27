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
    let next = null;
    while (head) {
        // 1. 다음 노드를 저장
        next = head.next;

        // 2. 현재 노드의 링크 방향을 역전
        head.next = reverseHead;

        // 3. reverseHead도 함께 앞으로 전진
        reverseHead = head;

        // 4. 다음 노드로 이동
        head = next;
    }

    return reverseHead;
};
