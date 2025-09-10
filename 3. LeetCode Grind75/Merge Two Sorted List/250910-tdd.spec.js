import { describe, it, assert } from "vitest";

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

function parseList(str) {
    const nodes = str.split(",").map((val) => new ListNode(val));
    if (nodes.length === 0) return new ListNode();

    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    return nodes[0];
}

function stringifyList(node) {
    const result = [];
    while (node) {
        result.push(node.val);
        node = node.next;
    }
    return result.join(",");
}

describe.only("Merge Two Sorted Lists", () => {
    it("[] + [] = []", () => {
        const expected = stringifyList(null);

        const list1 = null;
        const list2 = null;
        const result = mergeTwoLists(list1, list2);

        assert.equal(stringifyList(result), expected);
    });

    it("[] + [0] = [0]", () => {
        const expected = stringifyList(parseList("1"));

        const list1 = parseList("1");
        const list2 = null;
        const result = mergeTwoLists(list1, list2);

        assert.equal(stringifyList(result), expected);
    });

    it("[1] + [2] = [1,2]", () => {
        const expected = stringifyList(parseList("1,2"));

        const list1 = parseList("1");
        const list2 = parseList("2");
        const result = mergeTwoLists(list1, list2);

        assert.equal(stringifyList(result), expected);
    });

    it("[2] + [1] = [1,2]", () => {
        const expected = stringifyList(parseList("1,2"));

        const list1 = parseList("2");
        const list2 = parseList("1");
        const result = mergeTwoLists(list1, list2);

        assert.equal(stringifyList(result), expected);
    });
});

var mergeTwoLists = function (list1, list2) {
    if (!list1 || !list2) return list1 ?? list2;

    if (list1.val >= list2.val) {
        list2.next = list1;
        return list2;
    } else {
        list1.next = list2;
        return list1;
    }
};
