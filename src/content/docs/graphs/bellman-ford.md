---
title: Bellman-Ford
description: Algoritmo para camino más corto desde un origen, capaz de detectar ciclos negativos.
sidebar:
  order: 3
---

## ¿Qué es?

Es un algoritmo que calcula el camino más corto desde un **único nodo fuente** a todos los demás (*Single-Source Shortest Path*).

* **El Superpoder:** A diferencia de Dijkstra, **funciona con aristas de peso negativo**.
* **La Aplicación:** Es el método estándar para **detectar ciclos negativos** en una gráfica.
* **El Costo:** Es más lento que Dijkstra: $O(V \cdot E)$.

## La Idea: Relajación Iterativa

La "relajación" es intentar mejorar la distancia a un nodo `v` usando una arista que viene desde `u`.

```cpp
if (dist[u] + peso < dist[v]) {
    dist[v] = dist[u] + peso;
}
```

El algoritmo simplemente relaja **todas** las aristas de la gráfica, y repite este proceso **$V-1$ veces**.

### ¿Por qué $V-1$ veces?
Un camino simple (sin ciclos) en una gráfica de $V$ vértices puede tener a lo sumo **$V-1$ aristas**.
* En la iteración 1, encontramos los caminos óptimos de longitud 1.
* En la iteración 2, los de longitud 2.
* ...
* En la iteración $V-1$, garantizamos haber encontrado los caminos óptimos de cualquier longitud válida.

---

## Implementación en C++

Usamos una **Lista de Aristas** (`struct Edge`) porque solo necesitamos iterar sobre ellas ciegamente, no necesitamos saber quién es vecino de quién rápidamente.

```cpp
#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18;

struct Edge {
    int u, v;
    long long w;
};

int main(){
    int n, m;
    cin >> n >> m;
    vector<Edge> edges;
    
    for(int i = 0; i < m; i++){
        int u, v; long long w;
        cin >> u >> v >> w;
        // Ajustamos a 0-indexado si la entrada es 1-based
        edges.push_back({u-1, v-1, w});
    }

    int source = 0; // Nodo origen
    vector<long long> dist(n, INF);
    dist[source] = 0;

    // 1. Relajar V-1 veces (El núcleo de Bellman-Ford)
    for(int i = 0; i < n - 1; ++i) {
        for (const auto& e : edges) {
            // Si el nodo origen es alcanzable y podemos mejorar el destino
            if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }

    // 2. Detección de Ciclo Negativo (Iteración V-ésima)
    // Si todavía podemos mejorar una distancia después de V-1 pasos,
    // significa que hay un ciclo negativo.
    bool hasNegativeCycle = false;
    for (const auto& e : edges) {
        if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
            hasNegativeCycle = true;
            break;
        }
    }

    if (hasNegativeCycle) {
        cout << "Ciclo Negativo Detectado!" << endl;
    } else {
        for(long long d : dist) {
            if(d == INF) cout << "INF ";
            else cout << d << " ";
        }
    }
}
```

## Detección de Ciclos Negativos

La característica más poderosa de Bellman-Ford es su capacidad para validar la gráfica.

Si realizamos una iteración extra (la número $V$) y alguna distancia **sigue disminuyendo**, es matemáticamente imposible que sea un camino "simple" (sin repetir nodos). Significa que hemos encontrado un bucle que reduce el costo infinitamente: un **ciclo negativo**.

### ¿Por qué funciona?
Un camino óptimo sin ciclos en una gráfica con $V$ vértices puede tener a lo sumo $V-1$ aristas. Si encontramos un camino "más corto" usando $V$ aristas o más, forzosamente estamos repitiendo un vértice en un ciclo que disminuye el costo total.

## Análisis y Complejidad

* **Complejidad Temporal:** $O(V \cdot E)$
    * En el peor caso, relajamos todas las aristas ($E$) unas $V$ veces.
* **Complejidad Espacial:** $O(V)$
    * Solo necesitamos el arreglo de distancias y la lista de aristas.

:::note[Comparación con SPFA]
Existe una optimización llamada **SPFA (Shortest Path Faster Algorithm)** que usa una cola para no relajar todas las aristas siempre. Aunque en promedio es $O(E)$, su peor caso sigue siendo $O(V \cdot E)$, y es fácil construir casos de prueba que lo rompen en competencias. **Bellman-Ford es más seguro.**
:::

---

## Ejercicios Recomendados

Practica la detección de ciclos y caminos con costos negativos:

* **[High Score (CSES)](https://cses.fi/problemset/task/1673)**
    * **Truco:** Piden el camino más largo con pesos positivos. Multiplica todos los pesos por `-1` y usa Bellman-Ford para hallar el más corto (que será el más largo original).
* **[Cycle Finding (CSES)](https://cses.fi/problemset/task/1197)**
    * El reto aquí no es solo decir "sí hay ciclo", sino **imprimir los nodos** que lo forman. Necesitarás guardar los padres (`parent[v] = u`) para reconstruirlo.
* **[787. Cheapest Flights Within K Stops (LeetCode)](https://leetcode.com/problems/cheapest-flights-within-k-stops/)**
    * Una variación donde limitas el número de iteraciones del bucle principal a `K + 1` en lugar de `N - 1`.
