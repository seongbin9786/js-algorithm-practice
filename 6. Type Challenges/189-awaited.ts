/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

/*
사고 과정
1. type MyAwaited<T> = T extends Promise<infer X> ? X : never 까지는 즉시 떠올랐다.
2. 일부 TC가 안 되어서 보니, Promise가 중첩된 경우에도 최종값을 추론해야 했다.
3. (2)를 만족하기 위해 재귀적으로 MyAwaited를 정의하려고 했는데, 한 번엔 안 됐다.
4. 그래도 했다:
```
type MyAwaited<T> = T extends Promise<infer X> ? (X extends Promise<infer X2> ? MyAwaited<X2> : X) : T;
```
5. `T`로 정의된 thenable도 해줘야 했는데 흠... then 필드의 함수의 첫 파라미터 값인데, 어떻게 파라미터 타입을 가져오는지 찾아봐야 함.
6. thenable은 쉽게 함
```
type MyAwaited<Target> = Target extends { then: (onfulfilled: (arg: infer ThenParam) => any) => any }
  ? ThenParam
  : (Target extends Promise<infer ReturnValue>
    ? (ReturnValue extends Promise<infer NestedReturnValue> ? MyAwaited<NestedReturnValue> : ReturnValue) 
    : Target);
```
7. (6)을 했더니, 다시 중첩 Promise 해제가 안 됨. => thenable에서 재귀적인 처리가 누락되었었기 때문임
```
type MyAwaited<Target> = Target extends { then: (onfulfilled: (arg: infer ThenParam) => any) => any } 
  ? ThenParam
  : (Target extends Promise<infer ReturnValue>
    ? (ReturnValue extends Promise<infer NestedReturnValue> ? MyAwaited<NestedReturnValue> : ReturnValue) 
    : Target);
```
8. thenable 로만 체크해도 Promise가 체크됨을 확인함
*/
type MyAwaited<Target> = Target extends {
    then: (onfulfilled: (arg: infer ThenParam) => any) => any;
}
    ? MyAwaited<ThenParam>
    : Target;

type test = MyAwaited<Promise<Promise<1>>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "./000-challenge-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type zzz = MyAwaited<Z>;

type cases = [
    Expect<Equal<MyAwaited<X>, string>>,
    Expect<Equal<MyAwaited<Y>, { field: number }>>,
    Expect<Equal<MyAwaited<Z>, string | number>>,
    Expect<Equal<MyAwaited<Z1>, string | boolean>>,
    Expect<Equal<MyAwaited<T>, number>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
