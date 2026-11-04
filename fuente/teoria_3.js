// Teoría, bloque 3: Control del flujo
TEORIA.push(
  {
    id: 'while', group: 'Control del flujo', title: 'Bucle while',
    intro: 'Repite un bloque de código mientras una condición sea verdadera.',
    blocks: [
      { h: 'Los bucles' },
      { p: 'Un bucle ejecuta el mismo bloque de código varias veces seguidas. Sirven para no copiar y pegar instrucciones, para recorrer datos (las letras de un texto, los valores de un array…) y para repetir algo hasta que pase lo que esperas, como que el usuario escriba una respuesta válida.' },
      { p: 'Java tiene tres bucles: `while`, `do-while` y `for` (con su variante for-each). Este tema trata el primero.' },

      { h: 'El bucle while' },
      { p: 'El bucle `while` repite su bloque **mientras** la condición entre paréntesis sea `true`. Antes de cada vuelta comprueba la condición: si es `true`, ejecuta el bloque y vuelve a comprobarla; en cuanto es `false`, sale del bucle y sigue con lo que haya después.' },
      { syntax: 'while (condición) {\n    // código que se repite\n}' },
      { p: 'En este ejemplo se muestran los números del 0 al 4. La variable `i` empieza en 0 y el bucle se repite mientras `i` sea menor que 5:' },
      { code: 'int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n    i++;\n}' },
      { note: 'No olvides cambiar la variable de la condición dentro del bucle (aquí, `i++`). Si nunca cambia, la condición siempre es `true` y el bucle no termina nunca: es un **bucle infinito**.', kind: 'warn' },

      { h: 'Paso a paso' },
      { p: 'Así se ejecuta el ejemplo anterior, vuelta a vuelta:' },
      { table: [['Vuelta', 'Valor de i', '¿i < 5?', 'Qué hace'], ['1', '0', 'true', 'Muestra 0 y pasa i a 1'], ['2', '1', 'true', 'Muestra 1 y pasa i a 2'], ['3', '2', 'true', 'Muestra 2 y pasa i a 3'], ['4', '3', 'true', 'Muestra 3 y pasa i a 4'], ['5', '4', 'true', 'Muestra 4 y pasa i a 5'], ['—', '5', 'false', 'Sale del bucle']] },
      { p: 'Fíjate en que la condición se comprueba **6 veces** para dar **5 vueltas**: la última comprobación es la que da `false` y hace salir.' },

      { h: 'Si la condición es falsa desde el principio' },
      { p: 'Como `while` comprueba la condición antes de la primera vuelta, puede que el bloque no se ejecute nunca:' },
      { code: 'int i = 10;\nwhile (i < 5) {\n    System.out.println(i);\n    i++;\n}\nSystem.out.println("Fin del programa");' },
      { note: 'Si necesitas que el bloque se ejecute **al menos una vez** (por ejemplo, pedir un dato antes de poder comprobarlo), usa `do-while`, que comprueba la condición al final.', kind: 'tip' },

      { h: 'Cuando no sabes cuántas vueltas va a dar' },
      { p: '`while` encaja cuando el número de vueltas depende de lo que va pasando y no se sabe de antemano. Por ejemplo, para contar las cifras de un número se divide entre 10 hasta que llega a 0:' },
      { code: 'int numero = 4096;\nint cifras = 0;\nwhile (numero > 0) {\n    numero = numero / 10;\n    cifras++;\n}\nSystem.out.println("Tiene " + cifras + " cifras");' },
      { p: 'Otro caso típico: duplicar una cantidad hasta que supere un límite.' },
      { code: 'int valor = 3;\nint veces = 0;\nwhile (valor <= 100) {\n    valor = valor * 2;\n    veces++;\n}\nSystem.out.println(valor + " tras " + veces + " duplicaciones");' },
      { note: 'Una regla práctica: si sabes cuántas vueltas hay que dar (del 1 al 10, una por letra…), suele quedar más claro un `for`. Si depende de una condición que cambia por el camino, `while`.', kind: 'tip' },

      { h: 'Leer datos hasta una palabra (con Scanner)' },
      { p: 'Con `Scanner` el programa puede pedir datos por teclado dentro del bucle. Este repite hasta que escribes «salir». Pulsa **Ejecutar** y escribe en la consola:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nString texto = "";\nwhile (!texto.equals("salir")) {\n    System.out.print("Escribe algo (o salir): ");\n    texto = teclado.nextLine();\n    System.out.println("Has escrito: " + texto);\n}', stdin: ['hola', 'salir'] },
      { p: 'La variable `texto` empieza vacía para que la condición sea `true` la primera vez. El texto se compara con `equals`, no con `==`: `==` mira si son el mismo objeto, no si tienen las mismas letras.' },
      { note: 'En un programa completo, Scanner necesita `import java.util.Scanner;` al principio del archivo. En este playground no hace falta.', kind: 'tip' },

      { h: 'Bucle infinito controlado: while (true) y break' },
      { p: 'A veces se escribe `while (true)`, que nunca para por sí solo, y se sale desde dentro con `break` cuando se cumple algo:' },
      { code: 'int candidato = 31;\nwhile (true) {\n    if (candidato % 7 == 0) {\n        break;\n    }\n    candidato++;\n}\nSystem.out.println("Primer múltiplo de 7: " + candidato);' },
      { p: 'Funciona, pero casi siempre se puede escribir la condición de salida en el propio `while`, y así se ve de un vistazo cuándo termina:' },
      { code: 'int candidato = 31;\nwhile (candidato % 7 != 0) {\n    candidato++;\n}\nSystem.out.println("Primer múltiplo de 7: " + candidato);' },

      { h: 'continue dentro de un while' },
      { p: '`continue` salta lo que queda de la vuelta actual y vuelve a comprobar la condición. Aquí se muestran solo los impares del 1 al 9:' },
      { code: 'int i = 0;\nwhile (i < 9) {\n    i++;\n    if (i % 2 == 0) {\n        continue;\n    }\n    System.out.println(i);\n}' },
      { note: 'En un `while`, actualiza la variable **antes** del `continue`. Si el `i++` estuviera después, al saltar no llegaría a ejecutarse y el bucle se quedaría atascado en el mismo número para siempre.', kind: 'warn' },

      { h: 'Errores típicos' },
      { list: [
        'Poner punto y coma detrás de la condición: `while (i < 5);`. Ese `;` es un bucle vacío que se repite sin hacer nada, y el bloque de después ya no forma parte del bucle. Si la condición es `true`, el programa se queda colgado.',
        'Olvidar actualizar la variable de la condición: el bucle no termina nunca.',
        'Equivocarse en el límite: `i <= 5` da una vuelta más que `i < 5`. Comprueba siempre la primera y la última vuelta.',
        'Escribir `=` en vez de `==` en la condición: `while (i = 5)` no compila, porque `=` asigna y no da un `boolean`.',
        'Comparar textos con `==` en lugar de `equals`: con lo que se lee del teclado, `texto == "salir"` es `false` aunque escribas salir.'
      ] },

      { h: 'Ejemplo de la vida real' },
      { p: 'Cuántos meses hacen falta para ahorrar 1000 euros si se guardan 150 al mes. No sabemos cuántas vueltas dará, así que es un caso de `while`:' },
      { code: 'int ahorrado = 0;\nint meses = 0;\nwhile (ahorrado < 1000) {\n    ahorrado += 150;\n    meses++;\n    System.out.println("Mes " + meses + ": " + ahorrado + " euros");\n}\nSystem.out.println("Necesitas " + meses + " meses");' },

      { h: 'Resumen' },
      { list: [
        '`while (condición) { … }` repite el bloque mientras la condición sea `true`.',
        'La condición se comprueba antes de cada vuelta: si al principio es `false`, no se ejecuta nunca.',
        'Dentro del bucle algo tiene que hacer que la condición acabe siendo `false`.',
        'Es el bucle adecuado cuando no se sabe de antemano cuántas vueltas dará.',
        '`break` sale del bucle y `continue` salta a la siguiente vuelta.'
      ] },
      { practice: ['l4', 'l8', 'l13', 'l17', 'l18'] }
    ]
  }
);
TEORIA.push(
  {
    id: 'dowhile', group: 'Control del flujo', title: 'Bucle do-while',
    intro: 'Como while, pero comprueba la condición al final: el bloque se ejecuta al menos una vez.',
    blocks: [
      { h: 'Cómo funciona' },
      { p: '`do-while` ejecuta primero el bloque y **después** comprueba la condición. Si es `true`, repite; si es `false`, sale. Por eso siempre da **al menos una vuelta**.' },
      { syntax: 'do {\n    // código que se repite\n} while (condición);' },
      { code: 'int i = 1;\ndo {\n    System.out.println(i);\n    i++;\n} while (i <= 5);' },
      { note: 'Termina en punto y coma: `} while (condición);`. Es el único bucle que lo lleva.', kind: 'warn' },

      { h: 'La diferencia con while' },
      { p: 'Con una condición que es falsa desde el principio, `while` no entra nunca, pero `do-while` da una vuelta:' },
      { code: 'int x = 10;\nwhile (x < 5) {\n    System.out.println("while: " + x);\n}\ndo {\n    System.out.println("do-while: " + x);\n} while (x < 5);' },
      { table: [['', 'while', 'do-while'], ['Comprueba la condición', 'antes de cada vuelta', 'después de cada vuelta'], ['Vueltas mínimas', '0', '1'], ['Punto y coma al final', 'no', 'sí']] },

      { h: 'Cuándo usarlo: pedir hasta que sea válido' },
      { p: 'El caso típico es pedir un dato: hay que pedirlo una vez antes de poder comprobar si vale. Escribe números fuera del rango para ver cómo insiste:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nint nota;\ndo {\n    System.out.print("Nota (0 a 10): ");\n    nota = teclado.nextInt();\n} while (nota < 0 || nota > 10);\nSystem.out.println("Nota guardada: " + nota);', stdin: ['12', '-1', '7'] },
      { p: 'Con un mensaje de error solo cuando el dato no vale:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nint edad;\ndo {\n    System.out.print("Edad: ");\n    edad = teclado.nextInt();\n    if (edad < 0) {\n        System.out.println("La edad no puede ser negativa");\n    }\n} while (edad < 0);\nSystem.out.println("Tienes " + edad + " años");', stdin: ['-5', '30'] },

      { h: 'Menús que se repiten' },
      { p: 'Otro uso clásico: un menú que se muestra al menos una vez y se repite hasta elegir salir.' },
      { code: 'Scanner teclado = new Scanner(System.in);\nint opcion;\ndo {\n    System.out.println("1. Saludar  2. Despedirse  0. Salir");\n    System.out.print("Opción: ");\n    opcion = teclado.nextInt();\n    if (opcion == 1) {\n        System.out.println("¡Hola!");\n    } else if (opcion == 2) {\n        System.out.println("¡Adiós!");\n    }\n} while (opcion != 0);\nSystem.out.println("Programa terminado");', stdin: ['1', '2', '0'] },

      { h: 'Cálculos que necesitan una primera vuelta' },
      { p: 'Contar las cifras de un número: con `while (n > 0)` el 0 daría 0 cifras; con do-while, 1.' },
      { code: 'int numero = 0;\nint cifras = 0;\nint n = numero;\ndo {\n    n = n / 10;\n    cifras++;\n} while (n > 0);\nSystem.out.println(numero + " tiene " + cifras + " cifra(s)");' },

      { h: 'La variable de la condición' },
      { p: 'La condición se escribe **fuera** de las llaves, así que las variables declaradas dentro del bloque no se pueden usar en ella. Declárala antes del `do`:' },
      { code: 'Scanner teclado = new Scanner(System.in);\ndo {\n    int n = teclado.nextInt();\n} while (n != 0);', stdin: ['0'], error: true },

      { h: 'Errores típicos' },
      { list: [
        'Olvidar el `;` final: `error: \';\' expected`.',
        'Declarar dentro del bloque la variable que usa la condición.',
        'Usar do-while cuando el bloque **no** debe ejecutarse si la condición ya es falsa al principio.',
        'Igual que en while: no cambiar dentro del bucle lo que mira la condición (bucle infinito).'
      ] },

      { h: 'Resumen' },
      { list: [
        '`do { … } while (condición);` ejecuta y luego comprueba.',
        'Siempre da al menos una vuelta.',
        'Ideal para pedir datos hasta que sean válidos y para menús.',
        'La variable de la condición se declara antes del `do`.'
      ] },
      { practice: ['l12', 'l8', 'l17', 'l19'] }
    ]
  },
  {
    id: 'for', group: 'Control del flujo', title: 'Bucle for',
    intro: 'El bucle para repetir un número conocido de veces, con su contador incluido.',
    blocks: [
      { h: 'Las tres partes del for' },
      { p: '`for` junta en una línea lo que un `while` con contador tiene repartido: la variable que cuenta, la condición y el cambio de cada vuelta.' },
      { syntax: 'for (inicialización; condición; actualización) {\n    // código que se repite\n}' },
      { list: [
        '**Inicialización**: se ejecuta una sola vez, al principio. Normalmente declara el contador: `int i = 0`.',
        '**Condición**: se comprueba antes de cada vuelta; si es `false`, el bucle termina.',
        '**Actualización**: se ejecuta al final de cada vuelta. Normalmente `i++`.'
      ] },
      { code: 'for (int i = 0; i < 5; i++) {\n    System.out.println("Vuelta " + i);\n}' },
      { p: 'Es exactamente lo mismo que este while:' },
      { code: 'int i = 0;\nwhile (i < 5) {\n    System.out.println("Vuelta " + i);\n    i++;\n}' },

      { h: 'Contar de distintas formas' },
      { code: 'for (int i = 1; i <= 5; i++) System.out.print(i + " ");       // de 1 a 5\nSystem.out.println();\nfor (int i = 10; i >= 1; i--) System.out.print(i + " ");     // hacia atrás\nSystem.out.println();\nfor (int i = 0; i <= 20; i += 5) System.out.print(i + " ");  // de 5 en 5\nSystem.out.println();\nfor (int i = 1; i <= 100; i *= 2) System.out.print(i + " "); // multiplicando\nSystem.out.println();' },
      { note: '¿Cuántas vueltas da? Con `i = 0; i < n` son n vueltas (de 0 a n-1). Con `i = 1; i <= n` también n (de 1 a n). Mezclar `i = 0` con `<=` da una de más.', kind: 'tip' },

      { h: 'Acumular y contar dentro del for' },
      { p: 'Patrones que se usan constantemente: un **acumulador** (suma, producto…) y un **contador** que se declaran antes del bucle:' },
      { code: 'int suma = 0;\nint pares = 0;\nfor (int i = 1; i <= 10; i++) {\n    suma += i;\n    if (i % 2 == 0) {\n        pares++;\n    }\n}\nSystem.out.println("Suma del 1 al 10: " + suma);\nSystem.out.println("Pares: " + pares);' },
      { code: 'int n = 5;\nlong factorial = 1;      // el producto empieza en 1, no en 0\nfor (int i = 2; i <= n; i++) {\n    factorial *= i;\n}\nSystem.out.println(n + "! = " + factorial);' },

      { h: 'Recorrer un texto o un array' },
      { code: 'String palabra = "Java";\nfor (int i = 0; i < palabra.length(); i++) {\n    System.out.println(i + " -> " + palabra.charAt(i));\n}\nint[] numeros = {4, 8, 15};\nfor (int i = 0; i < numeros.length; i++) {\n    System.out.println("numeros[" + i + "] = " + numeros[i]);\n}' },
      { p: 'Para recorrer un array sin necesitar la posición hay una forma más corta, el for-each (tema Arrays).' },

      { h: 'Variantes de las tres partes' },
      { p: 'Se pueden usar **varias variables** separadas por comas, y cualquiera de las tres partes puede quedar vacía:' },
      { code: 'for (int i = 0, j = 10; i < j; i++, j--) {\n    System.out.println(i + " y " + j);\n}' },
      { code: 'int i = 3;\nfor (; i > 0; ) {       // sin inicialización ni actualización: como un while\n    System.out.println(i);\n    i--;\n}' },
      { p: '`for (;;)` (sin nada) es un bucle infinito, como `while (true)`.' },

      { h: 'El contador solo existe dentro' },
      { p: 'Si el contador se declara en el for (`int i = 0`), solo existe dentro del bucle. Si lo necesitas después, declárala antes:' },
      { code: 'int i;\nfor (i = 1; i * i < 50; i++) {\n}\nSystem.out.println("El primer número cuyo cuadrado pasa de 50 es " + i);' },

      { h: 'for o while' },
      { list: [
        '**for**: cuando se sabe cuántas vueltas dar, o se recorre algo por posiciones.',
        '**while**: cuando se repite hasta que pase algo y no se sabe cuántas vueltas serán.',
        '**do-while**: como while, pero tiene que ejecutarse al menos una vez.'
      ] },

      { h: 'Errores típicos' },
      { list: [
        'Poner `;` después del paréntesis: `for (int i = 0; i < 5; i++);` repite 5 veces nada, y el bloque se ejecuta una vez.',
        'Separar las partes con comas en vez de punto y coma: `for (int i = 0, i < 5, i++)`.',
        'Equivocarse en el límite (`<` frente a `<=`) y dar una vuelta de más o de menos.',
        'Cambiar el contador dentro del bucle además de en la actualización: se salta vueltas.',
        'Que la actualización vaya en la dirección contraria a la condición: `for (int i = 0; i < 10; i--)` no termina.'
      ] },
      { code: 'for (int i = 0; i < 3; i++);\n{\n    System.out.println("Solo una vez: el for terminó en el punto y coma");\n}' },

      { h: 'Ejemplo de la vida real' },
      { p: 'Tabla de una hipoteca sencilla: cuánto queda por pagar cada año si se pagan 6.000 euros al año de una deuda de 30.000:' },
      { code: 'int deuda = 30000;\nfor (int anio = 1; anio <= 5; anio++) {\n    deuda -= 6000;\n    System.out.println("Año " + anio + ": quedan " + deuda + " euros");\n}' },

      { h: 'Resumen' },
      { list: [
        '`for (inicio; condición; actualización)`: las tres partes del contador en una línea.',
        'Se puede contar hacia arriba, hacia abajo o de n en n.',
        'Acumuladores y contadores se declaran antes del bucle.',
        'Se usa cuando se conoce el número de vueltas o para recorrer por posiciones.'
      ] },
      { practice: ['l1', 'l2', 'l3', 'l7', 'l10', 'l6'] }
    ]
  },
  {
    id: 'anidados', group: 'Control del flujo', title: 'Bucles anidados',
    intro: 'Un bucle dentro de otro: tablas, figuras y combinaciones.',
    blocks: [
      { h: 'Cómo funcionan' },
      { p: 'Cuando un bucle está dentro de otro, el de dentro **se ejecuta entero en cada vuelta** del de fuera. Si el de fuera da 3 vueltas y el de dentro 4, el código de dentro se ejecuta 3 × 4 = 12 veces.' },
      { code: 'for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print("(" + i + "," + j + ") ");\n    }\n    System.out.println();\n}' },
      { note: 'La variable del bucle de dentro (`j`) **vuelve a empezar** en cada vuelta del de fuera. Es lo que más cuesta al principio: sigue el código con una traza.', kind: 'tip' },

      { h: 'Seguirlo paso a paso (traza)' },
      { p: 'Así se ejecuta un ejemplo con 2 vueltas fuera y 3 dentro:' },
      { code: 'for (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.println("i=" + i + " j=" + j);\n    }\n    System.out.println("-- fin de la fila " + i);\n}' },
      { table: [['Paso', 'i', 'j', 'Qué pasa'], ['1', '1', '1', 'muestra i=1 j=1'], ['2', '1', '2', 'muestra i=1 j=2'], ['3', '1', '3', 'muestra i=1 j=3'], ['4', '1', '4', 'j <= 3 es false: sale del de dentro y acaba la fila 1'], ['5', '2', '1', 'j vuelve a empezar en 1'], ['…', '2', '2, 3', 'igual que la fila 1'], ['8', '3', '—', 'i <= 2 es false: termina todo']] },

      { h: 'Tablas' },
      { code: 'for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        System.out.printf("%4d", i * j);\n    }\n    System.out.println();\n}' },

      { h: 'Figuras con asteriscos' },
      { p: 'El bucle de fuera recorre las **filas**; el de dentro dibuja lo que va en cada fila. La clave es encontrar cuántos símbolos lleva la fila `i`:' },
      { code: 'int filas = 4;\n// cuadrado: siempre filas asteriscos\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= filas; j++) System.out.print("*");\n    System.out.println();\n}\nSystem.out.println();\n// triángulo: la fila i tiene i asteriscos\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= i; j++) System.out.print("*");\n    System.out.println();\n}\nSystem.out.println();\n// invertido: la fila i tiene filas - i + 1\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= filas - i + 1; j++) System.out.print("*");\n    System.out.println();\n}' },
      { p: 'Dentro de una fila puede haber **varios bucles seguidos**: uno para los espacios y otro para los asteriscos (pirámide centrada):' },
      { code: 'int filas = 4;\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= filas - i; j++) System.out.print(" ");\n    for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");\n    System.out.println();\n}' },
      { note: 'Para sacar la fórmula, haz una tabla con el número de fila y lo que tiene (fila 1 → 1, fila 2 → 3, fila 3 → 5…) y busca la relación con `i`.', kind: 'tip' },

      { h: 'Combinar elementos' },
      { p: 'Recorrer todas las parejas posibles. Si `j` empieza en `i + 1`, cada pareja sale una sola vez y no se empareja nadie consigo mismo:' },
      { code: 'String[] equipos = {"Rojo", "Azul", "Verde", "Negro"};\nfor (int i = 0; i < equipos.length; i++) {\n    for (int j = i + 1; j < equipos.length; j++) {\n        System.out.println(equipos[i] + " - " + equipos[j]);\n    }\n}' },

      { h: 'Otros bucles también se anidan' },
      { p: 'Se puede anidar cualquier bucle en cualquier otro (while dentro de for, for dentro de do-while…):' },
      { code: 'for (int n = 10; n <= 13; n++) {\n    int divisor = 2;\n    while (n % divisor != 0) {\n        divisor++;\n    }\n    System.out.println(n + ": su menor divisor (mayor que 1) es " + divisor);\n}' },

      { h: 'Salir de los dos bucles a la vez' },
      { p: 'Un `break` solo sale del bucle donde está (el de dentro). Para salir de los dos hay dos formas: una variable boolean en las condiciones, o un `break` con **etiqueta** (tema break y continue).' },
      { code: 'boolean encontrado = false;\nfor (int i = 1; i <= 9 && !encontrado; i++) {\n    for (int j = 1; j <= 9 && !encontrado; j++) {\n        if (i * j == 42) {\n            System.out.println(i + " x " + j + " = 42");\n            encontrado = true;\n        }\n    }\n}' },

      { h: 'Errores típicos' },
      { list: [
        'Usar la misma variable (`i`) en los dos bucles.',
        'Olvidar el `println()` al final de cada fila: todo sale en una línea.',
        'Poner el `println()` dentro del bucle de dentro: cada asterisco sale en su línea.',
        'Pensar que `j` sigue donde se quedó: vuelve a empezar en cada vuelta de fuera.',
        'Anidar demasiado: con 3 bucles de 1.000 vueltas son mil millones de pasos.'
      ] },

      { h: 'Resumen' },
      { list: [
        'El bucle de dentro se ejecuta completo en cada vuelta del de fuera.',
        'Vueltas totales = vueltas de fuera × vueltas de dentro.',
        'Fuera, las filas; dentro, lo que va en cada fila.',
        'Si no lo ves claro, haz una traza con una tabla de i y j.'
      ] },
      { practice: ['l11', 'l14', 'l15', 'l16', 'r9'] }
    ]
  },
  {
    id: 'breakcontinue', group: 'Control del flujo', title: 'break y continue',
    intro: 'Cambiar el recorrido normal de un bucle: salir antes o saltar una vuelta.',
    blocks: [
      { h: 'break: salir del bucle' },
      { p: '`break` termina el bucle **inmediatamente**, aunque la condición siga siendo true, y el programa sigue con lo que hay después del bucle.' },
      { code: 'for (int i = 1; i <= 10; i++) {\n    if (i == 5) {\n        break;\n    }\n    System.out.println(i);\n}\nSystem.out.println("Fuera del bucle");' },
      { p: 'Se usa sobre todo para **dejar de buscar** cuando ya se ha encontrado lo que se buscaba:' },
      { code: 'int[] numeros = {7, 12, 5, 30, 8};\nint posicion = -1;\nfor (int i = 0; i < numeros.length; i++) {\n    if (numeros[i] > 20) {\n        posicion = i;\n        break;                 // no hace falta mirar el resto\n    }\n}\nSystem.out.println("Primer número mayor que 20 en la posición " + posicion);' },

      { h: 'continue: saltar a la siguiente vuelta' },
      { p: '`continue` salta lo que queda de la vuelta actual y pasa a la siguiente. En un `for`, se ejecuta la actualización (`i++`) y se vuelve a comprobar la condición.' },
      { code: 'for (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) {\n        continue;              // los múltiplos de 3 no se muestran\n    }\n    System.out.print(i + " ");\n}\nSystem.out.println();' },
      { p: 'Sirve para descartar al principio los casos que no interesan, sin meter todo lo demás dentro de un if:' },
      { code: 'String[] palabras = {"sol", "", "mar", "  ", "luna"};\nfor (String p : palabras) {\n    if (p.isBlank()) {\n        continue;\n    }\n    System.out.println(p.toUpperCase());\n}' },
      { note: 'En un `while`, cambia la variable de la condición **antes** del `continue`. Si el cambio está después, nunca se ejecuta y el bucle no termina (ver el tema while).', kind: 'warn' },

      { h: 'Comparación' },
      { table: [['', 'break', 'continue'], ['Qué hace', 'sale del bucle', 'salta a la siguiente vuelta'], ['¿Sigue el bucle?', 'no', 'sí'], ['Dónde se usa', 'bucles y switch', 'solo bucles']] },

      { h: 'break solo sale del bucle donde está' },
      { p: 'En bucles anidados, `break` y `continue` afectan solo al bucle más cercano (el de dentro):' },
      { code: 'for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j == 2) {\n            break;             // sale solo del bucle de j\n        }\n        System.out.println("i=" + i + " j=" + j);\n    }\n}' },
      { p: 'Y dentro de un `switch`, `break` sale del switch, no del bucle que lo contiene.' },

      { h: 'break y continue con etiqueta' },
      { p: 'Para salir (o saltar) del bucle de **fuera** desde el de dentro, se pone una **etiqueta** (un nombre seguido de dos puntos) delante del bucle de fuera y se usa `break etiqueta;` o `continue etiqueta;`:' },
      { code: 'fuera:\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (i * j == 4) {\n            System.out.println("Encontrado: " + i + " x " + j);\n            break fuera;       // sale de los dos bucles\n        }\n    }\n}\nSystem.out.println("Fin");' },
      { code: 'filas:\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (j > i) {\n            System.out.println();\n            continue filas;    // pasa a la siguiente vuelta del bucle de fuera\n        }\n        System.out.print(j + " ");\n    }\n    System.out.println();\n}' },
      { note: 'Las etiquetas se usan poco: casi siempre queda más claro con una variable boolean en la condición o separando el código.', kind: 'tip' },

      { h: 'Sin break ni continue' },
      { p: 'Muchos profesores prefieren evitarlos: el código se entiende mejor cuando **la condición del bucle dice cuándo para**. Cualquier break se puede sustituir por una condición:' },
      { code: 'int[] numeros = {7, 12, 5, 30, 8};\nint posicion = -1;\nint i = 0;\nwhile (i < numeros.length && posicion == -1) {\n    if (numeros[i] > 20) {\n        posicion = i;\n    }\n    i++;\n}\nSystem.out.println("Posición: " + posicion);' },
      { p: 'Y un continue, por un if que envuelva el resto de la vuelta:' },
      { code: 'for (int n = 1; n <= 10; n++) {\n    if (n % 3 != 0) {\n        System.out.print(n + " ");\n    }\n}\nSystem.out.println();' },

      { h: 'Errores típicos' },
      { list: [
        'Esperar que `break` salga de todos los bucles: solo del más cercano.',
        'Poner instrucciones después de `break` o `continue` en el mismo bloque: nunca se ejecutan (y Java da error: `unreachable statement`).',
        'Usar `continue` fuera de un bucle: `continue outside of loop`.',
        '`continue` antes de actualizar la variable en un while: bucle infinito.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`break` sale del bucle (o del switch) en el acto.',
        '`continue` salta a la siguiente vuelta.',
        'Solo afectan al bucle más cercano; con etiqueta, al que tú digas.',
        'Casi siempre se pueden sustituir por una buena condición.'
      ] },
      { practice: ['l10', 'l13', 'r4'] }
    ]
  },
  {
    id: 'infinitos', group: 'Control del flujo', title: 'Bucles infinitos y buenas prácticas',
    intro: 'Por qué un bucle no termina, cómo evitarlo, y consejos para escribir bucles claros.',
    blocks: [
      { h: 'Qué es un bucle infinito' },
      { p: 'Un bucle infinito es el que **nunca termina** porque su condición nunca llega a ser `false`. El programa se queda "colgado". En este playground se para solo tras unos millones de pasos y te avisa:' },
      { code: 'int i = 0;\nwhile (i < 5) {\n    System.out.println("Vuelta");\n    // falta i++: i siempre vale 0\n}', error: true },

      { h: 'Causas habituales' },
      { list: [
        '**No actualizar la variable** de la condición dentro del bucle.',
        '**Actualizar en la dirección contraria**: `for (int i = 0; i < 10; i--)`.',
        '**Una condición que siempre se cumple**: `while (x > 0 || x < 10)` (cualquier número es mayor que 0 o menor que 10).',
        '**Saltarse el valor de parada**: `for (int i = 1; i != 10; i += 2)` pasa por 9 y 11, nunca por 10.',
        '**continue antes de actualizar** en un while.',
        '**Un punto y coma** detrás del while: `while (i < 5);`.'
      ] },
      { code: 'for (int i = 1; i != 10 && i < 100; i += 2) {   // sin el i < 100 no pararía nunca\n    System.out.print(i + " ");\n}\nSystem.out.println();' },
      { note: 'Usa `<` o `<=` en vez de `!=` en las condiciones de los contadores: si el contador se pasa del valor, el bucle para igualmente.', kind: 'tip' },

      { h: 'Bucles infinitos a propósito' },
      { p: 'A veces se escribe un bucle infinito controlado: `while (true)` (o `for (;;)`) del que se sale con `break` cuando pasa algo. Es habitual en programas que esperan órdenes del usuario:' },
      { code: 'Scanner teclado = new Scanner(System.in);\nwhile (true) {\n    System.out.print("Comando: ");\n    String comando = teclado.nextLine();\n    if (comando.equals("salir")) {\n        break;\n    }\n    System.out.println("Has escrito " + comando);\n}\nSystem.out.println("Hasta luego");', stdin: ['hola', 'ayuda', 'salir'] },
      { p: 'Lo mismo, sin `while (true)`: con la condición de salida en el propio bucle (la forma que se suele preferir en clase):' },
      { code: 'Scanner teclado = new Scanner(System.in);\nString comando = "";\nwhile (!comando.equals("salir")) {\n    System.out.print("Comando: ");\n    comando = teclado.nextLine();\n    if (!comando.equals("salir")) {\n        System.out.println("Has escrito " + comando);\n    }\n}\nSystem.out.println("Hasta luego");', stdin: ['hola', 'ayuda', 'salir'] },

      { h: 'Cómo detectarlos' },
      { list: [
        'Mira la condición y pregúntate: **¿qué cambia dentro del bucle para que llegue a ser false?** Si nada, es infinito.',
        'Haz una traza con las primeras vueltas: anota el valor de la variable en cada una.',
        'Pon un `System.out.println` dentro del bucle para ver qué valores va tomando.',
        'En un programa real colgado, se para con Ctrl+C en la consola o con el botón de parar del IDE.'
      ] },

      { h: 'Buenas prácticas con bucles' },
      { list: [
        '**Elige el bucle adecuado**: for si sabes cuántas vueltas; while si depende de una condición; do-while si tiene que ejecutarse al menos una vez; for-each para recorrer arrays.',
        '**Nombres claros**: `i`, `j` para contadores cortos; `fila`, `columna`, `intento` cuando ayudan a entender.',
        '**Declara las variables donde hacen falta**: el contador en el for; acumuladores justo antes del bucle.',
        '**No cambies el contador del for dentro del bloque**: solo en la actualización.',
        '**Que la condición diga cuándo para**: usa break y continue con moderación.',
        '**No repitas cálculos** que no cambian dentro del bucle: calcúlalos antes.',
        '**Sal en cuanto tengas la respuesta** al buscar (con la condición o con break), sin recorrer de más.',
        '**Cuidado con los límites**: `i < array.length`, no `<=`.',
        '**Pon siempre llaves**, aunque el bloque tenga una línea.',
        '**No modifiques una colección** (como un ArrayList) mientras la recorres con for-each: da `ConcurrentModificationException`.'
      ] },
      { p: 'Ejemplo de dejar de buscar en cuanto se encuentra, con la condición:' },
      { code: 'String[] nombres = {"Ana", "Luis", "Marta", "Pedro"};\nString buscado = "Marta";\nboolean esta = false;\nint i = 0;\nwhile (i < nombres.length && !esta) {\n    esta = nombres[i].equals(buscado);\n    i++;\n}\nSystem.out.println(buscado + (esta ? " está" : " no está") + " (miradas " + i + " posiciones)");' },
      { p: 'Salirse del array por usar `<=` en vez de `<`:' },
      { code: 'int[] datos = {1, 2, 3};\nfor (int i = 0; i <= datos.length; i++) {\n    System.out.println(datos[i]);\n}', error: true },

      { h: 'Resumen' },
      { list: [
        'Un bucle es infinito si nada de lo que pasa dentro hace falsa la condición.',
        'Comprueba siempre qué cambia en cada vuelta y en qué dirección.',
        '`while (true)` con break es un infinito controlado; suele quedar más claro con la condición.',
        'Elige el bucle adecuado, cuida los límites y pon llaves.'
      ] },
      { practice: ['l13', 'l18', 'l19'] }
    ]
  }
);
