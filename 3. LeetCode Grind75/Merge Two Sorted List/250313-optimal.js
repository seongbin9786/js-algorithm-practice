/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 정렬된 두 링크드리스트를 하나로 병합, 값은 증가 수열
// 병합된 링크드리스트의 헤드를 반환
// 각 리스트의 노드 개수 0 <= N <= 50
// 복사를 최소한으로 실행해 최대한 빠르게 - 수행 - 기존 리스트를 mutate
var mergeTwoLists = function (list1, list2) {
    let merged = new ListNode(null, null);
    const head = merged;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            merged.next = list1;
            list1 = list1.next;
        } else {
            merged.next = list2;
            list2 = list2.next;
        }
        merged = merged.next;
    }

    merged.next = list1 ?? list2;

    return head.next;
};
