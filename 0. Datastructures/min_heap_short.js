// 코테용 짧은 버전.
// 변수명을 축약했고, class 쓰면 this 때문에 길어져서 생략함
export function MinHeapShort(_comp) {
    const f = Math.floor;
    const arr = [undefined];
    const comp = _comp ?? ((a, b) => a - b);

    const push = (item) => {
        arr.push(item);
        let c = arr.length - 1;
        while (c > 1) {
            const p = f(c / 2);
            if (comp(arr[c], arr[p]) >= 0) break;
            [arr[c], arr[p]] = [arr[p], arr[c]];
            c = p;
        }
    };

    const pop = () => {
        if (arr.length === 1) return;
        const minVal = arr[1];

        // NOTE: 주의<!> length=1일 때는 바로 반환해야 함.
        const last = arr.pop();
        if (arr.length === 1) return minVal;
        arr[1] = last;
        let i = 1;

        while (true) {
            const l = i * 2,
                r = i * 2 + 1;
            let min = i;
            if (l < arr.length && comp(arr[l], arr[min]) < 0) min = l;
            if (r < arr.length && comp(arr[r], arr[min]) < 0) min = r;
            if (min === i) break;
            [arr[min], arr[i]] = [arr[i], arr[min]];
            i = min;
        }
        return minVal;
    };

    const isEmpty = () => arr.length === 1;

    return {
        isEmpty,
        push,
        pop,
    };
}
