/*
    prefix는 처음~이전까지의 곱
    suffix는 이후~끝까지의 곱

    각각을 구하려면 각각 O(N)이 필요

*/
var productExceptSelf = function (nums) {
    // 1로 초기화해도 되나? 다른 곳에서 0이 하나라도 있으면 0됨
    // 본인의 0 여부는 무관
    const answer = Array(nums.length).fill(1);

    // prefix 구하기, answer도 절반 곱해놓고 대기(앞 부분만 곱해놓음)
    // 1이어야 뭐든 곱할 수 있다. 0을 만나면 0 되니까 문제 없음.
    let prefixProduct = 1;
    for (let i = 0; i < nums.length; i++) {
        // nums[i] 자체는 answer에 반영하면 안 됨-!
        answer[i] *= prefixProduct;
        prefixProduct = prefixProduct * nums[i];
    }

    // suffix 구하기. answer에 나머지 절반을 곱해준다. 동일한 작업 반복.
    let suffixProduct = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        answer[i] *= suffixProduct;
        suffixProduct = suffixProduct * nums[i];
    }

    return answer;
};
