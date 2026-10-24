// Busca «agujeros» en la comprobación flexible de resultados: para cada ejercicio y cada
// dato de prueba oculto comprueba que una etiqueta delante se acepta, pero que NO cuelan
// un número de más, quitar símbolos (como los * de una tarjeta) ni escribir todas las respuestas juntas.
// Uso (desde fuente/):  NODE_PATH=$(npm root -g) node pruebas/trampas.js
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

(async () => {
  const src = path.join(__dirname, '..', 'salida', 'pruebas_completa.html');
  const tmp = path.join(__dirname, '..', 'salida', '_trampas.html');
  let html = fs.readFileSync(src, 'utf8');
  const hook = 'var lastRun = null;';
  if (!html.includes(hook)) throw new Error('No encuentro el punto de enganche en la página');
  html = html.replace(hook, hook + ' window.__t = { looseMatch: looseMatch, answerVocab: answerVocab, exec: exec, solutionBody: solutionBody };');
  fs.writeFileSync(tmp, html);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.addInitScript(() => { localStorage.setItem('java-playground-v1', JSON.stringify({ name: 'P', welcomed: true, level: 'all' })); });
  await p.goto('file://' + tmp); await p.waitForTimeout(300);
  const res = await p.evaluate(() => {
    const T = window.__t, out = [];
    EXERCISES.forEach(e => {
      const v = T.answerVocab(e);
      const exps = [e.expected].concat((e.tests || []).map(t => T.exec(t + '\n' + T.solutionBody(e)).output.replace(/\n$/, '')));
      exps.forEach(x => {
        if (!T.looseMatch('Resultado: ' + x, x, v)) out.push(e.id + ' rechaza una etiqueta delante: ' + x);
        if (T.looseMatch(x + ' 0', x, v) && !/\b0$/.test(x)) out.push(e.id + ' acepta un número de más: ' + x);
        if (/[*]/.test(x) && T.looseMatch(x.replace(/\*/g, ''), x, v)) out.push(e.id + ' acepta sin los símbolos: ' + x);
      });
      const distinct = [...new Set(exps)];
      if (distinct.length > 1) distinct.forEach(x => { if (T.looseMatch(distinct.join(' '), x, v)) out.push(e.id + ' acepta todas las respuestas juntas para: ' + x); });
    });
    return out;
  });
  console.log(res.length ? res.join('\n') : 'sin problemas');
  await b.close(); fs.unlinkSync(tmp);
  process.exit(res.length ? 1 : 0);
})();
