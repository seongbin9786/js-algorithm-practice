/*
1. 10진수를 N진수로 변환
2. 0을 기준으로 slice하고 소수인지 확인 (자릿수에 0을 포함하지 않는 소수)

이 정도면.. 레벨 1 아니야?

--
진법 변환은 어떻게 함?
e.g. 2진법 ->
10 = 2 * 5 + 0
5 = 2 * 2 + 1
2 = 2 * 1 + 0
1 = 2 * 0 + 1

1010 = 10

3진법
10 = 3 * 3 + 1
3 = 3 * 1 + 0
1 = 3 * 0 + 1
= 101

변환 후 결괏값을 문자열로 반환하면 slice해서 쓰기 좋을 듯
*/
function convert(n, k) {
    let remainders = "";
    while (n > 0) {
        const remainder = n % k;
        remainders = remainder + remainders;
        n = Math.floor(n / k);
    }
    return remainders;
}

function isPrime(target) {
    if (target < 2) {
        return false;
    }

    // 소수 판단을 어떻게 하지? 본인이랑 1로만 나뉘는 수
    // 자연수로 그냥 슝 나누는 거였나
    // 제곱수까지만 나눠도 되는 거 같았는데
    // 놀랍게도, <= 을 안하면 TC1번이 틀림..
    for (let divider = 2; divider <= Math.sqrt(target); divider++) {
        if (target % divider === 0) {
            return false;
        }
    }

    return true;
}

function solution(n, k) {
    const num = convert(n, k);
    const candidates = num.split("0");
    return candidates.filter(isPrime).length;
}
