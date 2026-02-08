---
title: Búsqueda Binaria
description: Aprende a buscar elementos en O(log n) y a usar lower_bound en C++.
sidebar:
  order: 1
---

## ¿Qué es?

La **Búsqueda Binaria** es un algoritmo que encuentra la posición de un valor en un arreglo **ordenado** comparando el valor con el elemento en el medio del arreglo.

**Complejidad:** $O(\log n)$

## Implementación en C++

Aquí tienes el código estándar que no causa *overflow* al calcular la mitad:

```cpp
#include <vector>

int binarySearch(const std::vector<int>& arr, int key) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        // Calculamos mid así para evitar overflow en (low + high)
        int mid = low + (high - low) / 2;

        if (arr[mid] == key) {
            return mid; // ¡Encontrado! Retorna el índice
        } 
        
        if (arr[mid] < key) {
            low = mid + 1; // Está en la mitad derecha
        } else {
            high = mid - 1; // Está en la mitad izquierda
        }
    }

    return -1; // No existe en el arreglo
}
```

## Uso de la STL

En programación competitiva, casi nunca escribimos la función `binarySearch` manualmente. Usamos las funciones optimizadas de C++:

* `std::binary_search`: Solo te dice `true` o `false`.
* `std::lower_bound`: Devuelve el iterador al primer elemento **mayor o igual**.
* `std::upper_bound`: Devuelve el iterador al primer elemento **estrictamente mayor**.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 3, 3, 5, 7};
    int key = 3;
    
    // Buscar el primer 3 (lower_bound)
    auto it = std::lower_bound(v.begin(), v.end(), key);
    
    if (it != v.end() && *it == key) {
        std::cout << "Encontrado en índice: " << (it - v.begin()) << "\n";
    } else {
        std::cout << "No encontrado\n";
    }
    
    return 0;
}
```

:::tip[Consejo]
*Siempre que puedas, usa `lower_bound`. Es menos propenso a errores (bugs) que implementar los índices `low` y `high` manualmente, especialmente en los límites del arreglo.*
:::
