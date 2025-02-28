/*
[문제]
- map.get 시 현재 timestamp 보다 이전 time 중 최신의 값을 반환

[해결 방법]
- map에서 배열로 저장하고 선형 탐색
- stack으로 하면 time 삽입 순서를 꼬면 오동작
- heap으로는 조건부여서 안 됨
- BST로 log N 가능할 것 같긴 한데 그럼 set이 느려지기도 하고, 구현도 어려운 거 같음.
- set - O(1)으로 두고, get - O(N) 으로 만들기

*/
var TimeMap = function () {
    this.map = new Map();
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    const values = this.map.get(key) ?? [];
    if (!this.map.has(key)) this.map.set(key, values);
    values.push([value, timestamp]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    const values = this.map.get(key);
    if (!values) return "";
    let recentValue;
    for (let i = 0; i < values.length; i++) {
        if (!recentValue) {
            if (values[i][1] <= timestamp) {
                recentValue = values[i];
            }
        }
        if (values[i][1] <= timestamp && recentValue[1] < values[i][1]) {
            recentValue = values[i];
        }
    }

    return recentValue?.[0] ?? "";
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
