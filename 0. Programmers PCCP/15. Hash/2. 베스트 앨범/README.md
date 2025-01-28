# 베스트 앨범

## 문제 개요

-   문제 유형:
-   문제 난도: 프로그래머스 Lv3, 54% (2025/01)
-   문제 링크: https://school.programmers.co.kr/learn/courses/30/lessons/42579

### 문제 핵심 요약

-   (많이 재생된 장르, 많이 재생된 노래, 고유 번호가 낮은 노래) 순으로 정렬하여, 장르 별로 최대 2개를 선택해 고유 번호의 배열로 반환한다.

### 문제 입출력

-   입력 값: 곡 별 장르, 재생 횟수 배열
-   출력 값: (위 정렬 기준을 따른) 고유 번호의 배열

## 문제 해설

### 1. 문제 해결책 설명

#### 1-1 [접근 1] 장르 별, 노래 별 집계 후 정렬

-   장르 별로 재생 횟수 합계를 Object로 집계
-   장르 별 노래의 (고유 번호, 재생 횟수)를 배열로 집계
-   장르 별로 재생 횟수를 정렬한 후, "장르 별 노래"의 배열을 (재생 횟수, 고유 번호) 순으로 정렬 후 2개를 선택
-   순회 후 고유 번호만 추출한 배열로 반환

##### 예시 TC 1

```text

```

### 2. 수도 코드

-   (생략)

### 3. 사용 단위 알고리즘 종류

-   Hash

### 4. 사용 단위 알고리즘 구현

-   JS 내장 Map 사용

### 5. 단위 알고리즘 활용 코드

#### 5-1. 시도 1 코드

-   장르 정렬까지

```js
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

    return sortedGenres;
};
```

-   장르 별 곡 2개 선택

```js
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
```

#### 5-2. 완성 코드

```js
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
```

### 6. 배운 점

-   결과적으로 쉬운 문제였지만, 이렇게 쉽게 보이는 문제에서 틀릴 때가 있다. 그런 경우를 방지하기 위해서 미리 검산을 하는 습관을 유지하는 게 좋겠다...
-   예전보다 코드가 짧아졌다.
