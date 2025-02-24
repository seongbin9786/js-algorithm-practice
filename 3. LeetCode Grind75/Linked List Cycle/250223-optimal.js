/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let turtlePos = head;
    let rabbitPos = head?.next;

    // node가 최소 2개 있고, 여기서 cycle이 있으면 3번째 노드는 항상 존재
    while (rabbitPos?.next) {
        turtlePos = turtlePos.next;
        rabbitPos = rabbitPos.next.next;

        if (turtlePos === rabbitPos) {
            return true;
        }
    }

    return false;
};
