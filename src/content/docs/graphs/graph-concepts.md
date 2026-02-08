---
title: Conceptos Básicos de Gráficas
description: Introducción a la teoría de gráficas, tipos, representaciones y propiedades fundamentales.
sidebar:
  order: 1
---

## 1. Objetos Básicos

### ¿Qué es una Gráfica? 

Una **gráfica** es una estructura de datos que se usa para modelar relaciones entre objetos. Consiste en dos componentes principales:

* **Vértices (Nodos):** Son los "puntos" u "objetos" en la gráfica (Ej. ciudades, personas).
* **Aristas (Conexiones):** Son las "líneas" que unen pares de vértices (Ej. carreteras, redes).

Formalmente, una gráfica $G$ se define como un par $G = (V, E)$, donde $V$ es el conjunto de vértices y $E$ es el conjunto de aristas.

### Orden y Tamaño
* **Orden (Order):** Es el número de vértices, denotado como $|V|$ o $N$.
* **Tamaño (Size):** Es el número de aristas, denotado como $|E|$ o $M$.

### Tipos de Gráficas
* **Gráfica Simple:** No dirigida, sin "bucles" (aristas a sí mismo) y sin aristas paralelas (múltiples líneas entre dos nodos).
* **Multigráfica:** Permite aristas paralelas, pero no bucles.
* **Pseudográfica:** Permite tanto aristas paralelas como bucles.

### Gráficas Dirigidas (Dígrafos) 
Las aristas tienen una **dirección**. Una arista $(u, v)$ va *desde* $u$ *hacia* $v$.
Importante: En grafos dirigidos, $(u, v) \neq (v, u)$.
<br>

<img src="https://www.researchgate.net/publication/309278789/figure/fig7/AS:750920426078218@1556044789424/Ejemplos-de-un-grafo-dirigido-y-un-grafo-no-dirigido.ppm" alt="Grafos Dirigidos" class="invert-dark" />

### Gráficas Ponderadas
Cada arista $(u, v)$ tiene un "peso" o "costo" asociado, $w(u, v)$. Esto es fundamental para algoritmos de camino más corto como Dijkstra.

---

## 2. Relaciones Locales

### Vecinos y Adyacencia
Dos vértices $u$ y $v$ son **vecinos** (o adyacentes) si existe una arista $(u, v)$ que los conecta.

### Grado
* **Gráficas no dirigidas:** El grado de $v$, denotado $deg(v)$, es el número de aristas conectadas a él.
* **Gráficas dirigidas:**
    * **Grado de Salida ($out\text{-}degree$):** Número de aristas que *salen* de $v$.
    * **Grado de Entrada ($in\text{-}degree$):** Número de aristas que *entran* a $v$.

### Fuente y Pozo
Conceptos útiles para Ordenamiento Topológico y Flujo:
* **Fuente (Source):** Vértice con grado de entrada 0.
* **Pozo (Sink):** Vértice con grado de salida 0.

---

## 3. Caminos y Ciclos 

* **Camino:** Secuencia de vértices $(v_1, v_2, \dots)$ donde cada par adyacente está conectado.
* **Trayectoria:** Un camino con todos sus **vértices** distintos.
* **Circuito:** Camino cerrado (empieza y termina igual) que no repite aristas.
* **Ciclo:** Camino cerrado que no repite vértices intermedios.

:::danger[Cuidado]
En gráficas dirigidas con pesos, existen los **Ciclos Negativos** (la suma de sus pesos es $< 0$). Estos rompen algoritmos como Dijkstra.
:::

---

## 4. Medidas y Estructura Global

### Distancia (BFS)
La **distancia** entre $u$ y $v$ es la longitud mínima (número de aristas) para ir de uno al otro.
* **Diámetro:** La distancia más larga entre cualquier par de nodos de la gráfica.

### Conexidad
* **Gráfica Conexa:** Existe un camino entre cualquier par de vértices.
* **Componentes Conexas:** Las "islas" separadas que forman una gráfica no conexa.
* **Fuertemente Conexa (Digrafos):** Si puedes ir de $u$ a $v$ **Y** de $v$ a $u$ para todos los pares.

### Vértices de Corte y Puentes
* **Vértice de Corte:** Si lo borras, la gráfica se rompe en más pedazos (aumentan las componentes conexas).
* **Puente (Bridge):** Una arista que, si la borras, desconecta la gráfica.

## 8. Número de Caminos con Matriz

Hay un truco matemático muy poderoso con la Matriz de Adyacencia ($A$):

* La matriz elevada a la potencia $k$ ($A^k$) nos dice cuántos caminos de longitud exacta $k$ existen entre dos nodos.
* $A^k[u][v]$ = Número de caminos de longitud $k$ desde $u$ hasta $v$.

:::tip[Pro Tip]
Podemos calcular $A^k$ muy rápido ($O(N^3 \log k)$) usando **Exponenciación Binaria de Matrices**.
:::

---

## Ejercicios Recomendados

Practica los conceptos básicos con estos problemas:

* **[200. Number of Islands (LeetCode)](https://leetcode.com/problems/number-of-islands/)** - Clásico de Componentes Conexas.
* **[1971. Find if Path Exists in Graph (LeetCode)](https://leetcode.com/problems/find-if-path-exists-in-graph/)** - Implementación básica de BFS/DFS.
* **[1192. Critical Connections in a Network (LeetCode)](https://leetcode.com/problems/critical-connections-in-a-network/)** - Encuentra los Puentes.
