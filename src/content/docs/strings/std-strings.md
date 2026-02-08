---
title: Strings en C++
description: Diferencias entre C-Style y std::string, funciones y manipulación.
sidebar:
  order: 1
---

En C++, las strings son secuencias de caracteres utilizadas para almacenar texto. Aunque existen desde C, C++ introduce una clase poderosa para manejarlas.

## C-Style vs. C++ Style

### C-Style (Arreglo de `char`)
Es la forma "antigua" y cruda de manejar texto.
* Se almacena como un `char[]` terminado en `\0` (carácter nulo).
* **Gestión manual** de memoria (¡Peligroso!).
* Requiere funciones externas (`<cstring>`) como `strcpy`, `strlen`.

```cpp
char texto[] = "Hola, mundo"; // Termina implícitamente en \0
```

### C++ Style (`std::string`)

Es una clase moderna incluida en la librería `<string>`.
* **Memoria dinámica:** Se redimensiona automáticamente según lo necesites.
* **Intuitiva:** Soporta operadores naturales como `+` (concatenar), `==` (comparar), o `=` (asignar).
* **Segura:** Reduce drásticamente los errores de memoria y desbordamiento de búfer.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string saludo = "Hola, ";
    string nombre = "Mundo";
    
    // Concatenación fácil
    string completo = saludo + nombre; // "Hola, Mundo"
    
    // Comparación directa
    if (completo == "Hola, Mundo") {
        cout << "Coincide perfectamente" << endl;
    }
    return 0;
}
```
---

## Funciones Principales

La clase `std::string` viene equipada con muchas herramientas útiles. Aquí las más comunes:

| Operación | Método | Descripción |
| :--- | :--- | :--- |
| **Acceso** | `s[i]` | Accede al carácter en el índice `i`. |
| | `s.back()` | Devuelve el último carácter. |
| **Tamaño** | `s.size()` / `s.length()` | Devuelve la longitud de la cadena. |
| **Modificar** | `s.push_back(c)` | Agrega un carácter `c` al final. |
| | `s.pop_back()` | Elimina el último carácter. |
| | `s += "txt"` | Concatena texto al final. |
| | `s.clear()` | Borra todo el contenido. |
| **Subcadena** | `s.substr(pos, len)` | Extrae `len` caracteres desde el índice `pos`. |
| **Buscar** | `s.find(sub)` | Devuelve el índice de `sub` o `string::npos` si no existe. |

### Ejemplos de Código

#### 1. Transformaciones (Mayúsculas/Minúsculas)
Para esto usamos `std::transform` de la librería `<algorithm>`.

```cpp
#include <algorithm>
#include <string>
#include <iostream>
using namespace std;

int main() {
    string s = "Hola Mundo";
    
    // Convertir a MAYÚSCULAS
    // Parámetros: (InicioInput, FinInput, InicioOutput, Operacion)
    transform(s.begin(), s.end(), s.begin(), ::toupper); 
    
    cout << s << endl; // Imprime "HOLA MUNDO"
    
    // Convertir a minúsculas
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return 0;
}
```

#### 2. Conversiones Numéricas
Muy útil en problemas donde te dan números como texto y necesitas operar con ellos.

```cpp
#include <string>
#include <iostream>
using namespace std;

int main() {
    string s = "123";
    
    // String a Número
    int n = stoi(s);          // String to Int
    long long x = stoll(s);   // String to Long Long
    double d = stod(s);       // String to Double

    // Número a String
    string s2 = to_string(45); 
    string s3 = to_string(3.14159);
    
    return 0;
}
```
## Ejercicios Recomendados

Practica la manipulación de cadenas con estos problemas:

* **[151. Reverse Words in a String (LeetCode)](https://leetcode.com/problems/reverse-words-in-a-string/)**
    * Manipulación clásica de espacios, reversa y palabras.
* **[1985A. Creating Words (Codeforces)](https://codeforces.com/problemset/problem/1985/A)**
    * Ejercicio básico de intercambio de caracteres.
* **[1008A. Romaji (Codeforces)](https://codeforces.com/problemset/problem/1008/A)**
    * Verificación de reglas simples (vocales/consonantes).
* **[1941C. Rudolf and the Ugly String (Codeforces)](https://codeforces.com/problemset/problem/1941/C)**
    * Eliminación de patrones dentro de un string.
