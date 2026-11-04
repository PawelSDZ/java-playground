// Teoría, bloque 3: Control del flujo (if y switch; el resto, en teoria_3.js)
TEORIA.push(
  {
    id: 'if', group: 'Control del flujo', title: 'if, else if y else',
    intro: 'Tomar decisiones: ejecutar un código u otro según una condición.',
    blocks: [
      { h: 'if' },
      { p: '`if` ejecuta su bloque solo si la condición es `true`. Si es `false`, se lo salta y sigue después.' },
      { syntax: 'if (condición) {\n    // se ejecuta si la condición es true\n}' },
      { code: 'int temperatura = 32;\nif (temperatura > 30) {\n    System.out.println("Hace calor");\n}\nSystem.out.println("Fin");' },
      { p: 'La condición tiene que dar un `boolean`: una comparación (`x > 3`), una variable boolean, una combinación con `&&`, `||` y `!`, o un método que devuelva boolean (`texto.equals("si")`).' },

      { h: 'else' },
      { p: '`else` es el camino alternativo: se ejecuta cuando la condición del `if` es `false`. Siempre se ejecuta exactamente uno de los dos bloques.' },
      { syntax: 'if (condición) {\n    // si es true\n} else {\n    // si es false\n}' },
      { code: 'int numero = 7;\nif (numero % 2 == 0) {\n    System.out.println(numero + " es par");\n} else {\n    System.out.println(numero + " es impar");\n}' },

      { h: 'else if: varias opciones' },
      { p: 'Para elegir entre más de dos caminos se encadenan condiciones con `else if`. Se comprueban **en orden** y se ejecuta solo el **primer** bloque cuya condición sea `true`; el `else` final recoge todo lo demás.' },
      { syntax: 'if (condición1) {\n    // …\n} else if (condición2) {\n    // …\n} else if (condición3) {\n    // …\n} else {\n    // ninguna se ha cumplido\n}' },
      { code: 'double nota = 7.5;\nif (nota >= 9) {\n    System.out.println("Sobresaliente");\n} else if (nota >= 7) {\n    System.out.println("Notable");\n} else if (nota >= 6) {\n    System.out.println("Bien");\n} else if (nota >= 5) {\n    System.out.println("Suficiente");\n} else {\n    System.out.println("Insuficiente");\n}' },
      { note: 'El orden importa. Si la primera condición fuera `nota >= 5`, un 9,5 entraría ahí y nunca llegaría a "Sobresaliente". Ve de lo más exigente a lo menos (o al revés, con `<`).', kind: 'warn' },
      { p: 'Fíjate en que en el segundo `else if` no hace falta poner `nota >= 7 && nota < 9`: si ha llegado ahí, ya se sabe que no es `>= 9`.' },

      { h: 'Condiciones compuestas' },
      { code: 'int edad = 25;\nboolean carnet = true;\nif (edad >= 18 && carnet) {\n    System.out.println("Puede conducir");\n}\nString dia = "sábado";\nif (dia.equals("sábado") || dia.equals("domingo")) {\n    System.out.println("Fin de semana");\n}\nint hora = 23;\nif (!(hora >= 8 && hora < 22)) {\n    System.out.println("Fuera del horario");\n}' },

      { h: 'if dentro de if (anidados)' },
      { p: 'Dentro de un bloque puede haber otro `if`. Se usa cuando una pregunta solo tiene sentido si la anterior se ha cumplido:' },
      { code: 'int edad = 20;\nboolean carnet = false;\nif (edad >= 18) {\n    if (carnet) {\n        System.out.println("Puedes conducir");\n    } else {\n        System.out.println("Necesitas el carnet");\n    }\n} else {\n    System.out.println("Eres menor de edad");\n}' },
      { p: 'Muchas veces un if anidado se puede escribir como una cadena con `&&` y `else if`. Elige lo que se lea mejor: anidar va bien cuando varios casos comparten la misma condición de fuera.' },

      { h: 'Sin llaves' },
      { p: 'Si el bloque tiene **una sola instrucción**, las llaves se pueden omitir. Pero es fácil equivocarse al añadir otra línea después, por eso se recomienda ponerlas siempre:' },
      { code: 'int x = 10;\nif (x > 100)\n    System.out.println("Grande");\n    System.out.println("Esta línea NO está dentro del if, aunque lo parezca");' },

      { h: 'El operador ternario' },
      { p: 'Para elegir entre dos **valores** (no entre dos bloques de código), existe la forma corta `condición ? a : b` (ver Operadores):' },
      { code: 'int a = 4, b = 9;\nint mayor = a > b ? a : b;\nSystem.out.println("Mayor: " + mayor);\nint n = 3;\nSystem.out.println(n + (n == 1 ? " elemento" : " elementos"));' },

      { h: 'Errores típicos' },
      { list: [
        'Poner `;` después de la condición: `if (x > 5);` cierra el if vacío, y el bloque de después se ejecuta siempre.',
        'Usar `=` en vez de `==`: `if (x = 5)` no compila.',
        'Comparar Strings con `==`: usa `equals`.',
        'Escribir `else if` en un orden en el que una condición tapa a las siguientes.',
        'Poner una condición en el `else`: `else (x < 5)` no existe; sería `else if (x < 5)`.',
        'Escribir `if (5 < x < 10)`: se escribe `if (x > 5 && x < 10)`.'
      ] },
      { code: 'int x = 1;\nif (x > 5); {\n    System.out.println("Esto sale siempre: el if acabó en el punto y coma");\n}' },

      { h: 'Ejemplo de la vida real' },
      { p: 'Precio de la entrada de un cine según la edad y el día:' },
      { code: 'int edad = 70;\nString dia = "miércoles";\ndouble precio;\nif (edad < 4) {\n    precio = 0;\n} else if (edad < 14 || edad >= 65) {\n    precio = 5;\n} else if (dia.equals("miércoles")) {\n    precio = 6;\n} else {\n    precio = 9;\n}\nSystem.out.println("Precio: " + precio + " euros");' },

      { h: 'Resumen' },
      { list: [
        '`if` ejecuta un bloque si la condición es true; `else` si es false.',
        '`else if` encadena opciones: se ejecuta solo la primera que se cumple.',
        'Las condiciones se combinan con `&&`, `||` y `!`.',
        'Los if se pueden anidar; pon siempre llaves.'
      ] },
      { practice: ['b1', 'b2', 'b3', 'b4', 'b7', 'b5'] }
    ]
  },
  {
    id: 'switch', group: 'Control del flujo', title: 'switch',
    intro: 'Elegir entre muchos casos según el valor exacto de una variable.',
    blocks: [
      { h: 'El switch clásico' },
      { p: '`switch` compara una variable con una lista de valores fijos (`case`) y salta al que coincide. `break` hace salir del switch. `default` se ejecuta si no coincide ninguno (es opcional).' },
      { syntax: 'switch (variable) {\n    case valor1:\n        // …\n        break;\n    case valor2:\n        // …\n        break;\n    default:\n        // ningún case coincide\n}' },
      { code: 'int dia = 3;\nswitch (dia) {\n    case 1:\n        System.out.println("Lunes");\n        break;\n    case 2:\n        System.out.println("Martes");\n        break;\n    case 3:\n        System.out.println("Miércoles");\n        break;\n    default:\n        System.out.println("Otro día");\n}' },
      { p: 'La variable puede ser `int` (y `byte`, `short`), `char`, `String` o un `enum`. No vale con `long`, `double`, `float` ni `boolean`. Los valores de los `case` tienen que ser constantes y no pueden repetirse.' },
      { code: 'String idioma = "en";\nswitch (idioma) {\n    case "es":\n        System.out.println("Hola");\n        break;\n    case "en":\n        System.out.println("Hello");\n        break;\n    case "fr":\n        System.out.println("Bonjour");\n        break;\n    default:\n        System.out.println("?");\n}' },

      { h: 'Qué pasa si falta el break' },
      { p: 'Sin `break`, al entrar en un `case` la ejecución **sigue con los siguientes** (en inglés, *fall-through*) hasta encontrar un `break` o el final del switch:' },
      { code: 'int n = 2;\nswitch (n) {\n    case 1:\n        System.out.println("uno");\n    case 2:\n        System.out.println("dos");\n    case 3:\n        System.out.println("tres");\n        break;\n    case 4:\n        System.out.println("cuatro");\n}' },
      { p: 'Casi siempre es un error, pero a veces se aprovecha para que varios casos compartan el mismo código:' },
      { code: 'int mes = 4;\nint dias;\nswitch (mes) {\n    case 2:\n        dias = 28;\n        break;\n    case 4:\n    case 6:\n    case 9:\n    case 11:\n        dias = 30;\n        break;\n    default:\n        dias = 31;\n}\nSystem.out.println("El mes " + mes + " tiene " + dias + " días");' },

      { h: 'Varios valores en un case' },
      { p: 'Desde Java 14, un `case` puede tener varios valores separados por comas:' },
      { code: 'char letra = \'e\';\nswitch (letra) {\n    case \'a\', \'e\', \'i\', \'o\', \'u\':\n        System.out.println("Vocal");\n        break;\n    default:\n        System.out.println("Consonante");\n}' },

      { h: 'switch con flechas (->)' },
      { p: 'También desde Java 14 existe la forma con flechas: cada `case` ejecuta solo lo que hay a la derecha de la flecha y **no sigue con los siguientes**, así que no hace falta `break`. Si son varias instrucciones, van entre llaves.' },
      { code: 'int dia = 6;\nswitch (dia) {\n    case 1, 2, 3, 4, 5 -> System.out.println("Laborable");\n    case 6, 7 -> {\n        System.out.println("Fin de semana");\n        System.out.println("¡A descansar!");\n    }\n    default -> System.out.println("Día no válido");\n}' },

      { h: 'switch como expresión (devuelve un valor)' },
      { p: 'Con flechas, el switch puede **dar un valor** que se guarda en una variable. Entonces tiene que cubrir todos los casos (normalmente con `default`) y acaba en `;`:' },
      { code: 'int mes = 11;\nString estacion = switch (mes) {\n    case 12, 1, 2 -> "Invierno";\n    case 3, 4, 5 -> "Primavera";\n    case 6, 7, 8 -> "Verano";\n    case 9, 10, 11 -> "Otoño";\n    default -> "Mes no válido";\n};\nSystem.out.println(estacion);' },
      { p: 'Si para calcular el valor hacen falta varias instrucciones, se ponen entre llaves y el valor se devuelve con `yield`:' },
      { code: 'int nota = 8;\nString texto = switch (nota) {\n    case 10, 9 -> "Sobresaliente";\n    case 8, 7 -> {\n        String base = "Notable";\n        yield nota == 8 ? base + " alto" : base;\n    }\n    case 6, 5 -> "Aprobado";\n    default -> "Suspenso";\n};\nSystem.out.println(texto);' },

      { h: 'switch o if' },
      { list: [
        '**switch**: cuando se compara **una variable** con **valores exactos** (1, 2, 3; "es", "en"…).',
        '**if / else if**: cuando hay rangos (`nota >= 7`), condiciones compuestas o se comparan cosas distintas.'
      ] },

      { h: 'Errores típicos' },
      { list: [
        'Olvidar el `break` en el switch clásico: se ejecutan también los casos siguientes.',
        'Poner un rango en un case: `case nota >= 5:` no compila.',
        'Usar una variable `double` o `boolean`: no se puede hacer switch sobre ellas.',
        'Repetir un valor en dos `case`: `duplicate case label`.',
        'Mezclar en el mismo switch `case 1:` y `case 2 ->`: no compila.'
      ] },

      { h: 'Resumen' },
      { list: [
        '`switch (variable)` salta al `case` cuyo valor coincide; `default` recoge el resto.',
        'En el clásico, cada case termina en `break` (si no, sigue con el siguiente).',
        'Con flechas (`case 1 ->`) no hace falta break, y varios valores van separados por comas.',
        'Como expresión, el switch da un valor; con llaves, se devuelve con `yield`.'
      ] },
      { practice: ['b6', 'l19'] }
    ]
  }
);
