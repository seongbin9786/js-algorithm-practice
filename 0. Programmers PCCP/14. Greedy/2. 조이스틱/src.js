const diffLoc = (loc1, loc2, totalLength) => {
    // 1. 정방향
    const normalDir = Math.abs(loc1 - loc2);
    // 2. 역방향
    // length와 가까운 쪽을 length에서 빼줘야 함.
    // 0-indexed라서 +1 해줘야 하지만 length=1-indexed여서 상쇄됨
    const reverseDir = loc1 > loc2
        ? (totalLength - loc1) + loc2
        : (totalLength - loc2) + loc1;

    // console.log("diffLoc:", Math.min(normalDir, reverseDir));
    return Math.min(normalDir, reverseDir);
}

const diffAlpha = (alpha1, alpha2) => {
    // console.log(`diffAlpha: [${alpha1}] [${alpha2}]`);
    alpha1 = alpha1.charCodeAt(0) - 65; // 65 = 'A'
    alpha2 = alpha2.charCodeAt(0) - 65; // 65 = 'A'
    // console.log("diffAlpha:", alpha1, alpha2);
    // 1. 정방향
    const normalDir = alpha1 >= alpha2
        ? alpha1 - alpha2
        : alpha2 - alpha1;

    // 2. 역방향 (Z=26 쪽으로 가거나, A=1으로 갈 수 있음)
    // length와 가까운 쪽을 length에서 빼줘야 함.
    // 0-indexed라서 +1 해줘야 됨
    const reverseDir = alpha1 >= alpha2
        ? (25 - alpha1) + alpha2 + 1
        : (25 - alpha2) + alpha1 + 1;

    // console.log("diffAlpha:", normalDir, reverseDir);
    return Math.min(normalDir, reverseDir);
}
    
const INIT_ALPHA = 'A';
const INIT_LOC = 0;

const solution = (name) => {
    // (1, A) 기준으로 초기화
    let visited = 0;
    let totalDistance = 0;
    let curLoc = INIT_LOC;

    const alphabets = [...name].map((alpha, i) => ({
        alpha,
        loc: i, // 0-indexed
        distance: diffAlpha(alpha, INIT_ALPHA) + diffLoc(i, INIT_LOC, name.length),
        visited: false,
    }));
    
    const distanceBtw = (loc) => {
        const alphaDiff = diffAlpha('A', alphabets[loc].alpha);
        const locDiff = diffLoc(curLoc, loc, name.length);
        console.log("distanceBtw:", alphaDiff, locDiff, alphaDiff + locDiff);
        return alphaDiff + locDiff;
    }
    
    const findMinLoc = () => {
        let minDistance = Infinity;
        let minLoc = 0;
        for (let loc = 0; loc < name.length; loc++) {
            const { alpha, visited } = alphabets[loc];
            if (visited) {
                continue;
            }
            const curDistance = distanceBtw(loc);
            
            // min 갱신
            if (minDistance >= curDistance) { 
                minDistance = curDistance;
                minLoc = loc;
            }
            
//             // 같은 distance일 때 우선 순위가 중요할까?
//             // Yes. 일단 거기로 가본 다음, 그 다음 minLoc가 더 짧은 곳이 있는지 확인해야 함
//             if (minDistance === curDistance) {
//                 // 1. 현재의 minDistance가 선택되었다고 가정
//                 const minNode = alphabets[minLoc];
//                 minNode.visited = true; // 임시로 수행
//                 const nextMinOfMinNode = findMinLoc(); // 이렇게 재귀적으로 수행되어야 하나..? 애매하네
//                 minNode.visited = false;
                
//                 // 2. 새로운 값인 curDistance가 선택되었다고 가정
//                 const curNode = alphabets[loc];
//                 curNode.visited = true;
//                 const nextMinOfCurNode = findMinLoc();
//                 curNode.visited = false;
                
//                 // 여기서도 동일하면 상관이 없다.
//                 if (nextMinOfMinNode >= nextMinOfCurNode) {
//                     minDistance = curDistance;
//                     minLoc = loc;
//                 } // else인 경우 그대로 진행
//             }
        }
        return minLoc;
    }
    
    while (visited < name.length) {
        // next 계산
        const nextLoc = findMinLoc();
        const nextDistance = distanceBtw(nextLoc);
        console.log("nextLoc:", nextLoc, `[${alphabets[nextLoc].alpha}]`, "nextDistance:", nextDistance);
        
        // 정산
        totalDistance += nextDistance;
        visited++;

        // cur 갱신
        curLoc = nextLoc;
        curAlpha = 'A';
        alphabets[curLoc].visited = true;
        
        // 남은 자릿수를 재계산해야 함
        for (const alphabet of alphabets) {
            if (alphabet.visited) {
                continue;
            }
            alphabet.distance = distanceBtw(alphabet.loc);
        }
    }
    return totalDistance;
}
