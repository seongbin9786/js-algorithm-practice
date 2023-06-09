#include <string>
#include <iostream>
#include <vector>

using namespace std;

void visit(int y, int x);
bool watterHole(int y, int x);

int M, N;
int routes[100][100] = { 0 };
vector<vector<int>> puddles;

int solution(int m, int n, vector<vector<int>> _puddles) {
    puddles = _puddles;
    M = m;
    N = n;
    
    // 첫 행은 모두 1
    // puddles 처리는 break문으로 쉽게 가능
    for (int x = 0; x < M; x++) {
        if (watterHole(0, x)) {
            break;
        }
        routes[0][x] = 1;
    }
    
    // 첫 열은 모두 1
    for (int y = 0; y < N; y++) {
        if (watterHole(y, 0)) {
            break;
        }
        routes[y][0] = 1;
    }
    
    // m, n < 2 이면 모두 예외처리해야 함
    visit(1, 1); 
    
    return routes[N - 1][M - 1] % 1000000007;
}

void visit(int y, int x) {
    if (watterHole(y, x)) {
        routes[y][x] = 0;
        // cout << "routes[" << y << "][" << x << "] = 0 (waterHole)\n";
    } else {
        routes[y][x] = routes[y - 1][x] + routes[y][x - 1];
        // cout << "routes[" << y << "][" << x << "] (=" << routes[y][x] << ") = ";
        // cout << "routes[" << y-1 << "][" << x << "] (=" << routes[y-1][x] << ") + ";
        // cout << "routes[" << y << "][" << x-1 << "] (=" << routes[y][x-1] << ")\n";
    }
    
    // 이렇게 방문하면 계산이 안 된 상태로 들어오게 됨
    // queue를 쓰지 않고도 방문할 수 없으려나?
    // visit(y + 1, x);
    // visit(y, x + 1);
    // visit(y + 1, x + 1);
    
    if (y == N - 1 && x == M - 1) {
        return;
    }
    
    // 다음 열 방문이 불가능하면 다음 행 방문
    if (x == M - 1) { 
        visit(y + 1, 1);
        return;
    }
    
    // 다음 열 쭉 방문
    visit(y, x + 1); // 0번째 행은 1로 채워져있음.
}

bool watterHole(int y, int x) {
    for (int i = 0; i < puddles.size(); i++) {
        if (puddles[i].size() < 2) {
            continue;
        }
        // 웅덩이 좌표가 (x, y)로 와서 반대로 체크
        if (puddles[i][0] - 1 == x && puddles[i][1] - 1 == y) {
            return true;
        }
    }
    return false;
}
