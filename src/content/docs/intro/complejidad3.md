---
title: Límites Prácticos y Memoria
description: La regla del 10^8 y cómo elegir el algoritmo correcto.
sidebar:
  order: 3
---

## La Regla de Oro: $10^8$ ops/seg

En la mayoría de los jueces (Codeforces, LeetCode, OmegaUp), el límite de tiempo estándar es de **1 segundo**.

Una computadora moderna puede ejecutar aproximadamente **$10^8$ (100 millones)** de operaciones elementales por segundo.

### Tabla de Referencia Rápida
Antes de escribir código, mira el valor máximo de $N$ en el problema y busca qué complejidad te puedes permitir:

| Límite de $N$ | Complejidad Aceptable | Algoritmos Posibles |
| :--- | :--- | :--- |
| $N \le 10$ | $O(N!)$ | Permutaciones, Backtracking puro. |
| $N \le 20$ | $O(2^N)$ | Máscaras de Bits, Subsets, Backtracking. |
| $N \le 500$ | $O(N^3)$ | Floyd-Warshall, Multiplicación de Matrices. |
| $N \le 5,000$ | $O(N^2)$ | Bubble Sort, DP básica, Pares iterativos. |
| $N \le 2 \cdot 10^5$ | $O(N \log N)$ | `std::sort`, Map/Set, Segment Tree. |
| $N \le 10^6$ | $O(N)$ | Two Pointers, Sliding Window, KMP, Hashing. |
| $N \le 10^9$ | $O(\sqrt{N})$ | Primalidad, Factorización. |
| $N \le 10^{18}$ | $O(\log N)$ | Binary Search, Exponenciación Binaria. |

:::tip[Pro Tip]
Si $N$ es pequeño (ej. $N \le 20$), **no busques** una solución lineal o logarítmica. Probablemente el problema requiera una solución exponencial ($2^N$) o factorial. ¡Usa la fuerza bruta inteligentemente!
:::

---

## Complejidad Espacial (Memoria)

El tiempo no lo es todo. Si usas demasiada RAM, obtendrás **Memory Limit Exceeded (MLE)**.

### Unidades Básicas
* `int`: 4 bytes.
* `long long`: 8 bytes.
* `char`: 1 byte.
* Límite típico: **256 MB**.

### Cálculo Rápido
Un arreglo de `int` de tamaño $10^7$ (10 millones) ocupa:
$$10^7 \times 4 \text{ bytes} \approx 40 \text{ MB}$$

Esto es seguro. Pero un arreglo de $10^8$ int ocuparía 400 MB $\to$ **MLE**.

:::danger[Recursión y Stack Overflow]
Cada llamada recursiva consume memoria en la **Pila (Stack)**. Si tu recursión es muy profunda ($> 10^5$ llamadas anidadas) y no usas iteración, podrías obtener un error de ejecución por desbordamiento de pila, aunque te sobre memoria RAM global.
:::
