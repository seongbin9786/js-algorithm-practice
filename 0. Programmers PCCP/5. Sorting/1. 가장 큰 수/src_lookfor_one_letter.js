const solution = (numbers) => {
  numbers = numbers.map(num => num + '');

  // 내림차순 정렬. compareFunction(a, b)이 0보다 작은 경우 a를 b보다 낮은 색인으로 정렬합니다. 즉, a가 먼저옵니다.
  numbers.sort((a, b) => {
    // b - a 일 경우, a가 더 작으면 양수가 되어 a가 뒤로 감. a가 크면 음수가 되어 a가 앞으로 감.
    // 정수 차이만큼 나게 됨. b - a 이므로 내림차순 정렬됨.

    let i = 0;

    const minLength = Math.min(a.length, b.length);
    for (; i < minLength; i++) {
      if (a[i] === b[i]) continue;
      return b[i] - a[i];
    }

    // a가 더 길 때
    if (a.length > b.length) {
      // a의 그 다음 자릿수가 지금까지 비교한 마지막 자릿수보다 큰 경우
      // e.g. 3 vs 34 비교 후 '4'에 해당
      // 34가 앞에 오는 게 맞음.
      // Why? 33이면 모름. 왜냐면 
      if (a[i] > a[i - 1]) { // e.g. 34
        return -1; // 얘가 더 우선되어야 함. 배열의 앞으로 보내기
      }
      if (a[i] < a[i - 1]) {
        return 1;
      }
      return 0;
    }

    // b가 더 길 때
    if (a.length < b.length) {
      if (b[i] > b[i - 1]) {
        return 1; // b를 더 낮은 색인으로. b가 먼저 오게.
      }
      if (b[i] < b[i - 1]) {
        return -1;
      }
      return 0;
    }

    // 문자열도 같고 길이도 같을 때
    return 0;
  });
  // 34, 3, 30 중에 뭐가 앞으로 가야 함?
  // 4가 앞으로 가야 함. 왜냐면 4 > 3 이기 때문.

  return numbers;
}

const result = solution([3, 33, 343, 3333344433333, 333332999999999]);

console.log(result);
