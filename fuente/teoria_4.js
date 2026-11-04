// Teoría, bloque 4: Arrays
TEORIA.push(
  {
    id: 'arrays', group: 'Arrays', title: 'Arrays',
    intro: 'Guardar muchos valores del mismo tipo bajo un solo nombre, cada uno en su posición.',
    blocks: [
      { h: 'Qué es un array' },
      { p: 'Un array (o vector) es una lista de valores **del mismo tipo** con un **tamaño fijo**. Cada valor ocupa una posición (índice) que empieza en **0**.' },
      { table: [['Índice', '0', '1', '2', '3', '4'], ['notas', '7', '5', '9', '6', '8']] },

      { h: 'Crear un array' },
      { p: 'Hay dos formas. Si ya sabes los valores, entre llaves:' },
      { syntax: 'tipo[] nombre = {valor1, valor2, …};' },
      { code: 'int[] notas = {7, 5, 9, 6, 8};\nString[] dias = {"lunes", "martes", "miércoles"};\nSystem.out.println(notas[0]);       // el primero\nSystem.out.println(dias[2]);' },
      { p: 'Si solo sabes cuántos habrá, con `new` y el tamaño. Las posiciones se rellenan con un **valor por defecto**: 0 para números, `false` para boolean, `\'\\u0000\'` para char y `null` para String y objetos.' },
      { syntax: 'tipo[] nombre = new tipo[tamaño];' },
      { code: 'int[] cuadrados = new int[5];\nboolean[] marcas = new boolean[3];\nString[] nombres = new String[2];\nSystem.out.println(cuadrados[0] + " " + marcas[0] + " " + nombres[0]);' },
      { p: 'También se puede declarar primero y crear después, o escribir los corchetes detrás del nombre (`int notas[]`), aunque lo habitual es `int[] notas`.' },
      { code: 'int[] datos;\ndatos = new int[] {1, 2, 3};   // con valores, después de declararlo, hace falta new int[]\nSystem.out.println(datos.length);' },

      { h: 'Leer y cambiar posiciones' },
      { code: 'int[] notas = {7, 5, 9, 6, 8};\nnotas[1] = 10;                         // cambia el segundo\nnotas[4] += 1;\nSystem.out.println(notas[1] + " " + notas[4]);\nSystem.out.println("Tamaño: " + notas.length);\nSystem.out.println("Último: " + notas[notas.length - 1]);' },
      { note: '`length` en un array va **sin paréntesis** (`notas.length`); en un String, con ellos (`texto.length()`).', kind: 'warn' },

      { h: 'Recorrer un array' },
      { p: 'Con un `for` que va de 0 a `length - 1` se pasa por todas las posiciones:' },
      { code: 'int[] notas = {7, 5, 9, 6, 8};\nfor (int i = 0; i < notas.length; i++) {\n    System.out.println("Nota " + (i + 1) + ": " + notas[i]);\n}' },
      { p: 'Si no necesitas la posición, el **for-each** es más corto (siguiente tema). Y para verlo entero de un vistazo, `Arrays.toString(array)`:' },
      { code: 'int[] notas = {7, 5, 9, 6, 8};\nSystem.out.println(Arrays.toString(notas));\nSystem.out.println(notas);   // sin Arrays.toString sale algo como [I@1b6d3586' , random: true },

      { h: 'Rellenar un array' },
      { code: 'int[] cuadrados = new int[6];\nfor (int i = 0; i < cuadrados.length; i++) {\n    cuadrados[i] = i * i;\n}\nSystem.out.println(Arrays.toString(cuadrados));' },
      { p: 'Leyendo los valores del teclado:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nint[] edades = new int[3];\nfor (int i = 0; i < edades.length; i++) {\n    System.out.print("Edad " + (i + 1) + ": ");\n    edades[i] = teclado.nextInt();\n}\nSystem.out.println(Arrays.toString(edades));', stdin: ['18', '25', '31'] },

      { h: 'Operaciones típicas' },
      { p: '**Suma y media:**' },
      { code: 'int[] notas = {7, 5, 9, 6, 8};\nint suma = 0;\nfor (int i = 0; i < notas.length; i++) {\n    suma += notas[i];\n}\ndouble media = (double) suma / notas.length;\nSystem.out.println("Suma: " + suma + ", media: " + media);' },
      { p: '**Máximo y mínimo** (empezando por el primer elemento, no por 0, para que funcione con números negativos):' },
      { code: 'int[] temperaturas = {-3, -8, 2, -1};\nint max = temperaturas[0], min = temperaturas[0];\nfor (int i = 1; i < temperaturas.length; i++) {\n    if (temperaturas[i] > max) max = temperaturas[i];\n    if (temperaturas[i] < min) min = temperaturas[i];\n}\nSystem.out.println("Máxima: " + max + ", mínima: " + min);' },
      { p: '**Contar** los que cumplen algo y **buscar** la posición de un valor:' },
      { code: 'int[] notas = {7, 4, 9, 3, 8};\nint aprobados = 0;\nfor (int i = 0; i < notas.length; i++) {\n    if (notas[i] >= 5) aprobados++;\n}\nSystem.out.println(aprobados + " aprobados");\nint buscado = 9, posicion = -1;\nfor (int i = 0; i < notas.length && posicion == -1; i++) {\n    if (notas[i] == buscado) posicion = i;\n}\nSystem.out.println("El " + buscado + " está en la posición " + posicion);' },
      { p: '**Recorrer al revés** e **invertir** el array:' },
      { code: 'int[] v = {1, 2, 3, 4, 5};\nfor (int i = v.length - 1; i >= 0; i--) System.out.print(v[i] + " ");\nSystem.out.println();\nfor (int i = 0; i < v.length / 2; i++) {\n    int aux = v[i];                         // intercambio con variable auxiliar\n    v[i] = v[v.length - 1 - i];\n    v[v.length - 1 - i] = aux;\n}\nSystem.out.println(Arrays.toString(v));' },

      { h: 'Salirse del array' },
      { p: 'Las posiciones válidas van de 0 a `length - 1`. Usar otra hace fallar el programa al ejecutarse con `ArrayIndexOutOfBoundsException`:' },
      { code: 'int[] v = {10, 20, 30};\nSystem.out.println(v[3]);', error: true },

      { h: 'Los arrays son referencias' },
      { p: 'Una variable de array no guarda los valores, sino **dónde están**. Si asignas un array a otro, los dos apuntan al **mismo** array: cambiar uno cambia el otro. Para tener una copia independiente, usa `Arrays.copyOf` o `clone()`.' },
      { code: 'int[] a = {1, 2, 3};\nint[] b = a;                     // b es el mismo array que a\nb[0] = 99;\nSystem.out.println(Arrays.toString(a));\nint[] c = Arrays.copyOf(a, a.length);   // copia de verdad\nc[1] = 0;\nSystem.out.println(Arrays.toString(a) + " " + Arrays.toString(c));' },
      { p: 'Por la misma razón, `==` entre arrays mira si son el mismo array, no si tienen lo mismo dentro. Para comparar el contenido: `Arrays.equals(a, b)`.' },

      { h: 'Tamaño fijo' },
      { p: 'Una vez creado, un array no puede crecer ni encoger. Si necesitas añadir y quitar elementos, existe `ArrayList` (se verá con las colecciones). Para "agrandarlo" se crea otro más grande y se copian los datos:' },
      { code: 'int[] v = {1, 2, 3};\nv = Arrays.copyOf(v, 5);   // nuevo array de 5 con los datos copiados\nv[3] = 4;\nSystem.out.println(Arrays.toString(v));' },

      { h: 'Errores típicos' },
      { list: [
        'Usar `<=` en el for: `i <= v.length` se sale del array.',
        'Empezar en 1: el primer elemento es `v[0]`.',
        'Escribir `length()` con paréntesis en un array.',
        'Imprimir el array con `println(v)` en vez de `Arrays.toString(v)`.',
        'Empezar el máximo en 0: falla si todos los valores son negativos.',
        'Copiar con `b = a` creyendo que es una copia.',
        'Usar posiciones de un array de String sin rellenar: valen `null`.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`int[] v = {…};` o `new int[n]` (con valores por defecto).',
        'Posiciones de 0 a `v.length - 1`; `v[i]` lee o cambia una.',
        'Se recorre con for (con posición) o for-each (sin ella).',
        'Patrones: suma, media, máximo, contar, buscar, invertir.',
        'Tamaño fijo, y son referencias: `b = a` no copia.'
      ] },
      { practice: ['r2', 'r3', 'r5', 'r7', 'r1', 'r4'] }
    ]
  },
  {
    id: 'foreach', group: 'Arrays', title: 'Bucle for-each',
    intro: 'La forma corta de recorrer todos los elementos de un array, uno a uno.',
    blocks: [
      { h: 'Sintaxis' },
      { p: 'El for-each (o "for mejorado") recorre un array de principio a fin y, en cada vuelta, deja en una variable el elemento que toca. No hay índice ni condición: no te puedes salir del array.' },
      { syntax: 'for (tipo variable : array) {\n    // variable vale cada elemento, en orden\n}' },
      { code: 'String[] frutas = {"manzana", "pera", "uva"};\nfor (String fruta : frutas) {\n    System.out.println(fruta);\n}' },
      { p: 'Se lee "para cada fruta **en** frutas". El tipo de la variable es el de los elementos del array.' },

      { h: 'Ejemplos' },
      { code: 'int[] numeros = {4, 8, 15, 16, 23, 42};\nint suma = 0, mayor = numeros[0];\nfor (int n : numeros) {\n    suma += n;\n    if (n > mayor) mayor = n;\n}\nSystem.out.println("Suma: " + suma + ", mayor: " + mayor);' },
      { code: 'String[] palabras = {"sol", "arcoíris", "mar", "nube"};\nString larga = "";\nfor (String p : palabras) {\n    if (p.length() > larga.length()) larga = p;\n}\nSystem.out.println("La más larga: " + larga);' },
      { p: 'También sirve para recorrer los caracteres de un String, convirtiéndolo antes con `toCharArray()`:' },
      { code: 'int vocales = 0;\nfor (char c : "programacion".toCharArray()) {\n    if ("aeiou".indexOf(c) >= 0) vocales++;\n}\nSystem.out.println(vocales + " vocales");' },

      { h: 'Lo que no puede hacer' },
      { list: [
        '**No da la posición.** Si la necesitas (para mostrarla, buscar dónde está algo, comparar con el vecino…), usa un for normal.',
        '**No cambia el array.** La variable es una copia del elemento: asignarle otro valor no modifica el array.',
        '**Siempre va de principio a fin**, de uno en uno: no recorre al revés ni salta posiciones.',
        '**No recorre dos arrays a la vez** (para eso hace falta el índice).'
      ] },
      { code: 'int[] v = {1, 2, 3};\nfor (int x : v) {\n    x = x * 10;            // cambia la copia, no el array\n}\nSystem.out.println(Arrays.toString(v));\nfor (int i = 0; i < v.length; i++) {\n    v[i] = v[i] * 10;      // con índice sí se cambia\n}\nSystem.out.println(Arrays.toString(v));' },

      { h: 'for-each o for con índice' },
      { table: [['Necesito…', 'Usa'], ['recorrer todos para sumar, contar, buscar si está, mostrar', 'for-each'], ['saber la posición', 'for'], ['cambiar los valores del array', 'for'], ['recorrer al revés o saltando', 'for'], ['comparar un elemento con el siguiente', 'for']] },
      { note: 'Regla práctica: empieza pensando en for-each y cambia a for solo si necesitas la posición.', kind: 'tip' },
      { p: 'Además de arrays, el for-each recorre cualquier colección (`ArrayList`, `Set`…). Con una colección, no se pueden añadir ni quitar elementos mientras se recorre.' },

      { h: 'Errores típicos' },
      { list: [
        'Escribir el tipo mal: `for (int n : palabras)` con un array de String no compila.',
        'Olvidar el tipo: `for (n : numeros)` no compila.',
        'Recorrer un String directamente: `for (char c : texto)` no compila; hace falta `texto.toCharArray()`.',
        'Esperar que asignar a la variable cambie el array.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`for (tipo x : array)` recorre todos los elementos en orden.',
        'Más corto y sin riesgo de salirse del array.',
        'No da la posición ni permite cambiar el array: para eso, for con índice.'
      ] },
      { practice: ['r2', 'r3', 'r8', 'l5'] }
    ]
  },
  {
    id: 'clasearrays', group: 'Arrays', title: 'La clase Arrays',
    intro: 'Métodos ya hechos para mostrar, ordenar, rellenar, copiar, comparar y buscar en arrays.',
    blocks: [
      { h: 'Cómo se usa' },
      { p: '`Arrays` (del paquete `java.util`, se importa con `import java.util.Arrays;`) tiene métodos estáticos que trabajan sobre arrays: `Arrays.metodo(array, …)`.' },

      { h: 'toString: ver el array' },
      { code: 'int[] v = {5, 3, 8};\nString[] s = {"a", "b"};\nSystem.out.println(Arrays.toString(v));\nSystem.out.println(Arrays.toString(s));' },

      { h: 'sort: ordenar' },
      { p: 'Ordena el array **en el sitio** (lo modifica): números de menor a mayor y textos por orden alfabético (las mayúsculas antes que las minúsculas).' },
      { code: 'int[] puntos = {40, 15, 90, 15, 60};\nArrays.sort(puntos);\nSystem.out.println(Arrays.toString(puntos));\nString[] nombres = {"Luis", "ana", "Bea", "carlos"};\nArrays.sort(nombres);\nSystem.out.println(Arrays.toString(nombres));' },
      { p: 'Para mostrarlo de mayor a menor, se recorre al revés después de ordenar. Con `Arrays.sort(v, desde, hasta)` se ordena solo un trozo.' },
      { code: 'int[] puntos = {40, 15, 90, 60};\nArrays.sort(puntos);\nfor (int i = puntos.length - 1; i >= 0; i--) System.out.print(puntos[i] + " ");\nSystem.out.println();' },
      { note: '`sort` no devuelve nada: `int[] ordenado = Arrays.sort(v);` no compila. Si quieres conservar el original, ordena una copia.', kind: 'warn' },

      { h: 'fill: rellenar' },
      { code: 'int[] v = new int[5];\nArrays.fill(v, 7);\nSystem.out.println(Arrays.toString(v));\nchar[] linea = new char[10];\nArrays.fill(linea, \'-\');\nSystem.out.println(new String(linea));' },

      { h: 'copyOf y copyOfRange: copiar' },
      { code: 'int[] v = {1, 2, 3, 4, 5};\nint[] copia = Arrays.copyOf(v, v.length);       // copia entera\nint[] corta = Arrays.copyOf(v, 3);              // los 3 primeros\nint[] larga = Arrays.copyOf(v, 7);              // rellena con 0\nint[] trozo = Arrays.copyOfRange(v, 1, 4);      // posiciones 1, 2 y 3\nSystem.out.println(Arrays.toString(copia));\nSystem.out.println(Arrays.toString(corta));\nSystem.out.println(Arrays.toString(larga));\nSystem.out.println(Arrays.toString(trozo));' },

      { h: 'equals: comparar el contenido' },
      { code: 'int[] a = {1, 2, 3};\nint[] b = {1, 2, 3};\nSystem.out.println(a == b);              // false: arrays distintos\nSystem.out.println(Arrays.equals(a, b)); // true: mismo contenido' },

      { h: 'Otros métodos' },
      { list: [
        '`Arrays.binarySearch(v, valor)`: busca muy rápido en un array **ordenado** y da la posición (o un número negativo si no está).',
        '`Arrays.deepToString(m)`: como toString, para arrays de 2 dimensiones.',
        '`Arrays.asList(…)`: convierte en una lista.',
        '`Arrays.stream(v)`: para operaciones como `Arrays.stream(v).sum()` o `.max()` (se ven más adelante, con streams).'
      ] },
      { java: 'int[] v = {3, 8, 15, 21};\nint pos = Arrays.binarySearch(v, 15);       // 2\nint suma = Arrays.stream(v).sum();           // 47\n// (binarySearch y stream no están disponibles en este playground)' },

      { h: 'Resumen' },
      { list: [
        '`Arrays.toString(v)` para mostrarlo; `Arrays.sort(v)` para ordenarlo (lo modifica).',
        '`Arrays.fill`, `Arrays.copyOf`, `Arrays.copyOfRange`.',
        '`Arrays.equals(a, b)` compara el contenido (no `==`).'
      ] },
      { practice: ['r6', 'r7'] }
    ]
  },
  {
    id: 'matrices', group: 'Arrays', title: 'Arrays de 2 dimensiones',
    intro: 'Tablas de filas y columnas: un array de arrays.',
    blocks: [
      { h: 'Qué es una matriz' },
      { p: 'Un array de 2 dimensiones (matriz) es un array cuyos elementos son arrays: cada uno es una **fila**. Se accede con dos índices: `m[fila][columna]`, los dos desde 0.' },
      { table: [['', 'col 0', 'col 1', 'col 2'], ['fila 0', '1', '2', '3'], ['fila 1', '4', '5', '6']] },
      { code: 'int[][] m = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nSystem.out.println(m[0][2]);    // fila 0, columna 2\nSystem.out.println(m[1][0]);\nm[1][1] = 50;\nSystem.out.println(Arrays.deepToString(m));' },

      { h: 'Crearla' },
      { syntax: 'tipo[][] nombre = new tipo[filas][columnas];' },
      { code: 'int[][] tablero = new int[3][4];       // 3 filas, 4 columnas, todo a 0\nSystem.out.println(tablero.length);       // número de filas\nSystem.out.println(tablero[0].length);    // columnas de la fila 0\nSystem.out.println(Arrays.deepToString(tablero));' },

      { h: 'Recorrerla' },
      { p: 'Con dos bucles anidados: el de fuera recorre las filas y el de dentro las columnas de cada fila.' },
      { code: 'int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nfor (int f = 0; f < m.length; f++) {\n    for (int c = 0; c < m[f].length; c++) {\n        System.out.print(m[f][c] + " ");\n    }\n    System.out.println();\n}' },
      { p: 'Con for-each: cada fila es un `int[]`.' },
      { code: 'int[][] m = {{1, 2, 3}, {4, 5, 6}};\nint total = 0;\nfor (int[] fila : m) {\n    for (int valor : fila) {\n        total += valor;\n    }\n}\nSystem.out.println("Suma de todo: " + total);' },
      { note: 'Usa `m[f].length` para las columnas (no `m.length`): así funciona aunque la matriz no sea cuadrada.', kind: 'tip' },

      { h: 'Sumas por filas y por columnas' },
      { code: 'int[][] ventas = {\n    {10, 20, 30},     // tienda 0: ventas de 3 días\n    {5, 15, 25}       // tienda 1\n};\nfor (int f = 0; f < ventas.length; f++) {\n    int sumaFila = 0;\n    for (int c = 0; c < ventas[f].length; c++) sumaFila += ventas[f][c];\n    System.out.println("Tienda " + f + ": " + sumaFila);\n}\nfor (int c = 0; c < ventas[0].length; c++) {\n    int sumaCol = 0;\n    for (int f = 0; f < ventas.length; f++) sumaCol += ventas[f][c];\n    System.out.println("Día " + c + ": " + sumaCol);\n}' },

      { h: 'Diagonal y traspuesta' },
      { code: 'int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nint diagonal = 0;\nfor (int i = 0; i < m.length; i++) diagonal += m[i][i];\nSystem.out.println("Diagonal: " + diagonal);\nint[][] t = new int[3][3];\nfor (int f = 0; f < 3; f++) {\n    for (int c = 0; c < 3; c++) {\n        t[c][f] = m[f][c];             // filas pasan a columnas\n    }\n}\nSystem.out.println(Arrays.deepToString(t));' },

      { h: 'Filas de distinto tamaño' },
      { p: 'Como cada fila es un array independiente, pueden tener tamaños distintos (matriz "dentada"):' },
      { code: 'int[][] triangulo = new int[4][];\nfor (int f = 0; f < triangulo.length; f++) {\n    triangulo[f] = new int[f + 1];\n    Arrays.fill(triangulo[f], f + 1);\n}\nfor (int[] fila : triangulo) System.out.println(Arrays.toString(fila));' },

      { h: 'Más dimensiones' },
      { p: 'Se pueden tener 3 o más dimensiones (`int[][][] cubo = new int[2][3][4];`), aunque es poco habitual.' },

      { h: 'Errores típicos' },
      { list: [
        'Confundir el orden: es `m[fila][columna]`.',
        'Usar `m.length` para las columnas: da el número de filas.',
        'Mostrar la matriz con `Arrays.toString(m)`: salen direcciones; usa `Arrays.deepToString(m)`.',
        'Salirse con los índices: `ArrayIndexOutOfBoundsException`.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`int[][] m = new int[filas][columnas];` o con llaves anidadas.',
        '`m[f][c]`; `m.length` son las filas y `m[f].length` las columnas.',
        'Se recorre con dos bucles anidados.',
        '`Arrays.deepToString(m)` para verla entera.'
      ] },
      { practice: ['r9'] }
    ]
  }
);
