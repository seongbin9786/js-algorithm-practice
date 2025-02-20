/**
 * @param {string} s
 * @return {boolean}
 */
const normalize = (str) => {
    str = str.toLowerCase();

    const normalized = [];
    for (let i = 0; i < str.length; i++) {
        if (
            (str[i] >= "a" && str[i] <= "z") ||
            (str[i] >= "0" && str[i] <= "9")
        ) {
            normalized.push(str[i]);
        }
    }
    return normalized;
};

var isPalindrome = function (s) {
    const str = normalize(s);
    const half = Math.floor(str.length / 2);
    for (let i = 0; i < half; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }

    return true;
};
