// Teoría, bloque 2: Textos
TEORIA.push(
  {
    id: 'strings', group: 'Textos', title: 'Strings',
    intro: 'Trabajar con textos: crearlos, compararlos, recorrerlos y todos sus métodos.',
    blocks: [
      { h: 'Qué es un String' },
      { p: 'Un `String` es una secuencia de caracteres. Se escribe entre comillas dobles. Cada carácter tiene una **posición** (índice) que empieza en **0**:' },
      { table: [['Posición', '0', '1', '2', '3'], ['Carácter', 'J', 'a', 'v', 'a']] },
      { code: 'String palabra = "Java";\nSystem.out.println(palabra.length());     // 4 caracteres\nSystem.out.println(palabra.charAt(0));    // el primero\nSystem.out.println(palabra.charAt(palabra.length() - 1));  // el último' },
      { note: 'La última posición es `length() - 1`. `charAt(length())` se sale del texto: `StringIndexOutOfBoundsException`.', kind: 'warn' },

      { h: 'Unir textos' },
      { code: 'String nombre = "Ana", apellido = "López";\nString completo = nombre + " " + apellido;\nSystem.out.println(completo);\nSystem.out.println(nombre.concat(" García"));\nSystem.out.println(String.join(", ", "uno", "dos", "tres"));\nSystem.out.println("ja".repeat(3));' },

      { h: 'Los Strings no cambian (inmutables)' },
      { p: 'Un String no se puede modificar: los métodos como `toUpperCase()` o `replace()` **devuelven un String nuevo** y dejan el original igual. Para quedarte con el cambio, guárdalo:' },
      { code: 'String texto = "hola";\ntexto.toUpperCase();              // crea "HOLA" pero no se guarda\nSystem.out.println(texto);\ntexto = texto.toUpperCase();      // ahora sí\nSystem.out.println(texto);' },
      { note: 'Unir muchas veces con `+=` dentro de un bucle crea un String nuevo en cada vuelta. Para construir textos largos es mejor `StringBuilder` (siguiente tema).', kind: 'tip' },

      { h: 'Comparar: equals y no ==' },
      { p: '`==` compara si dos variables apuntan al **mismo objeto**, no si tienen las mismas letras. Para comparar el contenido se usa `equals`:' },
      { code: 'String a = "hola";\nString b = new String("hola");\nSystem.out.println(a == b);              // false: son objetos distintos\nSystem.out.println(a.equals(b));         // true: mismo contenido\nSystem.out.println("Hola".equals("hola"));\nSystem.out.println("Hola".equalsIgnoreCase("hola"));  // sin mirar mayúsculas' },
      { p: '`compareTo` compara por orden alfabético (según los códigos de los caracteres): da 0 si son iguales, un número negativo si el primero va antes y positivo si va después.' },
      { code: 'System.out.println("ana".compareTo("bea"));    // negativo: ana va antes\nSystem.out.println("bea".compareTo("ana"));    // positivo\nSystem.out.println("ana".compareTo("ana"));    // 0\nSystem.out.println("Zoe".compareTo("ana"));    // negativo: las mayúsculas van antes\nSystem.out.println("Zoe".compareToIgnoreCase("ana"));' },

      { h: 'Buscar dentro de un texto' },
      { table: [['Método', 'Devuelve'], ['`indexOf(texto)`', 'la primera posición donde aparece, o -1 si no está'], ['`indexOf(texto, desde)`', 'igual, empezando a buscar en la posición desde'], ['`lastIndexOf(texto)`', 'la última posición donde aparece, o -1'], ['`contains(texto)`', 'true si lo contiene'], ['`startsWith(texto)`', 'true si empieza así'], ['`endsWith(texto)`', 'true si acaba así']] },
      { code: 'String frase = "la casa de la playa";\nSystem.out.println(frase.indexOf("la"));\nSystem.out.println(frase.indexOf("la", 1));\nSystem.out.println(frase.lastIndexOf("la"));\nSystem.out.println(frase.indexOf("perro"));\nSystem.out.println(frase.contains("casa"));\nSystem.out.println(frase.startsWith("la"));\nSystem.out.println("foto.png".endsWith(".png"));\nSystem.out.println(frase.indexOf(\'c\'));      // también con un char' },

      { h: 'Sacar un trozo: substring' },
      { p: '`substring(inicio, fin)` devuelve los caracteres desde `inicio` (incluido) hasta `fin` (**sin incluir**). Con un solo número, hasta el final.' },
      { code: 'String texto = "programacion";\nSystem.out.println(texto.substring(0, 3));    // posiciones 0, 1 y 2\nSystem.out.println(texto.substring(3));       // desde la 3 hasta el final\nSystem.out.println(texto.substring(texto.length() - 3));  // los 3 últimos\nString archivo = "informe.final.pdf";\nSystem.out.println(archivo.substring(archivo.lastIndexOf(".") + 1));  // la extensión' },
      { note: 'Un truco para recordarlo: `substring(a, b)` tiene `b - a` caracteres.', kind: 'tip' },

      { h: 'Mayúsculas, espacios y vacíos' },
      { code: 'String s = "  Hola Mundo  ";\nSystem.out.println("[" + s.toUpperCase() + "]");\nSystem.out.println("[" + s.toLowerCase() + "]");\nSystem.out.println("[" + s.trim() + "]");          // quita espacios de los extremos\nSystem.out.println("[" + s.strip() + "]");         // igual, más moderno\nSystem.out.println("[" + s.stripLeading() + "]");  // solo los del principio\nSystem.out.println("".isEmpty());                  // true: longitud 0\nSystem.out.println("   ".isEmpty());               // false\nSystem.out.println("   ".isBlank());               // true: solo espacios' },

      { h: 'Reemplazar' },
      { code: 'String s = "banana";\nSystem.out.println(s.replace(\'a\', \'o\'));        // todos los caracteres\nSystem.out.println(s.replace("an", "AN"));       // todos los trozos\nSystem.out.println("a b  c".replace(" ", ""));  // quitar espacios\nSystem.out.println("tel: 600-123-456".replaceAll("[0-9]", "*"));\nSystem.out.println("hola hola".replaceFirst("hola", "adiós"));' },
      { p: '`replaceAll` y `replaceFirst` usan **expresiones regulares**: patrones como `[0-9]` (cualquier dígito), `\\\\s` (un espacio), `+` (una o más veces)… `replace` busca el texto tal cual.' },

      { h: 'Partir un texto: split' },
      { p: '`split(separador)` corta el texto por el separador y devuelve un **array** con los trozos:' },
      { code: 'String csv = "Ana,20,Madrid";\nString[] partes = csv.split(",");\nSystem.out.println(partes.length);\nSystem.out.println(partes[0] + " vive en " + partes[2]);\nString frase = "uno   dos tres";\nString[] palabras = frase.split(" +");      // uno o más espacios\nfor (String p : palabras) {\n    System.out.println(p);\n}' },
      { p: 'El separador también es una expresión regular: para partir por un punto hay que escribir `split("\\\\.")`, porque `.` solo significa "cualquier carácter".' },

      { h: 'Recorrer un String carácter a carácter' },
      { code: 'String palabra = "Hola";\nfor (int i = 0; i < palabra.length(); i++) {\n    System.out.println(i + ": " + palabra.charAt(i));\n}' },
      { p: 'Con `toCharArray()` se convierte en un array de `char`, que se puede recorrer con for-each:' },
      { code: 'String palabra = "murcielago";\nint vocales = 0;\nfor (char c : palabra.toCharArray()) {\n    if ("aeiou".indexOf(c) >= 0) {\n        vocales++;\n    }\n}\nSystem.out.println(vocales + " vocales");' },
      { p: 'Darle la vuelta a un texto recorriéndolo hacia atrás:' },
      { code: 'String palabra = "roma";\nString alReves = "";\nfor (int i = palabra.length() - 1; i >= 0; i--) {\n    alReves += palabra.charAt(i);\n}\nSystem.out.println(alReves);' },

      { h: 'Otras cosas útiles' },
      { code: 'System.out.println(String.valueOf(3.5) + "!");     // número a texto\nSystem.out.println("abc".toCharArray().length);\nSystem.out.println(String.valueOf(new char[] {\'h\', \'o\', \'l\', \'a\'}));\nSystem.out.println("A1".matches("[A-Z][0-9]"));    // ¿encaja con el patrón entero?\nSystem.out.println(String.format("%05d", 42));' },
      { p: 'Y algunos métodos más de String, para cuando los necesites: `chars()` (los caracteres como números), `lines()` (separar por líneas), `indent` (sangría), `codePointAt`, `regionMatches`…' },

      { h: 'Errores típicos' },
      { list: [
        'Comparar con `==` en vez de `equals`.',
        'Llamar a un método y no guardar el resultado: `texto.trim();` no cambia `texto`.',
        'Salirse del texto con `charAt` o `substring`: `StringIndexOutOfBoundsException`.',
        'Olvidar que `substring(a, b)` no incluye la posición `b`.',
        'Usar `length` sin paréntesis: en un String es un método, `length()` (en un array es `length`).',
        'Llamar a un método sobre un String que vale `null`: `NullPointerException`.'
      ] },
      { code: 'String s = null;\nSystem.out.println(s.length());', error: true },

      { h: 'Resumen' },
      { list: [
        'Posiciones desde 0 hasta `length() - 1`; `charAt(i)` saca un carácter.',
        'Inmutables: los métodos devuelven un String nuevo.',
        'Comparar con `equals` / `equalsIgnoreCase`; ordenar con `compareTo`.',
        'Buscar: `indexOf`, `contains`, `startsWith`, `endsWith`. Trozos: `substring`. Partir: `split`.',
        'Transformar: `toUpperCase`, `trim`, `replace`, `repeat`.'
      ] },
      { practice: ['s1', 's2', 's5', 's7', 's3', 's4', 's6'] }
    ]
  },
  {
    id: 'stringbuilder', group: 'Textos', title: 'StringBuilder y Character',
    intro: 'Construir textos que cambian, y preguntar cosas sobre un carácter.',
    blocks: [
      { h: 'StringBuilder: un texto que sí se puede cambiar' },
      { p: 'Al contrario que `String`, un `StringBuilder` se puede modificar sin crear objetos nuevos. Es lo adecuado para construir un texto poco a poco, sobre todo dentro de bucles.' },
      { code: 'StringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 5; i++) {\n    sb.append(i).append(" ");\n}\nSystem.out.println(sb.toString());\nSystem.out.println(sb.length());' },
      { p: 'Se puede crear vacío o con un texto inicial: `new StringBuilder("hola")`. Para usarlo como String (compararlo, guardarlo…) se llama a `toString()`.' },

      { h: 'Sus métodos' },
      { table: [['Método', 'Qué hace'], ['`append(x)`', 'añade x al final (cualquier tipo)'], ['`insert(pos, x)`', 'mete x en la posición pos'], ['`reverse()`', 'le da la vuelta'], ['`deleteCharAt(pos)`', 'borra el carácter de esa posición'], ['`delete(inicio, fin)`', 'borra desde inicio hasta fin (sin incluir)'], ['`replace(inicio, fin, texto)`', 'sustituye ese trozo'], ['`setCharAt(pos, c)`', 'cambia un carácter'], ['`charAt`, `length`, `indexOf`, `substring`', 'igual que en String'], ['`setLength(n)`', 'corta (o alarga) a n caracteres'], ['`toString()`', 'lo convierte en String']] },
      { code: 'StringBuilder sb = new StringBuilder("Hola mundo");\nsb.append("!");\nSystem.out.println(sb);\nsb.insert(0, "¡");\nSystem.out.println(sb);\nsb.replace(6, 11, "Java");\nSystem.out.println(sb);\nsb.deleteCharAt(sb.length() - 1);\nSystem.out.println(sb);\nsb.setCharAt(1, \'h\');\nSystem.out.println(sb);\nsb.reverse();\nSystem.out.println(sb);' },
      { p: 'Los métodos que modifican devuelven el propio StringBuilder, así que se pueden **encadenar**:' },
      { code: 'String alReves = new StringBuilder("roma").reverse().toString();\nSystem.out.println(alReves);\nString palabra = "reconocer";\nboolean palindromo = palabra.equals(new StringBuilder(palabra).reverse().toString());\nSystem.out.println(palindromo);' },
      { note: 'Para comparar un StringBuilder con un texto hay que convertirlo: `sb.toString().equals("hola")`. `sb.equals("hola")` siempre da false.', kind: 'warn' },

      { h: 'Character: preguntar sobre un carácter' },
      { p: 'La clase `Character` tiene métodos estáticos para saber qué tipo de carácter es un `char` o para cambiarlo:' },
      { table: [['Método', 'Devuelve true si… / qué hace'], ['`Character.isDigit(c)`', 'es un dígito (0-9)'], ['`Character.isLetter(c)`', 'es una letra (también ñ y vocales con tilde)'], ['`Character.isLetterOrDigit(c)`', 'letra o dígito'], ['`Character.isUpperCase(c)` / `isLowerCase(c)`', 'está en mayúscula / minúscula'], ['`Character.isWhitespace(c)`', 'es un espacio, tabulador o salto de línea'], ['`Character.toUpperCase(c)` / `toLowerCase(c)`', 'lo pasa a mayúscula / minúscula'], ['`Character.getNumericValue(c)`', 'el valor de un dígito: \'7\' → 7']] },
      { code: 'String clave = "Java2024!";\nint letras = 0, digitos = 0, mayus = 0, otros = 0;\nfor (char c : clave.toCharArray()) {\n    if (Character.isLetter(c)) {\n        letras++;\n        if (Character.isUpperCase(c)) {\n            mayus++;\n        }\n    } else if (Character.isDigit(c)) {\n        digitos++;\n    } else {\n        otros++;\n    }\n}\nSystem.out.println(letras + " letras (" + mayus + " mayúscula), " + digitos + " dígitos, " + otros + " otros");' },
      { code: 'String nombre = "maría";\nString capitalizado = Character.toUpperCase(nombre.charAt(0)) + nombre.substring(1);\nSystem.out.println(capitalizado);\nint suma = 0;\nfor (char c : "4096".toCharArray()) {\n    suma += Character.getNumericValue(c);\n}\nSystem.out.println("Suma de cifras: " + suma);' },

      { h: 'char es un número' },
      { p: 'Por dentro, un `char` es un número (su código Unicode). Por eso se pueden comparar con `<`, sumar o usar en un `for`:' },
      { code: 'for (char c = \'a\'; c <= \'e\'; c++) {\n    System.out.print(c + " ");\n}\nSystem.out.println();\nchar letra = \'m\';\nSystem.out.println(letra >= \'a\' && letra <= \'z\');   // ¿minúscula sin tilde?\nSystem.out.println((char) (letra - 32));             // en ASCII, mayúscula = minúscula - 32' },

      { h: 'Errores típicos' },
      { list: [
        'Comparar un StringBuilder con `equals("…")` sin `toString()`.',
        'Usar `+=` con String en bucles muy largos en vez de StringBuilder.',
        'Confundir `Character.getNumericValue(\'7\')` (7) con `(int) \'7\'` (55).',
        '`Character.toUpperCase` recibe y devuelve un `char`, no un String.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`StringBuilder` se modifica: `append`, `insert`, `reverse`, `delete`, `replace`…',
        'Se convierte a String con `toString()`.',
        '`Character.isDigit`, `isLetter`, `isUpperCase`, `toUpperCase`… para clasificar caracteres.',
        'Un `char` es un número: se puede comparar y recorrer.'
      ] },
      { practice: ['l6', 'l9', 'l5'] }
    ]
  }
);
