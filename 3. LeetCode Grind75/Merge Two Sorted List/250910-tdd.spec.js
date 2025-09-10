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

    it("[1,4] + [2,3] = [1,2,3,4]", () => {
        const expected = stringifyList(parseList("1,2,3,4"));
        const list1 = parseList("1,4");
        const list2 = parseList("2,3");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it.skip("[7,10,10] + [8,9,9] = [7,8,9,9,10,10]", () => {
        const expected = stringifyList(parseList("7,8,8,9,9,10,10"));
        const list1 = parseList("7,10,10");
        const list2 = parseList("8,9,9");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });

    it.skip("[0,1,2,4,7,10,10] + [3,5,6,8,9,9] = [0,1,2,3,4,5,6,7,8,9,9,10,10]", () => {
        const expected = stringifyList(
            parseList("0,1,2,3,4,5,6,7,8,9,9,10,10")
        );
        const list1 = parseList("0,1,2,4,7,10,10");
        const list2 = parseList("3,5,6,8,9,9");
        const result = mergeTwoLists(list1, list2);
        assert.equal(stringifyList(result), expected);
    });
});

// 머리가 안 좋으니깐, 조금씩만 바꾸고 테스트 돌려봐야 함. 이것이 바로 지혜다.
// 막힌 CASE에서는 조금 더 작게 오류를 발생시키는 TC를 찾아야, 해결 방법도 간단함..
// TC를 최대한 좁혀서 오류를 만들어내고, 이후 TC를 넓혀가며 원본 TC 동작을 확인하기

/*
    [1,4] + [2,3] = [1,2,3,4]

    1
    2,3
    4
    이어야 하는데,
    1,2,4가 나옴

    흠.. 코드가 복잡해짐
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

        if (list1.val <= list2.val) {
            if (list1.next && list1.next.val < list2.val) {
                while (list1.next && list1.next.val < list2.val) {
                    list1 = list1.next; // [1,2,5] 중 [2]까지만 이동. [5]가 되면 난처함.
                    console.log(`list1 -> list1.next: ${list1?.val}`);
                }
                const list1Next = list1.next;
                list1.next = list2; // head를 잇기 위해 list1->list2를 이어줌. ([1,2] -> [3,4,6])
                list1 = list1Next; // list1은 [5]로 이동함.
                console.log(
                    `[loop] list1: ${list1?.val} / list2: ${list2?.val}`
                );
                continue;
            }

            const list1Next = list1.next; // 10->10
            list1.next = list2; // 7->[8-9-9] (head 상황)

            const list2Next = list2.next; // 9->9
            if (list1Next) {
                // list2=[8]인데, list1Next=[10->10]을 달게 됨. 문제는 8->9->9 라서, 9->9가 사라지게 됨.
                // HOW TO FIX: 10->10을 달기 전에, 그보다 작은 값이 있다면 fast-forward 해줘야 할까? 맞긴한듯?
                // 이렇게 그냥 붙이는 건 기본값임.
                // 이번 경우는 분기를 해줘야 함.
                list2.next = list1Next;
            }
            list1 = list1Next; // 10->10
            list2 = list2Next; // 9->9 <-- 이걸 안 하면 되긴 함. / 안 할 수는 없네...
        } else {
            if (list2.next && list2.next.val < list1.val) {
                while (list2.next && list2.next.val < list1.val) {
                    list2 = list2.next;
                    console.log(`list2 -> list2.next: ${list2?.val}`);
                }
                const list2Next = list2.next; // undef
                list2.next = list1; // [9->9]->[10->10]
                list2 = list2Next;
                console.log(
                    `[loop2] list1: ${list1?.val} / list2: ${list2?.val}`
                );
                continue;
            }

            const list2Next = list2.next;
            list2.next = list1;

            const list1Next = list1.next;
            if (list2Next) {
                list1.next = list2Next;
            }
            list1 = list1Next;
            list2 = list2Next;
        }
    }

    return head;
};
