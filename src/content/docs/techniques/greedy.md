---
title: Greedy
description: Estrategia de optimización tomando la mejor decisión local.
sidebar:
  order: 1
---

## ¿Qué es Greedy?

Un algoritmo **Greedy** (o Voraz) es una estrategia que toma decisiones **localmente óptimas** en cada paso con la esperanza de encontrar una solución **globalmente óptima**.

* **Filosofía:** "Elige lo que parece mejor *ahora mismo*, sin preocuparte por el futuro".
* **Ventaja:** Son muy rápidos y fáciles de implementar.
* **Desventaja:** No siempre garantizan la solución óptima (requieren demostración matemática).

### Propiedades Clave

Para que un problema se pueda resolver con Greedy, debe cumplir dos condiciones:
1.  **Elección Voraz:** Podemos tomar la mejor decisión local y eso nos llevará a la solución global.
2.  **Subestructura Óptima:** La solución óptima del problema contiene soluciones óptimas a sus subproblemas.



---

## Estructura General

La mayoría de los algoritmos Greedy siguen este patrón:

1.  **Ordenar** los datos (casi siempre el primer paso).
2.  Iterar sobre los candidatos.
3.  Si el candidato actual es factible, lo agregamos a la solución.

```cpp
// Pseudocódigo estilo C++
TipoSolucion algoritmoGreedy(vector<Dato>& candidatos) {
    TipoSolucion solucion;
    
    // Paso CRUCIAL: El orden define la estrategia greedy
    sort(candidatos.begin(), candidatos.end(), criterioOrdenamiento);

    for (auto& candidato : candidatos) {
        if (esFactible(solucion, candidato)) {
            agregar(solucion, candidato);
        }
    }
    return solucion;
}
```

## ¿Cuándo falla Greedy?

Greedy es tentador, pero peligroso. Un ejemplo clásico donde **NO** funciona es el **Problema del Cambio (Coin Change)** con denominaciones arbitrarias.

* **Caso:** Monedas `{1, 7, 10}`. Objetivo: `14`.
* **Greedy:** Toma la mayor posible (10). Restan 4. Toma (1), (1), (1), (1).
    * Total: 5 monedas (`10+1+1+1+1`).
* **Óptimo (DP):** Toma (7) y (7).
    * Total: 2 monedas (`7+7`).

:::danger[Advertencia]
Si no puedes demostrar matemáticamente que la elección voraz siempre funciona (como en el caso de las monedas estándar 1, 2, 5, 10...), es probable que necesites **Programación Dinámica** o **Backtracking**.
:::

---

## Ejercicios Recomendados

* **[158A - Next Round (Codeforces)](https://codeforces.com/problemset/problem/158/A)** - Greedy muy básico.
* **[435. Non-overlapping Intervals (LeetCode)](https://leetcode.com/problems/non-overlapping-intervals/)** - El problema de selección de actividades disfrazado.
* **[455. Assign Cookies (LeetCode)](https://leetcode.com/problems/assign-cookies/)** - Asignación voraz simple.
