---
title: Análisis de Código
description: Ejemplos de O(1) hasta O(N!).
sidebar:
  order: 2
---

## Gráfica de Crecimiento

Es vital entender qué tan rápido "explotan" las funciones conforme $N$ crece.



Orden de mejor a peor:
$$O(1) < O(\log N) < O(\sqrt{N}) < O(N) < O(N \log N) < O(N^2) < O(2^N) < O(N!)$$

---

## Ejemplos Prácticos

### $O(1)$ - Tiempo Constante
No importa si $N = 10$ o $N = 10^9$, tarda lo mismo.

```cpp
// Acceso a array o matemáticas simples
int obtenerElemento(vector<int>& arr, int index) {
    return arr[index]; // Una sola operación
}
```
### $O(\log n)$ - Logarítmico
El problema se reduce a la mitad en cada paso. Típico de Binary Search.
* Si $N=1,000,000$, solo toma $≈20$ pasos $(220≈106)$.

```cpp
// Dividir N sucesivamente
while (N > 0) {
    N /= 2; // El espacio de búsqueda se reduce a la mitad
    // Operaciones constantes aquí...
}
```

### $O(\sqrt{n})$ - Raíz Cuadrada
Común en teoría de números (Test de primalidad, descomposición en factores).
* Si $N=109$, toma $≈31,622$ pasos. Mucho mejor que $O(N)$.

```cpp
// Test de primalidad ingenuo
bool esPrimo(int n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; ++i) { // i llega hasta sqrt(n)
        if (n % i == 0) return false;
    }
    return true;
}
```

### $O(n)$ - Lineal
Recorremos la entrada una vez. Si duplicas N, duplicas el tiempo.

```cpp
// Suma de elementos o Búsqueda lineal
long long suma = 0;
for (int i = 0; i < N; ++i) {
    suma += arr[i];
}
```
### $O(N \log N)$ - Linealítmico
El estándar de los ordenamientos eficientes (`std::sort`, Merge Sort) y estructuras de datos basadas en árboles (Maps, Sets, Segment Trees).
* Si $N = 10^6$, toma $\approx 2 \times 10^7$ operaciones. Es el límite seguro para 1 segundo con $N=2 \cdot 10^5$.

```cpp
// La mayoría de los ordenamientos eficientes
sort(arr.begin(), arr.end()); // C++ usa Introsort (mezcla de Quick, Heap y Insertion)
```

### $O(n^2)$ - Cuadrático
Bucles anidados. Típico de fuerza bruta o algoritmos sencillos como Bubble Sort.
* Peligroso para N>104 (10,000 elementos).

```cpp
// Recorrer todos los pares posibles
for (int i = 0; i < N; ++i) {
    for (int j = 0; j < N; ++j) {
        // Operación con arr[i] y arr[j]
        cout << i << ", " << j << endl;
    }
}
```

### $O(2^N)$ - Exponencial
Recursión ramificada. Por cada elemento, generamos dos ramas nuevas. Típico de generar __Subsets__ (Subconjuntos) o Fibonacci recursivo sin DP.
* Solo viable para $N≤20−25$.

```cpp
// Fibonacci recursivo ineficiente
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2); // Dos llamadas por cada n
}
```

### $O(N!)$ - Factorial
Generar todas las permutaciones posibles de un arreglo. Crece extremadamente rápido.
* Solo viable para $N≤10−11$.

```cpp
// Generar todas las formas de ordenar el arreglo
sort(arr.begin(), arr.end());
do {
    // Procesar permutación actual
} while (next_permutation(arr.begin(), arr.end()));
```
