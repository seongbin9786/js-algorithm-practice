const solution = (clothes) => {
    const counter = new Map();
    for (const [,category] of clothes) {
        const prev = counter.get(category) || 0;
        counter.set(category, prev + 1);
    }
    let sum = 1;
    for (const [,categoryCount] of counter) {
        // 아예 안 입을 수도 있기 때문
        sum *= categoryCount + 1;
    }
    return sum - 1; // 모두 벗는 경우는 없다.
}
