#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    int N;
    cin >> N;
    vector<int> vec(N);
    for (int i = 0; i < N; i++)
    {
        cin >> vec[i];
    }
    int x;
    cin >> x;
    int a, b;
    cin >> a >> b;
    vec.erase(vec.begin() + x - 1);
    vec.erase(vec.begin() + a - 1, vec.begin() + b - 1);
    cout << vec.size() << endl;
    for (int i = 0; i < vec.size(); i++)
    {
        cout << vec[i] << " ";
    }
    return 0;
}
