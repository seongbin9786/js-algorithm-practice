const solution = (citations) => {
    return citations
        .sort((a, b) => b - a)
        .filter((value, index) => value >= index + 1).length;
};
