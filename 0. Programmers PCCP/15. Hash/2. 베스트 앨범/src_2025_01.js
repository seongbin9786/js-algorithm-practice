const solution = (genres, plays) => {
    const playCountPerGenre = new Map();
    const songsPerGenre = new Map();
    for (let id = 0; id < genres.length; id++) {
        const genre = genres[id];
        const playCount = plays[id];

        // 장르 별 플레이 카운터
        const prevGenrePlayCount = playCountPerGenre.get(genre) ?? 0;
        playCountPerGenre.set(genre, prevGenrePlayCount + playCount);

        // 장르 별 노래를 배열로 보관
        if (!songsPerGenre.get(genre)) {
            songsPerGenre.set(genre, []);
        }
        const songs = songsPerGenre.get(genre);
        songs.push({ id, playCount });
    }

    const sortedGenres = [...playCountPerGenre.entries()].sort(
        ([, aPlayCount], [, bPlayCount]) => bPlayCount - aPlayCount
    );

    return sortedGenres
        .reduce((bestAlbum, [currGenre]) => {
            const songsSorted = songsPerGenre.get(currGenre).sort((a, b) => {
                if (a.playCount !== b.playCount) {
                    return b.playCount - a.playCount;
                }
                return a.id - b.id;
            });

            bestAlbum.push(...songsSorted.slice(0, 2));

            return bestAlbum;
        }, [])
        .map(({ id }) => id);
};
