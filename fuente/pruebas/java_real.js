// Compara el intérprete de la página (minijava.js) con Java real (javac + java):
//  1) las soluciones, «otras formas» y pruebas ocultas de todos los ejercicios
//  2) los casos sueltos de pruebas/java_real_casos.js (regex, StringBuilder, switch...)
// Necesita un JDK instalado. Uso (desde fuente/):  node pruebas/java_real.js
const fs = require('fs'), os = require('os'), path = require('path');
const { execSync } = require('child_process');
const MJ = require('../minijava.js'), E = require('../exercises.js');
const SUELTOS = require('./java_real_casos.js');

const dirBase = fs.mkdtempSync(path.join(os.tmpdir(), 'jp-java-'));
const casos = [];
// la «otra forma» a veces es solo un trozo: se completa con lo que necesita alrededor
const ALT_ANTES = { r9: 'int total = 0;\n', l8: 'int cifras = 0;\nint n = numero;\n' };
const ALT_DESPUES = { r9: '\nSystem.out.println(total);', l8: '\nSystem.out.println(cifras);' };
const sinEntrada = e => !e.input || e.input.indexOf('(sin datos') === 0;

E.forEach(e => {
  const cuerpo = sinEntrada(e) ? e.solution : e.solution.slice(e.input.length);
  const entradas = sinEntrada(e) ? [''] : [e.input].concat(e.tests || []);
  entradas.forEach(inp => {
    casos.push([e.id, inp + cuerpo]);
    // solo se comparan las «otras formas» que son un programa completo (o se pueden completar)
    if (e.alt && /System\.out/.test(e.alt.code + (ALT_DESPUES[e.id] || '')) && (!/^\s*if/.test(e.alt.code)))
      casos.push([e.id + ' (otra forma)', inp + '\n' + (ALT_ANTES[e.id] || '') + e.alt.code + (ALT_DESPUES[e.id] || '')]);
  });
});
SUELTOS.forEach((c, i) => casos.push(['suelto ' + i, c.replace(/java\.util\.Arrays/g, 'Arrays')]));

let diferencias = 0;
casos.forEach(([id, codigo], i) => {
  const r = MJ.run(codigo);
  const dir = path.join(dirBase, 'c' + i); fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'Main.java'), 'import java.util.Arrays;\npublic class Main { public static void main(String[] args) {\n' + codigo + '\n}}');
  let j;
  try { j = execSync('javac -encoding UTF-8 Main.java 2>&1 && java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 Main 2>&1', { cwd: dir, encoding: 'utf8' }); }
  catch (err) { j = 'ERROR JAVA ' + (err.stdout || ''); }
  j = j.replace(/Picked up JAVA_TOOL_OPTIONS.*\n/g, '');
  const m = r.ok ? r.output : 'ERROR PÁGINA ' + r.error;
  if (m !== j) { diferencias++; console.log('✗', id, '\n--- página\n' + m + '\n--- java\n' + j); }
});
fs.rmSync(dirBase, { recursive: true, force: true });
console.log('casos:', casos.length, '| diferencias con Java real:', diferencias);
process.exit(diferencias ? 1 : 0);
