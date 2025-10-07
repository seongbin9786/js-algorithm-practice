import { describe, test, expect } from "vitest";
import { MinHeapShort as MinHeap } from "./min_heap_short";

const basicTestCases = [
    {
        name: "기본 테스트",
        input: [5, 3, 8, 1, 2],
        expected: [1, 2, 3, 5, 8],
    },
    {
        name: "빈 배열 테스트",
        input: [],
        expected: [],
    },
    {
        name: "단일 원소 테스트",
        input: [42],
        expected: [42],
    },
    {
        name: "중복 원소 테스트",
        input: [5, 5, 3, 3, 2, 2],
        expected: [2, 2, 3, 3, 5, 5],
    },
    {
        name: "내림차순 배열 테스트",
        input: [9, 8, 7, 6, 5, 4, 3, 2, 1],
        expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
        name: "랜덤 배열 테스트",
        input: [10, 5, 15, 3, 7, 13, 17],
        expected: [3, 5, 7, 10, 13, 15, 17],
    },
    {
        name: "음수 포함 테스트",
        input: [-3, -1, -7, 0, 2],
        expected: [-7, -3, -1, 0, 2],
    },
    {
        name: "대량 원소 테스트 (내림차순 배열)",
        input: Array.from({ length: 1000 }, (_, i) => 1000 - i),
        expected: Array.from({ length: 1000 }, (_, i) => i + 1),
    },
    {
        name: "동일 값 반복 테스트",
        input: Array(50).fill(7),
        expected: Array(50).fill(7),
    },
];

describe("MinHeap 기본 테스트", () => {
    test.each(basicTestCases)("$name", ({ input, expected }) => {
        const heap = new MinHeap();

        input.forEach((num) => heap.push(num));

        const result = [];
        while (!heap.isEmpty()) {
            result.push(heap.pop());
        }

        expect(result).toEqual(expected);
    });
});

const mixedOperationsTestCases = [
    {
        name: "혼합 연산 테스트 1",
        operations: [
            { op: "push", value: 4 },
            { op: "push", value: 2 },
            { op: "pop", expected: 2 },
            { op: "push", value: 5 },
            { op: "push", value: 1 },
            { op: "pop", expected: 1 },
            { op: "pop", expected: 4 },
            { op: "pop", expected: 5 },
        ],
    },
    {
        name: "혼합 연산 테스트 2",
        operations: [
            { op: "push", value: 10 },
            { op: "push", value: 4 },
            { op: "push", value: 7 },
            { op: "pop", expected: 4 },
            { op: "push", value: 3 },
            { op: "pop", expected: 3 },
            { op: "push", value: 2 },
            { op: "pop", expected: 2 },
            { op: "pop", expected: 7 },
            { op: "pop", expected: 10 },
        ],
    },
    {
        name: "혼합 연산 테스트 3: 번갈아 push/pop",
        operations: [
            { op: "push", value: 20 },
            { op: "pop", expected: 20 },
            { op: "push", value: 15 },
            { op: "push", value: 10 },
            { op: "pop", expected: 10 },
            { op: "push", value: 5 },
            { op: "pop", expected: 5 },
            { op: "pop", expected: 15 },
        ],
    },
];

describe("MinHeap 혼합 연산 테스트", () => {
    test.each(mixedOperationsTestCases)("$name", ({ operations }) => {
        const heap = new MinHeap();

        operations.forEach((operation) => {
            if (operation.op === "push") {
                heap.push(operation.value);
            } else if (operation.op === "pop") {
                const popped = heap.pop();
                expect(popped).toBe(operation.expected);
            }
        });

        const remaining = [];
        while (!heap.isEmpty()) {
            remaining.push(heap.pop());
        }

        for (let i = 1; i < remaining.length; i++) {
            expect(remaining[i - 1]).toBeLessThanOrEqual(remaining[i]);
        }
    });
});
