const solution = (clothes) => {
    const clothesPerCategory = {};

    clothes.forEach(([cloth, category]) => {
        if (clothesPerCategory[category] === undefined) {
            clothesPerCategory[category] = 1;
        } else {
            clothesPerCategory[category]++;
        }
    });

    let sum = 1;
    Object.values(clothesPerCategory).forEach((categoryLength) => {
        sum *= categoryLength + 1;
    });

    return sum - 1;
};
