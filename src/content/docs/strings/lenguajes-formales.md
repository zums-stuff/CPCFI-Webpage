---
title: Lenguajes Formales
description: Alfabetos, Gramáticas, Autómatas y Expresiones Regulares.
sidebar:
  order: 2
---

En Programación Competitiva, muchos problemas de strings (como validación de paréntesis o búsqueda de patrones) son en realidad problemas de **Teoría de Lenguajes**.

## Conceptos Básicos

### Alfabeto ($\Sigma$)
Un conjunto finito de símbolos.
* Ejemplo: $\Sigma = \{a, b, \dots, z\}$

### Lenguaje ($L$)
Un conjunto de strings formadas con símbolos de $\Sigma$.
* Formalmente: $L \subseteq \Sigma^*$

### Operaciones
Sean $L_1$ y $L_2$ dos lenguajes:
* **Unión:** $L_1 \cup L_2$ (Cadenas que están en uno u otro).
* **Concatenación:** $L_1 L_2 = \{xy \mid x \in L_1, y \in L_2\}$.
* **Cerradura de Kleene ($L^*$):** Repetir $L$ cero o más veces (incluye la cadena vacía $\epsilon$).
* **Cerradura Positiva ($L^+$):** Repetir $L$ una o más veces.

---

## Expresiones Regulares (Regex)

Son una notación algebraica para definir lenguajes regulares (patrones).

**Ejemplo:** Definir un lenguaje para números (enteros o decimales, positivos o negativos).
* Alfabeto: Dígitos $D = \{0, \dots, 9\}$, signo $\{-\}$, punto $\{.\}$.
* Expresión:
  $$R = (- \cup \epsilon) D^+ (. D^+ \cup \epsilon)$$

| Parte | Significado |
| :--- | :--- |
| $(- \cup \epsilon)$ | Un guion opcional. |
| $D^+$ | Uno o más dígitos (parte entera). |
| $(. D^+ \cup \epsilon)$ | Opcionalmente, un punto y más dígitos. |

---

## Gramáticas y Recursión

Una gramática define reglas para generar cadenas. Son la base de problemas como **"Paréntesis Balanceados"**.

**Ejemplo:** ¿Está bien formada `(())()`?
Reglas recursivas para una cadena válida $S$:
1.  $S \to \epsilon$ (Cadena vacía es válida).
2.  $S \to (S)$ (Podemos rodear una válida con paréntesis).
3.  $S \to SS$ (Podemos concatenar dos válidas).

:::tip[Aplicación]
Si ves una estructura recursiva como esta, piensa inmediatamente en **pilas (stacks)** o **DP por Rangos** (Interval DP).
:::

---

## Autómatas Finitos

Un autómata es una máquina abstracta que lee una cadena y cambia de estado. Al final, decide si **Acepta** o **Rechaza**.



### Ejemplo: Paridad de 1s
Queremos aceptar cadenas binarias con un número **par** de 1s.
* **Estados:** $E_{par}$ (Inicial, Aceptación), $E_{impar}$.
* **Transiciones:**
    * Si leo `0`: Me quedo donde estoy.
    * Si leo `1`: Cambio de estado ($Par \leftrightarrow Impar$).

Si la cadena termina en $E_{par}$, es válida.

---

## Búsqueda de Patrones

La teoría de autómatas y hashing es la base de los algoritmos de búsqueda eficientes (más rápidos que el `.find()` básico que es $O(N \cdot M)$).

1.  **Rabin-Karp:** Usa **Rolling Hash** (Prefix Sum de hashes) para comparar patrones en $O(1)$.
2.  **KMP (Knuth-Morris-Pratt):** Construye un autómata (o arreglo de prefijos LPS) para no retroceder nunca en el texto. Complejidad $O(N+M)$.

### Ejercicio Teórico/Práctico
* **[1971D. Binary Cut (Codeforces)](https://codeforces.com/problemset/problem/1971/D)** - Analizar la estructura de la cadena para minimizar cortes.
