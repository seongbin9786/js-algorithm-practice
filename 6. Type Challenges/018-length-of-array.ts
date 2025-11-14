/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #easy #tuple

  ### Question

  For given a tuple, you need create a generic `Length`, pick the length of the tuple

  For example:

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > View on GitHub: https://tsch.js.org/18
*/

/* _____________ Your Code Here _____________ */

type Length<T> = T extends { length: number } ? T["length"] : never;

// 모법답안:
type Length2<T extends readonly any[]> = T["length"];

type X = Length<[1, 2, 3, 4]>;
type X2 = Length2<[1, 2, 3, 4]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "./000-challenge-utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT",
] as const;

type cases = [
    Expect<Equal<Length<typeof tesla>, 4>>,
    Expect<Equal<Length<typeof spaceX>, 5>>,
    Length<5>,
    Length<"hello world">
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18/answer
  > View solutions: https://tsch.js.org/18/solutions
  > More Challenges: https://tsch.js.org
*/
