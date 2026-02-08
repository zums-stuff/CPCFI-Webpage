---
title: Backtracking
description: Búsqueda exhaustiva mediante prueba y error controlado.
sidebar:
  order: 2
---

## ¿Qué es Backtracking? ↩

Es una técnica algorítmica para encontrar soluciones explorando todas las opciones posibles sistemáticamente.

* **Analogía:** Imagina un laberinto. Caminas hasta encontrar una bifurcación, eliges un camino. Si llegas a un callejón sin salida, **vuelves atrás** (backtrack) hasta la bifurcación y pruebas el otro camino.
* **Estructura:** Se visualiza como un recorrido en profundidad (DFS) sobre un **Árbol de Estados**.



### Conceptos Clave
1.  **Estado:** La configuración actual (ej. dónde están las reinas en el tablero).
2.  **Decisiones:** Opciones disponibles desde el estado actual.
3.  **Poda (Pruning):** Detectar si el camino actual NO llevará a una solución válida y cortarlo inmediatamente para ahorrar tiempo.

---

## Estructura General (Template)

El Backtracking casi siempre se implementa con recursión.

```cpp
void backtrack(Estado& estado) {
    // 1. Caso Base: ¿Encontramos una solución?
    if (esSolucion(estado)) {
        procesarSolucion(estado);
        return; 
    }

    // 2. Exploración
    for (Opcion op : generarOpciones(estado)) {
        if (esValida(op)) {
            // A) Hacer (Do)
            aplicar(estado, op);
            
            // B) Recursión
            backtrack(estado);
            
            // C) Deshacer (Undo / Backtrack)
            deshacer(estado, op);
        }
    }
}
```
---

## Ejemplo: N-Reinas

**Problema:** Colocar $N$ reinas en un tablero de $N \times N$ de manera que ninguna reina amenace a otra (es decir, que no compartan fila, columna o diagonal).

Este es el ejemplo por excelencia de Backtracking porque ilustra perfectamente la idea de probar, fallar y retroceder.

[Image of 8 queens problem solution]

### Implementación en C++

A continuación, el código completo con la función de validación (`esSeguro`) y la función recursiva.

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Función de Poda: Verifica si es seguro poner una reina en (fila, col)
bool esSeguro(int fila, int col, int n, const vector<string>& tablero) {
    // 1. Checar columna hacia arriba (filas anteriores)
    for (int i = 0; i < fila; ++i) {
        if (tablero[i][col] == 'Q') return false;
    }

    // 2. Checar diagonal superior izquierda
    for (int i = fila, j = col; i >= 0 && j >= 0; --i, --j) {
        if (tablero[i][j] == 'Q') return false;
    }

    // 3. Checar diagonal superior derecha
    for (int i = fila, j = col; i >= 0 && j < n; --i, ++j) {
        if (tablero[i][j] == 'Q') return false;
    }

    return true;
}

void resolverNReinas(int fila, int n, vector<string>& tablero, vector<vector<string>>& soluciones) {
    // Caso Base: Hemos logrado colocar reinas en todas las filas (0 a n-1)
    if (fila == n) {
        soluciones.push_back(tablero);
        return; // Encontramos una solución, regresamos para buscar más
    }

    // Probar poner la reina en cada columna de la fila actual
    for (int col = 0; col < n; ++col) {
        // PODA: Solo entramos si la posición es segura
        if (esSeguro(fila, col, n, tablero)) {
            // 1. Tomar decisión (DO)
            tablero[fila][col] = 'Q';
            
            // 2. Recursión (RECURSE)
            resolverNReinas(fila + 1, n, tablero, soluciones);
            
            // 3. Deshacer decisión (UNDO / BACKTRACK)
            tablero[fila][col] = '.';
        }
    }
}
```

## Ejercicios Recomendados

* **[46. Permutations (LeetCode)](https://leetcode.com/problems/permutations/)**
    * El "Hello World" del backtracking. Generar todas las formas de ordenar un arreglo.
* **[37. Sudoku Solver (LeetCode)](https://leetcode.com/problems/sudoku-solver/)**
    * Backtracking clásico con poda fuerte (verificar filas, columnas y recuadros 3x3).
* **[51. N-Queens (LeetCode)](https://leetcode.com/problems/n-queens/)**
    * El problema que acabamos de ver.
