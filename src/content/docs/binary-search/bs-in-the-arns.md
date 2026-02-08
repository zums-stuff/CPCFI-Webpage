---
title: Búsqueda Binaria en la Respuesta
description: Aprende a optimizar problemas de búsqueda de valores máximos o mínimos usando Binary Search on the Answer.
sidebar:
  order: 2
---

## ¿Qué es? 🔍

Es una técnica de optimización que usa búsqueda binaria sobre un **rango de posibles respuestas** a un problema, en lugar de hacerlo sobre los índices de un arreglo.

* Se aplica a problemas donde necesitamos encontrar un **valor máximo o mínimo** que cumpla una cierta condición.
* La idea clave es transformar el problema de "encontrar un valor óptimo" a un problema de decisión: **"¿Es un valor $k$ una respuesta válida?"**.
* Si podemos responder esa pregunta de manera eficiente, podemos encontrar la solución óptima en tiempo logarítmico.

## La Clave: Una Función Monótona

Para que esta técnica funcione, el problema debe tener una **propiedad monótona**. Esto significa que si una respuesta $k$ es válida, todas las respuestas menores que $k$ (o mayores, dependiendo del problema) también deben ser válidas.

Por ejemplo, en el problema de encontrar el $n$ máximo tal que $n^2 < X$, la función de decisión es $f(n) = (n^2 < X)$.

* Si $f(8)$ es `True` (porque $64 < X$), entonces $f(7), f(6), \dots$ también serán `True`.
* Si $f(11)$ es `False` (porque $121 \ge X$), entonces $f(12), f(13), \dots$ también serán `False`.

:::note[Importante]
Esta propiedad nos permite descartar la mitad del espacio de búsqueda en cada paso, tal como en la búsqueda binaria tradicional.
:::

## Ejemplo: Encontrar el valor máximo de n

Dado un entero positivo $X$, queremos encontrar el máximo entero positivo $n$ que satisfaga $n^2 < X$.

* **Ejemplo:** Para $X = 101$, la respuesta es **10**, ya que $10^2 = 100 < 101$, pero $11^2 = 121 \not< 101$.

En lugar de probar $n = 1, 2, 3, \dots$ linealmente (lo que sería lento, $O(\sqrt{X})$), podemos buscar binariamente la respuesta en el rango $[0, X]$, logrando una complejidad de **$O(\log X)$**.

### Implementación en C++

```cpp
#include <iostream>

// Función de decisión (predicado monótono)
// Devuelve true si n^2 < X
bool check(long long n, int X) {
    return n * n < X;
}

int main() {
    int X = 101;
    long long low = 0, high = X;
    long long ans = 0;

    while (low <= high) {
        long long mid = low + (high - low) / 2;

        if (check(mid, X)) {
            // 'mid' es una respuesta válida.
            // La guardamos y probamos con un valor más grande.
            ans = mid;
            low = mid + 1;
        } else {
            // 'mid' NO es válido.
            // Probamos con un valor más pequeño.
            high = mid - 1;
        }
    }

    std::cout << "El n maximo es: " << ans << std::endl;
    return 0;
}
```
## Pasos para Aplicar la Técnica

1.  **Definir el Espacio de Búsqueda $[L, R]$:** Identifica los límites inferior y superior lógicos para la posible respuesta.
2.  **Crear la Función de Decisión `check(k)`:** Esta función debe ser monótona y determinar si un valor $k$ es una solución válida.
3.  **Implementar el Bucle:** Usa la función `check(k)` para ajustar los límites $L$ y $R$ hasta encontrar la respuesta óptima.

---

## Problema Real: Perfect Teams

**Referencia:** [Codeforces 1221C - Perfect Teams](https://codeforces.com/problemset/problem/1221/C)

Tienes $c$ programadores, $m$ matemáticos y $x$ alumnos sin especialización. Un equipo "perfecto" tiene 3 miembros: al menos 1 programador y al menos 1 matemático. ¿Cuál es el máximo número de equipos perfectos?

**Lógica `check(k)`:**
"¿Es posible formar $k$ equipos?"
* Necesitamos al menos $k$ programadores y $k$ matemáticos ($c \ge k$ y $m \ge k$).
* La suma total de alumnos debe ser suficiente para $k$ equipos de 3 personas: $c + m + x \ge 3k$.

### Solución

```cpp
#include <bits/stdc++.h>
using namespace std;

// check(k): ¿Podemos formar k equipos?
bool canMake(long long k, long long c, long long m, long long x) {
    // 1. Necesitamos k coders y k matemáticos como mínimo
    if (c < k || m < k) return false;
    
    // 2. El total de estudiantes debe alcanzar para grupos de 3
    // (Restamos los k obligatorios de c y m y sumamos x)
    return (c - k) + (m - k) + x >= k;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int q;
    cin >> q;
    while (q--) {
        long long c, m, x;
        cin >> c >> m >> x;

        // El rango de respuesta es [0, min(c, m)]
        long long low = 0, high = min(c, m), ans = 0;

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            
            if (canMake(mid, c, m, x)) {
                ans = mid;     // Es posible, guardamos y buscamos más
                low = mid + 1; 
            } else {
                high = mid - 1; // No es posible, buscamos menos
            }
        }
        cout << ans << "\n";
    }
    return 0;
}
```
## Ejercicios Recomendados

Practica esta técnica con los siguientes problemas seleccionados:

* **[1221C - Perfect Teams (Codeforces)](https://codeforces.com/problemset/problem/1221/C)**
* **[1873E - Building an Aquarium (Codeforces)](https://codeforces.com/problemset/problem/1873/E)**
