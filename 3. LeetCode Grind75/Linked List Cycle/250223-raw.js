/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/*
[문제]
- visited로 쉽게 해결
- O(1) memory로 해결하려면 visited 메모리 대신 기존 값을 바꿔버리면 됨

[풀이 방법]
- 순회하면서 value를 특정 값으로 변경
- 특정 값을 한 번 다시 만나면 cycle = true
- 못 만나면 false

*/
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    while (head && head.next) {
        if (head.val === Infinity) {
            return true;
        }
        head.val = Infinity;
        head = head.next;
    }

    return false;
};
