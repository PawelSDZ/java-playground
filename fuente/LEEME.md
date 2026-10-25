# Java Playground — código fuente

Página de ejercicios de Java para 1.º de DAM (UNIR). Todo se ejecuta en el navegador: la página lleva
un intérprete de un subconjunto de Java escrito en JavaScript, así que no hay servidor.

| Versión | Dónde está | Para qué |
|---|---|---|
| **Main** | `index.html` de la raíz del repositorio → <https://pawelsdz.github.io/java-playground/> | La que usan los amigos de Pawel |
| **Experimental** | Artefacto privado de claude.ai «Ejercicios programacion (pruebas)» (el enlace está en la memoria del proyecto, no en el repositorio) | Donde se prueba todo antes |
| Main antigua | Artefacto de claude.ai <https://claude.ai/artifact/RGGudUXKtykZ3WKALwNKQy> | **Congelada**: no se actualiza |

## Reglas de trabajo (las decidió Pawel)

1. **Todo cambio va primero a la experimental.** Se publica allí y se espera su aprobación.
2. **La main solo se toca cuando Pawel dice «push a main»** (o algo equivalente). Entonces: `python3 build.py merge`,
   commit y push de `index.html` (y de `fuente/`) a GitHub.
3. Si alguna vez pide subir algo directamente a main, la experimental también tiene que tenerlo
   (como las dos salen de estas mismas piezas, basta con publicar también la experimental).
4. **La etiqueta «Rama experimental» es exclusiva de la experimental** y nunca pasa a main
   (`build.py merge` la quita y comprueba que no queda).
5. Los ejercicios se ciñen a lo visto en clase (temas en el proyecto de Claude). Ejercicios nuevos:
   primero se proponen en una lista corta (qué practica cada uno y por qué no es redundante) y Pawel elige.
6. Soluciones de referencia: **for-each cuando no hacen falta posiciones**; `for` con índice solo si se necesitan
   (recorrer hacia atrás, buscar la posición, rellenar por posiciones). La otra forma va en `alt`.
7. Soluciones alternativas («otra forma») solo cuando aporten algo, no por añadir.
8. Antes de publicar, pasar las pruebas automáticas (abajo). Y mirar el resultado en el navegador si cambia algo visual.

## Estructura

```
fuente/
├── template.html        plantilla de la página (HTML, CSS y la lógica de comprobación); tiene huecos /*ALGO*/
├── minijava.js          intérprete de Java (lexer, parser, comprobación de tipos y ejecución)
├── exercises.js         los ejercicios + el orden (ORDER al final del archivo)
├── welcome*.html/.js    bienvenida (nombre y nivel)
├── level*.html/.js      tarjeta «¿Ya dominas…? Probar el reto»
├── snippets.js          atajo sout/syso + Tab
├── refsol.js            «Solución de referencia» al acertar
├── walk.js              «Explicar el código paso a paso» (los datos se generan desde walk_data.py)
├── walk_data.py         pasos de cada ejercicio: (trozo de código, explicación)
├── generar_walk.py      vuelca walk_data.py dentro de walk.js
├── autocomplete.js      sugerencias de variables y de métodos tras el punto
├── build.py             monta la experimental (y con «merge», la main en ../index.html)
├── pruebas/
│   ├── auditoria.js     solución oficial + casos buenos/malos de cada ejercicio, en la página real
│   ├── casos.js         los casos de la auditoría (ok = deben aceptarse, bad = no deben colar)
│   ├── trampas.js       busca agujeros en la comprobación flexible
│   ├── java_real.js     compara el intérprete con Java real (javac)
│   └── java_real_casos.js  programas sueltos para esa comparación
└── salida/              (generado, no se sube) pruebas.html = lo que se publica en el artefacto experimental
```

## Comandos

Desde `fuente/`. Requisitos: Python 3, Node.js, Playwright con Chromium (`npm i -g playwright`) y un JDK para `java_real.js`.

```bash
python3 generar_walk.py              # solo si has tocado walk_data.py
python3 build.py                     # experimental -> salida/pruebas.html
node --check salida/scripts_pruebas.js
NODE_PATH=$(npm root -g) node pruebas/auditoria.js   # debe acabar con "problemas: 0"
NODE_PATH=$(npm root -g) node pruebas/trampas.js     # debe decir "sin problemas"
node pruebas/java_real.js                            # debe decir "diferencias con Java real: 0"
```

- **Publicar la experimental:** publicar `fuente/salida/pruebas.html` en el artefacto
  privado «Ejercicios programacion (pruebas)» (herramienta Artifact, con la `url` que está en la memoria del proyecto).
- **Push a main:** `python3 build.py merge` (escribe `../index.html` sin la etiqueta), y después
  `git add index.html fuente && git commit -m "…" && git push origin main`. GitHub Pages tarda 1-2 minutos.

## Formato de un ejercicio (exercises.js)

```js
{
  id: 'l7', group: 'Bucles', title: 'Factorial', level: 'Media',      // Fácil | Media | Reto
  statement: 'Enunciado…',
  input: 'int numero = 5;',              // datos fijos (líneas con candado); '(sin datos de entrada)' si no hay
  tests: ['int numero = 0;', …],         // pruebas ocultas: otras declaraciones de las mismas variables
  expected: '120',                       // salida esperada con el input del ejemplo
  outInfo: 'Un número entero (int): …',  // «Qué se muestra»
  starter: 'int numero = 5;\n\n// Tu código aquí\n',   // SIEMPRE empieza por input
  hints: ['…', '…', { t: 'Completa los huecos:', code: '…___…' }],   // 3 a 5; la última, código con huecos
  solution: 'int numero = 5;\n…',        // SIEMPRE empieza por input; el resto es la solución
  explanation: '…',
  req: [{ re: /\b(for|while)\s*\(/, msg: 'usar un bucle' }],   // msg completa «Este ejercicio pide …»
  alt: { unless: /toCharArray/, code: '…', why: '…' }          // opcional: se muestra si su código no encaja con unless
  exact: true                            // opcional: sin comprobación flexible (cuando los espacios forman parte del dibujo)
}
```

- Tipos de pista según cuántas hay (los pinta la plantilla): 3 → Qué te piden / Qué usar y cómo / Código con huecos;
  4 → añade «Qué herramienta buscar» (sin nombrar el método) y «Cómo organizarlo»; 5 → añade «Razonamiento paso a paso».
- Las salidas esperadas de las pruebas ocultas no se escriben: se calculan ejecutando la solución con cada `tests[i]`.
- Al añadir un ejercicio: meterlo en `ORDER` (por sección y dificultad), añadir sus pasos en `walk_data.py`
  (cada trozo debe aparecer tal cual en la solución) y casos ok/bad en `pruebas/casos.js`.

## Cómo se comprueba una respuesta (template.html, `runCode`)

1. Se une el `input` fijo con el código del alumno y se ejecuta con el intérprete.
2. **Exacta** (`norm`) o **flexible** (`looseMatch`): mismos datos y en el mismo orden; solo pueden sobrar palabras
   de adorno («Resultado:»). No pueden sobrar números, símbolos (`*`) ni palabras que sean respuestas posibles
   del ejercicio (`answerVocab`). Los signos pegados a un dato tienen que coincidir (`punctOK`).
3. Si coincide: se comprueba que no esté escrito a mano (`looksHardcoded*`) y los requisitos `req`.
4. **Pruebas ocultas** (`hiddenTests`): se repite con cada `tests[i]`; si alguna falla, no se da por resuelto.

## Intérprete (minijava.js)

Soporta: int, long, double, boolean, char, String, StringBuilder, arrays (también 2D), if/else, switch (clásico,
con flechas y como expresión, con yield), for, for-each, while, do-while, break/continue, métodos de String
(incluidas expresiones regulares: replaceAll, replaceFirst, matches, split), Math, Integer, Double, Character,
Arrays (toString, deepToString, sort, fill, equals, copyOf, copyOfRange), printf/String.format con coma decimal.
No soporta: clases propias, métodos aparte de main, Scanner, colecciones (ArrayList…), excepciones.
Mensajes de error al estilo de javac. Si se amplía, añadir casos a `pruebas/java_real_casos.js`.

## Diferencias conocidas (aceptadas a propósito)

- **r5 «Días al revés»:** escribir un día por línea se acepta como «otro formato».
- **r1 «Temperatura máxima»:** empezar el máximo en 0 se rechaza (falla con temperaturas negativas). En `casos.js`
  figura como caso «ok» antiguo; la auditoría lo cuenta como diferencia conocida.

## Ideas pendientes (comentadas con Pawel, sin hacer)

- Aviso específico cuando se comparan Strings con `==` (ahora sale un aviso genérico).
- Icono de la pestaña y vista previa al compartir el enlace (Open Graph).
- Guardar el progreso fuera del navegador (copia descargable, o login con Supabase/Firebase).
- Más adelante: sección de SQL (SQLite en el navegador) y orientación a objetos en el intérprete.
