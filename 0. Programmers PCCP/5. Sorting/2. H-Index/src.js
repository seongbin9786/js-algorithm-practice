const solution = (citations) => {
    const sortedDesc = citations.sort((a, b) => b - a);
    
    for (let papers = 0; papers < sortedDesc.length; papers++) {
        if (sortedDesc[papers] > papers) {
            continue;
        }
        return papers;
    }
    return sortedDesc.length;
}