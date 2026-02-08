---
title: Edit Distance
description: Calcula el costo mínimo para transformar una cadena en otra.
sidebar:
  order: 1
---

Para reducir ambigüedades, en este artículo nos referiremos a la cadena vacía como $\epsilon$ (epsilon).

## El Problema

Dadas dos cadenas $s1$ y $s2$, el objetivo es encontrar el **número mínimo de operaciones** para convertir $s1$ en $s2$.

Las operaciones permitidas son:
1.  **Insertar** un carácter.
2.  **Eliminar** un carácter.
3.  **Reemplazar** un carácter.

Este es un problema clásico de optimización que se resuelve elegantemente con **Programación Dinámica**.

---

## Subproblemas y Recurrencia

La clave de la DP es resolver un problema grande dividiéndolo en subproblemas más pequeños. En lugar de pensar en los strings completos, nos enfocamos en sus **prefijos**.

Si queremos calcular `dist(s1, s2)`, consideramos los últimos caracteres que estamos analizando (digamos índices $i$ y $j$).

* **Caso A: Los caracteres son iguales ($s1[i] == s2[j]$)**
    ¡Genial! No necesitamos hacer nada. El costo no aumenta.
    $$dp[i][j] = dp[i-1][j-1]$$

* **Caso B: Los caracteres son distintos ($s1[i] \neq s2[j]$)**
    Debemos realizar una operación. Tenemos 3 opciones y elegimos la más barata (el mínimo):
    1.  **Reemplazar:** Costo $1 + dp[i-1][j-1]$
    2.  **Eliminar:** Costo $1 + dp[i-1][j]$
    3.  **Insertar:** Costo $1 + dp[i][j-1]$

$$dp[i][j] = 1 + \min(Reemplazar, Eliminar, Insertar)$$

---

## Los Casos Base (Los Bordes)

Antes de rellenar la tabla, necesitamos establecer los puntos de partida (convertir algo en una cadena vacía o viceversa).

### 1. Primera Fila: Convertir $\epsilon$ en $s2$
Representa convertir un string vacío en un prefijo de $s2$. La única forma es **insertando** caracteres.
* `dp[0][j] = j` (Costo = $j$ inserciones).

### 2. Primera Columna: Convertir $s1$ en $\epsilon$
Representa convertir un prefijo de $s1$ en un string vacío. La única forma es **eliminando** caracteres.
* `dp[i][0] = i` (Costo = $i$ eliminaciones).

---

## Ejemplo: "horse" $\to$ "ros"

Construyamos la tabla.
* Filas: `horse` ($s1$)
* Columnas: `ros` ($s2$)

| | $\epsilon$ | r | o | s |
|---|---|---|---|---|
| **$\epsilon$** | 0 | 1 | 2 | 3 |
| **h** | 1 | 1 | 2 | 3 |
| **o** | 2 | 2 | 1 | 2 |
| **r** | 3 | 2 | 2 | 2 |
| **s** | 4 | 3 | 3 | 2 |
| **e** | 5 | 4 | 4 | **3** |

:::tip[Resultado]
La respuesta final es el valor en la esquina inferior derecha: **3**.
:::

---

## Implementación en C++

Aquí tienes la solución iterativa (Bottom-Up) que llena la tabla que vimos arriba.

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int EditDistance(string word1, string word2) {
    int n = word1.length();
    int m = word2.length();

    // dp[i][j] = costo para convertir los primeros 'i' chars de word1
    // en los primeros 'j' chars de word2.
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));

    // 1. Casos base: Llenar bordes
    for (int i = 0; i <= n; ++i) dp[i][0] = i; // Eliminaciones
    for (int j = 0; j <= m; ++j) dp[0][j] = j; // Inserciones

    // 2. Llenar el resto de la tabla
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            
            // Nota: word1[i-1] es el caracter actual porque los strings son 0-indexados
            if (word1[i - 1] == word2[j - 1]) {
                // Coincidencia: Tomamos el valor de la diagonal sin sumar costo
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Diferencia: 1 + el mínimo de las 3 operaciones posibles
                dp[i][j] = 1 + min({
                    dp[i - 1][j - 1], // Reemplazar (Diagonal)
                    dp[i - 1][j],     // Eliminar (Arriba)
                    dp[i][j - 1]      // Insertar (Izquierda)
                });   
            }
        }
    }

    // La respuesta final está en la esquina inferior derecha
    return dp[n][m];
}
```

:::note[Análisis de Complejidad]
* **Tiempo:** $O(N \cdot M)$
    Debemos llenar una tabla de tamaño $N \times M$, y cada celda toma tiempo constante $O(1)$ en calcularse.
* **Espacio:** $O(N \cdot M)$
    Necesitamos almacenar la tabla completa en memoria.
:::

:::tip[Optimización de Espacio (Bonus)]
Si solo necesitas el **valor numérico** del costo (y no reconstruir qué operaciones hiciste), puedes reducir el espacio a **$O(\min(N, M))$**.

**¿Por qué?**
Observa que para calcular la fila actual `dp[i]`, solo necesitas mirar los valores de la fila inmediatamente anterior `dp[i-1]`. Las filas más viejas ya no son útiles. Podrías usar solo dos vectores: `actual` y `anterior`.
:::

---

## Ejercicios Recomendados 🏋️

Practica estas variaciones para dominar la DP en strings:

* **[72. Edit Distance (LeetCode)](https://leetcode.com/problems/edit-distance/)**
    * El problema clásico. Intenta implementarlo sin mirar el código.

* **[712. Minimum ASCII Delete Sum (LeetCode)](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)**
    * **Variación:** En lugar de que borrar cueste `1`, el costo es el **valor ASCII** del carácter borrado (ej. borrar 'a' cuesta 97).
    * *Pista:* Cambia los `+ 1` en la fórmula por `+ word1[i]`.

* **[1143. Longest Common Subsequence (LeetCode)](https://leetcode.com/problems/longest-common-subsequence/)**
    * Este es el "primo hermano" del Edit Distance. La lógica es casi idéntica, pero solo permitiendo "coincidencias" y buscando maximizar en lugar de minimizar costo.
