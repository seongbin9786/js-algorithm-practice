function solution(genres, plays) {
    // 1. 카테고리 별 { id, play } Entry 생성
    const categories = {};
    for (let id = 0; id < genres.length; id++) {
        const category = genres[id];
        const play = plays[id];

        if (!categories[category]) {
            categories[category] = {
                count: 0,
                selected: [],
            };
        }

        categories[category][id] = play;
        categories[category].count += play;
    }

    // 2. TOP 2 선택하기
    for (const [category, songs] of Object.entries(categories)) {
        // 2-1. 장르 별 노래 ID 정렬
        const sortedKeys = Object.keys(songs)
            .filter((key) => key !== "count" && key !== "selected")
            .sort((a, b) => {
                const aPlay = categories[category][a];
                const bPlay = categories[category][b];

                // play 내림차순 > (같은 경우) id 오름차순
                return bPlay - aPlay || Number(a) - Number(b);
            });
        // console.log(sortedKeys);

        // 2-2. 장르 별 TOP 2 선정
        for (const top2 of sortedKeys.slice(0, 2)) {
            categories[category].selected.push(top2);
        }
    }

    // 3. 장르 정렬
    const sortedKeys = Object.keys(categories).sort((a, b) => {
        const aCount = categories[a].count;
        const bCount = categories[b].count;

        return bCount - aCount;
    });

    // console.log(categories);

    // 4. 반환
    return sortedKeys
        .reduce((sum, category) => {
            sum.push(...categories[category].selected);
            return sum;
        }, [])
        .map(Number);
}
