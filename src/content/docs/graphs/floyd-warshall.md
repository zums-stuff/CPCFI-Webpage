---
title: Floyd-Warshall
description: Algoritmo para encontrar el camino más corto entre todos los pares de nodos.
sidebar:
  order: 2
---

## ¿Qué es?

Es un algoritmo de programación dinámica que encuentra el **camino más corto entre todos los pares de nodos** en una gráfica (*All-Pairs Shortest Path*).

* **Versatilidad:** Funciona en gráficas dirigidas y no dirigidas.
* **Pesos Negativos:** ¡Sí! Maneja aristas negativas (a diferencia de Dijkstra).
* **Limitación:** La gráfica **no puede tener ciclos negativos**.

## La Idea Central: El Intermediario

El algoritmo intenta mejorar el camino entre dos nodos `i` y `j` probando pasar por un tercer nodo `k`.
La pregunta clave es:
*"¿Es más rápido ir de `i` a `j` directo, o pasando por `k`?"*



Esto se traduce en la **Ecuación de Bellman** para este problema:
```cpp
dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
```

## Definición Formal (DP)

Aunque la implementación suele hacerse "in-place" (sobre la misma matriz), el estado real de la DP es tridimensional:

$$dp[k][i][j]$$

Significa: "La distancia más corta desde el nodo $i$ hasta el nodo $j$, usando solamente vértices intermedios del conjunto $\{0, 1, \dots, k\}$".

La transición es:
$$dp[k][i][j] = \min(dp[k-1][i][j], \quad dp[k-1][i][k] + dp[k-1][k][j])$$

:::tip[Optimización de Espacio]
Como el estado $k$ solo depende del estado anterior $k-1$, podemos eliminar esa dimensión y usar una única matriz 2D `dist[i][j]` que vamos actualizando en cada iteración.
:::

## Inicialización de la Matriz

Para que funcione, la matriz `dist[N][N]` debe prepararse así antes de los bucles:

1.  **Diagonal:** `dist[i][i] = 0` (Distancia a uno mismo es 0).
2.  **Aristas:** `dist[u][v] = w` (Si existe arista directa).
3.  **Sin conexión:** `dist[i][j] = INF` (Un número muy grande, ej. `1e18`).

---

## Implementación en C++

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18;

int main(){
    int n, m, q;
    cin >> n >> m >> q; 

    // 1. Inicializar todo con INF
    vector<vector<long long>> dist(n, vector<long long>(n, INF));

    // 2. La distancia a uno mismo es 0
    for (int i = 0; i < n; i++) dist[i][i] = 0;

    // 3. Leer aristas
    for(int i = 0; i < m; i++){
        int u, v; long long w;
        cin >> u >> v >> w;
        u--; v--; // Convertir a 0-indexado si la entrada es 1-based
        
        // Usamos min() por si hay múltiples aristas entre los mismos nodos
        dist[u][v] = min(dist[u][v], w);
        // Si la gráfica es NO dirigida, descomenta la siguiente línea:
        // dist[v][u] = min(dist[v][u], w);
    }

    // 4. El Corazón de Floyd-Warshall (Orden: k -> i -> j)
    for(int k = 0; k < n; k++){         // Nodo Intermedio (Pivote)
        for(int i = 0; i < n; i++){     // Origen
            for(int j = 0; j < n; j++){ // Destino
                
                // Chequeo de seguridad para evitar overflow si INF es muy grande
                if(dist[i][k] < INF && dist[k][j] < INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // 5. Responder consultas en O(1)
    while(q--){
        int u, v; cin >> u >> v;
        u--; v--;
        if(dist[u][v] == INF) cout << "-1\n";
        else cout << dist[u][v] << "\n";
    }
}
```

## Análisis y Complejidad

* **Complejidad Temporal:** $O(V^3)$
    * El algoritmo consiste en tres bucles anidados que recorren todos los nodos ($N \times N \times N$).
* **Complejidad Espacial:** $O(V^2)$
    * Necesitamos almacenar la matriz de distancias completa.

### ¿Cuándo usarlo?
1.  **Restricciones Pequeñas:** Ideal cuando el número de nodos es pequeño ($N \le 500$).
    * Cálculo: $500^3 = 125,000,000$ operaciones (aprox. 1 segundo en C++).
2.  **Gráficas Densas:** Cuando tienes muchas aristas ($E \approx V^2$), Floyd-Warshall es muy competitivo frente a correr Dijkstra desde cada nodo.
3.  **Implementación Rápida:** Es mucho más rápido de escribir y menos propenso a errores que Dijkstra o Bellman-Ford si $N$ lo permite.

### Detección de Ciclos Negativos
Floyd-Warshall tiene un "superpoder" oculto. Si al terminar el algoritmo revisas la diagonal principal y encuentras que `dist[i][i] < 0` para algún nodo $i$, significa que existe un **ciclo negativo** que involucra al nodo $i$.

---

## Ejercicios Recomendados

Practica con estos problemas clásicos:

* **[1334. Find the City... (LeetCode)](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)**
    * Aplicación directa donde necesitas la matriz de distancias completa para filtrar vecinos.
* **[Shortest Routes II (CSES)](https://cses.fi/problemset/task/1672)**
    * El problema estándar: $N \le 500$ y muchas consultas ($Q$) sobre distancias entre pares.
