// Teoría, bloque 1: Primeros pasos
TEORIA.push(
  {
    id: 'estructura', group: 'Primeros pasos', title: 'Estructura de un programa',
    intro: 'Las partes que tiene todo programa en Java y cómo se pone en marcha.',
    blocks: [
      { h: 'El primer programa' },
      { p: 'Todo programa de Java vive dentro de una **clase**, y empieza a ejecutarse por el método **main**. Este es el programa más pequeño que muestra algo por pantalla:' },
      { code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola, mundo");\n    }\n}' },
      { p: 'En este playground puedes escribir solo las instrucciones de dentro del `main` (como en los ejercicios): la página pone la clase y el `main` por ti. Si los escribes completos, también funciona.' },

      { h: 'Las partes, una a una' },
      { table: [['Parte', 'Qué es'],
        ['`public class Main`', 'Declara una clase llamada Main. El archivo tiene que llamarse igual que la clase pública: `Main.java`.'],
        ['`{ … }`', 'Las llaves marcan dónde empieza y dónde acaba un bloque: la clase, el método, un if, un bucle…'],
        ['`public static void main(String[] args)`', 'El método principal. Java empieza a ejecutar por aquí, siempre con esta cabecera exacta.'],
        ['`System.out.println(…);`', 'Una instrucción: muestra un texto en la consola y salta de línea.'],
        ['`;`', 'Cada instrucción termina en punto y coma.']] },
      { note: 'Java distingue mayúsculas y minúsculas: `Main`, `main` y `MAIN` son tres nombres distintos. `system.out.println` no compila: es `System`.', kind: 'warn' },

      { h: 'Instrucciones y bloques' },
      { p: 'Las instrucciones se ejecutan de arriba abajo, una detrás de otra:' },
      { code: 'System.out.println("Primero");\nSystem.out.println("Segundo");\nSystem.out.println("Tercero");' },
      { p: 'La sangría (los espacios al principio de la línea) no cambia lo que hace el programa, pero se usa siempre para que se vea qué está dentro de cada bloque. Lo habitual son 4 espacios por nivel.' },

      { h: 'Comentarios' },
      { p: 'Los comentarios son notas para las personas que leen el código: Java los ignora.' },
      { code: '// Comentario de una línea: desde las dos barras hasta el final\nSystem.out.println("Hola"); // también puede ir al final de una línea\n\n/* Comentario de varias líneas:\n   todo lo que hay entre los dos símbolos */\nSystem.out.println("Adiós");' },
      { p: 'Hay un tercer tipo, `/** … */`, el comentario de documentación (Javadoc), que se pone encima de clases y métodos para generar su documentación.' },
      { note: 'Comentar una línea de código (poner `//` delante) es un truco muy útil para probar qué pasa sin ella, sin tener que borrarla.', kind: 'tip' },

      { h: 'import: usar clases de otros paquetes' },
      { p: 'Las clases de Java están organizadas en **paquetes**. Las de `java.lang` (como `String`, `Math` o `System`) se pueden usar directamente; las demás hay que importarlas al principio del archivo:' },
      { java: 'import java.util.Scanner;   // una clase concreta\nimport java.util.Arrays;\nimport java.util.*;         // todas las clases del paquete java.util\n\npublic class Main {\n    public static void main(String[] args) {\n        // ...\n    }\n}' },
      { p: 'En este playground los `import` de `Scanner` y `Arrays` no hacen falta (si los pones, también funciona).' },

      { h: 'Compilar y ejecutar' },
      { p: 'Java no ejecuta directamente el archivo `.java`. Primero lo **compila** (lo traduce a *bytecode*, un archivo `.class`) y después la **máquina virtual de Java** (JVM) ejecuta ese bytecode. Por eso el mismo `.class` funciona en Windows, Linux o Mac.' },
      { java: 'javac Main.java     // compila: crea Main.class (o muestra los errores)\njava Main           // ejecuta la clase Main' },
      { p: 'Los errores de compilación (falta un `;`, una variable no existe, los tipos no encajan…) impiden ejecutar el programa. Los errores de ejecución (dividir entre 0, salirse de un array…) aparecen cuando el programa ya está funcionando.' },
      { code: 'System.out.println("Antes del error");\nSystem.out.println(10 / 0);\nSystem.out.println("Esto ya no se ve");', error: true },

      { h: 'Errores típicos' },
      { list: [
        'Olvidar el `;` al final de una instrucción: `error: \';\' expected`.',
        'Llaves sin cerrar o de más: el error suele aparecer al final del archivo (`reached end of file while parsing`).',
        'Escribir mal mayúsculas: `string` en vez de `String`, `system` en vez de `System`.',
        'Que el nombre del archivo no coincida con el de la clase pública.'
      ] },

      { h: 'Resumen' },
      { list: [
        'Un programa es una clase con un método `main`, que es donde empieza a ejecutarse.',
        'Las instrucciones terminan en `;` y los bloques van entre llaves.',
        'Los comentarios (`//`, `/* */`, `/** */`) no se ejecutan.',
        'Las clases que no son de `java.lang` se importan con `import`.',
        'Primero se compila (`javac`) y luego se ejecuta (`java`).'
      ] },
      { practice: ['a1'] }
    ]
  },
  {
    id: 'consola', group: 'Primeros pasos', title: 'Mostrar por consola',
    intro: 'println, print y printf: cómo sacar textos y valores por pantalla, y con qué formato.',
    blocks: [
      { h: 'println y print' },
      { p: '`System.out.println(valor)` muestra el valor y **salta de línea** al final. `System.out.print(valor)` lo muestra **sin** saltar, así que lo siguiente sale en la misma línea.' },
      { code: 'System.out.println("Uno");\nSystem.out.println("Dos");\nSystem.out.print("Tres ");\nSystem.out.print("Cuatro");\nSystem.out.println();   // sin nada: solo salta de línea\nSystem.out.println("Cinco");' },
      { p: 'Se puede mostrar cualquier tipo de valor: textos, números, booleanos, caracteres, el resultado de una operación…' },
      { code: 'System.out.println(42);\nSystem.out.println(3.5);\nSystem.out.println(true);\nSystem.out.println(\'A\');\nSystem.out.println(7 * 6);' },

      { h: 'Unir textos y valores con +' },
      { p: 'Con `+` se une (concatena) un texto con otros textos o valores:' },
      { code: 'String nombre = "Ana";\nint edad = 20;\nSystem.out.println("Me llamo " + nombre + " y tengo " + edad + " años");' },
      { note: 'El `+` se evalúa de izquierda a derecha. Mientras haya solo números, suma; en cuanto aparece un texto, todo lo que viene después se une como texto. Usa paréntesis para sumar antes de unir.', kind: 'warn' },
      { code: 'System.out.println("Total: " + 2 + 3);    // une: Total: 23\nSystem.out.println("Total: " + (2 + 3));  // suma primero: Total: 5\nSystem.out.println(2 + 3 + " es el total"); // suma y luego une: 5 es el total' },

      { h: 'Caracteres especiales (secuencias de escape)' },
      { p: 'Dentro de un texto, la barra invertida `\\` introduce caracteres especiales:' },
      { table: [['Secuencia', 'Qué hace'], ['`\\n`', 'Salto de línea'], ['`\\t`', 'Tabulador'], ['`\\"`', 'Comillas dobles dentro del texto'], ['`\\\'`', 'Comilla simple (en un char)'], ['`\\\\`', 'Una barra invertida']] },
      { code: 'System.out.println("Línea 1\\nLínea 2");\nSystem.out.println("Nombre\\tEdad");\nSystem.out.println("Ana\\t20");\nSystem.out.println("Dijo \\"hola\\"");\nSystem.out.println("C:\\\\Usuarios");' },

      { h: 'printf: salida con formato' },
      { p: '`System.out.printf(formato, valores…)` escribe un texto en el que cada **especificador** (`%d`, `%s`…) se sustituye por el siguiente valor. No salta de línea: para eso se pone `%n` (o `\\n`).' },
      { table: [['Especificador', 'Para', 'Ejemplo'], ['`%d`', 'enteros (int, long)', '`printf("%d", 7)` → 7'], ['`%f`', 'decimales (double)', '`printf("%f", 2.5)` → 2,500000'], ['`%.2f`', 'decimales con 2 cifras (redondea)', '`printf("%.2f", 3.14159)` → 3,14'], ['`%s`', 'textos (y cualquier valor)', '`printf("%s", "hola")` → hola'], ['`%c`', 'un carácter', '`printf("%c", \'x\')` → x'], ['`%b`', 'boolean', '`printf("%b", true)` → true'], ['`%n`', 'salto de línea', ''], ['`%%`', 'el símbolo %', '`printf("50%%")` → 50%']] },
      { code: 'String producto = "Café";\ndouble precio = 1.456;\nint unidades = 3;\nSystem.out.printf("%s: %d x %.2f euros%n", producto, unidades, precio);\nSystem.out.printf("Total: %.2f euros%n", unidades * precio);' },
      { note: 'Los decimales salen con coma (1,46) porque Java usa el idioma del sistema, y en español el separador decimal es la coma. `println` siempre usa punto.', kind: 'tip' },

      { h: 'Anchura y alineación' },
      { p: 'Un número entre el `%` y la letra indica la anchura mínima: rellena con espacios. Con `-` se alinea a la izquierda, y con `0` se rellena con ceros:' },
      { code: 'System.out.printf("[%5d]%n", 42);     // derecha, 5 huecos\nSystem.out.printf("[%-5d]%n", 42);    // izquierda\nSystem.out.printf("[%05d]%n", 42);    // con ceros\nSystem.out.printf("[%8.2f]%n", 3.14159);\nSystem.out.printf("%-8s%5s%n", "Nombre", "Nota");\nSystem.out.printf("%-8s%5.1f%n", "Ana", 8.25);\nSystem.out.printf("%-8s%5.1f%n", "Luis", 10.0);' },

      { h: 'String.format' },
      { p: '`String.format` funciona igual que `printf`, pero en vez de mostrar el texto lo **devuelve** para guardarlo en una variable:' },
      { code: 'double media = 7.6666;\nString texto = String.format("Media: %.1f", media);\nSystem.out.println(texto);' },

      { h: 'Errores típicos' },
      { list: [
        'Pasar varios valores a `println` separados por comas: `println("a", 3)` no compila; se unen con `+`.',
        'Olvidar los paréntesis al sumar dentro de un texto: `"Total: " + 2 + 3` da `Total: 23`.',
        'Usar `%d` con un double (o `%f` con un int): falla al ejecutarse con `IllegalFormatConversionException`.',
        'Olvidar el `%n` en `printf`: lo siguiente sale pegado en la misma línea.'
      ] },
      { code: 'System.out.printf("%d%n", 2.5);', error: true },

      { h: 'Resumen' },
      { list: [
        '`println` muestra y salta de línea; `print` no salta.',
        '`+` une textos con valores; los paréntesis deciden qué se suma antes.',
        '`\\n`, `\\t`, `\\"` y `\\\\` son caracteres especiales dentro de un texto.',
        '`printf` y `String.format` dan formato: `%d`, `%.2f`, `%s`, anchura y alineación.'
      ] },
      { practice: ['a1', 'a3', 'l2'] }
    ]
  },
  {
    id: 'variables', group: 'Primeros pasos', title: 'Variables y tipos',
    intro: 'Guardar datos con nombre: los tipos primitivos, String, las constantes y cómo nombrarlas.',
    blocks: [
      { h: 'Qué es una variable' },
      { p: 'Una variable es un espacio de memoria con un **nombre** y un **tipo** donde se guarda un valor. Se **declara** indicando el tipo y el nombre, y se le da un valor con `=`:' },
      { syntax: 'tipo nombre = valor;' },
      { code: 'int edad = 20;\nString nombre = "Ana";\nSystem.out.println(nombre + " tiene " + edad + " años");\nedad = 21;          // se cambia su valor (ya no se pone el tipo)\nSystem.out.println(nombre + " tiene " + edad + " años");' },
      { p: 'También se puede declarar primero y dar el valor después, o declarar varias del mismo tipo en una línea:' },
      { code: 'int x;\nx = 5;\nint a = 1, b = 2, c = 3;\nSystem.out.println(x + a + b + c);' },
      { note: 'Una variable local tiene que tener valor antes de usarla. Si la declaras sin valor y la lees, no compila: `variable x might not have been initialized`.', kind: 'warn' },

      { h: 'Los tipos primitivos' },
      { p: 'Java tiene 8 tipos básicos (primitivos). Guardan directamente el valor:' },
      { table: [['Tipo', 'Guarda', 'Tamaño', 'Rango / ejemplo'],
        ['`byte`', 'entero', '1 byte', '-128 a 127'],
        ['`short`', 'entero', '2 bytes', '-32.768 a 32.767'],
        ['`int`', 'entero (el habitual)', '4 bytes', 'unos ±2.100 millones'],
        ['`long`', 'entero grande', '8 bytes', 'unos ±9 trillones; se escribe con L: `3000000000L`'],
        ['`float`', 'decimal', '4 bytes', 'unas 7 cifras; se escribe con f: `2.5f`'],
        ['`double`', 'decimal (el habitual)', '8 bytes', 'unas 15 cifras: `2.5`'],
        ['`char`', 'un carácter', '2 bytes', 'entre comillas simples: `\'A\'`'],
        ['`boolean`', 'verdadero o falso', '—', '`true` o `false`']] },
      { code: 'int alumnos = 25;\nlong habitantes = 8000000000L;\ndouble nota = 7.5;\nchar letra = \'B\';\nboolean aprobado = true;\nSystem.out.println(alumnos + " " + habitantes + " " + nota + " " + letra + " " + aprobado);' },
      { p: 'En la práctica se usan casi siempre `int` para enteros y `double` para decimales. `byte`, `short` y `float` se usan para ahorrar memoria (por ejemplo, en arrays muy grandes):' },
      { java: 'byte b = 100;\nshort s = 20000;\nfloat f = 3.14f;      // sin la f no compila: 3.14 es double\n// (en este playground byte, short y float no están disponibles)' },
      { p: 'Los límites de cada tipo están en constantes como `Integer.MAX_VALUE`. Si un `int` se pasa de su máximo, **da la vuelta** al mínimo sin avisar (desbordamiento):' },
      { code: 'System.out.println(Integer.MAX_VALUE);\nSystem.out.println(Integer.MIN_VALUE);\nint grande = Integer.MAX_VALUE;\ngrande = grande + 1;\nSystem.out.println(grande);' },

      { h: 'String: el texto' },
      { p: '`String` no es primitivo: es una **clase**, y sus valores son objetos. Se escribe con comillas dobles y tiene muchos métodos (ver el tema Strings).' },
      { code: 'String saludo = "Hola";\nString vacio = "";\nSystem.out.println(saludo + " tiene " + saludo.length() + " letras");\nSystem.out.println("[" + vacio + "]");' },
      { note: 'Comillas simples para `char` (`\'A\'`, un solo carácter) y dobles para `String` (`"A"`, un texto). `\'AB\'` no compila.', kind: 'tip' },

      { h: 'Constantes: final' },
      { p: 'Con `final` la variable no se puede cambiar después de darle valor. Por convención, las constantes se escriben en MAYÚSCULAS con guiones bajos:' },
      { code: 'final double IVA = 0.21;\nfinal int DIAS_SEMANA = 7;\ndouble precio = 100;\nSystem.out.println("Con IVA: " + precio * (1 + IVA));\nSystem.out.println("Semanas en 365 días: " + 365 / DIAS_SEMANA);' },
      { code: 'final int MAX = 10;\nMAX = 20;', error: true },

      { h: 'var: que Java deduzca el tipo' },
      { p: 'Desde Java 10, dentro de un método se puede escribir `var` y Java deduce el tipo por el valor. El tipo sigue siendo fijo: solo te ahorras escribirlo.' },
      { java: 'var edad = 20;        // int\nvar nota = 7.5;       // double\nvar nombre = "Ana";   // String\n// edad = "veinte";   // error: edad es int\n// (en este playground var no está disponible)' },

      { h: 'Cómo nombrar las variables' },
      { list: [
        'Pueden tener letras, números, `_` y `$`, pero no pueden empezar por número ni tener espacios.',
        'No pueden ser palabras reservadas: `int`, `class`, `for`, `new`…',
        'Distinguen mayúsculas: `edad` y `Edad` son distintas.',
        'Convención (camelCase): empiezan en minúscula y cada palabra nueva en mayúscula: `notaMedia`, `numeroDeAlumnos`.',
        'Mejor nombres que digan qué guardan: `precioTotal` mejor que `pt` o `x`.'
      ] },

      { h: 'Ámbito: dónde existe una variable' },
      { p: 'Una variable solo existe dentro del bloque `{ }` donde se declara (y en los bloques que hay dentro). Fuera de él no se puede usar:' },
      { code: 'int total = 0;\nfor (int i = 1; i <= 3; i++) {\n    int doble = i * 2;     // solo existe dentro del for\n    total += doble;\n}\nSystem.out.println(total);\n// System.out.println(doble);  // error: cannot find symbol' },

      { h: 'Errores típicos' },
      { list: [
        'Usar una variable sin darle valor antes.',
        'Declarar dos veces la misma variable en el mismo bloque: `variable x is already defined`.',
        'Poner un decimal en un `int`: `int x = 2.5;` no compila (ver Conversión de tipos).',
        'Escribir un número muy grande sin la `L`: `long n = 3000000000;` no compila (`integer number too large`).'
      ] },

      { h: 'Resumen' },
      { list: [
        'Una variable tiene tipo, nombre y valor: `int edad = 20;`.',
        '8 primitivos: byte, short, int, long, float, double, char y boolean. Los habituales: int, double, char y boolean.',
        '`String` es una clase para textos, con comillas dobles.',
        '`final` crea constantes (en MAYÚSCULAS); `var` deduce el tipo.',
        'Una variable solo existe en el bloque donde se declara.'
      ] },
      { practice: ['a1', 'a2', 'b1'] }
    ]
  },
  {
    id: 'conversion', group: 'Primeros pasos', title: 'Conversión de tipos',
    intro: 'Pasar un valor de un tipo a otro: automática, con casting, y entre números y textos.',
    blocks: [
      { h: 'Conversión automática (ensanchamiento)' },
      { p: 'Java convierte solo cuando no se puede perder información: de un tipo "pequeño" a uno "más grande".' },
      { syntax: 'byte → short → int → long → float → double\n          char → int' },
      { code: 'int entero = 7;\ndouble decimal = entero;     // automático: 7.0\nlong grande = entero;        // automático\nchar letra = \'A\';\nint codigo = letra;          // el código del carácter: 65\nSystem.out.println(decimal + " " + grande + " " + codigo);' },

      { h: 'Casting: conversión explícita' },
      { p: 'Para ir de un tipo grande a uno pequeño hay que pedirlo con un **casting**: el tipo entre paréntesis delante del valor. Así le dices a Java que aceptas perder información.' },
      { syntax: '(tipo) valor' },
      { code: 'double precio = 9.99;\nint euros = (int) precio;    // corta los decimales: 9 (no redondea)\nSystem.out.println(euros);\nint numero = 66;\nchar c = (char) numero;      // el carácter con código 66\nSystem.out.println(c);\nSystem.out.println((int) -3.7);   // también corta hacia el 0: -3' },
      { note: 'Pasar un double a int con `(int)` **trunca** (quita los decimales), no redondea: `(int) 9.99` es 9. Para redondear, usa `Math.round` (ver el tema Math).', kind: 'warn' },

      { h: 'La división entera' },
      { p: 'Si los dos números de una división son enteros, el resultado también es entero: se pierden los decimales. Basta con que uno sea `double` para que la división sea decimal:' },
      { code: 'int a = 7, b = 2;\nSystem.out.println(a / b);            // 3\nSystem.out.println((double) a / b);   // 3.5: se convierte a antes de dividir\nSystem.out.println((double) (a / b)); // 3.0: ¡se divide antes!\nSystem.out.println(a / 2.0);          // 3.5' },
      { p: 'Es el error clásico al calcular una media:' },
      { code: 'int suma = 17;\nint cantidad = 4;\ndouble mal = suma / cantidad;\ndouble bien = (double) suma / cantidad;\nSystem.out.println(mal + " frente a " + bien);' },

      { h: 'Promoción en las operaciones' },
      { p: 'En una operación con tipos distintos, Java convierte al más grande antes de operar: `int + double` da `double`; `int + long` da `long`. Y con `char`, las operaciones se hacen con su código numérico:' },
      { code: 'System.out.println(5 + 2.0);\nSystem.out.println(\'A\' + 1);          // 66: el char se convierte a int\nSystem.out.println((char) (\'A\' + 1)); // B\nchar letra = \'a\';\nletra++;                               // ++ y += sí funcionan directamente sobre un char\nSystem.out.println(letra);' },

      { h: 'De texto a número' },
      { p: 'Para convertir un texto con un número dentro, se usan los métodos `parse` de las clases envoltorio:' },
      { code: 'int n = Integer.parseInt("42");\ndouble d = Double.parseDouble("3.5");\nlong l = Long.parseLong("9000000000");\nboolean b = Boolean.parseBoolean("true");\nSystem.out.println(n + 1);\nSystem.out.println(d * 2);\nSystem.out.println(l + " " + b);' },
      { p: 'Si el texto no es un número válido, falla al ejecutarse:' },
      { code: 'int n = Integer.parseInt("doce");', error: true },

      { h: 'De número a texto' },
      { code: 'int edad = 20;\nString a = String.valueOf(edad);\nString b = Integer.toString(edad);\nString c = "" + edad;               // truco: unir con un texto vacío\nSystem.out.println(a + b + c);\nSystem.out.println(a.length());' },

      { h: 'Entre char y número' },
      { code: 'char c = \'7\';\nint valor = c - \'0\';                    // 7 (los dígitos van seguidos en la tabla)\nint tambien = Character.getNumericValue(c);\nSystem.out.println(valor + tambien);\nSystem.out.println((int) \'a\' + " " + (int) \'A\' + " " + (int) \'0\');' },
      { note: 'Ojo con `(int) \'7\'`: da 55 (el código del carácter), no 7.', kind: 'warn' },

      { h: 'Errores típicos' },
      { list: [
        '`int x = 2.5;` no compila (`possible lossy conversion from double to int`): hace falta `(int)`.',
        'Esperar que `(int)` redondee: trunca.',
        'Calcular una media con enteros sin convertir: `17 / 4` es 4.',
        'Poner el casting en el sitio equivocado: `(double) (a / b)` convierte cuando ya se han perdido los decimales.',
        '`Integer.parseInt` con espacios o letras: `NumberFormatException`.'
      ] },

      { h: 'Resumen' },
      { list: [
        'De pequeño a grande la conversión es automática; de grande a pequeño hace falta `(tipo)`.',
        '`(int)` quita los decimales sin redondear.',
        'Entero entre entero da entero: convierte uno a `double` antes de dividir.',
        'Texto → número: `Integer.parseInt`, `Double.parseDouble`. Número → texto: `String.valueOf`.'
      ] },
      { practice: ['a4', 'a2'] }
    ]
  },
  {
    id: 'operadores', group: 'Primeros pasos', title: 'Operadores',
    intro: 'Cálculos, comparaciones y condiciones: todos los operadores de Java y en qué orden se aplican.',
    blocks: [
      { h: 'Aritméticos' },
      { table: [['Operador', 'Qué hace', 'Ejemplo', 'Resultado'], ['`+`', 'suma', '`7 + 2`', '9'], ['`-`', 'resta', '`7 - 2`', '5'], ['`*`', 'multiplicación', '`7 * 2`', '14'], ['`/`', 'división', '`7 / 2`', '3 (entera)'], ['`%`', 'resto de la división', '`7 % 2`', '1']] },
      { code: 'int a = 17, b = 5;\nSystem.out.println(a + b);\nSystem.out.println(a - b);\nSystem.out.println(a * b);\nSystem.out.println(a / b);\nSystem.out.println(a % b);\nSystem.out.println(17.0 / 5);' },

      { h: 'El resto (%)' },
      { p: 'El operador `%` da el resto de la división entera. Es muy útil:' },
      { list: [
        'Saber si un número es par: `n % 2 == 0`.',
        'Saber si es múltiplo de otro: `n % 3 == 0`.',
        'Sacar la última cifra: `n % 10`.',
        'Repartir en grupos: minutos que sobran de las horas, `minutos % 60`.'
      ] },
      { code: 'int n = 2024;\nSystem.out.println(n % 2 == 0);   // par\nSystem.out.println(n % 10);       // última cifra\nint totalMinutos = 135;\nSystem.out.println(totalMinutos / 60 + " h " + totalMinutos % 60 + " min");\nSystem.out.println(-7 % 3);       // el signo es el del primero' },

      { h: 'Incremento y decremento: ++ y --' },
      { p: '`x++` suma 1 a `x` y `x--` resta 1. Puestos delante (`++x`) o detrás (`x++`) hacen lo mismo con la variable, pero cambian el valor que **devuelven** si se usan dentro de otra expresión:' },
      { code: 'int x = 5;\nint a = x++;   // usa 5 y después suma: a = 5, x = 6\nint y = 5;\nint b = ++y;   // suma primero y usa 6: b = 6, y = 6\nSystem.out.println(a + " " + x);\nSystem.out.println(b + " " + y);' },
      { note: 'Para evitar líos, usa `++` y `--` solos en su línea (`i++;`) y no dentro de otras operaciones.', kind: 'tip' },

      { h: 'Asignación compuesta' },
      { table: [['Forma corta', 'Equivale a'], ['`x += 3`', '`x = x + 3`'], ['`x -= 3`', '`x = x - 3`'], ['`x *= 3`', '`x = x * 3`'], ['`x /= 3`', '`x = x / 3`'], ['`x %= 3`', '`x = x % 3`']] },
      { code: 'int total = 10;\ntotal += 5;\ntotal *= 2;\ntotal -= 4;\ntotal /= 3;\nSystem.out.println(total);\nString texto = "Ho";\ntexto += "la";      // también une textos\nSystem.out.println(texto);' },

      { h: 'Comparación' },
      { p: 'Comparan dos valores y dan un `boolean` (`true` o `false`):' },
      { table: [['Operador', 'Significa'], ['`==`', 'igual'], ['`!=`', 'distinto'], ['`<`', 'menor'], ['`>`', 'mayor'], ['`<=`', 'menor o igual'], ['`>=`', 'mayor o igual']] },
      { code: 'int edad = 18;\nSystem.out.println(edad >= 18);\nSystem.out.println(edad == 20);\nSystem.out.println(edad != 20);\nSystem.out.println(\'a\' < \'b\');' },
      { note: '`=` asigna y `==` compara. Y para comparar textos (String) no se usa `==` sino `equals` (ver Strings).', kind: 'warn' },

      { h: 'Lógicos: &&, || y !' },
      { table: [['Operador', 'Nombre', 'Es true cuando…'], ['`&&`', 'Y (AND)', 'las dos condiciones son true'], ['`||`', 'O (OR)', 'al menos una es true'], ['`!`', 'NO (NOT)', 'invierte: !true es false']] },
      { code: 'int edad = 20;\nboolean carnet = false;\nSystem.out.println(edad >= 18 && carnet);\nSystem.out.println(edad >= 18 || carnet);\nSystem.out.println(!carnet);\nint nota = 7;\nSystem.out.println(nota >= 5 && nota < 7);   // entre 5 y 6' },
      { note: 'En Java no se puede escribir `5 <= nota < 7` como en matemáticas: hay que unir dos comparaciones, `nota >= 5 && nota < 7`.', kind: 'warn' },
      { p: '**Cortocircuito:** `&&` no mira la segunda condición si la primera ya es `false`, y `||` no la mira si la primera ya es `true`. Sirve para evitar errores:' },
      { code: 'int divisor = 0;\n// si divisor es 0, la división no llega a hacerse\nif (divisor != 0 && 10 / divisor > 2) {\n    System.out.println("Mayor que 2");\n} else {\n    System.out.println("No se puede o no es mayor");\n}' },
      { p: 'Existen también `&` y `|` (sin duplicar), que evalúan siempre las dos partes; y `^` (O exclusivo: true si solo una es true). Con condiciones se usan poco.' },

      { h: 'El operador ternario ? :' },
      { p: 'Elige entre dos valores según una condición, en una sola expresión:' },
      { syntax: 'condición ? valorSiTrue : valorSiFalse' },
      { code: 'int nota = 6;\nString resultado = nota >= 5 ? "Aprobado" : "Suspenso";\nSystem.out.println(resultado);\nint a = 8, b = 3;\nint mayor = a > b ? a : b;\nSystem.out.println("El mayor es " + mayor);' },
      { note: 'Úsalo para casos cortos. Si la condición o los valores son largos, un if/else se lee mejor.', kind: 'tip' },

      { h: 'Precedencia: qué se calcula antes' },
      { p: 'Como en matemáticas, `*`, `/` y `%` van antes que `+` y `-`. El orden completo, de más a menos prioridad:' },
      { table: [['Prioridad', 'Operadores'], ['1', '`()` paréntesis'], ['2', '`++` `--` `!` y el casting `(tipo)`'], ['3', '`*` `/` `%`'], ['4', '`+` `-`'], ['5', '`<` `<=` `>` `>=`'], ['6', '`==` `!=`'], ['7', '`&&`'], ['8', '`||`'], ['9', '`? :`'], ['10', '`=` `+=` `-=`…']] },
      { code: 'System.out.println(2 + 3 * 4);\nSystem.out.println((2 + 3) * 4);\nSystem.out.println(10 - 4 - 3);    // de izquierda a derecha\nSystem.out.println(true || false && false);  // && va antes que ||' },
      { note: 'Ante la duda, pon paréntesis: no cambian el resultado si ya era ese orden, y se lee mejor.', kind: 'tip' },

      { h: 'Errores típicos' },
      { list: [
        'Confundir `=` con `==` en una condición.',
        'Esperar decimales de una división entre enteros.',
        'Escribir `a < b < c`: no compila; se escribe `a < b && b < c`.',
        'Usar `&` y `|` creyendo que son `&&` y `||`: funcionan, pero sin cortocircuito.',
        'Abusar de `x++` dentro de otras expresiones.'
      ] },

      { h: 'Resumen' },
      { list: [
        'Aritméticos: `+ - * / %`. El `%` da el resto.',
        '`++`, `--` y las formas cortas `+=`, `-=`…',
        'Comparación (`== != < > <= >=`) y lógicos (`&& || !`) dan boolean; `&&` y `||` hacen cortocircuito.',
        'Ternario: `condición ? a : b`.',
        'Paréntesis para controlar el orden.'
      ] },
      { practice: ['a1', 'a4', 'b1', 'b2', 'b3'] }
    ]
  },
  {
    id: 'math', group: 'Primeros pasos', title: 'La clase Math',
    intro: 'Funciones matemáticas listas para usar: potencias, raíces, redondeos, máximos, aleatorios…',
    blocks: [
      { h: 'Cómo se usa' },
      { p: '`Math` es una clase de `java.lang` (no hace falta importarla) con métodos **estáticos**: se llaman con el nombre de la clase delante, `Math.metodo(…)`.' },
      { code: 'System.out.println(Math.max(4, 9));\nSystem.out.println(Math.sqrt(81));\nSystem.out.println(Math.PI);' },

      { h: 'Máximo, mínimo y valor absoluto' },
      { code: 'System.out.println(Math.max(3, 8));        // el mayor de dos\nSystem.out.println(Math.min(3, 8));        // el menor de dos\nSystem.out.println(Math.max(2.5, 1));      // si uno es double, da double\nSystem.out.println(Math.abs(-7));          // valor absoluto\nSystem.out.println(Math.abs(3 - 10));\nint a = 4, b = 9, c = 6;\nSystem.out.println(Math.max(a, Math.max(b, c)));  // el mayor de tres' },

      { h: 'Potencias y raíces' },
      { code: 'System.out.println(Math.pow(2, 10));   // 2 elevado a 10\nSystem.out.println(Math.pow(5, 2));\nSystem.out.println(Math.pow(9, 0.5));   // exponente 0.5 = raíz cuadrada\nSystem.out.println(Math.sqrt(16));      // raíz cuadrada\nSystem.out.println(Math.cbrt(27));      // raíz cúbica' },
      { note: '`Math.pow` y `Math.sqrt` devuelven siempre `double` (1024.0, 4.0). Si necesitas un int, convierte: `(int) Math.pow(2, 10)`.', kind: 'warn' },

      { h: 'Redondear' },
      { table: [['Método', 'Qué hace', '2.4', '2.5', '-2.5', 'Devuelve'], ['`Math.round(x)`', 'al entero más cercano (.5 hacia arriba)', '2', '3', '-2', 'long (int si x es float)'], ['`Math.floor(x)`', 'hacia abajo', '2.0', '2.0', '-3.0', 'double'], ['`Math.ceil(x)`', 'hacia arriba', '3.0', '3.0', '-2.0', 'double'], ['`(int) x`', 'quita los decimales (hacia el 0)', '2', '2', '-2', 'int']] },
      { code: 'double x = 7.65;\nSystem.out.println(Math.round(x));\nSystem.out.println(Math.floor(x));\nSystem.out.println(Math.ceil(x));\nSystem.out.println((int) x);\n// redondear a 2 decimales: multiplicar, redondear y dividir\nSystem.out.println(Math.round(3.14159 * 100) / 100.0);' },
      { note: '`Math.round` devuelve `long`. Para guardarlo en un int: `int n = (int) Math.round(x);`.', kind: 'warn' },
      { p: 'Un uso típico de `ceil`: cuántas cajas hacen falta para meter 23 libros de 5 en 5 (la última caja va a medias):' },
      { code: 'int libros = 23, porCaja = 5;\nint cajas = (int) Math.ceil((double) libros / porCaja);\nSystem.out.println(cajas + " cajas");' },

      { h: 'Números aleatorios' },
      { p: '`Math.random()` da un `double` al azar entre 0 (incluido) y 1 (sin incluir). Para sacar un entero entre `min` y `max`, ambos incluidos:' },
      { syntax: '(int) (Math.random() * (max - min + 1)) + min' },
      { code: 'int dado = (int) (Math.random() * 6) + 1;        // de 1 a 6\nint nota = (int) (Math.random() * 11);           // de 0 a 10\nSystem.out.println("Dado: " + dado + ", nota: " + nota);', random: true },
      { p: 'Cada vez que lo ejecutas sale otro número. Para programas más completos existe también la clase `java.util.Random` (`new Random().nextInt(6)` da de 0 a 5).' },

      { h: 'Constantes y otros métodos' },
      { code: 'System.out.println(Math.PI);\nSystem.out.println(Math.E);\ndouble radio = 2;\nSystem.out.printf("Área del círculo: %.2f%n", Math.PI * Math.pow(radio, 2));\nSystem.out.println(Math.floorMod(-7, 3));   // resto siempre positivo' },
      { p: 'Hay muchos más: `Math.sin`, `Math.cos` y `Math.tan` (trigonometría, en radianes), `Math.log` y `Math.log10` (logaritmos), `Math.hypot(a, b)` (hipotenusa), `Math.signum` (el signo)…' },

      { h: 'Errores típicos' },
      { list: [
        'Guardar `Math.pow` o `Math.round` en un int sin convertir: no compila.',
        'Usar `Math.pow(x, 2)` para elevar al cuadrado está bien, pero `x * x` es más sencillo y da un int.',
        'Olvidar el `+ 1` en el aleatorio: `(int) (Math.random() * 6)` da de 0 a 5.',
        'Poner mal los paréntesis: `(int) Math.random() * 6` siempre da 0, porque convierte antes de multiplicar.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`Math.max`, `Math.min`, `Math.abs`.',
        '`Math.pow(base, exp)`, `Math.sqrt`, `Math.cbrt` (devuelven double).',
        '`Math.round` (al más cercano), `Math.floor` (abajo), `Math.ceil` (arriba).',
        '`Math.random()` da un decimal entre 0 y 1; con la fórmula, un entero entre min y max.',
        '`Math.PI` y `Math.E`.'
      ] },
      { practice: ['a3', 'b5'] }
    ]
  },
  {
    id: 'scanner', group: 'Primeros pasos', title: 'Leer del teclado (Scanner)',
    intro: 'Pedir datos al usuario mientras el programa está en marcha.',
    blocks: [
      { h: 'Crear un Scanner' },
      { p: 'La clase `Scanner` (del paquete `java.util`) lee lo que el usuario escribe en la consola. Se crea una vez, al principio, conectada al teclado (`System.in`):' },
      { java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        // ... usar teclado ...\n        teclado.close();\n    }\n}' },
      { p: 'Cuando el programa llega a una lectura, **se para** hasta que el usuario escribe y pulsa Enter. Aquí puedes probarlo: escribe en la consola cuando te lo pida.' },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("¿Cómo te llamas? ");\nString nombre = teclado.nextLine();\nSystem.out.print("¿Cuántos años tienes? ");\nint edad = teclado.nextInt();\nSystem.out.println("Hola, " + nombre + ". El año que viene tendrás " + (edad + 1));', stdin: ['Ana', '20'] },

      { h: 'Los métodos para leer' },
      { table: [['Método', 'Lee', 'Ejemplo de lo escrito'], ['`nextInt()`', 'un int', '`42`'], ['`nextLong()`', 'un long', '`9000000000`'], ['`nextDouble()`', 'un double', '`3,5` (con coma en español)'], ['`nextBoolean()`', 'true o false', '`true`'], ['`next()`', 'una palabra (hasta el siguiente espacio)', '`hola`'], ['`nextLine()`', 'la línea entera, con espacios', '`hola mundo`']] },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("Escribe una frase: ");\nString primera = teclado.next();       // solo la primera palabra\nString resto = teclado.nextLine();     // lo que queda de la línea\nSystem.out.println("Primera palabra: " + primera);\nSystem.out.println("Resto: [" + resto + "]");', stdin: ['hola que tal'] },
      { note: 'Con el idioma en español, `nextDouble()` espera la coma decimal (`3,5`). Si escribes `3.5`, Java real da `InputMismatchException`. (Este playground acepta las dos.)', kind: 'warn' },

      { h: 'El problema de nextInt seguido de nextLine' },
      { p: '`nextInt()` (y `nextDouble()`, `next()`…) lee el número pero **deja en la entrada el salto de línea** del Enter. Si después llamas a `nextLine()`, lee ese salto pendiente y devuelve un texto vacío, sin esperar:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("Edad: ");\nint edad = teclado.nextInt();\nSystem.out.print("Nombre: ");\nString nombre = teclado.nextLine();    // ¡lee el Enter que dejó nextInt!\nSystem.out.println("[" + nombre + "] tiene " + edad + " años");', stdin: ['20', 'Ana'] },
      { p: 'La solución es "tragarse" ese salto con un `nextLine()` extra justo después del número:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("Edad: ");\nint edad = teclado.nextInt();\nteclado.nextLine();                    // se come el Enter pendiente\nSystem.out.print("Nombre: ");\nString nombre = teclado.nextLine();\nSystem.out.println(nombre + " tiene " + edad + " años");', stdin: ['20', 'Ana'] },
      { note: 'Otra forma: leer siempre con `nextLine()` y convertir: `int edad = Integer.parseInt(teclado.nextLine());`.', kind: 'tip' },

      { h: 'Si el usuario escribe algo que no es un número' },
      { p: 'Si `nextInt()` se encuentra con un texto, el programa falla con `InputMismatchException`:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("Número: ");\nint n = teclado.nextInt();\nSystem.out.println(n * 2);', stdin: ['hola'], error: true },
      { p: 'Para evitarlo, `hasNextInt()` mira **sin leer** si lo siguiente es un entero. Con un bucle se puede insistir hasta que lo sea:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nSystem.out.print("Número: ");\nwhile (!teclado.hasNextInt()) {\n    String malo = teclado.next();      // se descarta lo que no vale\n    System.out.print(malo + " no es un número. Otra vez: ");\n}\nint n = teclado.nextInt();\nSystem.out.println("El doble es " + n * 2);', stdin: ['hola', '21'] },
      { p: 'También existen `hasNext()`, `hasNextDouble()` y `hasNextLine()`.' },

      { h: 'Leer varios datos' },
      { p: 'Se puede leer dentro de un bucle. Por ejemplo, pedir 3 notas y calcular la media:' },
      { code: 'Scanner teclado = new Scanner(System.in);\ndouble suma = 0;\nfor (int i = 1; i <= 3; i++) {\n    System.out.print("Nota " + i + ": ");\n    suma += teclado.nextDouble();\n}\nSystem.out.printf("Media: %.2f%n", suma / 3);', stdin: ['7', '8,5', '6'] },
      { p: 'Los números también se pueden escribir en la misma línea separados por espacios: cada `nextInt()` coge el siguiente.' },

      { h: 'Cerrar el Scanner' },
      { p: '`teclado.close()` libera el recurso al terminar. Con `System.in` hay un detalle: al cerrarlo se cierra también el teclado, y ya no se puede volver a leer en todo el programa, ni con otro Scanner. Por eso se crea **un solo** Scanner y se cierra al final.' },

      { h: 'Errores típicos' },
      { list: [
        'Olvidar el `import java.util.Scanner;` (en un programa completo): `cannot find symbol: class Scanner`.',
        'El salto de línea pendiente tras `nextInt()`.',
        'Escribir decimales con punto en `nextDouble()` con el idioma en español.',
        'Crear un Scanner nuevo cada vez que se lee, o cerrarlo y querer volver a leer.',
        'Comparar el texto leído con `==` en vez de `equals`.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`Scanner teclado = new Scanner(System.in);` (con `import java.util.Scanner;`).',
        '`nextInt`, `nextDouble`, `next`, `nextLine`… El programa se para hasta que se escribe.',
        'Después de un `nextInt()`, un `nextLine()` extra para limpiar el salto de línea.',
        '`hasNextInt()` comprueba sin leer; sirve para validar.',
        'Un solo Scanner, y `close()` al final.'
      ] },
      { practice: ['l17', 'l18', 'l19'] }
    ]
  }
);
