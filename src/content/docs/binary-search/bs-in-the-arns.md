---
title: Búsqueda Binaria sobre la Respuesta
description: Aprende a optimizar problemas de búsqueda de valores máximos o mínimos usando Binary Search on the Answer.
sidebar:
  order: 2
---

## El Problema: Límite de Capacidad (Array Division)

Tienes una secuencia de `n` elementos con pesos específicos y necesitas empacarlos (manteniendo su orden original) en un máximo de `k` cajas. Cada caja tiene un límite de capacidad máxima permitida. 

Tu objetivo es encontrar la **mínima capacidad máxima** posible que deben tener las cajas para que todos los elementos quepan.

### Naive Approach (Fuerza Bruta)

Sabemos que la capacidad de las cajas no puede ser menor al elemento más pesado (si lo fuera, ese elemento simplemente no cabría en ninguna caja). 

Podríamos intentar resolver esto probando cada capacidad `C` de manera lineal: comenzamos con `C = max(peso)`, luego verificamos si es posible empacar todo en `k` cajas. Si no es posible, probamos con `C = max(peso) + 1`, y así sucesivamente hasta encontrar la primera capacidad que funcione.

* **¿Por qué no funciona?** Los pesos y la cantidad de elementos pueden ser enormes. Si la suma de todos los pesos alcanza $10^{14}$, iterar de uno en uno tomará demasiado tiempo. La complejidad temporal sería de $O(N \cdot \text{Suma})$, lo que causará un *Time Limit Exceeded* (TLE).

---

## ¿Qué es Búsqueda Binaria sobre la Respuesta?

Es una técnica de optimización que usa búsqueda binaria sobre un **rango de posibles respuestas** a un problema, en lugar de hacerlo sobre los índices de un arreglo.

* Se aplica a problemas donde necesitamos encontrar un **valor máximo o mínimo** que cumpla una cierta condición.
* La idea clave es transformar el problema de "encontrar un valor óptimo" a un problema de decisión booleana: **"¿Es un valor de capacidad M una respuesta válida?"**.
* Al responder esa pregunta de manera eficiente, podemos encontrar la solución óptima en tiempo logarítmico.

## La Clave: Una Función Monótona

Para que esta técnica funcione, el problema debe tener una **propiedad monótona**. Esto significa que el espacio de búsqueda se divide perfectamente en dos mitades continuas (una de respuestas inválidas y otra de válidas).

En nuestro problema de las cajas, si definimos la función $f(C)$ como "¿Es posible empacar todo con una capacidad máxima $C$?":
* Si una capacidad de `50` es válida ($f(50) = \text{True}$), cualquier capacidad mayor como `51`, `60` o `100` también será indiscutiblemente válida.
* Si una capacidad de `49` es inválida ($f(49) = \text{False}$), cualquier capacidad menor como `48` o `10` también será inválida.

:::note[Importante]
Esta monotonía es lo que nos permite descartar la mitad del espacio de búsqueda en cada paso, reduciendo la complejidad del problema a $O(N \log(\text{Suma}))$.
:::

---

## Solución al Problema de las Cajas

A continuación se detalla cómo aplicar la técnica al problema inicial siguiendo tres pasos estrictos.

### Paso 1: Definir el Espacio de Búsqueda
La respuesta correcta siempre estará limitada por dos extremos lógicos:
* **Límite inferior (`low`):** El peso del elemento más pesado. (No podemos tener una capacidad menor a esto).
* **Límite superior (`high`):** La suma total de los pesos de todos los elementos. (El peor caso, donde ponemos todos los elementos en una sola caja).

### Paso 2: Crear la Función de Decisión `check(mid)`
Dado un candidato `mid` (que representa la capacidad máxima de la caja), intentamos empacar los elementos de forma codiciosa (*greedy*):
1. Añadimos elementos a la caja actual mientras la suma no exceda `mid`.
2. Si el siguiente elemento hace que el peso supere `mid`, cerramos esa caja y empezamos a llenar una nueva.
3. Si en algún momento la cantidad de cajas utilizadas supera `k`, significa que la capacidad `mid` es demasiado pequeña (retorna `false`). Si logramos empacar todo usando `k` cajas o menos, la capacidad es factible (retorna `true`).

### Paso 3: Implementación en C++

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

// Paso 2: Función de validación
bool check(long long mid, const vector<int>& weights, int k) {
    int boxes_used = 1;
    long long current_weight = 0;

    for (int w : weights) {
        // Intentamos agregar el peso a la caja actual
        if (current_weight + w > mid) {
            boxes_used++; // Necesitamos una nueva caja
            current_weight = w; // Colocamos el elemento en la nueva caja
            
            if (boxes_used > k) {
                return false; // Excedimos el límite de cajas permitidas
            }
        } else {
            current_weight += w; // Aún cabe en la caja actual
        }
    }
    return true;
}

int main() {
    int n = 5;
    int k = 3;
    vector<int> weights = {2, 4, 7, 3, 5};

    // Paso 1: Definir límites
    long long low = *max_element(weights.begin(), weights.end());
    long long high = accumulate(weights.begin(), weights.end(), 0LL);
    long long ans = high;

    // Paso 3: Búsqueda Binaria
    while (low <= high) {
        long long mid = low + (high - low) / 2;

        if (check(mid, weights, k)) {
            // 'mid' es válido. 
            // Guardamos la respuesta e intentamos buscar una capacidad aún MENOR.
            ans = mid;
            high = mid - 1;
        } else {
            // 'mid' es demasiado pequeño. 
            // Necesitamos probar con capacidades MAYORES.
            low = mid + 1;
        }
    }

    cout << "La capacidad minima maxima es: " << ans << "\n";
    return 0;
}
```

---

## Ejercicios Recomendados

Practica esta técnica identificando la monotonía y construyendo funciones `check(mid)` en los siguientes problemas:

* **[CSES 1085 - Array Division](https://cses.fi/problemset/task/1085)** *(Es el problema exacto que acabamos de resolver).*
* **[Codeforces 1221C - Perfect Teams](https://codeforces.com/problemset/problem/1221/C)**
* **[Codeforces 1873E - Building an Aquarium](https://codeforces.com/problemset/problem/1873/E)**
* **[Codeforces 371C - Hamburgers](https://codeforces.com/problemset/problem/371/C)**