#include <string>
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void visit(int y, int x);

vector<vector<int>> triangle;

/**
 * 위에서 내려가면서 합을 구하자.
 * 배열을 따로 두긴 귀찮으니 대입으로 진행
 */
int solution(vector<vector<int>> _triangle) {
    triangle = _triangle;
    visit(1, 0);
    
    int max = 0;
    for (int i = 0; i < triangle[triangle.size() - 1].size(); i++) {
        if (max < triangle[triangle.size() - 1][i]) {
            max = triangle[triangle.size() - 1][i];
        }
    }
    
    return max;
}

// 내 입장에서 내 max를 구하는 것
// 방문 순서는 Queue로 관리하는 수 밖에 없겠는데? ㄴ
void visit(int y, int x) {
    // cout << "visit [y=" << y << "][x=" << x << "]\n";
    if (y >= triangle.size() || x >= triangle[y].size()) {
        return;
    }
    int currentMax = 0;
    if (x == 0) {
        currentMax = triangle[y - 1][x];
    } else if (x == triangle[y].size() - 1) {
        currentMax = triangle[y - 1][x - 1];
    } else {
        currentMax = max(triangle[y - 1][x - 1], triangle[y - 1][x]);
    }
    // cout << "currentMax [y=" << y << "][x=" << x << "] = " << currentMax << "\n";
    triangle[y][x] += currentMax;
    // 일직선 상으로 방문
    if (x < triangle[y].size() - 1) {
        visit(y, x + 1);
    } else {
        visit(y + 1, 0);
    }
}
