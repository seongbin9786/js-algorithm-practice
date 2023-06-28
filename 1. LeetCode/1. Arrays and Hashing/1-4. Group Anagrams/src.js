/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    const map = new Map();
    strs.forEach((str) => {
        const key = str.split("").sort().join(""); // join을 안 써서 key가 배열이어서 서로 다른 key로 인식됐었음.
        //console.log(key, str);
        if (!map.has(key)) {
            return map.set(key, [str]);
        }
        map.get(key).push(str);
    });

    return [...map.values()];
};

const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log(result);
