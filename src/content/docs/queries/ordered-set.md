---
title: Ordered Set (PBDS)
description: Estructura avanzada para consultas de orden en tiempo logarítmico.
sidebar:
  order: 4
---
### El Problema: Estadísticas de Orden en Conjuntos Dinámicos

Supongamos que mantenemos un conjunto de números en el que constantemente estamos insertando y eliminando elementos. Durante este proceso, necesitamos responder repetidamente a dos tipos de consultas:
1. *"¿Cuál es el $k$-ésimo elemento más pequeño del conjunto?"*
2. *"¿Cuántos elementos en el conjunto son estrictamente menores que un valor $X$?"*

Analicemos las estructuras de datos estándar de C++ para este escenario:

* **Fuerza Bruta con `std::vector` (Arreglo ordenado):**
  * Acceder al $k$-ésimo elemento es muy rápido: $O(1)$.
  * Contar elementos menores a $X$ es rápido con `std::lower_bound`: $O(\log N)$.
  * **El fallo:** Insertar o eliminar elementos requiere desplazar la memoria, tomando $O(N)$. Esto da "Time Limit Exceeded" (TLE) si hay $10^5$ actualizaciones.

* **Estructura dinámica con `std::set` (Árbol Binario):**
  * Insertar y eliminar elementos es eficiente: $O(\log N)$.
  * **El fallo:** Los nodos del `std::set` no guardan el tamaño de sus subárboles. Para encontrar el $k$-ésimo elemento, hay que avanzar secuencialmente desde el inicio usando `std::advance()`, tomando $O(N)$. Contar elementos menores también toma $O(N)$ con `std::distance()`.

* **Nuestro Objetivo:** Una estructura de datos que combine lo mejor de ambas estructuras, logrando inserciones, eliminaciones y respuestas a consultas de estadísticas de orden en tiempo logarítmico **$O(\log N)$**.


### Policy-Based Data Structures (PBDS)

Policy-Based Data Structures (PBDS) es una biblioteca de extensiones del compilador GCC. Proporciona estructuras de datos avanzadas que no están incluidas en la biblioteca estándar de C++ (STL). Aunque no forma parte del estándar oficial de C++, pero la soportan plataformas de progra competitiva.

### Estructura Subyacente

La estructura subyacente del Ordered Set es, por defecto, un árbol rojinegro (Red-Black Tree). A diferencia de las implementaciones estándar de un árbol binario de búsqueda, los nodos de este árbol mantienen información adicional sobre el tamaño de sus subárboles. 



Este mantenimiento de estadísticas de orden es estrictamente lo que permite realizar consultas basadas en índices en tiempo logarítmico, ya que el árbol sabe exactamente cuántos elementos existen en cada rama durante el recorrido.

---

### Sintaxis y Declaración

Para utilizar un Ordered Set, es necesario incluir los encabezados específicos de la extensión GNU y declarar la estructura con sus respectivos parámetros de plantilla.

```cpp
// Common file
#include <ext/pb_ds/assoc_container.hpp>     
// Including tree_order_statistics_node_update
#include <ext/pb_ds/tree_policy.hpp>

using namespace std;
using namespace __gnu_pbds;

typedef tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> ordered_set;
```

#### Explicación de los Parámetros

* **int (Key):** Define el tipo de dato de los elementos que se almacenarán. Puede cambiarse por long long, pair, etc.
* **null_type (Mapped):** Determina el tipo de contenedor. Al usar null_type (en versiones antiguas null_mapped_type), la estructura actúa como un Set. Si se especificara un tipo de dato válido (ej. int), actuaría como un Map.
* **less\<int\> (Cmp_Fn):** Es la función comparadora que define el ordenamiento de los elementos (orden ascendente). Para orden descendente o para implementar un multiset, se puede cambiar por greater\<int\> o less_equal\<int\>.
* **rb_tree_tag (Tag):** Indica la estructura de datos subyacente a utilizar. En este caso, designa un árbol rojinegro. Otra opción disponible en la biblioteca es splay_tree_tag.
* **tree_order_statistics_node_update (Node_Update):** Es la política de actualización de nodos. Esta clase es el componente crítico que habilita las operaciones de orden (estadísticas de los nodos) al permitir calcular los tamaños de los subárboles durante las inserciones y eliminaciones.

---

### Operaciones Principales

El uso de la política tree_order_statistics_node_update añade dos métodos principales que operan en una complejidad de tiempo O(log N):

#### find_by_order(k)
Devuelve un iterador apuntando al elemento en la posición k (estrictamente con índice basado en 0). Si k es mayor o igual al tamaño del set, la función devuelve un iterador a end(). Requiere ser desreferenciado (*) para obtener el valor almacenado.

#### order_of_key(k)
Devuelve un entero que representa la cantidad exacta de elementos en el set que son estrictamente menores que el valor k. Si el valor k no existe en el set, la función sigue devolviendo el conteo correcto de elementos menores.

---

### Diferencia entre std::set y Ordered Set

Aunque ambos mantienen los elementos ordenados y permiten inserciones, eliminaciones y búsquedas en tiempo O(log N), el std::set de la STL tiene limitaciones de rendimiento frente al Ordered Set en operaciones de índice:

* **Acceso por índice:** En un std::set, acceder al k-ésimo elemento requiere iterar secuencialmente usando std::advance(), lo cual toma tiempo O(N). El Ordered Set realiza esto en O(log N) a través de find_by_order.
* **Conteo de menores:** En un std::set, encontrar la cantidad de elementos menores a un valor requiere encontrar la posición iterando la distancia hasta el límite inferior mediante std::distance(set.begin(), set.lower_bound(k)), ejecutándose en tiempo O(N). El Ordered Set resuelve esto en O(log N) mediante order_of_key.

---

### Aplicaciones

El Ordered Set es requerido en problemas algorítmicos con modificaciones dinámicas, destacando en:

* **Conteo de inversiones:** Encontrar cuántos elementos mayores preceden a un elemento en un arreglo de manera eficiente a medida que se procesa el arreglo.
* **Cálculo de mediana dinámica:** Mantener y consultar la mediana (o cualquier estadístico de orden k) de un flujo de datos continuo donde ocurren inserciones y eliminaciones constantes.
* **Compresión de coordenadas en tiempo real:** Encontrar el rango o posición relativa de un elemento en un conjunto numérico disperso a medida que este conjunto numérico crece o se reduce.

---

### Ejemplo de Implementación

```cpp
#include <iostream>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>

using namespace std;
using namespace __gnu_pbds;

typedef tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> ordered_set;

int main() {
    ordered_set oset;

    // Inserción de elementos en O(log N)
    oset.insert(5);
    oset.insert(1);
    oset.insert(2);
    oset.insert(4);
    
    // Se ignora por usar less<int> (comportamiento estricto de set sin duplicados)
    oset.insert(2); 

    // Estado interno del oset: {1, 2, 4, 5}

    // Uso de find_by_order (índice base 0)
    cout << "Elemento en el indice 2: " << *oset.find_by_order(2) << "\n"; 
    // Salida: 4

    // Uso de order_of_key
    cout << "Elementos estrictamente menores que 4: " << oset.order_of_key(4) << "\n"; 
    // Salida: 2 (los elementos son 1 y 2)

    cout << "Elementos estrictamente menores que 6: " << oset.order_of_key(6) << "\n"; 
    // Salida: 4 (los elementos son 1, 2, 4, 5)

    return 0;
}
```
