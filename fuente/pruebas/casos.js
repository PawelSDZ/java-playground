// Casos de prueba por ejercicio: ok = deben darse por resueltos; bad = no deben darse por resueltos.
// El código se añade tras las declaraciones de entrada (sin el comentario de "Tu código aquí").
module.exports = {
  a1: {
    ok: [
      'int horas = totalMinutos / 60;\nint minutos = totalMinutos % 60;\nSystem.out.println(horas + " h " + minutos + " min");',
      'System.out.println(totalMinutos / 60 + " h " + totalMinutos % 60 + " min");',
      'System.out.println(totalMinutos / 60 + " h" + " " + totalMinutos % 60 + " min");',
      'System.out.printf("%d h %d min%n", totalMinutos / 60, totalMinutos % 60);',
      'System.out.println(totalMinutos / 60 + "h " + totalMinutos % 60 + "min");',
      'int h = totalMinutos / 60;\nint m = totalMinutos - h * 60;\nSystem.out.println(h + " h " + m + " min");'
    ],
    bad: ['System.out.println("2 h 15 min");', 'System.out.println(totalMinutos / 60.0 + " h");', 'System.out.println(totalMinutos % 60 + " h " + totalMinutos / 60 + " min");']
  },
  a2: {
    ok: [
      'double media = (nota1 + nota2 + nota3) / 3.0;\nSystem.out.println(media);',
      'double media = (double) (nota1 + nota2 + nota3) / 3;\nSystem.out.println(media);',
      'System.out.println((nota1 + nota2 + nota3) / 3.0);',
      'double suma = nota1 + nota2 + nota3;\nSystem.out.println(suma / 3);'
    ],
    bad: ['double media = (nota1 + nota2 + nota3) / 3;\nSystem.out.println(media);', 'System.out.println(7.666666666666667);', 'System.out.println(Math.round((nota1 + nota2 + nota3) / 3.0 * 100) / 100.0);']
  },
  a3: {
    ok: [
      'double precioFinal = precio + precio * iva / 100;\ndouble redondeado = Math.round(precioFinal * 100) / 100.0;\nSystem.out.println(redondeado);',
      'double conIva = precio * (1 + iva / 100.0);\nSystem.out.println(Math.round(conIva * 100) / 100.0);',
      'double precioConIva = precio + (precio * iva / 100);\nSystem.out.println(Math.round(precioConIva * 100.0) / 100.0);'
    ],
    bad: ['System.out.println(24.19);', 'double f = precio + precio * iva / 100;\nSystem.out.println(f);', 'double f = precio + precio * iva / 100;\nSystem.out.println(Math.round(f * 100) / 100);', 'double f = precio * (1 + iva / 100);\nSystem.out.println(Math.round(f * 100) / 100.0);']
  },
  b1: {
    ok: ['boolean puedeConducir = edad >= 18 && tieneCarnet;\nSystem.out.println(puedeConducir);', 'System.out.println(edad >= 18 && tieneCarnet);', 'boolean p = tieneCarnet && edad > 17;\nSystem.out.println(p);'],
    bad: ['System.out.println(false);', 'System.out.println(edad >= 18 || tieneCarnet);', 'System.out.println("false");']
  },
  b2: {
    ok: ['boolean esIdeal = temperatura >= 18 && temperatura <= 26;\nSystem.out.println(esIdeal);', 'System.out.println(18 <= temperatura && temperatura <= 26);'],
    bad: ['System.out.println(temperatura > 18 && temperatura < 26);', 'System.out.println(true);', 'System.out.println(temperatura >= 18 || temperatura <= 26);']
  },
  b3: {
    ok: [
      'if (numero % 2 == 0) {\n    System.out.println(numero + " es par");\n} else {\n    System.out.println(numero + " es impar");\n}',
      'String tipo = numero % 2 == 0 ? "par" : "impar";\nSystem.out.println(numero + " es " + tipo);',
      'System.out.println(numero + (numero % 2 == 0 ? " es par" : " es impar"));',
      'if (numero % 2 != 0) System.out.println(numero + " es impar");\nelse System.out.println(numero + " es par");'
    ],
    bad: ['System.out.println("17 es impar");', 'System.out.println(numero + " es impar");', 'if (numero % 2 == 1) {\n    System.out.println(numero + " es par");\n} else {\n    System.out.println(numero + " es impar");\n}']
  },
  b4: {
    ok: [
      'if (nota < 5) {\n    System.out.println("Suspenso");\n} else if (nota < 7) {\n    System.out.println("Aprobado");\n} else if (nota < 9) {\n    System.out.println("Notable");\n} else {\n    System.out.println("Sobresaliente");\n}',
      'String t;\nif (nota >= 9) t = "Sobresaliente";\nelse if (nota >= 7) t = "Notable";\nelse if (nota >= 5) t = "Aprobado";\nelse t = "Suspenso";\nSystem.out.println(t);'
    ],
    bad: ['System.out.println("Notable");', 'if (nota < 5) {\n    System.out.println("Suspenso");\n} else if (nota < 7) {\n    System.out.println("Aprobado");\n} else {\n    System.out.println("Sobresaliente");\n}']
  },
  s1: {
    ok: ['String sinEspacios = frase.replace(" ", "");\nSystem.out.println(sinEspacios.length());', 'System.out.println(frase.replace(" ", "").length());'],
    bad: ['System.out.println(13);', 'System.out.println(frase.length());', 'System.out.println(frase.trim().length());']
  },
  s2: {
    ok: [
      'char primera = palabra.charAt(0);\nchar ultima = palabra.charAt(palabra.length() - 1);\nSystem.out.println("Primera: " + primera + ", última: " + ultima);',
      'System.out.println("Primera: " + palabra.charAt(0) + ", última: " + palabra.charAt(palabra.length() - 1));',
      'System.out.println("Primera: " + palabra.charAt(0) + ", Última: " + palabra.charAt(palabra.length() - 1));',
      'System.out.println("Primera: " + palabra.charAt(0) + " última: " + palabra.charAt(palabra.length() - 1));'
    ],
    bad: ['System.out.println("Primera: p, última: n");', 'System.out.println("Primera: " + palabra.charAt(0) + ", última: " + palabra.charAt(palabra.length()));', 'System.out.println("Primera: " + palabra.charAt(0) + ", última: " + palabra.charAt(11));']
  },
  s5: {
    ok: ['boolean esElMismo = guardado.equalsIgnoreCase(escrito);\nSystem.out.println(esElMismo);', 'System.out.println(escrito.equalsIgnoreCase(guardado));'],
    bad: ['System.out.println(guardado.equals(escrito));', 'System.out.println(guardado.toLowerCase().equals(escrito.toLowerCase()));', 'System.out.println(true);']
  },
  s7: {
    ok: ['boolean esDeEspana = telefono.startsWith("+34");\nSystem.out.println(esDeEspana);', 'System.out.println(telefono.startsWith("+34"));'],
    bad: ['System.out.println(telefono.contains("+34"));', 'System.out.println(telefono.startsWith("34"));', 'System.out.println(true);']
  },
  s3: {
    ok: [
      'boolean laContiene = frase.toLowerCase().contains(buscada.toLowerCase());\nSystem.out.println(laContiene);',
      'System.out.println(frase.toUpperCase().contains(buscada.toUpperCase()));',
      'String f = frase.toLowerCase();\nString b = buscada.toLowerCase();\nSystem.out.println(f.contains(b));'
    ],
    bad: ['System.out.println(frase.contains(buscada));', 'System.out.println(frase.toLowerCase().indexOf(buscada) != -1);', 'System.out.println(true);']
  },
  s4: {
    ok: [
      'int indiceUltimoPunto = archivo.lastIndexOf(".");\nSystem.out.println(archivo.substring(indiceUltimoPunto + 1));',
      'System.out.println(archivo.substring(archivo.lastIndexOf(\'.\') + 1));',
      'System.out.println("La extensión es " + archivo.substring(archivo.lastIndexOf(".") + 1));',
      'System.out.println(archivo.substring(archivo.lastIndexOf(".") + 1).toUpperCase());'
    ],
    bad: ['System.out.println(archivo.substring(archivo.indexOf(".") + 1));', 'System.out.println(archivo.substring(archivo.lastIndexOf(".")));', 'System.out.println("png");']
  },
  s6: {
    ok: [
      'int inicioVisible = tarjeta.length() - 4;\nString oculta = "*".repeat(inicioVisible) + tarjeta.substring(inicioVisible);\nSystem.out.println(oculta);',
      'System.out.println("*".repeat(tarjeta.length() - 4) + tarjeta.substring(tarjeta.length() - 4));'
    ],
    bad: ['System.out.println("************5678");', 'System.out.println("*".repeat(12) + "5678");', 'System.out.println("*".repeat(tarjeta.length() - 4) + tarjeta.substring(tarjeta.length() - 3));']
  },
  l1: {
    ok: ['for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}', 'int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}', 'for (int i = 0; i < 5; i++) System.out.println(i + 1);'],
    bad: ['for (int i = 1; i < 5; i++) {\n    System.out.println(i);\n}', 'System.out.println(1);\nSystem.out.println(2);\nSystem.out.println(3);\nSystem.out.println(4);\nSystem.out.println(5);', 'System.out.println("1\\n2\\n3\\n4\\n5");']
  },
  l2: {
    ok: ['for (int i = 1; i <= 10; i++) {\n    System.out.println(numero + " x " + i + " = " + numero * i);\n}', 'for (int i = 1; i <= 10; i++) {\n    System.out.println(numero + " x " + i + " = " + (numero * i));\n}', 'for (int i = 1; i <= 10; i++) System.out.printf("%d x %d = %d%n", numero, i, numero * i);'],
    bad: ['for (int i = 1; i <= 9; i++) {\n    System.out.println(numero + " x " + i + " = " + numero * i);\n}', 'for (int i = 1; i <= 10; i++) {\n    System.out.println(numero + " x " + i + " = " + numero + i);\n}']
  },
  l3: {
    ok: ['int suma = 0;\nfor (int i = 1; i <= 100; i++) {\n    suma += i;\n}\nSystem.out.println(suma);', 'int suma = 0;\nint i = 1;\nwhile (i <= 100) {\n    suma = suma + i;\n    i++;\n}\nSystem.out.println(suma);'],
    bad: ['System.out.println(5050);', 'int suma = 0;\nfor (int i = 1; i < 100; i++) {\n    suma += i;\n}\nSystem.out.println(suma);', 'System.out.println(100 * 101 / 2);']
  },
  l4: {
    ok: ['int contador = inicio;\nwhile (contador >= 1) {\n    System.out.println(contador);\n    contador--;\n}\nSystem.out.println("¡Despegue!");', 'while (inicio > 0) {\n    System.out.println(inicio);\n    inicio--;\n}\nSystem.out.println("¡Despegue!");'],
    bad: ['for (int i = inicio; i >= 1; i--) {\n    System.out.println(i);\n}\nSystem.out.println("¡Despegue!");', 'int c = inicio;\nwhile (c > 1) {\n    System.out.println(c);\n    c--;\n}\nSystem.out.println("¡Despegue!");']
  },
  l6: {
    ok: ['String alReves = "";\nfor (int i = palabra.length() - 1; i >= 0; i--) {\n    alReves += palabra.charAt(i);\n}\nSystem.out.println(alReves);', 'String r = "";\nfor (int i = 0; i < palabra.length(); i++) {\n    r = palabra.charAt(i) + r;\n}\nSystem.out.println(r);', 'for (int i = palabra.length() - 1; i >= 0; i--) System.out.print(palabra.charAt(i));\nSystem.out.println();'],
    bad: ['System.out.println("ramargorp");', 'String r = "";\nfor (int i = palabra.length() - 1; i > 0; i--) {\n    r += palabra.charAt(i);\n}\nSystem.out.println(r);']
  },
  l5: {
    ok: [
      'int vocales = 0;\nfor (int i = 0; i < frase.length(); i++) {\n    char letra = frase.charAt(i);\n    if ("aeiou".indexOf(letra) != -1) {\n        vocales++;\n    }\n}\nSystem.out.println(vocales);',
      'int v = 0;\nfor (int i = 0; i < frase.length(); i++) {\n    char c = frase.charAt(i);\n    if (c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\') v++;\n}\nSystem.out.println(v);'
    ],
    bad: ['System.out.println(11);', 'int v = 0;\nfor (int i = 0; i < frase.length(); i++) {\n    char c = frase.charAt(i);\n    if (c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\') v++;\n}\nSystem.out.println(v);']
  },
  r2: {
    ok: ['double suma = 0;\nfor (double nota : notas) {\n    suma += nota;\n}\ndouble media = suma / notas.length;\nSystem.out.println(media);', 'double s = 0;\nfor (int i = 0; i < notas.length; i++) s += notas[i];\nSystem.out.println(s / notas.length);'],
    bad: ['double suma = 0;\nfor (double nota : notas) suma += nota;\nSystem.out.println(suma / 4);', 'System.out.println(7.0);']
  },
  r3: {
    ok: ['int aprobados = 0;\nfor (double nota : notas) {\n    if (nota >= 5) {\n        aprobados++;\n    }\n}\nSystem.out.println(aprobados);', 'int a = 0;\nfor (int i = 0; i < notas.length; i++) if (notas[i] >= 5.0) a++;\nSystem.out.println(a);'],
    bad: ['int a = 0;\nfor (double n : notas) if (n > 5) a++;\nSystem.out.println(a);', 'System.out.println(3);']
  },
  r5: {
    ok: ['for (int i = dias.length - 1; i >= 0; i--) {\n    System.out.print(dias[i] + " ");\n}', 'String r = "";\nfor (int i = dias.length - 1; i >= 0; i--) {\n    r += dias[i];\n    if (i > 0) r += " ";\n}\nSystem.out.println(r);'],
    bad: ['for (int i = dias.length - 1; i >= 0; i--) {\n    System.out.println(dias[i]);\n}', 'System.out.println("miércoles martes lunes");', 'for (String d : dias) System.out.print(d + " ");']
  },
  r6: {
    ok: ['Arrays.sort(puntos);\nSystem.out.println(Arrays.toString(puntos));', 'Arrays.sort(puntos);\nfor (int p : puntos) System.out.print(p + " ");\nSystem.out.println();'],
    bad: ['System.out.println(Arrays.toString(puntos));', 'System.out.println("[3, 8, 12, 25, 41]");']
  },
  r4: {
    ok: ['for (int i = 0; i < ciudades.length; i++) {\n    if (ciudades[i].equals(buscada)) {\n        System.out.println(buscada + " está en la posición " + i);\n        break;\n    }\n}', 'int pos = -1;\nfor (int i = 0; i < ciudades.length; i++) if (ciudades[i].equals(buscada)) pos = i;\nSystem.out.println(buscada + " está en la posición " + pos);'],
    bad: ['System.out.println(buscada + " está en la posición " + 2);', 'for (int i = 0; i < ciudades.length; i++) {\n    if (ciudades[i].equals(buscada)) {\n        System.out.println(buscada + " está en la posición " + (i + 1));\n    }\n}']
  },
  r7: {
    ok: ['int[] cuadrados = new int[5];\nfor (int i = 0; i < cuadrados.length; i++) {\n    int numero = i + 1;\n    cuadrados[i] = numero * numero;\n}\nSystem.out.println(Arrays.toString(cuadrados));', 'int[] c = new int[5];\nfor (int i = 1; i <= 5; i++) c[i - 1] = i * i;\nSystem.out.println(Arrays.toString(c));'],
    bad: ['int[] c = {1, 4, 9, 16, 25};\nSystem.out.println(Arrays.toString(c));', 'int[] c = new int[5];\nfor (int i = 0; i < 5; i++) c[i] = i * i;\nSystem.out.println(Arrays.toString(c));']
  },
  r1: {
    ok: ['int maxima = temperaturas[0];\nfor (int temperatura : temperaturas) {\n    if (temperatura > maxima) {\n        maxima = temperatura;\n    }\n}\nSystem.out.println(maxima);', 'int m = temperaturas[0];\nfor (int t : temperaturas) m = Math.max(m, t);\nSystem.out.println(m);', 'int m = 0;\nfor (int i = 0; i < temperaturas.length; i++) if (temperaturas[i] > m) m = temperaturas[i];\nSystem.out.println(m);'],
    bad: ['System.out.println(31);', 'System.out.println(temperaturas[2]);']
  },
  r8: {
    ok: ['String masLarga = palabras[0];\nfor (String palabra : palabras) {\n    if (palabra.length() > masLarga.length()) {\n        masLarga = palabra;\n    }\n}\nSystem.out.println(masLarga);', 'String m = "";\nfor (int i = 0; i < palabras.length; i++) if (palabras[i].length() > m.length()) m = palabras[i];\nSystem.out.println(m);'],
    bad: ['System.out.println(palabras[2]);', 'String m = palabras[0];\nfor (String p : palabras) if (p.length() < m.length()) m = p;\nSystem.out.println(m);']
  },
  r9: {
    ok: ['int total = 0;\nfor (int i = 0; i < ventas.length; i++) {\n    for (int j = 0; j < ventas[i].length; j++) {\n        total += ventas[i][j];\n    }\n}\nSystem.out.println(total);', 'int total = 0;\nfor (int[] tienda : ventas) {\n    for (int venta : tienda) {\n        total += venta;\n    }\n}\nSystem.out.println(total);'],
    bad: ['System.out.println(535);', 'int total = 0;\nfor (int j = 0; j < ventas[0].length; j++) total += ventas[0][j];\nSystem.out.println(total);']
  }
};
// casos añadidos: formato flexible que no debe colar
const X = module.exports;
X.s6.bad.push(
  'System.out.println(tarjeta.substring(tarjeta.length() - 4));',
  'String ultimos = tarjeta.substring(tarjeta.length() - 4);\nSystem.out.println("Tarjeta: " + ultimos);',
  'System.out.println(tarjeta + " " + "*".repeat(tarjeta.length() - 4) + tarjeta.substring(tarjeta.length() - 4));',
  'System.out.println("*".repeat(tarjeta.length() - 5) + tarjeta.substring(tarjeta.length() - 4));');
X.s6.ok.push('System.out.println("Tarjeta oculta: " + "*".repeat(tarjeta.length() - 4) + tarjeta.substring(tarjeta.length() - 4));');
X.b4.bad.push('System.out.println("Suspenso Aprobado Notable Sobresaliente");', 'System.out.println("Suspenso / Aprobado / Notable / Sobresaliente");');
X.b4.ok.push('if (nota >= 9) System.out.println("Nota: Sobresaliente");\nelse if (nota >= 7) System.out.println("Nota: Notable");\nelse if (nota >= 5) System.out.println("Nota: Aprobado");\nelse System.out.println("Nota: Suspenso");');
X.b3.bad.push('System.out.println(numero + " es par o impar");');
X.s4.ok.push('System.out.println("La extensión es: " + archivo.substring(archivo.lastIndexOf(".") + 1));');
X.s1.bad.push('System.out.println(frase.length() + " " + frase.replace(" ", "").length());');
X.l5.ok.push("char[] caracteres = frase.toCharArray();\nint vocales = 0;\nfor (char caracter : caracteres) {\n    if (caracter == 'a' || caracter == 'e' || caracter == 'i' || caracter == 'o' || caracter == 'u') {\n        vocales++;\n    }\n}\nSystem.out.println(vocales);");
X.l6.ok.push("char[] letras = palabra.toCharArray();\nString r = \"\";\nfor (int i = letras.length - 1; i >= 0; i--) r += letras[i];\nSystem.out.println(r);");
// ejercicios nuevos (temas 1 y 2)
X.a4 = { ok: ['System.out.println((int) kilos / 5);', 'int cajas = (int) (kilos / 5);\nSystem.out.println("Cajas llenas: " + cajas);'],
         bad: ['System.out.println(kilos / 5);', 'System.out.println(Math.round(kilos / 5));', 'System.out.println(9);'] };
X.b5 = { ok: ['System.out.println(Math.max(a, Math.max(b, c)));', 'if (a > b && a > c) System.out.println(a);\nelse if (b > c) System.out.println(b);\nelse System.out.println(c);'],
         bad: ['System.out.println(b);', 'if (a > b) System.out.println(a);\nelse System.out.println(b);'] };
X.b6 = { ok: ['switch (dia) {\n    case 1 -> System.out.println("Lunes");\n    case 2 -> System.out.println("Martes");\n    case 3 -> System.out.println("Miércoles");\n    case 4 -> System.out.println("Jueves");\n    case 5 -> System.out.println("Viernes");\n    case 6 -> System.out.println("Sábado");\n    case 7 -> System.out.println("Domingo");\n    default -> System.out.println("Día no válido");\n}',
               'String nombre = switch (dia) {\n    case 1 -> "Lunes"; case 2 -> "Martes"; case 3 -> "Miércoles"; case 4 -> "Jueves";\n    case 5 -> "Viernes"; case 6 -> "Sábado"; case 7 -> "Domingo"; default -> "Día no válido";\n};\nSystem.out.println(nombre);'],
         bad: ['switch (dia) {\n    case 1: System.out.println("Lunes");\n    case 2: System.out.println("Martes");\n    case 3: System.out.println("Miércoles");\n    case 4: System.out.println("Jueves");\n    case 5: System.out.println("Viernes");\n    case 6: System.out.println("Sábado");\n    case 7: System.out.println("Domingo");\n    default: System.out.println("Día no válido");\n}',
               'System.out.println("Miércoles");'] };
X.l7 = { ok: ['int f = 1;\nint i = 1;\nwhile (i <= numero) {\n    f = f * i;\n    i++;\n}\nSystem.out.println(f);'],
         bad: ['int f = 0;\nfor (int i = 1; i <= numero; i++) f *= i;\nSystem.out.println(f);', 'int f = 1;\nfor (int i = 1; i < numero; i++) f *= i;\nSystem.out.println(f);'] };
X.l9 = { ok: ['String r = "";\nfor (char letra : palabra.toCharArray()) r = letra + r;\nSystem.out.println(palabra.equals(r));'],
         bad: ['String r = "";\nfor (char letra : palabra.toCharArray()) r = r + letra;\nSystem.out.println(palabra.equals(r));', 'System.out.println(true);'] };
X.l8 = { ok: ['int c = 0;\nint n = numero;\nif (n == 0) c = 1;\nwhile (n > 0) {\n    n /= 10;\n    c++;\n}\nSystem.out.println(c);'],
         bad: ['int c = 0;\nint n = numero;\nwhile (n > 0) {\n    n /= 10;\n    c++;\n}\nSystem.out.println(c);', 'System.out.println(String.valueOf(numero).length());'] };
