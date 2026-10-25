var EXERCISES = [
  // ---------- STRINGS ----------
  {
    id: 's1', group: 'Strings', title: 'Letras sin espacios', level: 'Fácil',
    statement: 'Dada una frase, muestra cuántos caracteres tiene sin contar los espacios.',
    input: 'String frase = "Hola mundo Java";',
    tests: ["String frase = \"a b c\";", "String frase = \"sinespacios\";", "String frase = \" dos  espacios \";"],
    expected: '13',
    outInfo: 'Un número entero (int): la cantidad de caracteres.',
    starter: 'String frase = "Hola mundo Java";\n\n// Tu código aquí\n',
    hints: [
      "Divide el problema en dos pasos: primero consigue una versión de la frase sin espacios y después cuenta sus caracteres.",
      "Para quitar los espacios, sustituye cada espacio por un texto vacío con el método de String que reemplaza un texto por otro. Para contar, usa el método que da la longitud de un String.",
      { t: "Completa los huecos:", code: "String sinEspacios = frase.___(\" \", \"___\");\nSystem.out.println(sinEspacios.___());" }
    ],
    solution: 'String frase = "Hola mundo Java";\nString sinEspacios = frase.replace(" ", "");\nSystem.out.println(sinEspacios.length());',
    explanation: 'replace(" ", "") cambia cada espacio por un texto vacío, así que los espacios desaparecen. length() cuenta lo que queda: 13.',
    req: [{ re: /\.replace(All)?\s*\(/, msg: 'quitar los espacios con un método de String' }, { re: /\.length\s*\(\s*\)/, msg: 'contar los caracteres con un método de String' }]
  },
  {
    id: 's2', group: 'Strings', title: 'Primera y última letra', level: 'Fácil',
    statement: 'Muestra la primera y la última letra de la palabra con el formato del resultado esperado. Tu código tiene que funcionar aunque cambies la palabra por otra de distinta longitud.',
    input: 'String palabra = "programacion";',
    tests: ["String palabra = \"java\";", "String palabra = \"a\";", "String palabra = \"Hola\";"],
    expected: 'Primera: p, última: n',
    outInfo: 'Una línea de texto que une "Primera: ", la primera letra (char), ", última: " y la última letra (char).',
    starter: 'String palabra = "programacion";\n\n// Tu código aquí\n',
    hints: [
      "Necesitas sacar dos caracteres sueltos: el de la primera posición y el de la última. La última posición depende de lo larga que sea la palabra.",
      "charAt devuelve el carácter que hay en una posición. Las posiciones empiezan en 0, así que la última es la longitud menos 1.",
      { t: "Completa los huecos:", code: "char primera = palabra.charAt(___);\nchar ultima = palabra.charAt(palabra.___() - ___);\nSystem.out.println(\"Primera: \" + primera + \", última: \" + ultima);" }
    ],
    solution: 'String palabra = "programacion";\nchar primera = palabra.charAt(0);\nchar ultima = palabra.charAt(palabra.length() - 1);\nSystem.out.println("Primera: " + primera + ", última: " + ultima);',
    explanation: 'charAt(0) da la primera letra. La última está en length() - 1 porque las posiciones empiezan en 0. Al unir un char con un String usando +, se concatena como texto.',
    req: [{ re: /\.(charAt|toCharArray)\s*\(/, msg: 'sacar cada letra con un método de String' }, { re: /\.length\s*\(\s*\)/, msg: 'calcular la última posición a partir de la longitud' }]
  },
  {
    id: 's3', group: 'Strings', title: 'Buscador de palabras', level: 'Media',
    statement: 'Comprueba si la frase contiene la palabra buscada sin importar mayúsculas o minúsculas. Muestra true o false.',
    input: 'String frase = "Me gusta programar en Java";\nString buscada = "java";',
    tests: ["String frase = \"JAVA es genial\";\nString buscada = \"java\";", "String frase = \"Me gusta Python\";\nString buscada = \"java\";", "String frase = \"aprendo javascript\";\nString buscada = \"JAVA\";"],
    expected: 'true',
    outInfo: 'Un valor boolean: true o false.',
    starter: 'String frase = "Me gusta programar en Java";\nString buscada = "java";\n\n// Tu código aquí\n',
    hints: [
      "Tienes que saber si un texto está dentro de otro. El problema es que en la frase pone «Java» y buscas «java».",
      "String tiene un método que devuelve true o false según si un texto aparece dentro de otro. Pero distingue mayúsculas, así que «java» no encontraría «Java».",
      "Para que coincidan, pasa al mismo formato (por ejemplo, a minúsculas) tanto la frase como la palabra antes de buscar. Puedes encadenar métodos: primero conviertes y, sobre el resultado, buscas.",
      { t: "Completa los huecos:", code: "boolean laContiene = frase.___().contains(buscada.___());\nSystem.out.println(laContiene);" }
    ],
    solution: 'String frase = "Me gusta programar en Java";\nString buscada = "java";\nboolean laContiene = frase.toLowerCase().contains(buscada.toLowerCase());\nSystem.out.println(laContiene);',
    explanation: 'contains() devuelve true si el texto aparece dentro. Pasando las dos partes a minúsculas, "Java" y "java" coinciden.',
    req: [{ re: /\.(contains|matches)\s*\(/, msg: 'usar un método que compruebe si un texto está dentro de otro' }]
  },
  {
    id: 's4', group: 'Strings', title: 'Extensión de un archivo', level: 'Media',
    statement: 'Muestra solo la extensión del archivo (lo que va después del último punto). Ojo: el nombre tiene más de un punto.',
    input: 'String archivo = "foto.vacaciones.png";',
    tests: ["String archivo = \"foto.png\";", "String archivo = \"a.b.c.txt\";", "String archivo = \"documento.final.PDF\";"],
    expected: 'png',
    outInfo: 'Un texto (String): solo la extensión, sin el punto.',
    starter: 'String archivo = "foto.vacaciones.png";\n\n// Tu código aquí\n',
    hints: [
      "La extensión es lo que va después del último punto. El nombre tiene dos puntos, así que el primero no te sirve.",
      "Necesitas la posición del último punto. Busca un método de String parecido a indexOf, pero que busque empezando por el final.",
      "Con lastIndexOf(\".\") tienes la posición del último punto (15). La extensión empieza en la posición siguiente y llega hasta el final: corta con substring desde ahí.",
      { t: "Completa los huecos:", code: "int indiceUltimoPunto = archivo.___(\".\");\nSystem.out.println(archivo.substring(indiceUltimoPunto ___));" }
    ],
    solution: 'String archivo = "foto.vacaciones.png";\nint indiceUltimoPunto = archivo.lastIndexOf(".");\nSystem.out.println(archivo.substring(indiceUltimoPunto + 1));',
    explanation: 'lastIndexOf(".") devuelve la posición del último punto (15). substring(16) coge desde la posición siguiente hasta el final: "png".',
    req: [{ re: /\.(lastIndexOf|split)\s*\(/, msg: 'usar un método que busque empezando por el final' }]
  },
  {
    id: 's5', group: 'Strings', title: 'Comprobar usuario', level: 'Fácil',
    statement: 'El usuario guardado es "Admin". Comprueba si lo que ha escrito la persona es el mismo usuario sin tener en cuenta mayúsculas y minúsculas. Hazlo en una sola comparación, sin convertir los textos antes.',
    input: 'String guardado = "Admin";\nString escrito = "aDMIN";',
    tests: ["String guardado = \"Admin\";\nString escrito = \"admin\";", "String guardado = \"Admin\";\nString escrito = \"Admim\";", "String guardado = \"Pawel\";\nString escrito = \"PAWEL\";"],
    expected: 'true',
    outInfo: 'Un valor boolean: true o false.',
    starter: 'String guardado = "Admin";\nString escrito = "aDMIN";\n\n// Tu código aquí\n',
    hints: [
      "Para comparar textos no se usa ==, sino un método de String. Aquí, además, las mayúsculas y minúsculas no deben importar.",
      "El método que compara textos es equals. String tiene una versión que ignora las mayúsculas: se llama como equals, más «ignorando mayúsculas» en inglés.",
      { t: "Completa el hueco:", code: "boolean esElMismo = guardado.___(escrito);\nSystem.out.println(esElMismo);" }
    ],
    solution: 'String guardado = "Admin";\nString escrito = "aDMIN";\nboolean esElMismo = guardado.equalsIgnoreCase(escrito);\nSystem.out.println(esElMismo);',
    explanation: 'equals() compara letra a letra distinguiendo mayúsculas. equalsIgnoreCase() hace lo mismo pero trata "A" y "a" como iguales.',
    req: [{ re: /\.equalsIgnoreCase\s*\(/, msg: 'usar una comparación que ignore mayúsculas y minúsculas' }]
  },
  {
    id: 's6', group: 'Strings', title: 'Ocultar tarjeta', level: 'Reto',
    statement: 'Oculta el número de tarjeta: muestra un asterisco por cada cifra excepto las 4 últimas, que se ven tal cual. Tiene que funcionar con números de cualquier longitud.',
    input: 'String tarjeta = "1234567812345678";',
    tests: ["String tarjeta = \"1234\";", "String tarjeta = \"123456789\";", "String tarjeta = \"4000123412341234\";"],
    expected: '************5678',
    outInfo: 'Un texto (String): los asteriscos seguidos de las 4 últimas cifras, sin espacios.',
    starter: 'String tarjeta = "1234567812345678";\n\n// Tu código aquí\n',
    hints: [
      "El resultado tiene dos trozos: los asteriscos y las 4 últimas cifras. Calcula cada uno por separado y únelos con +.",
      "El número de asteriscos es la longitud de la tarjeta menos 4. Esa misma cuenta te dice en qué posición empiezan las cifras que se ven.",
      "Para las cifras visibles, corta con substring desde esa posición hasta el final. Para los asteriscos, String tiene un método que repite un texto las veces que le digas.",
      "Con 16 cifras: 16 - 4 = 12. Necesitas \"*\" repetido 12 veces y substring(12), que da \"5678\". Guarda ese 12 en una variable para usarlo en los dos sitios sin calcularlo dos veces.",
      { t: "Completa los huecos:", code: "int inicioVisible = tarjeta.___() - ___;\nString oculta = \"*\".___(inicioVisible) + tarjeta.substring(___);\nSystem.out.println(oculta);" }
    ],
    solution: 'String tarjeta = "1234567812345678";\nint inicioVisible = tarjeta.length() - 4;\nString oculta = "*".repeat(inicioVisible) + tarjeta.substring(inicioVisible);\nSystem.out.println(oculta);',
    explanation: 'length() - 4 es la posición donde empiezan las cifras visibles (12). "*".repeat(12) crea 12 asteriscos y substring(12) coge las 4 últimas cifras.',
    req: [{ re: /\.(repeat|replaceAll|replaceFirst)\s*\(|\b(for|while)\s*\(/, msg: 'usar un método que repita un texto' }, { re: /\.length\s*\(\s*\)/, msg: 'calcular las posiciones a partir de la longitud' }]
  },

  {
    id: 's7', group: 'Strings', title: 'Teléfono de España', level: 'Fácil',
    statement: 'Comprueba si el número de teléfono es de España, es decir, si empieza por el prefijo +34. Muestra true o false.',
    input: 'String telefono = "+34 612 345 678";',
    tests: ["String telefono = \"+34 600 000 000\";", "String telefono = \"34 612 345 678\";", "String telefono = \"+351 912 345 678\";"],
    expected: 'true',
    outInfo: 'Un valor boolean: true o false.',
    starter: 'String telefono = "+34 612 345 678";\n\n// Tu código aquí\n',
    hints: [
      "Solo tienes que comprobar cómo empieza el texto. El resultado es un boolean que puedes mostrar directamente.",
      "String tiene un método que comprueba cómo termina un texto (endsWith) y otro «hermano» que comprueba cómo empieza. Pásale el prefijo completo, con el +.",
      { t: "Completa los huecos:", code: "boolean esDeEspana = telefono.___(\"___\");\nSystem.out.println(esDeEspana);" }
    ],
    solution: 'String telefono = "+34 612 345 678";\nboolean esDeEspana = telefono.startsWith("+34");\nSystem.out.println(esDeEspana);',
    explanation: 'startsWith() es el "hermano" de endsWith(): devuelve true si el texto empieza por lo que le pasas.',
    req: [{ re: /\.(startsWith|matches)\s*\(/, msg: 'usar un método que compruebe cómo empieza un texto' }]
  },

  // ---------- ARITMÉTICA ----------
  {
    id: 'a1', group: 'Aritmética', title: 'Horas y minutos', level: 'Fácil',
    statement: 'Convierte los minutos totales en horas y minutos con el formato del resultado esperado.',
    input: 'int totalMinutos = 135;',
    tests: ["int totalMinutos = 60;", "int totalMinutos = 59;", "int totalMinutos = 0;", "int totalMinutos = 125;", "int totalMinutos = 1439;"],
    expected: '2 h 15 min',
    outInfo: 'Una línea de texto: las horas y los minutos son números (int) que unes con el texto " h " y " min". Respeta los espacios.',
    starter: 'int totalMinutos = 135;\n\n// Tu código aquí\n',
    hints: [
      "Necesitas dos datos: cuántas horas completas caben en los minutos y cuántos minutos sobran. Los dos se calculan con operaciones entre números enteros.",
      "Para las horas, divide entre 60: al dividir dos int, Java descarta los decimales, que aquí es justo lo que quieres. Para lo que sobra, usa el operador que da el resto de una división.",
      { t: "Completa los huecos. Ojo con los espacios dentro de los textos: tiene que salir exactamente 2 h 15 min.", code: "int horas = totalMinutos ___ 60;\nint minutos = totalMinutos ___ 60;\nSystem.out.println(horas + \"___\" + minutos + \"___\");" }
    ],
    solution: 'int totalMinutos = 135;\nint horas = totalMinutos / 60;\nint minutos = totalMinutos % 60;\nSystem.out.println(horas + " h " + minutos + " min");',
    explanation: 'Al dividir dos int, Java quita los decimales: 135 / 60 = 2. El operador % da el resto: 135 % 60 = 15.',
    req: []
  },
  {
    id: 'a2', group: 'Aritmética', title: 'Nota media', level: 'Media',
    statement: 'Calcula la nota media de las tres notas, con decimales.',
    input: 'int nota1 = 7;\nint nota2 = 8;\nint nota3 = 8;',
    tests: ["int nota1 = 5;\nint nota2 = 5;\nint nota3 = 5;", "int nota1 = 10;\nint nota2 = 9;\nint nota3 = 9;", "int nota1 = 0;\nint nota2 = 1;\nint nota3 = 1;"],
    expected: '7.666666666666667',
    outInfo: 'Un número decimal (double), tal como lo muestra println.',
    starter: 'int nota1 = 7;\nint nota2 = 8;\nint nota3 = 8;\n\n// Tu código aquí\n',
    hints: [
      "Prueba lo más directo: suma las tres notas y divide entre 3. Ejecútalo: ¿sale lo esperado?",
      "Fíjate en los tipos: las notas son int. ¿Qué hace Java al dividir dos int? Guardar el resultado en un double no lo arregla, porque la división ya se ha hecho antes de guardarlo.",
      "Necesitas que al menos uno de los dos números de la división sea decimal. Hay dos formas: escribir el 3 como número decimal, o convertir la suma a double antes de dividir.",
      { t: "¿Qué escribes en el hueco para que la división tenga decimales?", code: "double media = (nota1 + nota2 + nota3) / ___;\nSystem.out.println(media);" }
    ],
    solution: 'int nota1 = 7;\nint nota2 = 8;\nint nota3 = 8;\ndouble media = (nota1 + nota2 + nota3) / 3.0;\nSystem.out.println(media);',
    explanation: '(7 + 8 + 8) / 3 daría 7 porque es una división entre int. Con 3.0 uno de los dos es double, así que Java divide con decimales: 7.666666666666667.',
    req: [],
    alt: { unless: /\(\s*double\s*\)/, code: 'double media = (double) (nota1 + nota2 + nota3) / 3;', why: 'Con (double) conviertes la suma a decimal antes de dividir. Es útil cuando el divisor es una variable y no puedes escribir 3.0.' }
  },
  {
    id: 'a3', group: 'Aritmética', title: 'Precio con IVA', level: 'Reto',
    statement: 'Calcula el precio con el 21 % de IVA y redondéalo a 2 decimales.',
    input: 'double precio = 19.99;\nint iva = 21;',
    tests: ["double precio = 10.0;\nint iva = 21;", "double precio = 100.0;\nint iva = 10;", "double precio = 0.99;\nint iva = 4;", "double precio = 49.95;\nint iva = 21;"],
    expected: '24.19',
    outInfo: 'Un número decimal (double) con 2 decimales como máximo.',
    starter: 'double precio = 19.99;\nint iva = 21;\n\n// Tu código aquí\n',
    hints: [
      "Hay dos partes: calcular el precio con IVA y después redondearlo a 2 decimales. Haz primero la primera y ejecútala para ver qué sale.",
      "El IVA es un porcentaje del precio: precio por 21 entre 100. El precio final es el precio más ese IVA.",
      "Para redondear, la clase Math tiene un método que redondea al entero más cercano. Pero tú quieres 2 decimales, no ninguno: necesitas un truco antes y después de redondear.",
      "El truco: multiplica por 100 (24.1879 pasa a 2418.79), redondea (2419) y divide entre 100.0 (24.19). Divide entre 100.0 y no entre 100: Math.round devuelve un número entero y, si divides entre otro entero, pierdes los decimales.",
      { t: "Completa los huecos:", code: "double precioFinal = precio + precio * iva / ___;\ndouble redondeado = Math.round(precioFinal * ___) / ___;\nSystem.out.println(redondeado);" }
    ],
    solution: 'double precio = 19.99;\nint iva = 21;\ndouble precioFinal = precio + precio * iva / 100;\ndouble redondeado = Math.round(precioFinal * 100) / 100.0;\nSystem.out.println(redondeado);',
    explanation: 'El precio final es 24.1879. Math.round(2418.79) da 2419, y al dividir entre 100.0 queda 24.19. Hay que dividir entre 100.0 y no entre 100 para que la división tenga decimales.',
    req: [{ re: /Math\s*\.\s*round\s*\(/, msg: 'usar el método para redondear de la clase de funciones matemáticas' }]
  },

  // ---------- BOOLEANOS Y CONDICIONES ----------
  {
    id: 'b1', group: 'Booleanos y condiciones', title: '¿Puede conducir?', level: 'Fácil',
    statement: 'Una persona puede conducir si tiene 18 años o más y además tiene carnet. Guarda el resultado en una sola variable boolean y muéstralo.',
    input: 'int edad = 19;\nboolean tieneCarnet = false;',
    tests: ["int edad = 17;\nboolean tieneCarnet = true;", "int edad = 18;\nboolean tieneCarnet = true;", "int edad = 18;\nboolean tieneCarnet = false;", "int edad = 30;\nboolean tieneCarnet = true;"],
    expected: 'false',
    outInfo: 'Un valor boolean: true o false.',
    starter: 'int edad = 19;\nboolean tieneCarnet = false;\n\n// Tu código aquí\n',
    hints: [
      "Hay dos condiciones y tienen que cumplirse las dos a la vez: la de la edad y la del carnet. El resultado se guarda en una variable boolean.",
      "Une las dos condiciones con el operador lógico que solo da true si las dos son true. Para la edad, piensa si los 18 cuentan: elige entre > y >=.",
      { t: "Completa los huecos:", code: "boolean puedeConducir = edad ___ 18 ___ tieneCarnet;\nSystem.out.println(puedeConducir);" }
    ],
    solution: 'int edad = 19;\nboolean tieneCarnet = false;\nboolean puedeConducir = edad >= 18 && tieneCarnet;\nSystem.out.println(puedeConducir);',
    explanation: '&& solo da true si las dos partes son true. La edad cumple, pero no tiene carnet, así que el resultado es false.',
    req: [{ re: /&&/, msg: 'usar el operador lógico que exige que se cumplan las dos condiciones' }]
  },
  {
    id: 'b2', group: 'Booleanos y condiciones', title: 'Temperatura ideal', level: 'Fácil',
    statement: 'La temperatura es ideal si está entre 18 y 26 grados, ambos incluidos. Muestra true o false.',
    input: 'double temperatura = 26.0;',
    tests: ["double temperatura = 17.9;", "double temperatura = 18.0;", "double temperatura = 22.5;", "double temperatura = 26.1;", "double temperatura = 30.0;"],
    expected: 'true',
    outInfo: 'Un valor boolean: true o false.',
    starter: 'double temperatura = 26.0;\n\n// Tu código aquí\n',
    hints: [
      "Estar «entre 18 y 26» son en realidad dos comparaciones: no estar por debajo de 18 y no pasar de 26. Java no deja escribirlo como en matemáticas (18 ≤ t ≤ 26).",
      "Las dos comparaciones se tienen que cumplir a la vez, así que únelas con el operador lógico «y». Como los límites están incluidos, usa >= y <=.",
      { t: "Completa los huecos:", code: "boolean esIdeal = temperatura ___ 18 ___ temperatura ___ 26;\nSystem.out.println(esIdeal);" }
    ],
    solution: 'double temperatura = 26.0;\nboolean esIdeal = temperatura >= 18 && temperatura <= 26;\nSystem.out.println(esIdeal);',
    explanation: 'Un rango se comprueba con dos comparaciones unidas por &&. Con <= se incluye el 26, por eso da true.',
    req: [{ re: /&&/, msg: 'unir las dos comparaciones con un operador lógico' }]
  },
  {
    id: 'b3', group: 'Booleanos y condiciones', title: 'Par o impar', level: 'Fácil',
    statement: 'Muestra si el número es par o impar con el formato del resultado esperado.',
    input: 'int numero = 17;',
    tests: ["int numero = 4;", "int numero = 0;", "int numero = 1;", "int numero = 100;", "int numero = 33;"],
    expected: '17 es impar',
    outInfo: 'Una línea de texto: el número (int) seguido de " es par" o " es impar".',
    starter: 'int numero = 17;\n\n// Tu código aquí\n',
    hints: [
      "Un número es par si al dividirlo entre 2 no sobra nada. Tienes que calcular lo que sobra y, según eso, mostrar un mensaje u otro.",
      "El operador % da el resto de una división. Con un if / else eliges qué mensaje mostrar. Para comparar usa == (dos iguales), no =.",
      { t: "Completa los huecos:", code: "if (numero ___ 2 == ___) {\n    System.out.println(numero + \" es par\");\n} else {\n    System.out.println(numero + \"___\");\n}" }
    ],
    solution: 'int numero = 17;\nif (numero % 2 == 0) {\n    System.out.println(numero + " es par");\n} else {\n    System.out.println(numero + " es impar");\n}',
    explanation: 'numero % 2 es 0 en los pares y 1 en los impares. El if elige qué mensaje se muestra.',
    req: [{ re: /%/, msg: 'usar el operador del resto' }, { re: /\bif\s*\(|\?|\bswitch\s*\(/, msg: 'usar una estructura que elija entre dos caminos' }],
    alt: { unless: /\?/, code: 'String tipo = numero % 2 == 0 ? "par" : "impar";\nSystem.out.println(numero + " es " + tipo);', why: 'El operador ternario (condición ? valor si sí : valor si no) elige entre dos valores en una sola línea, y así el println no se repite.' }
  },
  {
    id: 'b4', group: 'Booleanos y condiciones', title: 'Nota en texto', level: 'Media',
    statement: 'Muestra la calificación en texto: menos de 5, Suspenso; de 5 a menos de 7, Aprobado; de 7 a menos de 9, Notable; 9 o más, Sobresaliente.',
    input: 'double nota = 7.5;',
    tests: ["double nota = 3.0;", "double nota = 4.99;", "double nota = 5.0;", "double nota = 6.9;", "double nota = 7.0;", "double nota = 8.99;", "double nota = 9.0;", "double nota = 10.0;"],
    expected: 'Notable',
    outInfo: 'Una palabra (String): Suspenso, Aprobado, Notable o Sobresaliente.',
    starter: 'double nota = 7.5;\n\n// Tu código aquí\n',
    hints: [
      "Hay cuatro resultados posibles y solo se debe mostrar uno. Necesitas varias condiciones encadenadas.",
      "Usa if para el primer caso, else if para los intermedios y else para el último. Java comprueba en orden y entra solo en el primero que se cumple.",
      "Si compruebas de menor a mayor, cada condición ya sabe que las anteriores no se cumplieron: si llega a comprobar «nota < 7» es porque la nota ya no es menor que 5. Así basta con una comparación en cada caso.",
      { t: "Completa los huecos:", code: "if (nota < ___) {\n    System.out.println(\"Suspenso\");\n} else if (nota < ___) {\n    System.out.println(\"Aprobado\");\n} else if (nota < ___) {\n    System.out.println(\"Notable\");\n} ___ {\n    System.out.println(\"Sobresaliente\");\n}" }
    ],
    solution: 'double nota = 7.5;\nif (nota < 5) {\n    System.out.println("Suspenso");\n} else if (nota < 7) {\n    System.out.println("Aprobado");\n} else if (nota < 9) {\n    System.out.println("Notable");\n} else {\n    System.out.println("Sobresaliente");\n}',
    explanation: 'Con if / else if, Java comprueba en orden y entra solo en el primer caso que se cumple. 7.5 no es menor que 5 ni que 7, pero sí que 9: Notable.',
    req: [{ re: /else\s+if/, msg: 'encadenar varias condiciones' }]
  },

  // ---------- BUCLES ----------
  {
    id: 'l1', group: 'Bucles', title: 'Contar hasta 5', level: 'Fácil',
    statement: 'Muestra los números del 1 al 5, cada uno en una línea, usando un bucle.',
    input: '(sin datos de entrada)',
    expected: '1\n2\n3\n4\n5',
    outInfo: 'Cinco líneas, cada una con un número (int).',
    starter: '// Tu código aquí\n',
    hints: [
      "Quieres repetir algo un número de veces que ya conoces: mostrar un número en cada vuelta. El bucle for está pensado para eso.",
      "El for tiene tres partes separadas por punto y coma: dónde empieza la variable (en 1), hasta cuándo sigue (mientras sea menor o igual que 5) y cómo cambia en cada vuelta (suma 1).",
      { t: "Completa los huecos:", code: "for (int i = ___; i ___ 5; i++) {\n    System.out.println(___);\n}" }
    ],
    solution: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
    explanation: 'El for empieza con i = 1, repite mientras i <= 5 y suma 1 en cada vuelta. En cada vuelta muestra el valor de i.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }]
  },
  {
    id: 'l2', group: 'Bucles', title: 'Tabla de multiplicar', level: 'Fácil',
    statement: 'Muestra la tabla de multiplicar del número, del 1 al 10, con el formato del resultado esperado.',
    input: 'int numero = 7;',
    tests: ["int numero = 1;", "int numero = 9;", "int numero = 12;"],
    expected: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70',
    outInfo: 'Diez líneas de texto con el formato "7 x 1 = 7": números (int) unidos con " x " y " = ".',
    starter: 'int numero = 7;\n\n// Tu código aquí\n',
    hints: [
      "Necesitas un contador que vaya del 1 al 10 y, en cada vuelta, mostrar una línea de la tabla.",
      "Cada línea une números y textos con +: el número, \" x \", el contador, \" = \" y el resultado de multiplicar. La multiplicación se hace antes que la concatenación, porque * tiene más prioridad que +.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= ___; i++) {\n    System.out.println(numero + \" x \" + i + \"___\" + numero ___ i);\n}" }
    ],
    solution: 'int numero = 7;\nfor (int i = 1; i <= 10; i++) {\n    System.out.println(numero + " x " + i + " = " + numero * i);\n}',
    explanation: 'El for repite 10 veces. La multiplicación se hace antes que la concatenación porque * tiene más prioridad que +.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }]
  },
  {
    id: 'l3', group: 'Bucles', title: 'Suma del 1 al 100', level: 'Fácil',
    statement: 'Calcula la suma de todos los números del 1 al 100 con un bucle y muestra solo el resultado final.',
    input: '(sin datos de entrada)',
    expected: '5050',
    outInfo: 'Un número entero (int): solo el total, en una línea.',
    starter: '// Tu código aquí\n',
    hints: [
      "Necesitas una variable que vaya acumulando la suma: empieza en 0 y en cada vuelta le añades un número.",
      "Recorre del 1 al 100 con un for y, dentro, añade el número de esa vuelta con +=. Muestra el resultado después del bucle: si lo pones dentro, verás 100 líneas.",
      { t: "Completa los huecos:", code: "int suma = ___;\nfor (int i = 1; i <= 100; i++) {\n    suma ___ i;\n}\nSystem.out.println(___);" }
    ],
    solution: 'int suma = 0;\nfor (int i = 1; i <= 100; i++) {\n    suma += i;\n}\nSystem.out.println(suma);',
    explanation: 'suma empieza en 0 y en cada vuelta se le añade i (suma += i es lo mismo que suma = suma + i). Al terminar el bucle vale 5050.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }],
    alt: { code: 'int n = 100;\nint suma = n * (n + 1) / 2;\nSystem.out.println(suma);', why: 'Curiosidad: la suma de 1 a n tiene una fórmula (la de Gauss), así que se puede calcular sin bucle. Aquí el ejercicio pedía el bucle para practicarlo.' }
  },
  {
    id: 'l4', group: 'Bucles', title: 'Cuenta atrás', level: 'Fácil',
    statement: 'Haz una cuenta atrás desde el número de inicio hasta 1 con un bucle while y termina con "¡Despegue!".',
    input: 'int inicio = 5;',
    tests: ["int inicio = 1;", "int inicio = 3;", "int inicio = 10;"],
    expected: '5\n4\n3\n2\n1\n¡Despegue!',
    outInfo: 'Cinco líneas con un número (int) cada una y una última línea con el texto "¡Despegue!".',
    starter: 'int inicio = 5;\n\n// Tu código aquí\n',
    hints: [
      "Una cuenta atrás repite «mostrar el número y restar 1» mientras el número no baje de 1. Al terminar, se muestra el mensaje una sola vez.",
      "El while solo tiene condición: el contador lo creas antes y lo cambias tú dentro del bucle (si no, nunca termina). El mensaje final va fuera del bucle.",
      { t: "Completa los huecos:", code: "int contador = inicio;\nwhile (contador ___ 1) {\n    System.out.println(contador);\n    contador___;\n}\nSystem.out.println(\"¡Despegue!\");" }
    ],
    solution: 'int inicio = 5;\nint contador = inicio;\nwhile (contador >= 1) {\n    System.out.println(contador);\n    contador--;\n}\nSystem.out.println("¡Despegue!");',
    explanation: 'El while repite mientras contador >= 1. Dentro se muestra y se resta 1 con contador--. Cuando llega a 0 sale del bucle y muestra el mensaje.',
    req: [{ re: /\bwhile\s*\(/, msg: 'usar un bucle while' }]
  },
  {
    id: 'l5', group: 'Bucles', title: 'Contar vocales', level: 'Reto',
    statement: 'Cuenta cuántas vocales (a, e, i, o, u) tiene la frase. Todas las letras están en minúsculas y sin tildes.',
    input: 'String frase = "aprendiendo java con un curso";',
    tests: ["String frase = \"aeiou\";", "String frase = \"xyz\";", "String frase = \"murcielago\";"],
    expected: '11',
    outInfo: 'Un número entero (int): la cantidad de vocales.',
    starter: 'String frase = "aprendiendo java con un curso";\n\n// Tu código aquí\n',
    hints: [
      "Tienes que mirar la frase letra a letra y contar cuántas son vocales. Necesitas un bucle que recorra todas las letras y un contador.",
      "Como solo te importa cada letra y no su posición, te sirve un for-each. Busca un método de String que convierta el texto en un array de char para poder recorrerlo así.",
      "Crea un contador a 0 fuera del bucle y recorre las letras con for (char letra : frase.toCharArray()). En cada vuelta, si la letra es vocal, suma 1. Para saber si es vocal puedes unir cinco comparaciones con || (letra == 'a' || letra == 'e'...). Ojo: un char va entre comillas simples.",
      "Otra forma más corta de saber si es vocal: busca la letra dentro del texto \"aeiou\" con indexOf. Si no está, indexOf devuelve -1; si da otra cosa, es vocal y sumas 1 al contador.",
      { t: "Completa los huecos:", code: "int vocales = 0;\nfor (char letra : frase.___()) {\n    if (\"aeiou\".indexOf(letra) ___ -1) {\n        vocales++;\n    }\n}\nSystem.out.println(vocales);" }
    ],
    solution: 'String frase = "aprendiendo java con un curso";\nint vocales = 0;\nfor (char letra : frase.toCharArray()) {\n    if ("aeiou".indexOf(letra) != -1) {\n        vocales++;\n    }\n}\nSystem.out.println(vocales);',
    explanation: 'toCharArray() convierte la frase en un array de char y el for-each da una letra en cada vuelta: no hace falta la posición. "aeiou".indexOf(letra) devuelve -1 si la letra no es vocal, así que cuando es distinto de -1 se suma 1. También vale un for con índice (for (int i = 0; i < frase.length(); i++) y frase.charAt(i)), pero solo es necesario si te importa la posición de cada letra.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle que recorra la frase' }, { re: /\.(charAt|toCharArray)\s*\(/, msg: 'sacar cada letra de la frase' }],
    alt: { unless: /indexOf/, code: 'if ("aeiou".indexOf(letra) != -1) {\n    vocales++;\n}', why: 'En vez de cinco comparaciones con ||, buscas la letra dentro de "aeiou": si indexOf no da -1, es una vocal. Es más corto y fácil de ampliar (por ejemplo, con vocales con tilde).' }
  },
  {
    id: 'l6', group: 'Bucles', title: 'Palabra al revés', level: 'Media',
    statement: 'Muestra la palabra escrita al revés usando un bucle.',
    input: 'String palabra = "programar";',
    tests: ["String palabra = \"a\";", "String palabra = \"oso\";", "String palabra = \"Java\";"],
    expected: 'ramargorp',
    outInfo: 'Un texto (String): la palabra invertida.',
    starter: 'String palabra = "programar";\n\n// Tu código aquí\n',
    hints: [
      "Vas a construir un texto nuevo letra a letra, empezando por el final de la palabra.",
      "Crea un String vacío y recorre la palabra con un for que vaya hacia atrás: empieza en la última posición y baja hasta la 0.",
      "La última posición es length() - 1. La condición es i >= 0 y en cada vuelta restas 1 con i--. Dentro, añade al String la letra de esa posición (charAt) con +=.",
      { t: "Completa los huecos:", code: "String alReves = \"\";\nfor (int i = palabra.length() - ___; i >= ___; i___) {\n    alReves += palabra.___(i);\n}\nSystem.out.println(alReves);" }
    ],
    solution: 'String palabra = "programar";\nString alReves = "";\nfor (int i = palabra.length() - 1; i >= 0; i--) {\n    alReves += palabra.charAt(i);\n}\nSystem.out.println(alReves);',
    explanation: 'El for empieza en la última posición y baja hasta 0. En cada vuelta se añade esa letra al final de alReves, así que la palabra queda invertida.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }, { re: /\.(charAt|toCharArray)\s*\(/, msg: 'sacar cada letra de la palabra' }],
    alt: { unless: /toCharArray/, code: 'String alReves = "";\nfor (char letra : palabra.toCharArray()) {\n    alReves = letra + alReves;\n}\nSystem.out.println(alReves);', why: 'Sin índices: recorres la palabra hacia delante y pones cada letra delante de lo que ya tenías, así queda al revés. Funciona porque alReves es un String; si las dos partes fueran char, el + las sumaría como números.' }
  },
  // ---------- ARRAYS ----------
  {
    id: 'r1', group: 'Arrays', title: 'Temperatura máxima', level: 'Media',
    statement: 'Muestra la temperatura más alta del array recorriéndolo con un bucle. Tiene que funcionar aunque cambies los valores o añadas más.',
    input: 'int[] temperaturas = {18, 23, 31, 27, 19};',
    tests: ["int[] temperaturas = {5};", "int[] temperaturas = {-3, -1, -7};", "int[] temperaturas = {1, 2, 3};", "int[] temperaturas = {9, 9, 1};"],
    expected: '31',
    outInfo: 'Un número entero (int): la temperatura más alta.',
    starter: 'int[] temperaturas = {18, 23, 31, 27, 19};\n\n// Tu código aquí\n',
    hints: [
      "Imagina que miras las temperaturas una a una y apuntas la más alta que has visto hasta ahora. Al terminar, lo que tienes apuntado es el máximo.",
      "Empieza con el primer elemento del array como «máximo provisional». Así siempre comparas con un valor que existe de verdad.",
      "Recorre el array y, en cada vuelta, si la temperatura es mayor que tu máximo provisional, sustitúyelo por ella.",
      { t: "Completa los huecos:", code: "int maxima = temperaturas[___];\nfor (int temperatura : temperaturas) {\n    if (temperatura ___ maxima) {\n        maxima = ___;\n    }\n}\nSystem.out.println(maxima);" }
    ],
    solution: 'int[] temperaturas = {18, 23, 31, 27, 19};\nint maxima = temperaturas[0];\nfor (int temperatura : temperaturas) {\n    if (temperatura > maxima) {\n        maxima = temperatura;\n    }\n}\nSystem.out.println(maxima);',
    explanation: 'maxima empieza con el primer valor. El for-each recorre todos y, si encuentra uno mayor, lo guarda. Al terminar, maxima tiene el más alto.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle que recorra el array' }],
    alt: { unless: /Math\s*\.\s*max/, code: 'for (int temperatura : temperaturas) {\n    maxima = Math.max(maxima, temperatura);\n}', why: 'Math.max devuelve el mayor de dos números, así que te ahorras el if: en cada vuelta te quedas con el mayor entre el máximo actual y el elemento.' }
  },
  {
    id: 'r2', group: 'Arrays', title: 'Nota media del grupo', level: 'Fácil',
    statement: 'Calcula la nota media de todas las notas del array. El código tiene que valer para cualquier número de notas.',
    input: 'double[] notas = {6.5, 8.0, 4.5, 9.0};',
    tests: ["double[] notas = {10.0};", "double[] notas = {5.0, 6.0};", "double[] notas = {1.5, 2.5, 3.5, 4.5};"],
    expected: '7.0',
    outInfo: 'Un número decimal (double): la media.',
    starter: 'double[] notas = {6.5, 8.0, 4.5, 9.0};\n\n// Tu código aquí\n',
    hints: [
      "La media es la suma de todas las notas entre cuántas notas hay. Ya sabes sumar un array con un bucle.",
      "Suma con un for-each en una variable double y divide entre el tamaño del array, que en un array es .length (sin paréntesis). No escribas el 4 a mano.",
      { t: "Completa los huecos:", code: "double suma = 0;\nfor (double nota : ___) {\n    suma += ___;\n}\ndouble media = suma / notas.___;\nSystem.out.println(media);" }
    ],
    solution: 'double[] notas = {6.5, 8.0, 4.5, 9.0};\ndouble suma = 0;\nfor (double nota : notas) {\n    suma += nota;\n}\ndouble media = suma / notas.length;\nSystem.out.println(media);',
    explanation: 'El for-each suma todas las notas (28.0) y se divide entre notas.length (4). Como suma es double, la división tiene decimales: 7.0.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle para sumar' }, { re: /\.length\b(?!\s*\()/, msg: 'usar el tamaño del array en vez de escribir el número a mano' }]
  },
  {
    id: 'r3', group: 'Arrays', title: 'Contar aprobados', level: 'Fácil',
    statement: 'Cuenta cuántas notas del array son un aprobado (5 o más) y muestra el número.',
    input: 'double[] notas = {6.5, 4.0, 8.0, 3.5, 5.0};',
    tests: ["double[] notas = {5.0};", "double[] notas = {4.9, 5.0, 10.0};", "double[] notas = {0.0, 1.0};"],
    expected: '3',
    outInfo: 'Un número entero (int): cuántas notas son aprobado.',
    starter: 'double[] notas = {6.5, 4.0, 8.0, 3.5, 5.0};\n\n// Tu código aquí\n',
    hints: [
      "Necesitas un contador que empiece en 0 y que solo suba cuando una nota es un aprobado.",
      "Recorre las notas con un for-each y, dentro, comprueba con un if si la nota es 5 o más. ¿El 5.0 cuenta? Elige entre > y >=.",
      { t: "Completa los huecos:", code: "int aprobados = 0;\nfor (double nota : notas) {\n    if (nota ___ 5) {\n        aprobados___;\n    }\n}\nSystem.out.println(aprobados);" }
    ],
    solution: 'double[] notas = {6.5, 4.0, 8.0, 3.5, 5.0};\nint aprobados = 0;\nfor (double nota : notas) {\n    if (nota >= 5) {\n        aprobados++;\n    }\n}\nSystem.out.println(aprobados);',
    explanation: 'El contador solo sube cuando la nota es 5 o más: 6.5, 8.0 y 5.0. Con > en vez de >= el 5.0 no contaría.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle que recorra las notas' }]
  },
  {
    id: 'r4', group: 'Arrays', title: '¿En qué posición está?', level: 'Media',
    statement: 'Busca la ciudad en el array y muestra en qué posición está, con el formato del resultado esperado.',
    input: 'String[] ciudades = {"Lisboa", "Roma", "Madrid", "Oslo"};\nString buscada = "Madrid";',
    tests: ["String[] ciudades = {\"Lisboa\", \"Roma\", \"Madrid\", \"Oslo\"};\nString buscada = \"Lisboa\";", "String[] ciudades = {\"Lisboa\", \"Roma\", \"Madrid\", \"Oslo\"};\nString buscada = \"Oslo\";", "String[] ciudades = {\"Paris\", \"Berlin\"};\nString buscada = \"Berlin\";"],
    expected: 'Madrid está en la posición 2',
    outInfo: 'Una línea de texto: la ciudad, " está en la posición " y la posición (int).',
    starter: 'String[] ciudades = {"Lisboa", "Roma", "Madrid", "Oslo"};\nString buscada = "Madrid";\n\n// Tu código aquí\n',
    hints: [
      "Tienes que encontrar en qué posición del array está la ciudad buscada. Esta vez no te basta con los valores: necesitas la posición.",
      "El for-each no te da la posición, así que usa un for clásico con un índice. Para comparar dos String usa equals, no ==.",
      "Recorre i desde 0 hasta la última posición. Cuando ciudades[i] sea igual a la buscada, muestra el mensaje con i. Puedes salir del bucle con break, porque ya no hace falta seguir buscando.",
      { t: "Completa los huecos:", code: "for (int i = 0; i < ciudades.___; i++) {\n    if (ciudades[i].___(buscada)) {\n        System.out.println(buscada + \" está en la posición \" + ___);\n        break;\n    }\n}" }
    ],
    solution: 'String[] ciudades = {"Lisboa", "Roma", "Madrid", "Oslo"};\nString buscada = "Madrid";\nfor (int i = 0; i < ciudades.length; i++) {\n    if (ciudades[i].equals(buscada)) {\n        System.out.println(buscada + " está en la posición " + i);\n        break;\n    }\n}',
    explanation: 'El for clásico da el índice i en cada vuelta. Cuando ciudades[i] es igual a la buscada, se muestra i. Con break se deja de buscar en cuanto se encuentra.',
    req: [{ re: /\bfor\s*\(\s*int\b/, msg: 'usar un bucle que te dé la posición en cada vuelta' }, { re: /\.equals\s*\(/, msg: 'usar el método para comparar textos' }]
  },
  {
    id: 'r5', group: 'Arrays', title: 'Días al revés', level: 'Fácil',
    statement: 'Muestra los días del array en orden inverso, en una sola línea y separados por espacios.',
    input: 'String[] dias = {"lunes", "martes", "miércoles"};',
    tests: ["String[] dias = {\"lunes\"};", "String[] dias = {\"a\", \"b\", \"c\", \"d\"};"],
    expected: 'miércoles martes lunes',
    outInfo: 'Una sola línea de texto con los días (String) separados por un espacio.',
    starter: 'String[] dias = {"lunes", "martes", "miércoles"};\n\n// Tu código aquí\n',
    hints: [
      "El for-each siempre va del primero al último. Para ir al revés necesitas un bucle en el que controles tú las posiciones.",
      "Usa un for clásico que empiece en la última posición (dias.length - 1) y baje hasta 0. Usa print, no println, y añade un espacio detrás de cada día para que salga todo en una línea.",
      { t: "Completa los huecos:", code: "for (int i = dias.length - 1; i ___ 0; i___) {\n    System.out.___(dias[i] + \" \");\n}" }
    ],
    solution: 'String[] dias = {"lunes", "martes", "miércoles"};\nfor (int i = dias.length - 1; i >= 0; i--) {\n    System.out.print(dias[i] + " ");\n}',
    explanation: 'El for empieza en dias.length - 1 (la última posición) y baja con i-- hasta 0. print escribe sin saltar de línea.',
    req: [{ re: /\bfor\s*\(\s*int\b/, msg: 'usar un bucle que recorra las posiciones' }]
  },
  {
    id: 'r6', group: 'Arrays', title: 'Ordenar puntuaciones', level: 'Fácil',
    statement: 'Ordena las puntuaciones de menor a mayor y muestra el array completo.',
    input: 'int[] puntos = {25, 8, 41, 3, 12};',
    tests: ["int[] puntos = {5};", "int[] puntos = {3, 3, 1};", "int[] puntos = {-2, 10, 0};"],
    expected: '[3, 8, 12, 25, 41]',
    outInfo: 'El array completo como texto, entre corchetes y con los números separados por coma y espacio.',
    starter: 'int[] puntos = {25, 8, 41, 3, 12};\n\n// Tu código aquí\n',
    hints: [
      "No hace falta programar cómo se ordena: Java ya trae un método para ordenar arrays, en la misma clase que usas para mostrarlos.",
      "Arrays.sort ordena el array de menor a mayor. No devuelve un array nuevo: cambia el que le pasas, así que no hace falta guardarlo. Después muéstralo con Arrays.toString.",
      { t: "Completa los huecos:", code: "Arrays.___(puntos);\nSystem.out.println(Arrays.___(puntos));" }
    ],
    solution: 'int[] puntos = {25, 8, 41, 3, 12};\nArrays.sort(puntos);\nSystem.out.println(Arrays.toString(puntos));',
    explanation: 'Arrays.sort ordena el array de menor a mayor directamente, sin devolver nada. Luego Arrays.toString lo muestra entero.',
    req: [{ re: /Arrays\s*\.\s*sort\s*\(/, msg: 'usar el método de la clase Arrays que ordena' }]
  },
  {
    id: 'r7', group: 'Arrays', title: 'Array de cuadrados', level: 'Media',
    statement: 'Crea un array vacío de 5 posiciones y rellénalo con un bucle con los cuadrados de 1 a 5. Después muéstralo entero.',
    input: '(sin datos de entrada)',
    expected: '[1, 4, 9, 16, 25]',
    outInfo: 'El array completo como texto, entre corchetes y con los números separados por coma y espacio.',
    starter: '// Tu código aquí\n',
    hints: [
      "Primero crea un array vacío de 5 posiciones, después rellénalo con un bucle y, al final, muéstralo entero.",
      "Para crear un array sin valores se usa new y se indica el tamaño entre corchetes. Empieza lleno de ceros.",
      "Recorre las posiciones de 0 a 4. En la posición 0 va el cuadrado de 1, en la 1 el de 2… es decir, en la posición i va el cuadrado de i + 1. Al final, muéstralo con Arrays.toString.",
      { t: "Completa los huecos:", code: "int[] cuadrados = ___ int[___];\nfor (int i = 0; i < cuadrados.length; i++) {\n    int numero = i + ___;\n    cuadrados[i] = numero * ___;\n}\nSystem.out.println(Arrays.toString(cuadrados));" }
    ],
    solution: 'int[] cuadrados = new int[5];\nfor (int i = 0; i < cuadrados.length; i++) {\n    int numero = i + 1;\n    cuadrados[i] = numero * numero;\n}\nSystem.out.println(Arrays.toString(cuadrados));',
    explanation: 'new int[5] crea un array de 5 ceros. En cada posición i se guarda el cuadrado de i + 1, porque las posiciones empiezan en 0 y los números en 1.',
    req: [{ re: /new\s+int\s*\[/, msg: 'crear el array vacío indicando su tamaño' }, { re: /\b(for|while)\s*\(/, msg: 'usar un bucle para rellenarlo' }]
  },
  {
    id: 'r8', group: 'Arrays', title: 'Palabra más larga', level: 'Media',
    statement: 'Muestra la palabra más larga del array.',
    input: 'String[] palabras = {"sol", "ordenador", "programación", "casa"};',
    tests: ["String[] palabras = {\"a\"};", "String[] palabras = {\"casa\", \"mesa\"};", "String[] palabras = {\"x\", \"programar\", \"yy\"};"],
    expected: 'programación',
    outInfo: 'Un texto (String): la palabra más larga.',
    starter: 'String[] palabras = {"sol", "ordenador", "programación", "casa"};\n\n// Tu código aquí\n',
    hints: [
      "Es la misma idea que buscar un máximo, pero en vez de comparar los valores comparas su longitud, y lo que guardas es la palabra.",
      "Empieza guardando la primera palabra como la más larga provisional y recorre el array con un for-each.",
      "En cada vuelta compara la longitud de la palabra actual con la de la guardada. Ojo: cada elemento es un String, así que su longitud es length() con paréntesis (el array usa .length sin ellos).",
      { t: "Completa los huecos:", code: "String masLarga = palabras[0];\nfor (String palabra : palabras) {\n    if (palabra.___() > masLarga.___()) {\n        masLarga = ___;\n    }\n}\nSystem.out.println(masLarga);" }
    ],
    solution: 'String[] palabras = {"sol", "ordenador", "programación", "casa"};\nString masLarga = palabras[0];\nfor (String palabra : palabras) {\n    if (palabra.length() > masLarga.length()) {\n        masLarga = palabra;\n    }\n}\nSystem.out.println(masLarga);',
    explanation: 'Funciona como el máximo, pero comparando length() de cada palabra. Fíjate: el array usa .length y cada String usa .length().',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle que recorra las palabras' }]
  },
  {
    id: 'r9', group: 'Arrays', title: 'Ventas de dos tiendas', level: 'Reto',
    statement: 'Cada fila de la matriz son las ventas de una tienda en tres días. Calcula el total de ventas de todas las tiendas.',
    input: 'int[][] ventas = {\n    {120, 80, 95},\n    {60, 110, 70}\n};',
    tests: ["int[][] ventas = {\n    {5}\n};", "int[][] ventas = {\n    {1, 2},\n    {3, 4},\n    {5, 6}\n};", "int[][] ventas = {\n    {10, 20, 30, 40}\n};"],
    expected: '535',
    outInfo: 'Un número entero (int): el total de ventas.',
    starter: 'int[][] ventas = {\n    {120, 80, 95},\n    {60, 110, 70}\n};\n\n// Tu código aquí\n',
    hints: [
      "Una matriz es un array de arrays: cada fila es un array con las ventas de una tienda. Tienes que sumar todos los números de todas las filas.",
      "Para recorrer una matriz entera necesitas un bucle dentro de otro: el de fuera recorre las filas y el de dentro los números de cada fila. Y una variable total que empiece en 0, fuera de los dos bucles.",
      "Como solo necesitas los valores, puedes usar dos for-each. El de fuera te da cada fila, que es un array (int[]); el de dentro, cada número de esa fila.",
      "Recorrido: fila 0 → 120 + 80 + 95 = 295; fila 1 → 60 + 110 + 70 = 240; total 535. En el bucle de dentro solo tienes que sumar cada número al total.",
      { t: "Completa los huecos:", code: "int total = 0;\nfor (int[] tienda : ___) {\n    for (int venta : ___) {\n        total += ___;\n    }\n}\nSystem.out.println(total);" }
    ],
    solution: 'int[][] ventas = {\n    {120, 80, 95},\n    {60, 110, 70}\n};\nint total = 0;\nfor (int[] tienda : ventas) {\n    for (int venta : tienda) {\n        total += venta;\n    }\n}\nSystem.out.println(total);',
    explanation: 'El for-each de fuera da cada fila (un int[]) y el de dentro, cada número de esa fila. Como solo hacen falta los valores, no se necesitan índices. total va fuera de los dos bucles para acumular las ventas de todas las tiendas: 535.',
    req: [{ re: /\b(for|while)\b[\s\S]*\b(for|while)\b/, msg: 'usar un bucle dentro de otro' }],
    alt: { unless: /\[\s*\w+\s*\]\s*\[\s*\w+\s*\]/, code: 'for (int i = 0; i < ventas.length; i++) {\n    for (int j = 0; j < ventas[i].length; j++) {\n        total += ventas[i][j];\n    }\n}', why: 'Con índices: ventas.length es el número de filas y ventas[i].length el número de elementos de la fila i; ventas[i][j] es el número de la fila i y la columna j. Hace falta cuando te importa la posición, por ejemplo para el total de cada tienda o para saber qué día se vendió más.' }
  },
  // ---------- NUEVOS (temas 1 y 2) ----------
  {
    id: 'a4', group: 'Aritmética', title: 'Cajas completas', level: 'Fácil',
    statement: 'Tienes una cantidad de kilos de fruta y en cada caja caben 5 kg. Calcula cuántas cajas llenas puedes completar: las que quedan a medias no cuentan.',
    input: 'double kilos = 47.8;',
    tests: ["double kilos = 5.0;", "double kilos = 4.99;", "double kilos = 100.0;", "double kilos = 12.5;"],
    expected: '9',
    outInfo: 'Un número entero (int): las cajas llenas.',
    starter: 'double kilos = 47.8;\n\n// Tu código aquí\n',
    hints: [
      "Divide los kilos entre lo que cabe en una caja: 47.8 / 5 da 9.56. Solo cuentan las cajas llenas, así que te quedas con la parte entera.",
      "Para quedarte con la parte entera de un double, conviértelo a int con una conversión manual (casting): corta los decimales, no redondea. Pon la división entre paréntesis para que se haga antes de convertir.",
      { t: "Completa los huecos:", code: "int cajas = (___) (kilos / ___);\nSystem.out.println(cajas);" }
    ],
    solution: 'double kilos = 47.8;\nint cajas = (int) (kilos / 5);\nSystem.out.println(cajas);',
    explanation: 'kilos / 5 da 9.56, un double. Con (int) conviertes el resultado a entero y Java corta los decimales: 9. No redondea, por eso no sale 10 (para redondear usarías Math.round).',
    req: [{ re: /\(\s*int\s*\)/, msg: 'convertir el resultado a entero con un casting' }]
  },
  {
    id: 'b5', group: 'Booleanos y condiciones', title: 'El mayor de tres', level: 'Media',
    statement: 'Muestra el mayor de los tres números.',
    input: 'int a = 14;\nint b = 27;\nint c = 9;',
    tests: ["int a = 5;\nint b = 5;\nint c = 5;", "int a = 30;\nint b = 2;\nint c = 7;", "int a = 1;\nint b = 2;\nint c = 3;", "int a = -4;\nint b = -9;\nint c = -1;", "int a = 8;\nint b = 8;\nint c = 3;"],
    expected: '27',
    outInfo: 'Un número entero (int): el mayor de los tres.',
    starter: 'int a = 14;\nint b = 27;\nint c = 9;\n\n// Tu código aquí\n',
    hints: [
      "Tienes que decidir cuál de los tres es el mayor. Piensa qué tiene que cumplir un número para ser el mayor de todos.",
      "Necesitas condiciones que comparen un número con los otros dos a la vez, unidas con un operador lógico, y una estructura que elija entre varios caminos.",
      "a es el mayor si es mayor o igual que b y también mayor o igual que c. Si no lo es, el mayor está entre b y c: compáralos entre sí. Usa >= para que funcione cuando hay números repetidos.",
      { t: "Completa los huecos:", code: "if (a >= b ___ a >= c) {\n    System.out.println(___);\n} else if (b >= ___) {\n    System.out.println(b);\n} else {\n    System.out.println(___);\n}" }
    ],
    solution: 'int a = 14;\nint b = 27;\nint c = 9;\nif (a >= b && a >= c) {\n    System.out.println(a);\n} else if (b >= c) {\n    System.out.println(b);\n} else {\n    System.out.println(c);\n}',
    explanation: 'a es el mayor si iguala o supera a los otros dos, por eso se unen las dos comparaciones con &&. Si a no es el mayor, el mayor está entre b y c, y basta con compararlos entre sí. Con >= funciona aunque haya números repetidos.',
    req: [{ re: /\bif\s*\(|Math\s*\.\s*max/, msg: 'usar condiciones para comparar los números' }],
    alt: { unless: /Math\s*\.\s*max/, code: 'int mayor = Math.max(a, Math.max(b, c));\nSystem.out.println(mayor);', why: 'Math.max devuelve el mayor de dos números. Metiendo un Math.max dentro de otro comparas los tres en una línea.' }
  },
  {
    id: 'b6', group: 'Booleanos y condiciones', title: 'Día de la semana', level: 'Media',
    statement: 'Muestra el nombre del día de la semana que corresponde al número (1 es lunes y 7 es domingo) usando un switch. Si el número no está entre 1 y 7, muestra "Día no válido".',
    input: 'int dia = 3;',
    tests: ["int dia = 1;", "int dia = 7;", "int dia = 0;", "int dia = 8;", "int dia = 5;"],
    expected: 'Miércoles',
    outInfo: 'Un texto (String): el nombre del día, con la primera letra en mayúscula.',
    starter: 'int dia = 3;\n\n// Tu código aquí\n',
    hints: [
      "Según el valor de una sola variable tienes que elegir entre ocho respuestas: los siete días y el caso de un número no válido.",
      "Cuando comparas una variable con varios valores concretos, hay una estructura pensada para eso que evita escribir muchos else if. Busca cómo funciona en Java.",
      "Usa switch (dia) con un case para cada número del 1 al 7 y un default para el resto. En la forma clásica, termina cada case con break: si no, Java sigue ejecutando el siguiente.",
      { t: "Completa los huecos:", code: "switch (___) {\n    case 1:\n        System.out.println(\"Lunes\");\n        ___;\n    case 2:\n        System.out.println(\"Martes\");\n        break;\n    // ... del 3 al 7 igual\n    ___:\n        System.out.println(\"Día no válido\");\n}" }
    ],
    solution: 'int dia = 3;\nswitch (dia) {\n    case 1:\n        System.out.println("Lunes");\n        break;\n    case 2:\n        System.out.println("Martes");\n        break;\n    case 3:\n        System.out.println("Miércoles");\n        break;\n    case 4:\n        System.out.println("Jueves");\n        break;\n    case 5:\n        System.out.println("Viernes");\n        break;\n    case 6:\n        System.out.println("Sábado");\n        break;\n    case 7:\n        System.out.println("Domingo");\n        break;\n    default:\n        System.out.println("Día no válido");\n}',
    explanation: 'switch compara dia con cada case y salta al que coincide: con 3, el case 3. El break sale del switch; sin él se mostrarían también los días siguientes. default recoge cualquier otro número.',
    req: [{ re: /\bswitch\s*\(/, msg: 'usar una estructura que elija según el valor de una variable' }],
    alt: { unless: /->/, code: 'switch (dia) {\n    case 1 -> System.out.println("Lunes");\n    case 2 -> System.out.println("Martes");\n    case 3 -> System.out.println("Miércoles");\n    case 4 -> System.out.println("Jueves");\n    case 5 -> System.out.println("Viernes");\n    case 6 -> System.out.println("Sábado");\n    case 7 -> System.out.println("Domingo");\n    default -> System.out.println("Día no válido");\n}', why: 'Forma moderna del switch (desde Java 14): con -> cada case ejecuta solo su parte, así que no hace falta break y no hay riesgo de que se cuele en el siguiente.' }
  },
  {
    id: 'l7', group: 'Bucles', title: 'Factorial', level: 'Media',
    statement: 'Calcula el factorial del número: el resultado de multiplicar todos los números enteros desde 1 hasta él. Por ejemplo, el factorial de 4 es 1 × 2 × 3 × 4 = 24.',
    input: 'int numero = 5;',
    tests: ["int numero = 1;", "int numero = 0;", "int numero = 6;", "int numero = 10;"],
    expected: '120',
    outInfo: 'Un número entero (int): el factorial.',
    starter: 'int numero = 5;\n\n// Tu código aquí\n',
    hints: [
      "Como en la suma del 1 al 100, vas a ir acumulando un resultado en una variable, pero esta vez multiplicando.",
      "Necesitas un bucle que recorra los números del 1 hasta numero y una variable que vaya acumulando el producto. Piensa con qué valor tiene que empezar esa variable.",
      "Si la variable empieza en 0, todo lo que multipliques dará 0: tiene que empezar en 1. En cada vuelta multiplícala por el número de esa vuelta con *=, que funciona como += pero multiplicando.",
      { t: "Completa los huecos:", code: "int factorial = ___;\nfor (int i = 1; i <= ___; i++) {\n    factorial ___ i;\n}\nSystem.out.println(factorial);" }
    ],
    solution: 'int numero = 5;\nint factorial = 1;\nfor (int i = 1; i <= numero; i++) {\n    factorial *= i;\n}\nSystem.out.println(factorial);',
    explanation: 'factorial empieza en 1 porque es el número que no cambia nada al multiplicar (con 0 todo daría 0). En cada vuelta se multiplica por i: 1, 2, 6, 24 y 120. Con numero = 0 el bucle no da ninguna vuelta y queda 1, que es el factorial de 0.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }]
  },
  {
    id: 'l9', group: 'Bucles', title: '¿Es palíndromo?', level: 'Media',
    statement: 'Comprueba si la palabra se lee igual de izquierda a derecha que de derecha a izquierda (es decir, si es un palíndromo, como «oso»). Dale la vuelta a la palabra con un bucle y muestra true o false. Todas las letras están en minúsculas.',
    input: 'String palabra = "reconocer";',
    tests: ["String palabra = \"java\";", "String palabra = \"a\";", "String palabra = \"radar\";", "String palabra = \"palabra\";", "String palabra = \"ab\";"],
    expected: 'true',
    outInfo: 'Un valor booleano (true o false).',
    starter: 'String palabra = "reconocer";\n\n// Tu código aquí\n',
    hints: [
      "Un palíndromo es igual que su palabra al revés. Ya sabes darle la vuelta a una palabra con un bucle: aprovéchalo.",
      "Construye la palabra al revés como en «Palabra al revés» y, al final, compárala con la original. Recuerda qué método compara el texto de dos Strings.",
      "Guarda el resultado de la comparación en una variable boolean y muéstrala: así sale true o false directamente, sin necesidad de if.",
      { t: "Completa los huecos:", code: "String alReves = \"\";\nfor (int i = palabra.length() - 1; i >= 0; i--) {\n    alReves += palabra.___(i);\n}\nboolean esPalindromo = palabra.___(alReves);\nSystem.out.println(___);" }
    ],
    solution: 'String palabra = "reconocer";\nString alReves = "";\nfor (int i = palabra.length() - 1; i >= 0; i--) {\n    alReves += palabra.charAt(i);\n}\nboolean esPalindromo = palabra.equals(alReves);\nSystem.out.println(esPalindromo);',
    explanation: 'Se construye la palabra al revés y se compara con la original usando equals, que compara el texto. «reconocer» al revés sigue siendo «reconocer», así que da true. El resultado de equals ya es un boolean, por eso no hace falta if.',
    req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle para dar la vuelta a la palabra' }, { re: /\.equals(IgnoreCase)?\s*\(/, msg: 'usar el método para comparar textos' }],
    alt: { unless: /toCharArray/, code: 'String alReves = "";\nfor (char letra : palabra.toCharArray()) {\n    alReves = letra + alReves;\n}\nSystem.out.println(palabra.equals(alReves));', why: 'Sin índices: recorres la palabra hacia delante y pones cada letra delante de lo que ya tenías, así queda al revés. Después se compara igual, con equals.' }
  },
  {
    id: 'l8', group: 'Bucles', title: 'Contar cifras', level: 'Reto',
    statement: 'Cuenta cuántas cifras tiene el número usando un bucle. El número es positivo o 0, y ojo: el 0 tiene una cifra.',
    input: 'int numero = 4096;',
    tests: ["int numero = 0;", "int numero = 7;", "int numero = 10;", "int numero = 99999;", "int numero = 1000000;"],
    expected: '4',
    outInfo: 'Un número entero (int): la cantidad de cifras.',
    starter: 'int numero = 4096;\n\n// Tu código aquí\n',
    hints: [
      "Cada vez que divides un número entero entre 10 pierde su última cifra: 4096 / 10 = 409. Si cuentas cuántas veces puedes hacerlo hasta llegar a 0, sabes cuántas cifras tiene.",
      "Necesitas un bucle que divida entre 10 y cuente una vez por vuelta. Piensa en el 0: tiene una cifra, así que el bucle tiene que dar al menos una vuelta. Hay un tipo de bucle que comprueba la condición al final, después de la primera vuelta.",
      "Usa do { ... } while (condición);: primero ejecuta el bloque y luego comprueba. Copia el número en otra variable, y dentro del bucle divídela entre 10 y suma 1 al contador. Repite mientras sea mayor que 0.",
      "Recorrido con 4096: 409 (1), 40 (2), 4 (3), 0 (4), así que 4 cifras. Con 0: entra una vez, 0 / 10 = 0 (1) y para, así que 1 cifra. Con un while normal, el 0 daría 0 cifras.",
      { t: "Completa los huecos:", code: "int cifras = 0;\nint n = numero;\n___ {\n    n = n / ___;\n    cifras++;\n} ___ (n > 0);\nSystem.out.println(cifras);" }
    ],
    solution: 'int numero = 4096;\nint cifras = 0;\nint n = numero;\ndo {\n    n = n / 10;\n    cifras++;\n} while (n > 0);\nSystem.out.println(cifras);',
    explanation: 'Cada división entre 10 quita la última cifra (4096 → 409 → 40 → 4 → 0) y el contador suma una por vuelta: 4. Se usa do-while porque comprueba la condición después de la primera vuelta: así el 0 cuenta como una cifra. Con while (n > 0), el 0 no entraría en el bucle y daría 0.',
    req: [{ re: /\b(for|while)\s*\(|\bdo\s*\{/, msg: 'usar un bucle' }],
    alt: { unless: /\bdo\s*\{/, code: 'do {\n    n = n / 10;\n    cifras++;\n} while (n > 0);', why: 'Con do-while el bloque se ejecuta al menos una vez, así que el 0 cuenta como una cifra sin tener que tratarlo aparte.' }
  },
  {
    id: 'b7', group: 'Booleanos y condiciones', title: 'Permiso de conducir', level: 'Fácil',
    statement: 'Con un if dentro de otro, muestra "Eres menor de edad" si tiene menos de 18 años. Si tiene 18 o más, muestra "Puedes conducir" si tiene carnet y "Necesitas el carnet" si no lo tiene.',
    input: 'int edad = 20;\nboolean tieneCarnet = false;',
    tests: ["int edad = 16;\nboolean tieneCarnet = false;", "int edad = 18;\nboolean tieneCarnet = true;", "int edad = 45;\nboolean tieneCarnet = true;", "int edad = 18;\nboolean tieneCarnet = false;", "int edad = 17;\nboolean tieneCarnet = false;"],
    expected: 'Necesitas el carnet',
    outInfo: 'Un texto (String): uno de los tres mensajes.',
    starter: 'int edad = 20;\nboolean tieneCarnet = false;\n\n// Tu código aquí\n',
    hints: [
      "Hay dos preguntas y van en orden: primero la edad y, solo si es mayor de edad, el carnet. Si es menor, el carnet ni se mira.",
      "El if de fuera comprueba la edad. Dentro de su bloque va otro if con su propio else para el carnet. El else del if de fuera es el de los menores.",
      { t: "Completa los huecos:", code: "if (edad ___ 18) {\n    if (___) {\n        System.out.println(\"Puedes conducir\");\n    } else {\n        System.out.println(\"Necesitas el carnet\");\n    }\n} ___ {\n    System.out.println(\"Eres menor de edad\");\n}" }
    ],
    solution: 'int edad = 20;\nboolean tieneCarnet = false;\nif (edad >= 18) {\n    if (tieneCarnet) {\n        System.out.println("Puedes conducir");\n    } else {\n        System.out.println("Necesitas el carnet");\n    }\n} else {\n    System.out.println("Eres menor de edad");\n}',
    explanation: 'El if de fuera mira la edad: 20 >= 18 es true, así que entra. El if de dentro mira el carnet: tieneCarnet es false, así que va a su else y muestra "Necesitas el carnet". Cada if tiene su propio else: el de dentro responde a la pregunta del carnet y el de fuera, a la de la edad. Como tieneCarnet ya es un boolean, se escribe if (tieneCarnet), sin == true.',
    req: [{ re: /\b(if\s*\([^{}]*\)|else)\s*\{[^}]*\bif\s*\(/, msg: 'poner un if dentro del bloque de otro if' }]
  },
  {
    id: 'l10', group: 'Bucles', title: 'Saltar los múltiplos de 3', level: 'Fácil',
    statement: 'Muestra los números del 1 al límite, uno por línea, pero sáltate los múltiplos de 3 usando continue.',
    input: 'int limite = 10;',
    tests: ["int limite = 1;", "int limite = 3;", "int limite = 7;", "int limite = 20;"],
    expected: '1\n2\n4\n5\n7\n8\n10',
    outInfo: 'Varias líneas con un número entero (int) cada una: los que no son múltiplos de 3.',
    starter: 'int limite = 10;\n\n// Tu código aquí\n',
    hints: [
      "Recorres todos los números del 1 al límite, pero algunos no se muestran: el 3, el 6, el 9… En esas vueltas hay que pasar directamente a la siguiente.",
      "Un número es múltiplo de 3 si el resto de dividirlo entre 3 es 0 (operador %). Dentro del bucle, si lo es, continue salta lo que queda de esa vuelta; el println va después.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= limite; i++) {\n    if (i ___ 3 == 0) {\n        ___;\n    }\n    System.out.println(i);\n}" }
    ],
    solution: 'int limite = 10;\nfor (int i = 1; i <= limite; i++) {\n    if (i % 3 == 0) {\n        continue;\n    }\n    System.out.println(i);\n}',
    explanation: 'El for recorre del 1 al 10. Cuando i % 3 == 0 (3, 6 y 9), continue salta el resto de esa vuelta: no llega al println y pasa a la siguiente. A diferencia de break, el bucle no termina: sigue hasta el 10.',
    req: [{ re: /\bcontinue\s*;/, msg: 'usar continue para saltar una vuelta' }]
  },
  {
    id: 'l11', group: 'Bucles', title: 'Triángulo de asteriscos', level: 'Media',
    statement: 'Dibuja un triángulo de asteriscos con tantas filas como indica el número: la primera fila tiene un *, la segunda dos, y así hasta la última. Usa un bucle dentro de otro.',
    input: 'int filas = 4;',
    tests: ["int filas = 1;", "int filas = 2;", "int filas = 6;"],
    expected: '*\n**\n***\n****',
    outInfo: 'Tantas líneas como filas, cada una con asteriscos (*) seguidos y sin espacios.',
    starter: 'int filas = 4;\n\n// Tu código aquí\n',
    hints: [
      "Cada fila tiene tantos asteriscos como su número de fila: la fila 1 tiene uno, la fila 4 tiene cuatro. Fíjate en que todos los asteriscos de una fila salen en la misma línea.",
      "Hay dos formas de mostrar texto: una salta de línea al terminar y otra no. Necesitas las dos: una para cada asterisco y otra para acabar la fila.",
      "Un bucle de fuera recorre las filas (i de 1 a filas). Dentro, otro bucle da i vueltas y muestra un * en cada una con System.out.print. Al acabar el de dentro, System.out.println() salta a la fila siguiente.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= ___; j++) {\n        System.out.___(\"*\");\n    }\n    System.out.___();\n}" }
    ],
    solution: 'int filas = 4;\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}',
    explanation: 'El bucle de fuera recorre las filas: i vale 1, 2, 3 y 4. Por cada fila, el de dentro da i vueltas y escribe un * con print, que no salta de línea. Cuando termina, println() salta a la fila siguiente. La clave es que el límite del bucle de dentro (j <= i) cambia en cada fila: por eso cada una tiene un asterisco más.',
    req: [{ re: /\b(for|while)\b[\s\S]*\b(for|while)\b/, msg: 'poner un bucle dentro de otro' }]
  },
  {
    id: 'l12', group: 'Bucles', title: 'Duplicar hasta superar', level: 'Media',
    statement: 'Duplica el número al menos una vez y sigue duplicándolo mientras no supere el límite. Muestra el valor final y cuántas veces lo has duplicado, usando un bucle do-while.',
    input: 'int numero = 3;\nint limite = 50;',
    tests: ["int numero = 80;\nint limite = 50;", "int numero = 50;\nint limite = 50;", "int numero = 1;\nint limite = 1000;", "int numero = 7;\nint limite = 14;"],
    expected: '96 tras 5 duplicaciones',
    outInfo: 'Una línea con el valor final (int), la palabra «tras» y el número de duplicaciones (int).',
    starter: 'int numero = 3;\nint limite = 50;\n\n// Tu código aquí\n',
    hints: [
      "Partiendo de 3: 6, 12, 24, 48 y 96. El 96 ya supera 50, así que se para ahí tras 5 duplicaciones. Ojo: aunque el número ya supere el límite desde el principio, se duplica una vez.",
      "Necesitas un bucle que dé al menos una vuelta antes de comprobar la condición, una variable con el valor que vas duplicando y un contador.",
      "Copia numero en otra variable. Dentro de do { ... } duplícala y suma 1 al contador. La condición del while (al final) es «mientras no supere el límite»: valor <= limite.",
      { t: "Completa los huecos:", code: "int valor = numero;\nint veces = 0;\n___ {\n    valor = valor * ___;\n    veces++;\n} while (valor ___ limite);\nSystem.out.println(valor + \" tras \" + veces + \" duplicaciones\");" }
    ],
    solution: 'int numero = 3;\nint limite = 50;\nint valor = numero;\nint veces = 0;\ndo {\n    valor = valor * 2;\n    veces++;\n} while (valor <= limite);\nSystem.out.println(valor + " tras " + veces + " duplicaciones");',
    explanation: 'El do-while ejecuta el bloque y después comprueba la condición: 6 (1), 12 (2), 24 (3), 48 (4) y 96 (5). 96 <= 50 es false, así que para. Con numero = 80 se duplica una vez (160) aunque ya superaba el límite: con un while normal la condición se comprobaría antes y daría 0 duplicaciones.',
    req: [{ re: /\bdo\s*\{/, msg: 'usar un bucle do-while' }]
  },
  {
    id: 'l13', group: 'Bucles', title: 'Primer múltiplo', level: 'Media',
    statement: 'Busca el primer múltiplo del divisor que sea mayor que el número. Hazlo con un bucle while (true) y sal de él con break cuando lo encuentres.',
    input: 'int numero = 30;\nint divisor = 7;',
    tests: ["int numero = 0;\nint divisor = 7;", "int numero = 7;\nint divisor = 7;", "int numero = 13;\nint divisor = 5;", "int numero = 100;\nint divisor = 9;"],
    expected: '35',
    outInfo: 'Un número entero (int): el primer múltiplo del divisor mayor que el número.',
    starter: 'int numero = 30;\nint divisor = 7;\n\n// Tu código aquí\n',
    hints: [
      "Prueba los números siguientes uno a uno: 31, 32, 33… El primero que sea múltiplo de 7 es la respuesta. No sabes cuántos tendrás que probar.",
      "while (true) no termina nunca por sí solo: la única salida es break. Necesitas un candidato que empiece justo después del número y el operador que da el resto de una división.",
      "Empieza con candidato = numero + 1. En cada vuelta, si candidato % divisor == 0, sal con break; si no, súmale 1. Después del bucle, muestra el candidato.",
      { t: "Completa los huecos:", code: "int candidato = numero + 1;\nwhile (___) {\n    if (candidato % divisor == 0) {\n        ___;\n    }\n    candidato++;\n}\nSystem.out.println(candidato);" }
    ],
    solution: 'int numero = 30;\nint divisor = 7;\nint candidato = numero + 1;\nwhile (true) {\n    if (candidato % divisor == 0) {\n        break;\n    }\n    candidato++;\n}\nSystem.out.println(candidato);',
    explanation: 'while (true) es un bucle infinito controlado: no para por su condición, sino con break. Prueba 31, 32, 33 y 34 (ninguno es múltiplo de 7) y en 35 el resto es 0, así que break sale del bucle sin llegar a candidato++. Se empieza en numero + 1 porque tiene que ser mayor: con numero = 7 la respuesta es 14, no 7.',
    req: [{ re: /\bwhile\s*\(\s*true\s*\)/, msg: 'usar un bucle while (true)' }, { re: /\bbreak\s*;/, msg: 'salir del bucle con break' }]
  },
  {
    id: 'l14', group: 'Bucles', title: 'Tablas del 1 al N', level: 'Media',
    statement: 'Muestra las tablas de multiplicar del 1 hasta el número de tablas, cada una del 1 hasta el límite, con el formato del resultado esperado. Usa un bucle dentro de otro.',
    input: 'int tablas = 3;\nint hasta = 4;',
    tests: ["int tablas = 1;\nint hasta = 1;", "int tablas = 2;\nint hasta = 5;", "int tablas = 4;\nint hasta = 2;"],
    expected: '1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12',
    outInfo: 'Una línea por multiplicación con el formato "2 x 3 = 6": números (int) unidos con " x " y " = ".',
    starter: 'int tablas = 3;\nint hasta = 4;\n\n// Tu código aquí\n',
    hints: [
      "Es como «Tabla de multiplicar», pero repetido para cada tabla: primero toda la del 1, luego toda la del 2 y luego toda la del 3.",
      "Necesitas dos contadores: uno para la tabla y otro para el número por el que multiplicas. Esta vez los dos salen en lo que se muestra, no solo sirven para contar vueltas.",
      "El bucle de fuera recorre las tablas (i de 1 a tablas). Dentro, otro bucle recorre j de 1 a hasta y muestra i, \" x \", j, \" = \" y la multiplicación.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= ___; i++) {\n    for (int j = 1; j <= ___; j++) {\n        System.out.println(___ + \" x \" + ___ + \" = \" + i * j);\n    }\n}" }
    ],
    solution: 'int tablas = 3;\nint hasta = 4;\nfor (int i = 1; i <= tablas; i++) {\n    for (int j = 1; j <= hasta; j++) {\n        System.out.println(i + " x " + j + " = " + i * j);\n    }\n}',
    explanation: 'El bucle de fuera elige la tabla (i = 1, 2 y 3) y, por cada una, el de dentro da todas sus vueltas (j = 1, 2, 3 y 4). Por eso sale entera la tabla del 1 antes de empezar la del 2. Las dos variables se usan en lo que se muestra: i es la tabla y j el número por el que se multiplica.',
    req: [{ re: /\b(for|while)\b[\s\S]*\b(for|while)\b/, msg: 'poner un bucle dentro de otro' }]
  },
  {
    id: 'l15', group: 'Bucles', title: 'Triángulo invertido', level: 'Media',
    statement: 'Dibuja un triángulo de asteriscos al revés: la primera fila tiene tantos * como filas, y cada fila tiene uno menos que la anterior. Usa un bucle dentro de otro.',
    input: 'int filas = 4;',
    tests: ["int filas = 1;", "int filas = 2;", "int filas = 6;"],
    expected: '****\n***\n**\n*',
    outInfo: 'Tantas líneas como filas, cada una con asteriscos (*) seguidos y sin espacios.',
    starter: 'int filas = 4;\n\n// Tu código aquí\n',
    hints: [
      "Es el «Triángulo de asteriscos» al revés: con 4 filas, la fila 1 tiene 4 asteriscos, la 2 tiene 3, la 3 tiene 2 y la 4 tiene 1.",
      "El bucle de fuera puede seguir contando las filas hacia delante. Lo que cambia es el límite del bucle de dentro: busca una cuenta con filas e i que dé 4, 3, 2 y 1.",
      "Prueba la cuenta fila a fila: con filas = 4, la fila i = 1 necesita 4 asteriscos y la i = 4 necesita 1. filas - i da 3 y 0, así que le falta sumar 1: filas - i + 1.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= ___ - ___ + 1; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.___();\n}" }
    ],
    solution: 'int filas = 4;\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= filas - i + 1; j++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}',
    explanation: 'El bucle de fuera recorre las filas (i = 1, 2, 3 y 4) y el de dentro da filas - i + 1 vueltas: 4, 3, 2 y 1. Comprobar la cuenta con la primera y la última fila es la forma de no equivocarse por 1: sin el + 1, la primera fila tendría 3 asteriscos y la última ninguno.',
    req: [{ re: /\b(for|while)\b[\s\S]*\b(for|while)\b/, msg: 'poner un bucle dentro de otro' }],
    alt: { unless: /--/, code: 'for (int i = filas; i >= 1; i--) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}', why: 'Otra forma: el bucle de fuera cuenta hacia atrás (4, 3, 2, 1) y así el de dentro puede usar j <= i, como en el triángulo normal. Las dos sirven; la del ejercicio practica calcular el límite a partir de la fila.' }
  },
  {
    id: 'l16', group: 'Bucles', title: 'Pirámide centrada', level: 'Reto',
    statement: 'Dibuja una pirámide centrada de asteriscos: cada fila tiene 2 asteriscos más que la anterior (1, 3, 5…) y espacios delante para que quede centrada. La última fila no lleva espacios. Usa, dentro del bucle de las filas, un bucle para los espacios y otro para los asteriscos.',
    input: 'int filas = 4;',
    tests: ["int filas = 1;", "int filas = 2;", "int filas = 6;"],
    expected: '   *\n  ***\n *****\n*******',
    outInfo: 'Tantas líneas como filas: primero los espacios y después los asteriscos (*). Los espacios del principio cuentan, y no hay espacios al final.',
    exact: true,
    starter: 'int filas = 4;\n\n// Tu código aquí\n',
    hints: [
      "Mira cada fila por partes: con 4 filas, la fila 1 tiene 3 espacios y 1 asterisco, la 2 tiene 2 espacios y 3 asteriscos, la 3 tiene 1 y 5, y la 4 tiene 0 y 7.",
      "Por cada fila hacen falta dos cuentas: cuántos espacios y cuántos asteriscos. Cada una sale de una operación con filas e i, igual que en el «Triángulo invertido».",
      "Dentro del bucle de las filas pon dos bucles seguidos (no uno dentro del otro): el primero escribe los espacios con print y el segundo los asteriscos. Al final de la fila, println().",
      "Los espacios bajan de 1 en 1 empezando en filas - 1: filas - i. Los asteriscos son los impares 1, 3, 5, 7: el doble de la fila menos 1, es decir, 2 * i - 1. Compruébalo con i = 1 y con i = 4.",
      { t: "Completa los huecos:", code: "for (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= ___; j++) {\n        System.out.print(\" \");\n    }\n    for (int j = 1; j <= ___; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}" }
    ],
    solution: 'int filas = 4;\nfor (int i = 1; i <= filas; i++) {\n    for (int j = 1; j <= filas - i; j++) {\n        System.out.print(" ");\n    }\n    for (int j = 1; j <= 2 * i - 1; j++) {\n        System.out.print("*");\n    }\n    System.out.println();\n}',
    explanation: 'Por cada fila i, el primer bucle escribe filas - i espacios (3, 2, 1 y 0) y el segundo 2 * i - 1 asteriscos (1, 3, 5 y 7). Los dos van uno detrás de otro dentro del bucle de las filas, y println() cierra la fila. Como el segundo bucle empieza cuando termina el primero, se puede volver a llamar j a su variable.',
    req: [{ re: /\b(for|while)\b[\s\S]*\b(for|while)\b[\s\S]*\b(for|while)\b/, msg: 'poner, dentro del bucle de las filas, un bucle para los espacios y otro para los asteriscos' }]
  }
];
// Orden: de lo más básico a lo que necesita lo anterior, y de fácil a difícil dentro de cada sección
(function () {
  var ORDER = ['a1', 'a4', 'a2', 'a3', 'b1', 'b2', 'b3', 'b4', 'b7', 'b6', 'b5', 's1', 's2', 's5', 's7', 's3', 's4', 's6',
    'l1', 'l2', 'l3', 'l4', 'l10', 'l7', 'l6', 'l9', 'l12', 'l13', 'l11', 'l14', 'l15', 'l5', 'l16', 'l8', 'r2', 'r3', 'r5', 'r6', 'r4', 'r7', 'r1', 'r8', 'r9'];
  EXERCISES.sort(function (x, y) { return ORDER.indexOf(x.id) - ORDER.indexOf(y.id); });
})();
if (typeof module !== 'undefined') module.exports = EXERCISES;
