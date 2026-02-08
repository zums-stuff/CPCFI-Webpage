---
title: Counting y Radix Sort
description: Algoritmos de ordenamiento no comparativos O(n).
sidebar:
  order: 1
---

## ¿Qué son?

Son algoritmos de ordenamiento **no basados en comparación**, lo que les permite superar el límite inferior matemático de $O(n \log n)$ que tienen algoritmos tradicionales como Merge Sort o Quick Sort.

---

## Counting Sort

Es un algoritmo **estable** que ordena elementos en tiempo lineal respecto al rango de los datos. No compara elementos entre sí (mayor o menor), sino que usa matemáticas para calcular la posición final de cada número.

* **Complejidad:** $O(N + K)$, donde $N$ es el número de elementos y $K$ es el rango de valores (Max - Min).
* **Ideal para:** Rangos pequeños de números enteros.

### Ejemplo Visual
Arreglo: `[4, 2, 2, 8, 3, 3, 1]`

1.  **Contamos frecuencias:**
    * 1 → 1 vez
    * 2 → 2 veces
    * 3 → 2 veces
    * 4 → 1 vez
    * 8 → 1 vez
2.  **Reconstruimos:** `[1, 2, 2, 3, 3, 4, 8]`

### Implementación en C++

```cpp
void countingSort(vector<int>& arr) {
    if (arr.empty()) return;

    // 1. Encontrar rango
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;

    // 2. Crear arreglos auxiliares
    vector<int> count(range, 0);
    vector<int> output(arr.size());

    // 3. Contar frecuencias
    for (int num : arr)
        count[num - minVal]++;

    // 4. Acumular conteos (Prefix Sum) para determinar posiciones
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];

    // 5. Construir el output (Recorrer al revés para mantener ESTABILIDAD)
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }

    arr = output;
}
```

### Características Avanzadas

* **Estabilidad:** Si se implementa recorriendo el arreglo de atrás hacia adelante (como en el paso 5 del código), el algoritmo es **estable** (conserva el orden relativo de elementos iguales).
* **Limitaciones:**
    * **Rango:** No es eficiente si el rango $K$ es mucho mayor que $N$ (ej. ordenar `[1, 1000000]`).
    * **Negativos:** Requiere adaptación (usar un *offset* o desplazar los índices) para funcionar con números negativos.
    * **Decimales:** No funciona directamente con números flotantes (`float` o `double`).

:::note[¿Cuándo usarlo?]
Counting Sort es imbatible cuando sabes que el rango de tus datos es pequeño (ej. ordenar edades de personas, notas de exámenes de 0-100, o caracteres ASCII).
:::

---

## Radix Sort

El problema de Counting Sort es que depende del tamaño del número (el rango). **Radix Sort** soluciona esto ordenando los números **dígito por dígito**, desde el menos significativo (unidades) hasta el más significativo.

* **Complejidad:** $O(d \cdot (N + K))$, donde $d$ es el número de dígitos y $K$ es la base (generalmente 10).
* **Estrategia:** Usa Counting Sort como subrutina para ordenar cada posición decimal de forma estable.

### Ejemplo Paso a Paso
Arreglo original: `[170, 45, 75, 90, 802, 24, 2, 66]`

1.  **Por Unidades:** `[170, 90, 802, 002, 024, 045, 075, 066]`
    *(Nota cómo el 802 y el 2 quedan ordenados por su último dígito '2')*
2.  **Por Decenas:** `[802, 002, 024, 045, 066, 170, 075, 090]`
    *(Aquí 802 viene antes que 24 porque 0 < 2 en las decenas)*
3.  **Por Centenas:** `[002, 024, 045, 066, 075, 090, 170, 802]`
    *(Resultado final ordenado)*


### Características Avanzadas

* **Base de Ordenamiento:**
    * **Base 10:** Es la más común para números enteros (usando `% 10`).
    * **Base 2 (Bits):** Muy eficiente si usas operaciones bitwise (`>>` y `&`) en lugar de divisiones.
    * **Base 256 (ASCII):** Ideal para ordenar cadenas de texto caracter por caracter.

* **Requisito de Estabilidad:**
    * Radix Sort **depende totalmente** de que el algoritmo interno (Counting Sort) sea estable.
    * Si ordenas las unidades, y luego las decenas "desordenan" el orden relativo de las unidades iguales, el algoritmo falla.

* **Aplicaciones:**
    * Ordenamiento de **Suffix Arrays** (Arreglos de sufijos) en algoritmos de texto avanzados.
    * Ordenar grandes cantidades de números enteros de longitud fija (ej. IDs, fechas).


## Detalles Técnicos en C++

### Uso de `std::vector`
Usamos vectores para manejar memoria dinámica. En Counting Sort, el tamaño del vector `count` depende del rango de los datos, por lo que hacerlo estático (`int count[100000]`) podría causar *Segmentation Fault* si los números son muy grandes, o desperdiciar memoria si son pocos.

### Iteración Inversa (La clave de la estabilidad)
¿Por qué el bucle final va de `n-1` a `0`?
```cpp
for (int i = arr.size() - 1; i >= 0; i--)
```

Si tenemos dos números `7` en el arreglo original (llamémoslos $7_A$ y $7_B$, donde $7_A$ aparece antes que $7_B$), al recorrer el arreglo **de atrás hacia adelante**:

1.  Encontramos primero a $7_B$ (porque estamos al final).
2.  Lo colocamos en la **última** posición disponible para los 7s en el arreglo de salida (`count[7] - 1`).
3.  Decrementamos el contador.
4.  Luego encontramos a $7_A$.
5.  Lo colocamos en la posición anterior a la de $7_B$.

**Resultado:** En el arreglo final, $7_A$ sigue estando antes que $7_B$.
**Conclusión:** ¡El orden relativo se conservó! (Estabilidad). Si lo hiciéramos de inicio a fin, se invertirían.

### Matemáticas de Radix
Para obtener el dígito en la posición `exp` (1, 10, 100...):
* Fórmula: `(num / exp) % 10`
* **Ejemplo:** `num = 802`, queremos el dígito de las decenas (`exp = 10`):
    1.  `802 / 10 = 80` (División entera elimina las unidades).
    2.  `80 % 10 = 0` (Módulo 10 nos da el último dígito restante).

---

## Comparación

| Característica | Counting Sort | Radix Sort | Quick Sort (std::sort) |
| :--- | :--- | :--- | :--- |
| **Complejidad** | $O(N+K)$ | $O(d \cdot (N+K))$ | $O(N \log N)$ |
| **Comparativo** | No | No | Sí |
| **Memoria** | Alta (depende del rango $K$) | Media | Baja ($O(\log N)$ stack) |
| **Uso Ideal** | Rangos pequeños y densos | Números grandes o Strings | Propósito general |

---

## Ejercicios Recomendados

Pon a prueba lo aprendido con estos problemas clásicos:

* **[1980B - Choosing Cubes (Codeforces)](https://codeforces.com/problemset/problem/1980/B)**: Un problema sencillo para entender frecuencias y ordenamiento.
* **[912. Sort an Array (LeetCode)](https://leetcode.com/problems/sort-an-array/)**: Intenta resolverlo usando Counting Sort (cuidado con los negativos, usa un *offset*) y luego con Radix Sort.
* **[164. Maximum Gap (LeetCode)](https://leetcode.com/problems/maximum-gap/)**: Este es un problema difícil (Hard) que **requiere** una solución lineal ($O(N)$). ¡Radix Sort es perfecto aquí!
