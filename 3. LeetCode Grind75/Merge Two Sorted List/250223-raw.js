/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
/*
[문제]
- 두 linked list 가 주어짐
- 중복 값 가능한 증가수열로 구성됨

[해결]
- linked list를 잘 꿔서 하나로 만들어야 함
*/
const copyNode = (originalNode) => new ListNode(originalNode.val, null);

const copyAndInsert = (tail, originalNode) => {
    const nextNode = copyNode(originalNode);
    tail.next = nextNode;
    return tail.next;
};

var mergeTwoLists = function (list1, list2) {
    const mergedHead = new ListNode(-1, null);
    let mergedTail = mergedHead;

    while (list1 || list2) {
        if (!list2) {
            mergedTail = copyAndInsert(mergedTail, list1);
            list1 = list1.next;
        } else if (!list1) {
            mergedTail = copyAndInsert(mergedTail, list2);
            list2 = list2.next;
        } else {
            if (list1.val < list2.val) {
                mergedTail = copyAndInsert(mergedTail, list1);
                list1 = list1.next;
            } else {
                mergedTail = copyAndInsert(mergedTail, list2);
                list2 = list2.next;
            }
        }
    }

    return mergedHead.next;
};
