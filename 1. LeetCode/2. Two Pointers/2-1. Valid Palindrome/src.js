/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = function (s) {
    // 1. to lowercase
    // 2. filter other than alphanumeric
    const p = [...s.toLowerCase()].filter(
        (c) => (c >= "a" && c <= "z") || (c >= "0" && c <= "9"),
    );

    // [ 4 3 3 4 ] len=4, i=0,1,2,3
    //   0 1 2 3

    // [ 4 3 5 3 4 ] len=5, i=0,1,2,3,4
    //   0 1 2 3 4
    // Math.floor(s.length / 2) = 2
    for (let i = 0; i < Math.floor(p.length / 2); i++) {
        if (p[i] !== p[p.length - (i + 1)]) {
            return false;
        }
    }
    return true;
};

const result = isPalindrome("A man, a plan, a canal: Panama");
console.log(result);
