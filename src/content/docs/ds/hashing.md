---
title: Hashing (USet, UMap)
description: Aprende cómo funcionan las tablas hash y los contenedores unordered de la STL.
sidebar:
  order: 1
---

## ¿Qué es Hashing?

El **Hashing** es una técnica que transforma una entrada (llave) en un valor de tamaño fijo llamado *código hash*. Este valor se utiliza para calcular una posición en una **tabla hash**, lo que permite un acceso promedio de $O(1)$.



---

## Función Hash

Una **función hash** transforma una llave en un valor entero que determina su posición en la tabla.
Ejemplo simple con $h(k) = k \mod 7$:

```cpp
h(10) = 3  // 10 % 7 = 3
h(21) = 0  // 21 % 7 = 0
h(32) = 4  // 32 % 7 = 4
```

Cada llave se almacena en una posición distinta de la tabla, idealmente sin chocar.

---

## Tabla Hash 

Es la estructura de datos que utiliza la función hash para distribuir los elementos.
* Cada entrada ("bucket") apunta a los datos que tienen el mismo valor hash.
* Las entradas usadas con frecuencia tienden a tener búsquedas más rápidas.

---

## Colisiones

Ocurren cuando dos llaves distintas generan el mismo valor hash.
Ejemplo con $h(k) = k \mod 10$:

```cpp
h(114)  = 4
h(224)  = 4
h(1384) = 4
```
### ¿Cómo manejarlas?

1.  **Reasignación (Open Addressing):** Si la posición calculada está ocupada, busca el siguiente espacio libre en la tabla. Puede degradar la búsqueda a $O(N)$ si la tabla se llena mucho.
2.  **Encadenamiento (Chaining):** Cada entrada de la tabla mantiene una **lista enlazada** (o vector) con todos los elementos que cayeron ahí.
    * **Dato:** Este es el método que usa la STL de C++ internamente.

---

## Contenedores en C++ (STL)

#### 1. `unordered_set`
Almacena valores **únicos** en "buckets" dependiendo de su hash.
* **Características:** No mantiene orden, no permite duplicados.
* **Complejidad:** Inserción, borrado y búsqueda en $O(1)$ promedio.

#### 2. `unordered_map`
Almacena pares **clave-valor**.
* **Características:** Acceso rápido a través de la llave.
* **Uso:** Ideal para diccionarios de frecuencias o memorización.

---

## Métodos Principales

### Insertar (`insert`)

```cpp
#include <iostream>
#include <unordered_set>
#include <unordered_map>
using namespace std;

int main() {
    // UNORDERED SET
    unordered_set<int> s;
    s.insert(5);
    s.insert(10);
    s.insert(5); // No hace nada, el 5 ya existe

    // UNORDERED MAP
    unordered_map<string, int> mp;
    mp.insert({"apple", 2});
    
    // Forma alternativa y más común para mapas:
    mp["orange"] = 3; 
    mp["apple"] += 1; // Modifica el valor existente (ahora es 3)
}
```

### Buscar (`find` y `[]`)

```cpp
// SET
if (s.find(10) != s.end()) {
    cout << "10 encontrado en el set\n";
}

// MAP
// Opción A: Usar find() (Seguro, no crea elementos)
if (mp.find("apple") != mp.end()) {
    cout << "Apple tiene valor: " << mp["apple"] << "\n";
}

// Opción B: Usar [] (Cuidado: SI NO EXISTE, LO CREA con valor 0)
cout << "Valor de uvas: " << mp["grapes"] << "\n"; // Crea "grapes" -> 0
```

### Borrar (`erase`) y Estado (`empty`, `size`)

```cpp
s.erase(5);         // Borra el 5
mp.erase("banana"); // Borra la entrada "banana"

if (s.empty()) cout << "Set vacio\n";
cout << "Tamaño del mapa: " << mp.size() << "\n";
```

:::danger[Cuidado con el Peor Caso]
Aunque el promedio es $O(1)$, existen casos "anti-hash" donde todas las llaves colisionan, degradando el rendimiento a $O(N)$. En problemas de **Codeforces**, a veces es necesario usar un **Custom Hash** para evitar que te "hackeen" la solución con casos de prueba maliciosos.
:::

---

## Ejercicios Recomendados

Practica el uso de tablas hash con estos problemas:

* **[1722C. Word Game (Codeforces)](https://codeforces.com/problemset/problem/1722/C)**
    * Uso básico de mapas para contar frecuencias de palabras entre tres personas.
* **[677. Map Sum Pairs (LeetCode)](https://leetcode.com/problems/map-sum-pairs/)**
    * Un problema interesante que combina prefijos y mapas.
* **[1. Two Sum (LeetCode)](https://leetcode.com/problems/two-sum/)**
    * El clásico de clásicos. Intenta resolverlo en $O(N)$ usando un mapa para guardar los complementos vistos.
