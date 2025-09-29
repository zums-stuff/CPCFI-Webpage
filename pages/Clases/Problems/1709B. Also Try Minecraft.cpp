#include<bits/stdc++.h>
using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<long long> alturas(n + 1);
    for (int i = 1; i <= n; ++i)
        cin >> alturas[i];


    //Movimiento hacia la derecha
    //Prefix zum
    vector<long long> right_dmg(n + 1, 0);
    for (int i = 2; i <= n; ++i) {
        right_dmg[i] = right_dmg[i-1]; //Para acumular
        if (alturas[i-1] > alturas[i]) {
            right_dmg[i] += alturas[i-1] - alturas[i]; //Se le suma el actual
        }
    }

    //Movimiento hacia la izquierda
    //Suffix zum
    vector<long long> left_dmg(n + 2, 0);
    for (int i = n - 1; i >= 1; --i) {
        left_dmg[i] = left_dmg[i+1]; //Para acumular
        if (alturas[i+1] > alturas[i]) {
            left_dmg[i] += alturas[i+1] - alturas[i]; //Se le suma el daño actual
        }
    }

    //Queries
    for (int k = 0; k < m; ++k) {
        int s, t;
        cin >> s >> t;

        if (s < t){ //Hacia la derecha
            long long arns = right_dmg[t] - right_dmg[s];
            cout << arns << "\n";
        }
        else{ //Hacia la izquierda
            long long arns = left_dmg[t] - left_dmg[s];
            cout << arns << "\n";
        }
    }
}