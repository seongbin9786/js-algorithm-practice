import * as util from "util"; // has no default export
import { describe, it, assert } from "vitest";

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

function parseList(str) {
    const nodes = str.split(",").map((val) => new ListNode(Number(val)));
    if (nodes.length === 0) return new ListNode();

    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    return nodes[0];
}

function stringifyList(node) {
    const visited = new Set();

    const result = [];
    while (node) {
        if (visited.has(node)) {
            throw new Error(
                "cycle in the requested list:" + util.inspect(node)
            );
        }
        visited.add(node);
        result.push(node.val);
        node = node.next;
    }
    return result.join(",");
}

function showLinkes(head) {
    let str = `[${head?.val}]`;
    head = head?.next;

    while (head) {
        str += `->[${head.val}]`;
        head = head.next;
    }

    return str;
}

describe("Merge Two Sorted Lists", () => {
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

    it("[1,3] + [2] = [1,2,3]", () => {
        const expected = stringifyList(parseList("1,2,3"));
        const list1 = parseList("1,3");
        const list2 = parseList("2");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[2] + [1,3] = [1,2,3]", () => {
        const expected = stringifyList(parseList("1,2,3"));
        const list1 = parseList("2");
        const list2 = parseList("1,3");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,2] + [3] = [1,2,3]", () => {
        // 구현 방법: 2 < 3 이므로, 3을 1,2 사이에 넣지 않고, 기존 리스트를 유지
        // 추가 조건: list1Next && list1Next.val < list2.val
        const expected = stringifyList(parseList("1,2,3"));
        const list1 = parseList("1,2");
        const list2 = parseList("3");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[3] + [1,2] = [1,2,3]", () => {
        /*
            구현 방법:
            [2] vs [3,4] 일 때, [2] -> [3] -> null 이 되어버리므로, 조건부로 할당해야 함.
            if (list1Next) {
                list2.next = list1Next; // <--- 조건부로 실행해야 함.
            }
        */
        const expected = stringifyList(parseList("1,2,3"));
        const list1 = parseList("3");
        const list2 = parseList("1,2");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,2] + [3,4] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("1,2");
        const list2 = parseList("3,4");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,3] + [2,4] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("1,3");
        const list2 = parseList("2,4");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[0] + [0] = [0,0]", () => {
        /*
        뒤에 [0]이 안나옴.
        구현 방법:
        둘이 값이 같은 경우에, head 순서와 그 아래 분기가 달라서 반대편 리스트에 append가 되어서, 조건을 일치시켜줌 (그동안 반대였음)
        const head = list1.val <= list2.val ? list1 : list2;
        */
        const expected = stringifyList(parseList("0,0"));
        const list1 = parseList("0");
        const list2 = parseList("0");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[0,0] + [0,0] = [0,0,0,0]", () => {
        const expected = stringifyList(parseList("0,0,0,0"));
        const list1 = parseList("0,0");
        const list2 = parseList("0,0");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,3] + [2,4] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("1,3");
        const list2 = parseList("2,4");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,2,3,4,5] + [2,3,4,5,6] = [1,2,2,3,3,4,4,5,5,6]", () => {
        const expected = stringifyList(parseList("1,2,2,3,3,4,4,5,5,6"));
        const list1 = parseList("1,2,3,4,5");
        const list2 = parseList("2,3,4,5,6");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[1,2,5] + [3,4,6] = [1,2,3,4,5,6]", () => {
        const expected = stringifyList(parseList("1,2,3,4,5,6"));
        const list1 = parseList("1,2,5");
        const list2 = parseList("3,4,6");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[0,1,2,6,7,8] + [3,4,5,9,10,11] = [0,1,2,3,4,5,6,7,8,9,10,11]", () => {
        const expected = stringifyList(parseList("0,1,2,3,4,5,6,7,8,9,10,11"));
        const list1 = parseList("0,1,2,6,7,8");
        const list2 = parseList("3,4,5,9,10,11");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    // [1,3] + [2,4] = [1,2,3,4] 과는 또 다른 게 참 어렵다는 생각이 듬
    // 애초에 구현 전략을 뇌를 썼어야 하는 거 같음.
    // 어쩌면 진작에 고려했어야 할 TC임
    // 문제에 대한 이해도가 낮음을 느낌.
    it("[1,4] + [2,3] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("1,4");
        const list2 = parseList("2,3");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    // 반대 TC도 넣어봤더니 안 됨. 역시 패치 필요
    it("[2,3] + [1,4] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("2,3");
        const list2 = parseList("1,4");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    // 위/아래랑 동일 TC
    it("[7,10,10] + [8,9,9] = [7,8,9,9,10,10]", () => {
        const expected = stringifyList(parseList("7,8,9,9,10,10"));
        const list1 = parseList("7,10,10");
        const list2 = parseList("8,9,9");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it("[0,1,2,4,7,10,10] + [3,5,6,8,9,9] = [0,1,2,3,4,5,6,7,8,9,9,10,10]", () => {
        const expected = stringifyList(
            parseList("0,1,2,3,4,5,6,7,8,9,9,10,10")
        );
        const list1 = parseList("0,1,2,4,7,10,10");
        const list2 = parseList("3,5,6,8,9,9");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    /*
    list1: [[1]->[2]->[4]->[5]], list2: [[3]], head: [[1]->[2]->[4]->[5]]
    list1 -> list1.next: 2
    [loop] list1: 4 / list2: 3
    list1: [[4]->[5]], list2: [[3]], head: [[1]->[2]->[3]]
    */
    it("[1,2,4,5] + [3] = [1,2,3,4,5]", () => {
        const expected = stringifyList(parseList("1,2,3,4,5"));
        const list1 = parseList("1,2,4,5");
        const list2 = parseList("3");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    // 예외가 영원히 발생한다... why?
    /*
        list1: [[1]->[2]->[3]], list2: [[0]->[2]->[4]], head: [[0]->[2]->[4]]
        d2: 1 ListNode { val: 2, next: ListNode { val: 3, next: null } }
        p2: 2, 2
        list1: [[2]->[3]], list2: [[2]->[4]], head: [[0]->[1]->[2]->[4]]
        d: 2 ListNode { val: 4, next: null }
        p1: 3, 4
        list1: [[3]], list2: [[4]], head: [[0]->[1]->[2]->[3]]
        d: 4 null
        p1: undefined, undefined
    */
    it("[1,2,3] + [0,2,4] = [0,1,2,2,3,4]", () => {
        const expected = stringifyList(parseList("0,1,2,2,3,4"));
        const list1 = parseList("1,2,3");
        const list2 = parseList("0,2,4");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });
});

// 머리가 안 좋으니깐, 조금씩만 바꾸고 테스트 돌려봐야 함. 이것이 바로 지혜다.
// 막힌 CASE에서는 조금 더 작게 오류를 발생시키는 TC를 찾아야, 해결 방법도 간단함..
// TC를 최대한 좁혀서 오류를 만들어내고, 이후 TC를 넓혀가며 원본 TC 동작을 확인하기

/*
    list1: [[7]->[10]->[10]], list2: [[8]->[9]->[9]], head: [[7]->[10]->[10]]
    
*/
var mergeTwoLists = function (list1, list2) {
    if (!list1 || !list2) return list1 ?? list2;

    const head = list1.val <= list2.val ? list1 : list2;

    while (list1 && list2) {
        console.log(
            `list1: [${showLinkes(list1)}], list2: [${showLinkes(
                list2
            )}], head: [${showLinkes(head)}]`
        );

        // 7 vs 8
        if (list1.val <= list2.val) {
            // 10 vs 9 ... X
            if (list1.next && list1.next.val <= list2.val) {
                while (list1.next && list1.next.val <= list2.val) {
                    list1 = list1.next;
                    console.log(`list1 -> list1.next: ${list1?.val}`);
                }
                const list1Next = list1.next;
                list1.next = list2;
                list1 = list1Next;
                console.log(
                    `[loop] list1: ${list1?.val} / list2: ${list2?.val}`
                );
                continue;
            }

            // [7, 10, 10], [8, 9, 9]
            // list1Next = [10, 10]
            const list1Next = list1.next;
            // 7->8
            list1.next = list2;
            // list2 = 8 -> 9 -> [9]
            while (list1Next && list2.next && list2.next.val <= list1Next.val) {
                console.log("f,", list2.val);
                list2 = list2.next;
            }

            console.log("d:", list2.val, list2.next); // 현재 list2가 끝임.
            const list2Next = list2.next;
            if (list1Next) {
                // [9]->[10,10]
                list2.next = list1Next;
            }
            list1 = list1Next; // [10,10]
            list2 = list2Next; // null
            console.log(`p1: ${list1?.val}, ${list2?.val}`);
        } else {
            if (list2.next && list2.next.val <= list1.val) {
                while (list2.next && list2.next.val <= list1.val) {
                    list2 = list2.next;
                    console.log(`list2 -> list2.next: ${list2?.val}`);
                }
                const list2Next = list2.next;
                list2.next = list1;
                list2 = list2Next;
                console.log(
                    `[loop2] list1: ${list1?.val} / list2: ${list2?.val}`
                );
                continue;
            }

            const list2Next = list2.next;
            list2.next = list1;

            while (list1.next && list2Next && list1.next.val <= list2Next.val) {
                console.log("f2,", list1.val);
                list1 = list1.next;
            }
            console.log("d2:", list1.val, list1.next);
            const list1Next = list1.next;
            if (list2Next) {
                list1.next = list2Next;
            }
            list1 = list1Next;
            list2 = list2Next;
            console.log(`p2: ${list1?.val}, ${list2?.val}`);
        }
    }

    return head;
};
