/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #easy #built-in #union

  ### Question

  Implement the built-in `Exclude<T, U>`

  > Exclude from `T` those types that are assignable to `U`

  For example:

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > View on GitHub: https://tsch.js.org/43
*/

/* _____________ Your Code Here _____________ */

/*
사고 과정
1. exclude? 전혀 감이 오지 않음
2. object로 정의한다?
3. union 타입을 어떻게 만들어낼지가 의문
4. key일테니 keyof를 쓰긴 해야 할 거 같고..
5. 아예 모르겠어서, GPT한테 힌트 요청함
  - T가 union 이면, extends, 삼항 연산자, never를 활용하면 반환 타입도 union이 된다고 함
6. 내 생각: T extends U ? never : T <-- 이게 정답이었음.
7. 배운 점: Distributive Conditional Types 라는 개념이 있으며, 제네릭 파라미터가 union일 때는 반환 타입 계산 시 Map처럼 계산됨.
8. 원리: 공식문서에 그대로 있음 - https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
    - When conditional types act on a generic type, they become distributive when given a union type. For example, take the following: (예제 생략)
    - If we plug a union type into ToArray, then the conditional type will be applied to each member of that union.
*/
type MyExclude<T, U> = T extends U ? never : T;

type X = MyExclude<"a" | "b", "a">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "./000-challenge-utils";

type cases = [
    Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
    Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
    Expect<
        Equal<
            MyExclude<string | number | (() => void), Function>,
            string | number
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/
