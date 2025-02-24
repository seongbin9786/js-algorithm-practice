var mergeTwoLists = function (list1, list2) {
    const mergedHead = new ListNode(-1, null);
    let mergedTail = mergedHead;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            mergedTail.next = list1;
            list1 = list1.next;
        } else {
            mergedTail.next = list2;
            list2 = list2.next;
        }
        mergedTail = mergedTail.next;
    }

    mergedTail.next = list1 ?? list2;

    return mergedHead.next;
};
