---
title: Búsqueda Binaria y STL
description: Fundamentos teóricos de Binary Search y análisis de lower_bound y upper_bound.
sidebar:
  order: 1
---

## Fundamentos Técnicos

La **Búsqueda Binaria** es un algoritmo de divide y vencerás utilizado para localizar la posición de un elemento dentro de un espacio de búsqueda ordenado o monótono. 



En lugar de recorrer los elementos de forma secuencial ($O(N)$), el algoritmo compara el valor objetivo con el elemento central del arreglo. Dependiendo del resultado de la comparación, descarta la mitad del espacio de búsqueda donde es matemáticamente imposible que se encuentre el objetivo.

* **Complejidad de Tiempo:** $O(\log N)$
* **Complejidad de Espacio:** $O(1)$ (en su forma iterativa).

---

## Implementación Manual

La implementación clásica requiere el manejo de dos punteros (`low` y `high`) que delimitan el espacio de búsqueda activo.

### El problema del Overflow
Una práctica común pero incorrecta es calcular el punto medio usando `(low + high) / 2`. Si los índices son muy grandes (cercanos al límite de un entero de 32 bits, $2^{31}-1$), la suma `low + high` provocará un desbordamiento de entero (*integer overflow*), resultando en valores negativos y un posterior *Segmentation Fault*.

La forma matemáticamente equivalente y segura en memoria es `low + (high - low) / 2`.

```cpp
#include <vector>

int binarySearch(const std::vector<int>& arr, int key) {
    int low = 0;
    int high = arr.size() - 1;

    // Cuando los índices se encuentran, se detiene
    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == key) {
            return mid; // Valor encontrado, retorna el índice exacto
        } 
        
        if (arr[mid] < key) {
            // El valor objetivo es mayor, descartamos la mitad izquierda y buscamos en la derecha
            low = mid + 1; 
        } else {
            // El valor objetivo es menor, descartamos la mitad derecha y buscamos en la izquierda
            high = mid - 1; 
        }
    }

    return -1; // No se encontró *
}
```

---

## Uso de la STL en C++

En programación competitiva, implementar la búsqueda binaria desde cero es propenso a errores de límites. La biblioteca estándar de C++ (STL) provee tres funciones altamente optimizadas que operan en $O(\log N)$. 

Todas estas funciones requieren que el rango sobre el que operan sea una función monótona y devuelven iteradores.

### 1. `std::binary_search`
Esta es la función más estricta y restrictiva. Solo evalúa la existencia del elemento.

* **Retorno:** Un valor booleano (`true` si el elemento existe, `false` si no).
* **Caso de uso:** Validaciones rápidas donde la posición exacta o la cantidad de elementos irrelevante.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 3, 5, 5, 7, 9};
    
    bool exists = std::binary_search(v.begin(), v.end(), 5);
    // exists es true

    bool exists_four = std::binary_search(v.begin(), v.end(), 4);
    // exists_four es false
    
    return 0;
}
```

### 2. `std::lower_bound`
Es la función más versátil y utilizada en la programación competitiva.

* **Definición:** Devuelve un iterador apuntando al **primer elemento que no es menor** que el valor objetivo (es decir, mayor o igual $\ge$).
* **Retorno:** Iterador. Si todos los elementos son menores que el objetivo, devuelve `v.end()`.
* **Cálculo de índice:** Para obtener el índice numérico (Base 0), se debe restar el iterador inicial: `it - v.begin()`.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    // Índices:           0  1  2  3  4  5
    std::vector<int> v = {1, 3, 5, 5, 7, 9};
    
    // Buscando un elemento que existe repetido
    auto it1 = std::lower_bound(v.begin(), v.end(), 5);
    std::cout << "Indice de primer 5: " << (it1 - v.begin()) << "\n"; // Salida: 2

    // Buscando un elemento que no existe
    auto it2 = std::lower_bound(v.begin(), v.end(), 6);
    std::cout << "Indice para insertar 6: " << (it2 - v.begin()) << "\n"; // Salida: 4 (apunta al 7)

    return 0;
}
```

### 3. `std::upper_bound`
Funciona como el límite superior estricto del espacio de búsqueda.

* **Definición:** Devuelve un iterador apuntando al **primer elemento que es estrictamente mayor** que el valor objetivo ($>$).
* **Retorno:** Iterador. Si no existe ningún elemento mayor, devuelve `v.end()`.
* **Caso de uso práctico:** En combinación con `lower_bound`, permite encontrar el rango de elementos duplicados. La diferencia `upper_bound - lower_bound` da la frecuencia exacta de un número en un arreglo ordenado en $O(\log N)$.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    // Índices:           0  1  2  3  4  5
    std::vector<int> v = {1, 3, 5, 5, 7, 9};
    
    // Buscando un elemento que existe repetido
    auto it1 = std::upper_bound(v.begin(), v.end(), 5);
    std::cout << "Primer elemento mayor a 5 en indice: " << (it1 - v.begin()) << "\n"; // Salida: 4 (apunta al 7)

    // Contar ocurrencias del número 5
    auto lb = std::lower_bound(v.begin(), v.end(), 5);
    auto ub = std::upper_bound(v.begin(), v.end(), 5);
    std::cout << "Frecuencia del 5: " << (ub - lb) << "\n"; // Salida: 2
    
    return 0;
}
```

---

## Representación Visual



Para entender el comportamiento de `lower_bound` y `upper_bound`, analiza el siguiente arreglo ordenado `A` de tamaño 7:

| Índice | `0` | `1` | `2` | `3` | `4` | `5` | `6` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Valor** | 10 | 20 | 20 | 20 | 40 | 50 | 60 |

#### Caso A: Búsqueda del valor `20` (Elemento repetido)
* **`lower_bound(20)`:** Busca el primer valor $\ge 20$. Retorna un iterador al **índice `1`**.
* **`upper_bound(20)`:** Busca el primer valor $> 20$. Retorna un iterador al **índice `4`** (apunta al `40`).
* **Conclusión:** El rango de elementos iguales a `20` es `[1, 4)`. La cantidad de elementos es $4 - 1 = 3$.

#### Caso B: Búsqueda del valor `30` (Elemento inexistente)
* **`lower_bound(30)`:** Busca el primer valor $\ge 30$. Retorna un iterador al **índice `4`** (apunta al `40`).
* **`upper_bound(30)`:** Busca el primer valor $> 30$. Retorna un iterador al **índice `4`** (apunta al `40`).
* **Conclusión:** Como ambos iteradores apuntan al mismo índice, la diferencia es $4 - 4 = 0$. Esto nos confirma matemáticamente que el valor `30` no existe en el arreglo y nos indica que el índice `4` es la posición correcta si quisiéramos insertarlo manteniendo el orden.

---

---

## Ejercicios Recomendados

Para dominar estos conceptos y el manejo de índices, resuelve los siguientes problemas:

* **[LeetCode 704 - Binary Search](https://leetcode.com/problems/binary-search/)**: Implementación pura para asegurar el manejo de punteros manuales.
* **[LeetCode 34 - Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)**: Aplicación directa de `lower_bound` y `upper_bound` para delimitar rangos.
* **[Codeforces - 2025 A. Two Screens](https://codeforces.com/problemset/problem/2025/A)**: Aplicación de binary search manual para encontrar un cuadrado.