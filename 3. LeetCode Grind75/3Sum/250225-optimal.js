var threeSum = function (nums) {
    nums.sort((a, b) => a - b);

    const result = [];

    for (let min = 0; min < nums.length - 2 && nums[min] <= 0; min++) {
        let mid = min + 1;
        let max = nums.length - 1;

        while (mid < max) {
            const sum = nums[min] + nums[mid] + nums[max];
            if (sum === 0) {
                result.push([nums[min], nums[mid], nums[max]]);

                // 동일 min + (mid, max)의 중복에 의한 중복 생성 방지
                while (nums[mid] === nums[mid + 1]) mid++;
                while (nums[max] === nums[max - 1]) max--;
                mid++;
                max--;
            } else if (sum > 0) {
                max--;
            } else {
                mid++;
            }
        }

        // 동일 min으로 또 반복하면 안 되므로 생략
        // 시작부터 이렇게 하면 못 쓰던데?
        // 응. 같은 값들을 아예 쓰지 말자가 아니라, 중복되는 조합을 제거하자는 의미
        // 최초 생성은 시켜줘야 함.
        // 투포인터 반복문 위에 놓을 거라면 아래처럼 가능함. 이전 원소와 비교.
        // (i > 0 && nums[i] === nums[i - 1]) continue;
        while (nums[min] === nums[min + 1]) min++;
    }

    return result;
};
