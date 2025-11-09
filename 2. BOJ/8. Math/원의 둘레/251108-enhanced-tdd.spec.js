/*
[효율적인 풀이]

#include <cstdio>
#include <cmath>

const double PI = acos(-1);

int main() {
	double a, b, c, d, e, f;

	while (~scanf("%lf %lf %lf %lf %lf %lf", &a, &d, &b, &e, &c, &f)) {
		double	x = sqrt((a - b)*(a - b) + (d - e)*(d - e)),
				y = sqrt((b - c)*(b - c) + (e - f)*(e - f)),
				z = sqrt((c - a)*(c - a) + (f - d)*(f - d)),
				s = (x + y + z)/2;
		printf("%.2f\n", 2*PI*(x*y*z)/4/sqrt(s*(s - x)*(s - y)*(s - z)));
	}
}
*/
import { describe, it, assert } from "vitest";

describe("원의 둘레 (Silver 1)", () => {
    it.each([
        [0.0, -0.5, 0.5, 0.0, 0.0, 0.5, 3.14],
        [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 4.44],
        [5.0, 5.0, 5.0, 7.0, 4.0, 6.0, 6.28],
        [0.0, 0.0, -1.0, 7.0, 7.0, 7.0, 31.42],
        [50.0, 50.0, 50.0, 70.0, 40.0, 60.0, 62.83],
        [0.0, 0.0, 10.0, 0.0, 20.0, 1.0, 632.24],
        [0.0, -500000.0, 500000.0, 0.0, 0.0, 500000.0, 3141592.65],
    ])("%j,%j => %i", (x1, y1, x2, y2, x3, y3, expected) => {
        const result = solution(x1, y1, x2, y2, x3, y3);
        assert.equal(result, expected);
    });
});

function solution(x1, y1, x2, y2, x3, y3) {
    // 1. 삼각형의 세 변 구하기
    const a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    const b = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));
    const c = Math.sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1));

    // 2. 삼각형 넓이 (헤론의 공식)
    const s = (a + b + c) / 2; // 삼각형 둘레의 절반
    const triangleArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // 3. 삼각형의 외접원 반지름 공식
    const outerTriangle = (a * b * c) / 4 / triangleArea;

    return Number(2 * Math.PI * outerTriangle).toFixed(2);
}

function bojRun() {
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim().split("\n");

    input.forEach((row) => {
        const [x1, y1, x2, y2, x3, y3] = row.split(" ").map(Number);
        const result = solution(x1, y1, x2, y2, x3, y3);
        console.log(result);
    });
}

// bojRun();
