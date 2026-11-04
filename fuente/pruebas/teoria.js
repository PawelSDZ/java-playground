// Comprueba los ejemplos del apartado Teoría:
//  1) cada ejemplo ejecutable funciona en el intérprete de la página (o falla, si lleva error: true)
//  2) da exactamente lo mismo que Java real (javac + java, con idioma español), salvo los aleatorios
//  3) los ejercicios de «Practícalo» existen y los ids de los temas no se repiten
// Uso (desde fuente/):  node pruebas/teoria.js
const fs = require('fs'), os = require('os'), path = require('path');
const { execSync } = require('child_process');
const MJ = require('../minijava.js'), E = require('../exercises.js');
global.TEORIA = [];
eval(fs.readFileSync(path.join(__dirname, '..', 'teoria_temas.js'), 'utf8').replace('var TEORIA = [];', ''));
require('../teoria_archivos.js').forEach(f => eval(fs.readFileSync(path.join(__dirname, '..', f), 'utf8')));

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jp-teo-'));
let problemas = 0, ejemplos = 0;
const mal = (t, msg) => { problemas++; console.log('✗', t, '|', msg); };
const ids = new Set();
TEORIA.forEach(t => {
  if (ids.has(t.id)) mal(t.id, 'id repetido'); ids.add(t.id);
  t.blocks.forEach((b, n) => {
    if (b.practice) b.practice.forEach(id => { if (!E.some(e => e.id === id)) mal(t.id, 'no existe el ejercicio ' + id); });
    if (!b.code) return;
    ejemplos++;
    const donde = t.id + ' #' + n;
    const r = MJ.run(b.code, { input: b.stdin });
    if (b.error ? r.ok : !r.ok) { mal(donde, b.error ? 'debería fallar y no falla' : 'falla en la página: ' + r.error + '\n' + b.code); return; }
    if (b.random) return;
    // con Java real
    const d = path.join(dir, 'c' + ejemplos); fs.mkdirSync(d);
    const completo = /\bclass\s+Main\b/.test(b.code);
    fs.writeFileSync(path.join(d, 'Main.java'), completo ? b.code : 'import java.util.*;\npublic class Main { public static void main(String[] args) {\n' + b.code + '\n}}');
    let j, jok = true;
    try { j = execSync('javac -encoding UTF-8 Main.java 2>&1 && java -Duser.language=es -Duser.country=ES -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 Main 2>&1', { cwd: d, encoding: 'utf8', input: b.stdin ? b.stdin.join('\n') + '\n' : '' }); }
    catch (err) { j = err.stdout || ''; jok = false; }
    j = j.replace(/Picked up JAVA_TOOL_OPTIONS.*\n/g, '');
    if (b.error) {
      if (jok) mal(donde, 'en Java real no falla:\n' + j);
      else if (r.kind === 'runtime' && j.indexOf(r.error.replace('Exception in thread "main" ', '').split(':')[0]) < 0) mal(donde, 'error distinto\n--- página\n' + r.error + '\n--- java\n' + j);
      return;
    }
    if (!jok || j !== r.output) mal(donde, 'distinto de Java real\n--- página\n' + r.output + '\n--- java\n' + j);
  });
});
fs.rmSync(dir, { recursive: true, force: true });
console.log('temas:', TEORIA.length, '| ejemplos:', ejemplos, '| problemas:', problemas);
process.exit(problemas ? 1 : 0);
