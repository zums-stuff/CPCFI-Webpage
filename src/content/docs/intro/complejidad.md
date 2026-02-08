---
title: Introducción a la Complejidad
description: Entendiendo Big-O, Omega y Theta.
sidebar:
  order: 1
---

## ¿Por qué importa?

En programación competitiva, no medimos el tiempo en "segundos", sino en **operaciones fundamentales**.
* Las computadoras varían en velocidad.
* Los compiladores optimizan diferente.
* **Lo constante es:** Cómo crece el número de operaciones conforme crece la entrada ($N$).

## Las Tres Notaciones

Para describir el crecimiento, usamos tres letras griegas:



### 1. Big-O ($O$) - El Techo (Peor Caso)
Describe el **límite superior**. Nos asegura que el algoritmo *nunca* será más lento que esto.
* **Uso:** Es la más importante en CP. Si tu peor caso pasa en tiempo, tu solución sirve.
* **Ejemplo:** $O(N^2)$ significa que el tiempo crece cuadráticamente en el peor escenario.

### 2. Big-Omega ($\Omega$) - El Piso (Mejor Caso)
Describe el **límite inferior**.
* **Uso:** Rara vez útil en CP. Saber que un algoritmo es "al menos" rápido no nos dice si fallará con datos difíciles.
* **Ejemplo:** Linear Search tiene $\Omega(1)$ (si el dato está al inicio), pero eso no nos salva de recorrer todo el arreglo.

### 3. Big-Theta ($\Theta$) - El Ajuste Exacto
Describe el comportamiento cuando el límite superior e inferior son iguales (el algoritmo siempre tarda lo mismo, sin importar la suerte).
* **Ejemplo:** Merge Sort siempre hace $\approx N \log N$ comparaciones, por lo que es $\Theta(N \log N)$.

---

## Reglas de Cálculo

Al calcular la complejidad, seguimos dos reglas simples:

1.  **Ignorar Constantes:**
    * $O(2N)$ $\to$ $O(N)$
    * $O(500)$ $\to$ $O(1)$
    * *Razón:* Para $N$ muy grande, multiplicar por 2 no cambia la curva de crecimiento.

2.  **Dominancia de Términos:**
    * $O(N^2 + N + 100)$ $\to$ $O(N^2)$
    * *Razón:* El término cuadrático crece mucho más rápido que el lineal. El resto se vuelve irrelevante.

:::danger[¡Cuidado con las constantes ocultas!]
Aunque $O(100N)$ es teóricamente $O(N)$, en la práctica, esa constante "100" puede causar un TLE si el límite de tiempo es muy ajustado (ej. 0.5 segundos).
:::
