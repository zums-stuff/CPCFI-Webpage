---
title: Prefix Sum & Difference Array
description: Consultas de rango en O(1) y actualizaciones eficientes.
sidebar:
  order: 3
---

## El Problema: Range Sum Queries

Supongamos que tenemos un arreglo de $N$ números y nos hacen $Q$ preguntas.
Cada pregunta es: *"¿Cuál es la suma de los elementos entre el índice $L$ y $R$?"*

* **Fuerza Bruta:** Usar un ciclo `for` para cada pregunta.
    * Complejidad: $O(N \cdot Q)$. (Muy lento si $N, Q \le 10^5$).
* **Nuestro Objetivo:** Responder cada pregunta en tiempo constante **$O(1)$**.

---

## La Solución: Prefix Sum

Un arreglo de **Sumas de Prefijos** (Cumulative Sum) es una estructura donde cada elemento `P[i]` guarda la suma de todos los elementos originales desde el índice `0` hasta `i`.

[Image of prefix sum array visualization]

### Fórmula Clave
Para un arreglo original $A$, construimos $P$:
$$P[i] = P[i-1] + A[i]$$

Una vez construido, la suma del rango $[L, R]$ se calcula restando el prefijo que "sobra":
$$\text{Suma}(L, R) = P[R] - P[L-1]$$

*(Nota: Si $L=0$, la suma es simplemente $P[R]$).*

### Implementación en C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<long long> A = {2, 4, 1, 7, 6};
    int n = A.size();
    
    // 1. Crear arreglo de prefijos (tamaño n)
    vector<long long> P(n);

    // 2. Construcción en O(N)
    P[0] = A[0];
    for (int i = 1; i < n; ++i) {
        P[i] = P[i-1] + A[i];
    }
    
    // 3. Consulta de rango [2, 4] en O(1)
    // Rango: {1, 7, 6} -> Suma: 14
    int L = 2, R = 4;
    
    long long suma;
    if (L == 0) suma = P[R];
    else suma = P[R] - P[L-1];
    
    cout << "Suma del rango [2, 4] es: " << suma << endl;
    
    return 0;
}
```

## El Gemelo: Suffix Sum

Es el espejo del Prefix Sum. Un arreglo $S$ donde cada elemento `S[i]` contiene la suma desde $i$ hasta el final ($N-1$).
* Se construye de derecha a izquierda.
* Útil cuando necesitas dividir el arreglo en dos partes y comparar la suma izquierda vs. derecha.

---

## La Contraparte: Difference Array

Si Prefix Sum es para **consultas** rápidas, el Arreglo de Diferencias es para **actualizaciones** de rango rápidas.

Definición: `D[i] = A[i] - A[i-1]`
* La magia: El arreglo original $A$ es el *Prefix Sum* del arreglo de diferencias $D$.



### Actualización de Rango en $O(1)$
Queremos sumar un valor $x$ a todos los elementos desde $L$ hasta $R$. En lugar de un ciclo, hacemos solo 2 operaciones:

1.  Sumar $x$ en el inicio del rango: `D[L] += x`
2.  Restar $x$ justo después del final: `D[R+1] -= x`

Esto crea un efecto de "onda" que, al reconstruir el arreglo con sumas de prefijos, aumenta todo el rango y se cancela justo donde termina.

### Ejemplo de Lógica (Difference Array)

```cpp
// Inicialmente todo en 0
vector<int> diff(n + 1, 0);

// Operación: Sumar 5 al rango [2, 4]
int L = 2, R = 4, val = 5;

diff[L] += val;     // Inicio del cambio
diff[R + 1] -= val; // Fin del cambio

// Reconstruir el arreglo final
vector<int> resultado(n);
int actual = 0;
for(int i = 0; i < n; i++) {
    actual += diff[i];
    resultado[i] = actual;
}
```

## Variaciones y Limitaciones

### 1. Prefix XOR
Funciona exactamente igual que la suma.
$$\text{XOR}(L, R) = P_{xor}[R] \oplus P_{xor}[L-1]$$
* **¿Por qué funciona?** Porque el XOR es su propia inversa ($A \oplus A = 0$). Al hacer XOR del rango total con el prefijo anterior, los elementos repetidos se cancelan.

### 2. Prefix GCD?
**¡Cuidado!** No existe el "Prefix GCD" simple.
* **Razón:** El GCD no tiene operación inversa. No puedes "restar" un GCD.
* **Solución:** Para consultas de rango de GCD, Mínimo o Máximo, necesitas estructuras avanzadas como **Sparse Table** (estático) o **Segment Tree** (dinámico).

---

## Ejercicios Recomendados

* **[303. Range Sum Query - Immutable (LeetCode)](https://leetcode.com/problems/range-sum-query-immutable/)**
    * La implementación básica de la clase Prefix Sum.
* **[1709B. Also Try Minecraft (Codeforces)](https://codeforces.com/problemset/problem/1709/B)**
    * Un problema excelente que requiere tanto Prefix Sum como Suffix Sum.
* **[1310. XOR Queries of a Subarray (LeetCode)](https://leetcode.com/problems/xor-queries-of-a-subarray/)**
    * Aplicación directa de la variación con XOR.
