/*
[문제]
- map.get 시 현재 timestamp 보다 이전 time 중 최신의 값을 반환

[해결 방법]
- map에서 배열로 저장하고 선형 탐색
- set timestamp는 증가만. -> 저장 시에는 timestamp 오름차순으로 정렬된 상태

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
    if (!values?.length) return "";

    // 특정 timestamp 보다 작은 최댓값 --> upperBound
    // 이거 만들어본 적이 없는데... 생각을 해보자.
    let low = 0;
    let high = values.length;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (values[mid][1] <= timestamp) {
            // 등호만 다르다.
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    if (low === 0) {
        return "";
    }

    return values[low - 1][0];
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
