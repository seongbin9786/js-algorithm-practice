/*
[결론]
- 2진수로 변환한 후, 1의 개수가 점프 횟수임

[원리]
- (ex) 1 1 1(2) = 7
- 1 + 1*2 + 1*2*2
- 애초에 1점프 후 2의 배수로 표현될 숫자였으면, 2진수에서도 10000 과 같이 표현됨

[1의 개수 세는 방식]
1이 아니라 ' '로 생각해보면 쉬움. 그냥 스플릿 기준 문자열 +1개 만큼 생겨남
a b c = a,b,c
 c = '', c
c c = c,c
 c = '','c',''

[생각하기 어려운 케이스]
- 스플릿 기준 문자열이 없으면? 1임 (원본 문자열)
- 끝에 스플릿 문자가 있으면 ''가 또 생김
- 이런 예외 경우에도, 스플릿 기준 문자열 개수 + 1이 유지됨.


*/
function solution(n) {
    return n.toString(2).split("1").length - 1;
}
