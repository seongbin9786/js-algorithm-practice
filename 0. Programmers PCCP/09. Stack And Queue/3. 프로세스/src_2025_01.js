const solution = (priorities, location) => {
    let order = 0;
    let nextIdx = 0;
    while (true) {
        const idx = nextIdx % priorities.length;
        const currentValue = priorities[idx];
        nextIdx++;
        if (priorities[idx] === 0) {
            continue;
        }
        const maxValue = priorities.reduce((a, b) => Math.max(a, b), 0);
        if (currentValue === maxValue) {
            priorities[idx] = 0;
            order++;

            if (idx === location) {
                return order;
            }
        }
    }
};
